import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3100/", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
for (let i = 0; i < 14; i++) { await page.mouse.wheel(0, 900); await page.waitForTimeout(90); }
await page.waitForTimeout(2500);

const r = await page.evaluate(() => {
  const ST = window.__ScrollTrigger;
  const y = window.scrollY;
  const all = ST.getAll();
  const stranded = [];
  document.querySelectorAll("main div").forEach((el) => {
    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" && parseFloat(cs.opacity) === 0) {
      const top = el.getBoundingClientRect().top + y;
      if (top < y) {
        // find the trigger whose trigger element is this el
        const t = all.find((t) => t.trigger === el);
        stranded.push({
          top: Math.round(top),
          text: (el.textContent||"").trim().slice(0,30),
          hasTrigger: !!t,
          start: t ? Math.round(t.start) : null,
          end: t ? Math.round(t.end) : null,
          progress: t ? +t.progress.toFixed(2) : null,
          isActive: t ? t.isActive : null,
        });
      }
    }
  });
  return { y, total: all.length, strandedCount: stranded.length, stranded: stranded.slice(0,6) };
});
console.log(JSON.stringify(r, null, 1));
await browser.close();
