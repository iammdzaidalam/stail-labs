"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

/**
 * Scroll-triggered count-up.
 *
 * Deliberately built on IntersectionObserver + rAF rather than ScrollTrigger.
 * A number is not a decoration: whatever happens — fast scroll, deep link,
 * back/forward restore, a mid-flight layout refresh — it must end up showing
 * its real value. A scrubbed//revertible timeline has reset paths that can
 * leave it reading "0", which is worse than no animation at all.
 *
 * The element renders its final value on the server, so no-JS and
 * reduced-motion visitors get the number immediately and the animation only
 * ever overwrites it downward for the duration of one run.
 */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  className = "",
  duration = 1.6,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const format = (n: number) =>
      `${prefix}${Math.round(n).toLocaleString("en-IN")}${suffix}`;
    const final = format(value);

    let frame = 0;
    let done = false;

    const run = () => {
      const start = performance.now();
      const ms = duration * 1000;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / ms);
        // easeOutCubic — matches the site's reveal curve.
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = t === 1 ? final : format(value * eased);
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || done) continue;
          done = true;
          io.disconnect();
          el.textContent = format(0);
          run();
          break;
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      // Whatever state the animation was in, leave the true value behind.
      el.textContent = final;
    };
  }, [value, prefix, suffix, duration]);

  return (
    <span ref={ref} className={`tabular ${className}`}>
      {prefix}
      {value.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}
