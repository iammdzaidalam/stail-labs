import type { ReactNode } from "react";

/**
 * Editorial serif-italic accent inside a grotesque headline — one phrase per
 * heading, never more.
 *
 * Two optical corrections are baked in: Instrument Serif has a smaller
 * apparent size than Geist at the same point size, so it gets a slight bump;
 * and headings carry tight negative tracking that would collide the italic's
 * sloped letterforms, so tracking is relaxed back toward zero here.
 */
export function Accent({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <em
      className={`font-serif font-normal italic [font-size:1.08em] [letter-spacing:-0.005em] ${className}`}
    >
      {children}
    </em>
  );
}
