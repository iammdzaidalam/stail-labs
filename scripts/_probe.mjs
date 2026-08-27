import { chromium } from "playwright";

const BASE = "http://localhost:3100/";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(BASE, { waitUntil: "networkidle" });
await page.waitForTimeout(2500);

const probe = async (label) => {
  const info = await page.evaluate(() => {
    const ST = window.ScrollTrigger || (window.gsap && window.gsap.ScrollTrigger);
    const out = {
      scrollY: Math.round(window.scrollY),
      docH: document.body.scrollHeight,
      hasST: !!ST,
      stCount: ST ? ST.getAll().length : -1,
      hiddenWrappers: 0,
      sample: [],
    };
    // find wrappers actually stuck hidden
    document.querySelectorAll("main div, main section").forEach((el) => {
      const cs = getComputedStyle(el);
      if (cs.visibility === "hidden" && parseFloat(cs.opacity) === 0) {
        out.hiddenWrappers++;
        if (out.sample.length < 5) {
          const r = el.getBoundingClientRect();
          out.sample.push({
            cls: String(el.className).slice(0, 45),
            top: Math.round(r.top + window.scrollY),
            h: Math.round(r.height),
            text: (el.textContent || "").trim().slice(0, 40),
          });
        }
      }
    });
    if (ST) {
      out.triggers = ST.getAll()
        .slice(0, 8)
        .map((t) => ({
          start: Math.round(t.start),
          end: Math.round(t.end),
          progress: +t.progress.toFixed(2),
          isActive: t.isActive,
          trig: t.trigger ? String(t.trigger.className).slice(0, 30) : null,
        }));
    }
    return out;
  });
  console.log(`\n--- ${label} ---`);
  console.log(JSON.stringify(info, null, 1).slice(0, 2200));
};

await probe("after load (top)");

// realistic wheel fling through Lenis
for (let i = 0; i < 12; i++) {
  await page.mouse.wheel(0, 900);
  await page.waitForTimeout(90);
}
await page.waitForTimeout(2000);
await probe("after fast wheel fling");

await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
await page.waitForTimeout(1500);
await probe("back to top");

await browser.close();
