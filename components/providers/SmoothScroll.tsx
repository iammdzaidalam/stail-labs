"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/**
 * Lenis smooth scrolling wired into GSAP's ticker so ScrollTrigger and
 * Lenis share one clock. Disabled entirely for reduced-motion users.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  /*
   * Re-measure every ScrollTrigger once webfonts and images have settled.
   * Reveal animations are `gsap.from({autoAlpha: 0})`, so their targets sit at
   * visibility:hidden until the trigger fires. Fonts swapping in (and the sky
   * panels decoding) reflow the page after ScrollTrigger took its start
   * positions, which leaves triggers pointing at stale offsets — those that
   * never fire strand whole sections invisible. Refreshing rebinds them to the
   * real layout. This runs regardless of motion preference so it is in place
   * before any trigger is created.
   */
  useEffect(() => {
    let cancelled = false;
    const refresh = () => {
      if (!cancelled) ScrollTrigger.refresh();
    };

    if (document.readyState === "complete") refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh).catch(() => {});

    /*
     * Lenis only emits its own scroll event for scrolling it drives. Anything
     * that moves the window directly — a deep link landing on #section, the
     * browser restoring position on back/forward, or a script calling
     * scrollTo — leaves ScrollTrigger unaware, so reveals below never fire.
     * Listening to the native event as well keeps it in sync in those cases.
     */
    const onNativeScroll = () => ScrollTrigger.update();
    window.addEventListener("scroll", onNativeScroll, { passive: true });

    // Backstop: if an image decodes late (or a trigger was created after the
    // events above), one more pass shortly after settles the layout.
    const t = window.setTimeout(refresh, 1200);

    return () => {
      cancelled = true;
      window.clearTimeout(t);
      window.removeEventListener("load", refresh);
      window.removeEventListener("scroll", onNativeScroll);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      lerp: 0.115,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      anchors: { offset: -88 },
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
