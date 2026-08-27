/**
 * Hunts for content left invisible / half-revealed by GSAP `from` tweens whose
 * ScrollTrigger never fired (or fired against stale positions).
 *
 * Any element animated with gsap.from({autoAlpha:0}) or a masked SplitText line
 * is INVISIBLE until its trigger runs. If start positions are computed before
 * fonts/images settle, or the visitor lands mid-page, triggers can be skipped
 * and the content stays hidden. This script reproduces those paths.
 */
import { chromium } from "playwright";
import { mkdirSync } from "fs";

const OUT = process.argv[2] ?? "shots-diagnose";
mkdirSync(OUT, { recursive: true });
const PORT = process.env.PORT ?? "3100";
const BASE = process.env.QA_URL ?? `http://localhost:${PORT}/`;

const browser = await chromium.launch();

/** Everything the eye should see, with its effective visibility. */
const AUDIT = `(() => {
  const bad = [];
  const roots = document.querySelectorAll('main section, footer, main h1, main h2, main h3, main p, main li, main article');
  for (const el of roots) {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;
    // only consider things inside the document flow that carry text
    const text = (el.textContent || '').trim().slice(0, 60);
    if (!text) continue;
    const op = parseFloat(cs.opacity);
    const hidden = cs.visibility === 'hidden';
    // Content still below the fold is *supposed* to be hidden — it is waiting
    // for its reveal. Only count elements the visitor should already be able
    // to see: those at or above the reveal threshold (top 88% of viewport).
    const inOrAboveViewport = r.top < window.innerHeight * 0.88;
    if (!inOrAboveViewport) continue;
    // Muted labels legitimately use opacity ~0.5-0.8 via utility classes.
    if (hidden || op < 0.4) {
      // find nearest section for reporting
      const sec = el.closest('section[id], footer') || el.closest('section');
      bad.push({
        section: sec ? (sec.id || sec.tagName.toLowerCase()) : '(none)',
        tag: el.tagName.toLowerCase(),
        opacity: Number.isNaN(op) ? null : +op.toFixed(2),
        visibility: cs.visibility,
        transform: cs.transform === 'none' ? null : cs.transform.slice(0, 40),
        text,
      });
    }
  }
  // de-dup by section+text
  const seen = new Set();
  return bad.filter(b => {
    const k = b.section + '|' + b.text;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
})()`;

async function report(label, page) {
  const bad = await page.evaluate(AUDIT);
  if (!bad.length) {
    console.log(`\n=== ${label} === OK (nothing hidden)`);
    return 0;
  }
  console.log(`\n=== ${label} === ${bad.length} hidden/partial element(s)`);
  const bySection = {};
  for (const b of bad) (bySection[b.section] ??= []).push(b);
  for (const [sec, items] of Object.entries(bySection)) {
    console.log(`  [${sec}] ${items.length}`);
    for (const it of items.slice(0, 3)) {
      console.log(
        `    <${it.tag}> op=${it.opacity} vis=${it.visibility} tf=${it.transform} :: "${it.text}"`,
      );
    }
  }
  return bad.length;
}

let total = 0;

// ── Scenario 1: land directly on a mid-page anchor (very common from nav/share)
for (const anchor of ["#services", "#contact", "#studio"]) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE + anchor, { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  total += await report(`deep-link ${anchor}`, page);
  await page.screenshot({ path: `${OUT}/deeplink-${anchor.slice(1)}.png` });
  await page.close();
}

// ── Scenario 2: one fast fling to the bottom (skips intermediate triggers)
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await page.evaluate(() =>
    window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }),
  );
  await page.waitForTimeout(2500);
  total += await report("fast jump to bottom", page);
  await page.screenshot({ path: `${OUT}/fast-bottom.png` });
  // then jump back to the middle
  await page.evaluate(() =>
    window.scrollTo({ top: document.body.scrollHeight * 0.45, behavior: "instant" }),
  );
  await page.waitForTimeout(1500);
  total += await report("jump back to middle", page);
  await page.screenshot({ path: `${OUT}/jump-middle.png`, fullPage: false });
  await page.close();
}

// ── Scenario 3: reduced motion (all animation should be skipped entirely)
{
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  total += await report("prefers-reduced-motion (no scroll)", page);
  await page.screenshot({ path: `${OUT}/reduced-motion.png`, fullPage: true });
  await page.close();
}

// ── Scenario 4: JavaScript disabled — content must still be fully visible
{
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    javaScriptEnabled: false,
  });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "load" });
  await page.waitForTimeout(1200);
  total += await report("javascript disabled", page);
  await page.screenshot({ path: `${OUT}/no-js.png`, fullPage: true });
  await ctx.close();
}

// ── Scenario 5: slow network (images/fonts land after ScrollTrigger measures)
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.route("**/*.{jpg,png,woff2}", async (route) => {
    await new Promise((r) => setTimeout(r, 900));
    await route.continue();
  });
  await page.goto(BASE, { waitUntil: "load" });
  await page.waitForTimeout(3500);
  await page.evaluate(() => window.scrollTo({ top: 2600, behavior: "instant" }));
  await page.waitForTimeout(2000);
  total += await report("slow assets, then scroll", page);
  await page.screenshot({ path: `${OUT}/slow-assets.png` });
  await ctx.close();
}

await browser.close();
console.log(`\nTOTAL hidden/partial findings: ${total}`);
