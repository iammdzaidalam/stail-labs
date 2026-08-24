import type { ReactNode } from "react";

/**
 * Editorial serif-italic accent inside a grotesk headline
 * (the "farce / Supaste" treatment). Instrument Serif runs visually
 * smaller than Space Grotesk, so it gets a slight size bump.
 */
export function Accent({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <em className={`font-serif italic font-normal [font-size:1.06em] ${className}`}>
      {children}
    </em>
  );
}
