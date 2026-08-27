/*
 * ============================================================
 * The type scale — one source of truth
 * ============================================================
 * Every heading and every paragraph on the site composes from these
 * constants. Sections must not hand-roll their own size/weight/tracking
 * combinations: that is exactly how a page drifts into looking like six
 * different sites stitched together.
 *
 * Two rules are load-bearing:
 *
 * 1. WEIGHT STAYS LOW. Display type is 400 and card titles are 500. Size
 *    and tracking carry the emphasis. Nothing on this site is bold.
 *
 * 2. TRACKING RIDES AN OPTICAL CURVE. It tightens as type grows
 *    (-0.035em at display, -0.01em at body) and INVERTS to positive for
 *    uppercase micro-labels (+0.08em to +0.16em), which need air to stay
 *    legible at 10-12px. The `tracking-*` tokens are defined in globals.css.
 */

/** Hero h1. The only type on the site allowed above 3.25rem. */
export const DISPLAY =
  "text-[2.6rem] font-normal leading-[1.03] tracking-display sm:text-6xl lg:text-7xl";

/** Section h2. Sentence case, exactly one <Accent> phrase. */
export const HEADLINE =
  "text-[2.05rem] font-normal leading-[1.06] tracking-headline text-ink sm:text-[2.6rem] lg:text-[3.15rem]";

/** Smaller section h2, for bands that sit inside a card or dark panel. */
export const HEADLINE_SM =
  "text-[1.75rem] font-normal leading-[1.1] tracking-headline sm:text-[2.1rem] lg:text-[2.4rem]";

/** Card / row h3. */
export const TITLE =
  "text-lg font-medium leading-snug tracking-title text-ink sm:text-xl";

/** Larger card h3, for feature and flagship cards. */
export const TITLE_LG =
  "text-[1.5rem] font-normal leading-[1.15] tracking-title sm:text-[1.875rem]";

/** Sub-copy directly under a section heading. */
export const LEAD =
  "text-[1.0625rem] leading-[1.55] tracking-lead text-muted sm:text-lg";

/** Body copy inside cards and rows. */
export const BODY =
  "text-[0.9375rem] leading-[1.6] tracking-body text-muted sm:text-base";

/** Small body, for dense card footers and captions. */
export const BODY_SM = "text-[0.875rem] leading-[1.55] tracking-body";

/** Uppercase mono kicker above a section heading. */
export const LABEL =
  "font-mono text-[11px] font-medium uppercase tracking-label";

/** Uppercase mono micro-type: card eyebrows, meta rows, tag lists. */
export const META = "font-mono text-[10px] uppercase tracking-micro";

/** Numerals — stats, counters, indices. Always tabular so they don't jitter. */
export const NUMERAL =
  "tabular font-normal tracking-headline [font-variant-numeric:tabular-nums]";
