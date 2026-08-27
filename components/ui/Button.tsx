import Link from "next/link";
import type { ReactNode } from "react";

/*
 * The one button on this site.
 *
 * Every CTA composes from here — previously each section hand-rolled its own
 * pill, which is why no two agreed on height, radius or tracking.
 *
 * Deliberate choices:
 *  - Sentence case sans, weight 500. Uppercase mono bold reads as "tech
 *    startup template"; the references all set their CTAs in plain sentence
 *    case and let the shape do the work.
 *  - No magnetic cursor-follow. It is an agency party trick that fights the
 *    calm of the rest of the page, and it does nothing on touch.
 *  - Motion is a 3px arrow nudge, or a 45° rotation on the chip variant.
 *    Nothing scales, nothing bounces.
 */

type Variant = keyof typeof VARIANTS;

const VARIANTS = {
  /** Near-black pill — the default primary action on light ground. */
  primary:
    "bg-ink text-bg hover:bg-accent-raw hover:text-white shadow-[0_1px_2px_rgba(10,12,16,0.16)]",
  /** Vivid azure pill — one per screen, maximum. */
  accent: "bg-accent-raw text-white hover:bg-ink hover:text-bg",
  /** Hairline outline — secondary action on light ground. */
  ghost:
    "border border-line-strong text-ink hover:border-ink hover:bg-ink hover:text-bg",
  /** White pill for use on the azure hero / contact panels. */
  onPanel:
    "bg-white text-[#0a0c10] hover:bg-[#0a0c10] hover:text-white shadow-[0_8px_24px_-12px_rgba(6,24,68,0.6)]",
  /** Glass pill for the secondary action on those same panels. */
  glass:
    "border border-white/45 bg-white/12 text-white backdrop-blur-md hover:bg-white hover:text-[#0a0c10]",
  /** White pill on the always-dark footer / final-CTA panels. */
  onDark: "bg-white text-[#0a0c10] hover:bg-accent-raw hover:text-white",
  /** Outline pill on those same dark panels. */
  onDarkGhost: "border border-white/25 text-white hover:bg-white/10",
} as const;

const BASE =
  "group inline-flex select-none items-center justify-center rounded-full text-[0.9375rem] font-medium tracking-body transition-colors duration-200";

/** Sizing is split out so the chip variant can trade right padding for the circle. */
const PAD = {
  plain: "h-12 gap-2 px-6",
  chip: "h-12 gap-3 py-0 pl-6 pr-1.5",
} as const;

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
  /** Trailing arrow style: a plain glyph that nudges, a circular chip, or none. */
  arrow = "none",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  arrow?: "none" | "nudge" | "chip";
}) {
  const chipTone =
    variant === "onPanel" || variant === "onDark"
      ? "bg-[#0a0c10] text-white group-hover:bg-white group-hover:text-[#0a0c10]"
      : "bg-white/15 text-current";

  const content = (
    <>
      {children}
      {arrow === "nudge" && (
        <span
          aria-hidden
          className="transition-transform duration-200 group-hover:translate-x-[3px]"
        >
          →
        </span>
      )}
      {arrow === "chip" && (
        <span
          aria-hidden
          className={`grid h-9 w-9 place-items-center rounded-full text-[13px] transition-[transform,background-color,color] duration-200 group-hover:rotate-45 ${chipTone}`}
        >
          ↗
        </span>
      )}
    </>
  );

  const cls = `${BASE} ${arrow === "chip" ? PAD.chip : PAD.plain} ${VARIANTS[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}
