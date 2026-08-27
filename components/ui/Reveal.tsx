"use client";

import { useRef, type ReactNode, type ElementType } from "react";
import {
  gsap,
  SplitText,
  useGSAP,
  EASE,
  alreadyOnScreen,
  guardReveal,
  prefersReducedMotion,
} from "@/lib/gsap";

/**
 * Removes the line-mask clipping once a reveal has finished.
 *
 * A masked line reveal needs `overflow: hidden` to hide the text as it slides
 * up — but if that clip is left in place afterwards it permanently shears
 * anything that descends below the baseline. On this site that means every
 * Instrument Serif italic <Accent> phrase (the descenders in "products",
 * "every stage", "storytelling", "together") gets its tail cut off, which is
 * exactly the signature the design depends on. So the clip is temporary: it
 * exists only for the duration of the animation.
 */
function unclip(lines: Element[]) {
  for (const line of lines) {
    (line as HTMLElement).style.overflow = "visible";
    // `mask: "lines"` nests each line inside a wrapper that SplitText names
    // by suffixing the line class — so `line` yields `line-mask`.
    const wrapper = line.parentElement;
    if (wrapper?.classList.contains("line-mask")) {
      wrapper.style.overflow = "visible";
    }
  }
}

/**
 * Masked line-by-line text reveal on scroll (SplitText).
 * Use for headings. Falls back to a simple fade for reduced motion.
 */
export function TextReveal({
  children,
  as: Tag = "h2",
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) return;
      // Already visible on mount — render it as-is rather than hiding it.
      if (alreadyOnScreen(el)) return;

      const split = SplitText.create(el, {
        type: "lines",
        linesClass: "line",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) => {
          const tween = gsap.from(self.lines, {
            yPercent: 108,
            duration: 0.75,
            ease: EASE.out,
            stagger: 0.06,
            delay,
            scrollTrigger: {
              trigger: el,
              start: "top 95%",
              // NOT `once: true`. When a fast scroll carries the element past
              // the trigger inside a single update, `once` kills the trigger
              // together with its half-played `from` tween, stranding the text
              // at its hidden start frame. Playing once via toggleActions
              // leaves the tween alone so it always finishes.
              toggleActions: "play none play none",
            },
            onComplete: () => unclip(self.lines),
          });
          guardReveal(el, tween, () => unclip(self.lines));
          return tween;
        },
      });

      return () => split.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={`reveal-mask ${className}`}>
      {children}
    </Tag>
  );
}

/**
 * Fade-and-rise reveal for blocks/cards. Set `stagger` to animate direct
 * children in sequence instead of the wrapper.
 */
export function FadeIn({
  children,
  className = "",
  delay = 0,
  y = 18,
  stagger,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) return;
      // Already visible on mount — render it as-is rather than hiding it.
      if (alreadyOnScreen(el)) return;

      const targets = stagger != null ? Array.from(el.children) : el;
      const tween = gsap.from(targets, {
        y,
        autoAlpha: 0,
        duration: 0.6,
        ease: EASE.out,
        delay,
        stagger: stagger ?? 0,
        scrollTrigger: {
          trigger: el,
          start: "top 95%",
          // See TextReveal: `once: true` would kill this tween mid-play on a
          // fast scroll and leave the content invisible for good.
          toggleActions: "play none play none",
        },
      });
      guardReveal(el, tween);
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
