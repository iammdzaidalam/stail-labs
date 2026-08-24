import { INDUSTRIES } from "@/lib/data";
import { Accent } from "@/components/ui/Accent";
import { Section, SectionLabel } from "@/components/ui/Section";
import { FadeIn, TextReveal } from "@/components/ui/Reveal";

/** Tiles rendered always-dark for grid rhythm (display indices 03 and 10). */
const DARK_TILES = new Set([2, 9]);

/**
 * Industries grid — 12 indexed white tiles with a quiet lift on hover;
 * two non-adjacent always-dark tiles break the rhythm (WeHexa-style).
 */
export function Industries() {
  return (
    <Section id="industries" className="py-24 sm:py-32 lg:py-40">
      <SectionLabel>{INDUSTRIES.label}</SectionLabel>
      <TextReveal className="mt-4 text-4xl font-medium tracking-tight text-ink sm:text-5xl lg:text-6xl">
        Built for <Accent>critical sectors</Accent>
      </TextReveal>
      <FadeIn delay={0.15}>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {INDUSTRIES.sub}
        </p>
      </FadeIn>

      <FadeIn
        stagger={0.05}
        className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:grid-cols-3 lg:grid-cols-4"
      >
        {INDUSTRIES.items.map((name, i) => {
          const dark = DARK_TILES.has(i);
          return (
            <div
              key={name}
              className={
                dark
                  ? // Always-dark accent tile — explicit hex allowed per spec (dark panel exception).
                    "group rounded-tile border border-white/10 bg-[#0b0d12] px-5 py-6 text-white transition duration-300 hover:-translate-y-0.5 hover:border-white/25"
                  : "group rounded-tile border border-line bg-card px-5 py-6 transition duration-300 hover:-translate-y-0.5 hover:border-line-strong"
              }
            >
              <p
                aria-hidden
                className={`font-mono text-[10px] ${
                  dark ? "text-[#00E5FF]/70" : "text-muted/60"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </p>
              <p
                className={`mt-3 text-base font-medium sm:text-lg ${
                  dark
                    ? "text-white"
                    : "text-ink transition-colors group-hover:text-accent"
                }`}
              >
                {name}
              </p>
            </div>
          );
        })}
      </FadeIn>
    </Section>
  );
}
