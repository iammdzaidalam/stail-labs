"use client";

import Link from "next/link";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { gsap } from "@/lib/gsap";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
  external?: boolean;
};

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-mono text-[13px] font-bold uppercase tracking-[0.14em] transition-colors duration-300 select-none";

const variants = {
  primary: "bg-ink text-bg hover:bg-accent hover:text-[#05070d]",
  accent: "bg-accent text-bg hover:bg-ink hover:text-bg",
  // Always-vivid cyan pill (Aeline-style accent button); reads correctly on
  // the permanently dark hero panel in both themes.
  cyan: "bg-accent-raw text-[#04121a] hover:bg-white hover:text-[#05070d]",
  ghost:
    "border border-line-strong text-ink hover:border-accent hover:text-accent",
} as const;

/**
 * Pill button with a magnetic hover pull. External links get
 * rel="noopener noreferrer" automatically.
 */
export function MagneticButton({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
}: ButtonProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    gsap.to(el, { x: x * 0.22, y: y * 0.32, duration: 0.4, ease: "power3.out" });
  };

  const onLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.45)" });
  };

  const cls = `${base} ${variants[variant]} ${className}`;
  const inner = (
    <span ref={ref} className="pointer-events-none flex items-center gap-2">
      {children}
    </span>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} onMouseMove={onMove} onMouseLeave={onLeave}>
      {inner}
    </Link>
  );
}

/** Small arrow that nudges on hover of the parent `.group`. */
export function Arrow() {
  return (
    <span
      aria-hidden
      className="inline-block transition-transform duration-300 group-hover:translate-x-1"
    >
      →
    </span>
  );
}
