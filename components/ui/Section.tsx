import type { ReactNode } from "react";
import { LABEL } from "./type";

/** Standard page section: consistent horizontal padding + max width. */
export function Section({
  id,
  className = "",
  children,
  bleed = false,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  /** When true, children span the full viewport width (marquees etc.). */
  bleed?: boolean;
}) {
  return (
    <section id={id} className={`relative ${className}`}>
      {bleed ? (
        children
      ) : (
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10">
          {children}
        </div>
      )}
    </section>
  );
}

/**
 * Uppercase mono kicker, e.g. "· ABOUT STAIL".
 *
 * The label itself is muted, not accent-coloured — only the 4px dot carries
 * the hue. A full line of coloured uppercase reads as decoration; a quiet
 * label with one coloured mark reads as a considered index.
 */
export function SectionLabel({
  children,
  className = "",
  onDark = false,
}: {
  children: ReactNode;
  className?: string;
  /**
   * Set on always-dark panels, where the muted token would sink into the
   * near-black ground.
   */
  onDark?: boolean;
}) {
  const tone = onDark ? "text-white/45" : "text-muted";
  const dot = onDark ? "bg-white/45" : "bg-accent-raw";
  return (
    <p className={`${LABEL} ${tone} ${className}`}>
      <span
        aria-hidden
        className={`mr-2.5 inline-block h-1 w-1 rounded-full align-middle ${dot}`}
      />
      {children}
    </p>
  );
}
