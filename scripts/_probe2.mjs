import { chromium } from "playwright";
const BASE = "http://localhost:3100/";
const browser = await chromium.launch();

async function run(label, width) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  for (let i = 0; i < 14; i++) { await page.mouse.wheel(0, 900); await page.waitForTimeout(90); }
  await page.waitForTimeout(2500);
  const r = await page.evaluate(() => {
    const y = window.scrollY;
    let strandedAbove = 0;
    document.querySelectorAll("main div").forEach((el) => {
      const cs = getComputedStyle(el);
      if (cs.visibility === "hidden" && parseFloat(cs.opacity) === 0) {
        const top = el.getBoundingClientRect().top + y;
        if (top < y) strandedAbove++;   // already scrolled past but still hidden
      }
    });
    return { y, docH: document.body.scrollHeight, strandedAbove,
             pinSpacers: document.querySelectorAll(".pin-spacer").length };
  });
  console.log(label, JSON.stringify(r));
  await page.close();
}

await run("desktop 1440 (pin ACTIVE)  ", 1440);
await run("narrow  900 (pin INACTIVE) ", 900);
await browser.close();
