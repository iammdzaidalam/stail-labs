import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:3100/", { waitUntil: "networkidle" });
await p.waitForTimeout(1500);
await p.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
await p.waitForTimeout(2500);
const r = await p.evaluate(() => {
  const grid = document.querySelector("#products .grid:last-of-type") ||
               [...document.querySelectorAll("#products div")].reverse().find(d=>d.className.includes("grid"));
  const kids = grid ? [...grid.children] : [];
  return {
    gridCls: grid ? String(grid.className).slice(0,60) : null,
    gridInline: grid ? grid.getAttribute("style") : null,
    childCount: kids.length,
    kids: kids.map(k => ({
      txt: (k.textContent||"").trim().slice(0,18),
      vis: getComputedStyle(k).visibility,
      inline: k.getAttribute("style"),
    })),
  };
});
console.log(JSON.stringify(r, null, 1));
await b.close();
