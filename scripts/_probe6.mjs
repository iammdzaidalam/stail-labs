import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:3100/#services", { waitUntil: "networkidle" });
await p.waitForTimeout(3000);
const r = await p.evaluate(() => {
  const gsap = window.__gsap;
  const y = window.scrollY;
  const out = [];
  document.querySelectorAll("#products *").forEach((el) => {
    const cs = getComputedStyle(el);
    if (cs.visibility !== "hidden") return;
    const rect = el.getBoundingClientRect();
    if (rect.top >= innerHeight * 0.88) return;
    // report only the OUTERMOST hidden node
    if (el.parentElement && getComputedStyle(el.parentElement).visibility === "hidden") return;
    out.push({
      tag: el.tagName.toLowerCase(),
      cls: String(el.className).slice(0, 60),
      op: cs.opacity,
      top: Math.round(rect.top + y),
      tweens: gsap.getTweensOf(el).length,
      parentTweens: el.parentElement ? gsap.getTweensOf(el.parentElement).length : 0,
      text: (el.textContent||"").trim().slice(0,35),
    });
  });
  return { y, count: out.length, items: out.slice(0, 8) };
});
console.log(JSON.stringify(r, null, 1));
await b.close();
