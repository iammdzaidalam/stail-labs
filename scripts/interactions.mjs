// Interaction QA: tabs, mobile menu, contact form, anchor nav.
//
// NOTE: the form-submit assertion posts from the browser's real IP, which the
// API rate-limits to 5 requests / 10 min. Run this against a freshly started
// dev server; on a re-run inside the same window that request returns 429.
// The direct API probes below spoof their own X-Forwarded-For and are immune.
import { chromium } from "playwright";

const OUT = process.argv[2] ?? "shots-interactions";
const PORT = process.env.PORT ?? "3100";
const URL = process.env.QA_URL ?? `http://localhost:${PORT}/`;
const browser = await chromium.launch();
const results = [];
const ok = (name, pass, extra = "") =>
  results.push(`${pass ? "PASS" : "FAIL"} ${name}${extra ? " — " + extra : ""}`);

try {

// ——— Desktop: tabs, anchor nav, form ———
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);

  // Anchor nav: click "Industries" in navbar, expect smooth scroll near #industries
  await page.click('header a[href="#industries"]');
  await page.waitForTimeout(2500);
  const indTop = await page.evaluate(() =>
    Math.round(document.getElementById("industries").getBoundingClientRect().top),
  );
  ok("anchor scroll to #industries", Math.abs(indTop) < 260, `top=${indTop}`);

  // Solutions tabs
  await page.evaluate(() => document.getElementById("solutions").scrollIntoView());
  await page.waitForTimeout(1500);
  const tabs = page.locator('[role="tab"]');
  ok("4 solution tabs", (await tabs.count()) === 4);
  await tabs.nth(2).click();
  await page.waitForTimeout(900);
  const panelText = await page.locator('[role="tabpanel"]').innerText();
  ok(
    "tab 3 shows enterprise panel",
    panelText.includes("Enterprise AI Transformation"),
  );
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(700);
  const active = await page.evaluate(() =>
    document.activeElement?.getAttribute("aria-selected"),
  );
  ok("arrow-key moves tab focus", active === "true");
  await page.screenshot({ path: `${OUT}/tabs.png` });

  // Contact form — fill and submit; without RESEND key the API returns 503
  await page.evaluate(() => document.getElementById("contact").scrollIntoView());
  await page.waitForTimeout(1200);
  await page.fill("#contact-name", "QA Tester");
  await page.fill("#contact-organization", "Test Org");
  await page.fill("#contact-email", "qa@example.com");
  await page.selectOption("#contact-sector", { index: 2 });
  await page.fill("#contact-message", "This is an automated QA submission check.");
  const [resp] = await Promise.all([
    page.waitForResponse((r) => r.url().includes("/api/contact")),
    page.click('#contact button[type="submit"]'),
  ]);
  // 503 = email not configured (expected locally); 200 = configured and sent.
  const status = resp.status();
  ok("contact POST handled", status === 503 || status === 200, `status=${status}`);
  await page.waitForTimeout(600);
  if (status === 503) {
    const alert = await page
      .locator('#contact [role="alert"]')
      .innerText()
      .catch(() => "");
    ok("503 fallback message shown", alert.length > 10, alert.slice(0, 80));
  }
  await page.screenshot({ path: `${OUT}/form-fallback.png` });

  // The direct API probes below each spoof a unique X-Forwarded-For so they
  // land in their own rate-limit bucket — otherwise repeated local runs
  // exhaust the shared window and these assert 429 instead of what they test.
  const ipA = `203.0.113.${Math.floor(Math.random() * 250) + 1}`;
  const ipB = `198.51.100.${Math.floor(Math.random() * 250) + 1}`;

  // Honeypot: filled website field should be silently accepted
  const hp = await page.evaluate(async (ip) => {
    const r = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Forwarded-For": ip },
      body: JSON.stringify({
        name: "Bot", organization: "Bot Org", email: "bot@spam.com",
        phone: "", sector: "Mining", message: "buy my stuff now please",
        website: "http://spam.example",
      }),
    });
    return { status: r.status, body: await r.json() };
  }, ipA);
  ok(
    "honeypot silently accepted",
    hp.status === 200 && hp.body.ok === true,
    `status=${hp.status}`,
  );

  // Validation: bad email rejected
  const bad = await page.evaluate(async (ip) => {
    const r = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Forwarded-For": ip },
      body: JSON.stringify({
        name: "X", organization: "Y", email: "not-an-email",
        sector: "Mining", message: "hello there friend", website: "",
      }),
    });
    return r.status;
  }, ipB);
  ok("invalid payload rejected 400", bad === 400, `status=${bad}`);

  // Rate limit: the 6th request from one IP inside the window is throttled
  const rl = await page.evaluate(async () => {
    const ip = `192.0.2.${Math.floor(Math.random() * 250) + 1}`;
    const send = () =>
      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Forwarded-For": ip },
        body: JSON.stringify({
          name: "Rate Test", organization: "Org", email: "rate@example.com",
          sector: "Mining", message: "checking the rate limiter behaviour",
          website: "",
        }),
      }).then((r) => r.status);
    const seen = [];
    for (let i = 0; i < 7; i++) seen.push(await send());
    return seen;
  });
  ok("rate limit engages after 5/window", rl.at(-1) === 429, `statuses=${rl.join(",")}`);
  await page.close();
}

// ——— Mobile: hamburger menu ———
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  // aria-controls is only set while the overlay is mounted, so target the label.
  await page.click('button[aria-label="Open menu"]');
  await page.waitForTimeout(900);
  const menuVisible = await page.locator("#mobile-menu").isVisible();
  ok("mobile menu opens", menuVisible);
  await page.screenshot({ path: `${OUT}/mobile-menu.png` });
  await page.click('#mobile-menu a[href="#products"]');
  await page.waitForTimeout(2200);
  const closed = (await page.locator("#mobile-menu").count()) === 0;
  const prodTop = await page.evaluate(() =>
    Math.round(document.getElementById("products").getBoundingClientRect().top),
  );
  ok("menu closes + scrolls to products", closed && Math.abs(prodTop) < 300, `top=${prodTop}`);
  await page.screenshot({ path: `${OUT}/mobile-hero-v2.png`, fullPage: false });
  // grab the fixed mobile hero fan
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${OUT}/mobile-hero-fan.png` });
  await page.close();
}
} finally {
  await browser.close();
}
console.log(results.join("\n"));
