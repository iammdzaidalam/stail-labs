import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3100/", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
for (let i = 0; i < 14; i++) { await page.mouse.wheel(0, 900); await page.waitForTimeout(90); }
await page.waitForTimeout(2500);
const r = await page.evaluate(() => {
  const gsap = window.__gsap;
  const tile = [...document.querySelectorAll("main div")].find(
    (el) => (el.textContent||"").trim().startsWith("01Mining") &&
            getComputedStyle(el).visibility === "hidden");
  if (!tile) return { found: false };
  const tweens = gsap.getTweensOf(tile);
  const parent = tile.parentElement;
  const parentTweens = gsap.getTweensOf(parent);
  return {
    found: true,
    tileVis: getComputedStyle(tile).visibility,
    tileOp: getComputedStyle(tile).opacity,
    parentCls: String(parent.className).slice(0,50),
    parentVis: getComputedStyle(parent).visibility,
    tweenCount: tweens.length,
    tweens: tweens.map(t => ({ prog:+t.progress().toFixed(2), paused:t.paused(),
                               active:t.isActive(), dur:t.duration(),
                               hasST: !!t.scrollTrigger })),
    parentTweenCount: parentTweens.length,
    parentTweens: parentTweens.map(t => ({ prog:+t.progress().toFixed(2),
                               paused:t.paused(), active:t.isActive(),
                               hasST: !!t.scrollTrigger,
                               stStart: t.scrollTrigger ? Math.round(t.scrollTrigger.start) : null })),
  };
});
console.log(JSON.stringify(r, null, 1));
await browser.close();
