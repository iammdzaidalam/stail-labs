import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  // Development-only handle so the visibility diagnostics can introspect
  // trigger state. Never exposed in production builds.
  if (process.env.NODE_ENV === "development") {
    (window as unknown as Record<string, unknown>).__gsap = gsap;
    (window as unknown as Record<string, unknown>).__ScrollTrigger = ScrollTrigger;
  }
}

export { gsap, ScrollTrigger, SplitText, useGSAP };

/** Shared easing + duration vocabulary so every section animates alike. */
/*
 * One easing curve for the whole site: easeOutCubic (GSAP calls it
 * "power2.out"). Reveals differ in duration and distance, never in character —
 * mixing back.out / elastic / expo across sections is what makes a page feel
 * assembled from parts rather than designed.
 */
export const EASE = {
  out: "power2.out",
  inOut: "power2.inOut",
  /** Reserved for scrubbed, non-reveal motion. */
  linear: "none",
} as const;

export const DUR = {
  fast: 0.45,
  base: 0.8,
  slow: 0.9,
} as const;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ------------------------------------------------------------------ *
 * Reveal safety net
 *
 * Reveal animations start from a hidden state, so content is invisible
 * until its ScrollTrigger plays. A trigger created while the page is
 * ALREADY scrolled past it — a deep link to #contact, a reload halfway
 * down, restored back/forward position — never fires, which strands that
 * section invisible for good.
 *
 * Every reveal registers here. The sweep force-completes any animation
 * whose element is well inside (or above) the viewport but still hasn't
 * started. It runs debounced and only past the halfway mark, so a normal
 * trigger always wins the race and the animation is never cut short.
 * ------------------------------------------------------------------ */

type PendingReveal = {
  el: Element;
  anim: gsap.core.Animation;
  /** Runs once the animation reaches its end state, however it got there. */
  onSettle?: () => void;
};

const pendingReveals = new Set<PendingReveal>();
let sweepBound = false;
let sweepTimer: number | undefined;

function sweepReveals() {
  if (!pendingReveals.size) return;
  const vh = window.innerHeight;
  for (const entry of pendingReveals) {
    // Gone from the document — stop tracking it.
    if (!entry.el.isConnected) {
      pendingReveals.delete(entry);
      continue;
    }
    // Finished: everything it animates is now in its final state.
    if (entry.anim.progress() === 1) {
      entry.onSettle?.();
      pendingReveals.delete(entry);
      continue;
    }
    // Currently running — let it finish on its own.
    if (entry.anim.isActive()) continue;

    // Stalled: either never started, or killed part-way through (which leaves
    // the tail of a staggered group stuck hidden). If the element is well
    // inside the viewport by now, jump it to its finished state.
    if (entry.el.getBoundingClientRect().top < vh * 0.5) {
      entry.anim.progress(1);
      entry.onSettle?.();
      pendingReveals.delete(entry);
    }
  }
}

function scheduleSweep() {
  window.clearTimeout(sweepTimer);
  sweepTimer = window.setTimeout(sweepReveals, 200);
}

/**
 * True when an element is already on screen (or scrolled past) at the moment
 * its reveal is being set up — a deep link, a reload halfway down the page, or
 * a restored back/forward position. Hiding such content to animate it in is
 * what strands it when the trigger never fires, so callers skip the animation
 * entirely and simply leave it visible.
 */
export function alreadyOnScreen(el: Element): boolean {
  if (typeof window === "undefined") return false;
  return el.getBoundingClientRect().top < window.innerHeight * 0.5;
}

/** Register a reveal animation so it can never strand its element hidden. */
export function guardReveal(
  el: Element,
  anim: gsap.core.Animation,
  onSettle?: () => void,
) {
  if (typeof window === "undefined") return;
  const entry: PendingReveal = { el, anim, onSettle };
  pendingReveals.add(entry);
  // Tracked until it actually COMPLETES. Dropping it at onStart would leave a
  // stagger that is killed mid-flight unguarded, stranding its tail hidden.
  anim.eventCallback("onComplete", () => pendingReveals.delete(entry));

  if (!sweepBound) {
    sweepBound = true;
    window.addEventListener("scroll", scheduleSweep, { passive: true });
    window.addEventListener("resize", scheduleSweep, { passive: true });
    ScrollTrigger.addEventListener("refresh", scheduleSweep);
    if (process.env.NODE_ENV === "development") {
      (window as unknown as Record<string, unknown>).__reveals = pendingReveals;
      (window as unknown as Record<string, unknown>).__sweep = sweepReveals;
    }
  }
  scheduleSweep();
}
