import type { ReactNode } from "react";

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
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
          {children}
        </div>
      )}
    </section>
  );
}

/** Uppercase mono kicker, e.g. "· ABOUT STAIL". */
export function SectionLabel({
  children,
  className = "",
  onDark = false,
}: {
  children: ReactNode;
  className?: string;
  /**
   * Set on always-dark panels. The accent token flips to a deep teal in the
   * light theme, which fails contrast on a near-black ground, so those
   * surfaces pin the bright cyan instead.
   */
  onDark?: boolean;
}) {
  const tone = onDark ? "text-[#00E5FF]" : "text-accent";
  const dot = onDark ? "bg-[#00E5FF]" : "bg-accent";
  return (
    <p
      className={`font-mono text-[11px] font-bold uppercase tracking-[0.22em] sm:text-xs ${tone} ${className}`}
    >
      <span
        aria-hidden
        className={`mr-2 inline-block h-1.5 w-1.5 rounded-full align-middle ${dot}`}
      />
      {children}
    </p>
  );
}
