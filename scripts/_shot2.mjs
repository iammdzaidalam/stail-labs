import { chromium } from "playwright";
import { mkdirSync } from "fs";
const OUT = process.argv[2]; const H = Number(process.argv[3] ?? 1400);
mkdirSync(OUT, { recursive: true });
const b = await chromium.launch();
const page = await b.newPage({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const errors = [];
page.on("console", m => m.type()==="error" && errors.push(m.text()));
page.on("pageerror", e => errors.push(String(e)));
await page.goto("http://localhost:3100/", { waitUntil: "networkidle" });
await page.waitForTimeout(2200);
const total = await page.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < total; y += 500) { await page.mouse.wheel(0, 500); await page.waitForTimeout(150); }
await page.waitForTimeout(1500);
await page.evaluate(() => window.scrollTo({top:0, behavior:"instant"}));
await page.waitForTimeout(900);
const h = await page.evaluate(() => document.body.scrollHeight);
let i = 0;
for (let y = 0; y < h; y += H) {
  await page.screenshot({ path: `${OUT}/s-${String(i).padStart(2,"0")}.png`, clip: { x:0, y, width:1440, height: Math.min(H, h-y) }, fullPage: true });
  i++;
}
console.log("height", h, "slices", i, "errors", errors.length ? errors.slice(0,6) : "none");
await b.close();
