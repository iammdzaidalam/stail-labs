import type { ReactNode } from "react";

/**
 * Seamless horizontal marquee. Children are rendered twice; the track
 * translates -50% per loop. Pure CSS so it costs nothing on the main thread.
 */
export function Marquee({
  children,
  duration = 40,
  reverse = false,
  className = "",
  pauseOnHover = true,
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
  pauseOnHover?: boolean;
}) {
  return (
    <div
      className={`overflow-hidden ${pauseOnHover ? "marquee-paused" : ""} ${className}`}
      style={
        {
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        } as React.CSSProperties
      }
    >
      <div
        className="animate-marquee flex w-max"
        style={
          {
            "--marquee-duration": `${duration}s`,
            animationDirection: reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
