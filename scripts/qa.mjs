// Visual QA sweep: full-page + section screenshots in light/dark, desktop/mobile.
import { chromium } from "playwright";
import { mkdirSync } from "fs";

const OUT = process.argv[2] ?? "shots";
mkdirSync(OUT, { recursive: true });
const PORT = process.env.PORT ?? "3100";
const URL = process.env.QA_URL ?? `http://localhost:${PORT}/`;

const browser = await chromium.launch();

async function sweep(name, { width, height, colorScheme }) {
  const page = await browser.newPage({
    viewport: { width, height },
    colorScheme,
  });
  const errors = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(1800);

  // Scroll through the whole page in viewport steps so every ScrollTrigger
  // fires, then back to top.
  const total = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < total; y += Math.round(height * 0.75)) {
    await page.mouse.wheel(0, Math.round(height * 0.75));
    await page.waitForTimeout(220);
  }
  await page.waitForTimeout(1200);

  // Screenshot each section after ensuring it's in view.
  const ids = await page.evaluate(() =>
    [...document.querySelectorAll("section[id], footer")].map(
      (s) => s.id || `footer`,
    ),
  );
  // full page capture (animations already revealed)
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}/${name}-full.png`, fullPage: true });

  console.log(name, "sections:", ids.join(","), "| height:", total, "| console errors:", errors.length ? errors : "none");
  await page.close();
}

try {
  await sweep("desktop-light", { width: 1440, height: 900, colorScheme: "light" });
  await sweep("desktop-dark", { width: 1440, height: 900, colorScheme: "dark" });
  await sweep("mobile-light", { width: 390, height: 844, colorScheme: "light" });
  await sweep("mobile-dark", { width: 390, height: 844, colorScheme: "dark" });
  console.log("done");
} finally {
  await browser.close();
}
