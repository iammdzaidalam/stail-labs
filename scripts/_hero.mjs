import { chromium } from "playwright";
const b = await chromium.launch();
const page = await b.newPage({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
await page.goto("http://localhost:3100/", { waitUntil: "networkidle" });
await page.waitForTimeout(3000);
await page.screenshot({ path: process.argv[2], clip: { x:0, y:0, width:1440, height:1050 }, fullPage:true });
console.log("ok");
await b.close();
