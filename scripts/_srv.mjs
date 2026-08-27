import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage();
const srcs = [];
p.on("response", async (r) => {
  const u = r.url();
  if (u.includes("_next/static/chunks") && u.endsWith(".js")) srcs.push(u);
});
await p.goto("http://localhost:3100/", { waitUntil: "networkidle" });
await p.waitForTimeout(1500);
let found = { toggle: false, once: false, nativeScroll: false };
for (const u of srcs) {
  const t = await (await fetch(u)).text();
  if (t.includes("play none play none")) found.toggle = true;
  if (t.includes("once:!0") || t.includes("once: true")) found.once = true;
  if (t.includes("onNativeScroll") || t.includes("Lenis only emits")) found.nativeScroll = true;
}
console.log("chunks scanned:", srcs.length, JSON.stringify(found));
await b.close();
