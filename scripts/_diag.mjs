import { chromium } from "playwright";
const b = await chromium.launch();
const page = await b.newPage({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
await page.goto("http://localhost:3100/", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
const total = await page.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < total; y += 600) { await page.mouse.wheel(0, 600); await page.waitForTimeout(180); }
await page.waitForTimeout(2000);
const r = await page.evaluate(() => {
  const out = {};
  // counters
  out.counters = [...document.querySelectorAll("section span")].filter(s => /^\d|^0/.test(s.textContent||"") && s.className.includes("font-mono")).slice(0,8).map(s=>s.textContent);
  // find big empty gaps: list sections with their bounding boxes
  out.sections = [...document.querySelectorAll("main > section, footer")].map(s => {
    const r = s.getBoundingClientRect();
    return { id: s.id || s.tagName, top: Math.round(r.top + window.scrollY), h: Math.round(r.height) };
  });
  out.scrollY = window.scrollY;
  out.docH = document.body.scrollHeight;
  return out;
});
console.log(JSON.stringify(r, null, 1));
await b.close();
