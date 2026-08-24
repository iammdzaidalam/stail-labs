"use client";

import { useRef, type ReactNode, type ElementType } from "react";
import { gsap, SplitText, useGSAP, EASE, prefersReducedMotion } from "@/lib/gsap";

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

      const split = SplitText.create(el, {
        type: "lines",
        linesClass: "line",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 110,
            duration: 0.9,
            ease: EASE.expo,
            stagger: 0.09,
            delay,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          }),
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
  y = 28,
  stagger,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  stagger?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) return;

      const targets = stagger != null ? Array.from(el.children) : el;
      gsap.from(targets, {
        y,
        autoAlpha: 0,
        duration: 0.9,
        ease: EASE.out,
        delay,
        stagger: stagger ?? 0,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once,
        },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
