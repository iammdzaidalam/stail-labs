import { chromium } from "playwright";
const b = await chromium.launch();
const page = await b.newPage({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
await page.goto("http://localhost:3100/", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
// scroll slowly to the stats
await page.evaluate(() => window.scrollTo(0, 1000));
await page.waitForTimeout(2500);
const r = await page.evaluate(() => {
  const ST = window.__ScrollTrigger;
  const all = ST ? ST.getAll() : [];
  const counterSpans = [...document.querySelectorAll("span")].filter(s => /^\d+[M×+]/.test(s.textContent||""));
  return {
    stCount: all.length,
    revealsPending: window.__reveals ? window.__reveals.size : "n/a",
    counterTexts: counterSpans.map(s=>s.textContent),
    // find triggers whose trigger element is a counter span
    counterTriggers: all.filter(t => t.trigger && t.trigger.tagName === "SPAN" && /^\d|^0/.test(t.trigger.textContent||"")).map(t => ({
      txt: t.trigger.textContent, start: Math.round(t.start), end: Math.round(t.end),
      progress: t.progress, isActive: t.isActive,
      animProgress: t.animation ? t.animation.progress() : null,
      animPaused: t.animation ? t.animation.paused() : null,
    })),
  };
});
console.log(JSON.stringify(r, null, 1));
await b.close();
