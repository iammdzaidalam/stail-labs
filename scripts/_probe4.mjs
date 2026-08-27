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
  return {
    y, docH: document.body.scrollHeight,
    triggers: ST.getAll().map((t) => {
      const el = t.trigger;
      const realTop = el ? Math.round(el.getBoundingClientRect().top + y) : null;
      return {
        start: Math.round(t.start), end: Math.round(t.end),
        prog: +t.progress.toFixed(2),
        realTop,
        drift: realTop !== null ? realTop - Math.round(t.start) : null,
        text: el ? (el.textContent||"").trim().slice(0,26) : "(none)",
      };
    }),
  };
});
console.log("scrollY", r.y, "docH", r.docH);
console.table(r.triggers);
await browser.close();
