import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:3100/", { waitUntil: "networkidle" });
await p.waitForTimeout(1500);
await p.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
await p.waitForTimeout(2500);

const before = await p.evaluate(() => {
  const set = window.__reveals;
  const hidden = [...document.querySelectorAll("#products article")]
     .filter(e => getComputedStyle(e).visibility === "hidden").length;
  const entries = set ? [...set].map(e => ({
     prog: +e.anim.progress().toFixed(2), active: e.anim.isActive(),
     top: Math.round(e.el.getBoundingClientRect().top),
     txt: (e.el.textContent||"").trim().slice(0,22),
  })) : null;
  return { hasSet: !!set, size: set ? set.size : -1, hiddenProductCards: hidden, entries: entries?.slice(0,6) };
});
console.log("BEFORE manual sweep:", JSON.stringify(before, null, 1));

const after = await p.evaluate(() => {
  window.__sweep && window.__sweep();
  return [...document.querySelectorAll("#products article")]
     .filter(e => getComputedStyle(e).visibility === "hidden").length;
});
console.log("hidden product cards after manual sweep:", after);
await b.close();
