import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:3100/", { waitUntil: "networkidle" });
await p.waitForTimeout(1500);
await p.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
await p.waitForTimeout(2500);
const r = await p.evaluate(() => {
  const hidden = [...document.querySelectorAll("#products article")]
    .find(e => getComputedStyle(e).visibility === "hidden");
  if (!hidden) return { none: true };
  const parent = hidden.parentElement;
  const sibs = [...parent.children];
  return {
    hiddenInline: hidden.getAttribute("style"),
    hiddenTxt: (hidden.textContent||"").trim().slice(0,25),
    parentCls: String(parent.className).slice(0,70),
    parentInline: parent.getAttribute("style"),
    parentTweens: window.__gsap.getTweensOf(parent).length,
    sibCount: sibs.length,
    sibStates: sibs.map(s => ({
      t: (s.textContent||"").trim().slice(0,14),
      v: getComputedStyle(s).visibility,
      hasInline: !!s.getAttribute("style"),
    })),
  };
});
console.log(JSON.stringify(r, null, 1));
await b.close();
