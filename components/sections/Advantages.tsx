import { ADVANTAGES } from "@/lib/data";
import { Accent } from "@/components/ui/Accent";
import { Section, SectionLabel } from "@/components/ui/Section";
import { FadeIn, TextReveal } from "@/components/ui/Reveal";

/**
 * Advantages — why-STAIL card grid. Each card: a two-digit mono index above
 * a thin rule, then the advantage name and body. The final card ("Made in
 * India, for India") is this grid's ONE always-dark moment (WeHexa-style).
 */
export function Advantages() {
  return (
    <Section id="advantages" className="py-24 sm:py-32">
      <SectionLabel>{ADVANTAGES.label}</SectionLabel>
      <TextReveal className="mt-4 text-4xl font-medium tracking-tight text-ink sm:text-5xl lg:text-6xl">
        What makes STAIL <Accent>different</Accent>
      </TextReveal>
      <FadeIn>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {ADVANTAGES.sub}
        </p>
      </FadeIn>

      <FadeIn
        stagger={0.06}
        className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        {ADVANTAGES.items.map((item, i) => {
          /* Explicit hex exception: the last card is ALWAYS dark in both
             themes (#0b0d12 surface, #00E5FF accent, white text). */
          const dark = i === ADVANTAGES.items.length - 1;
          return (
            <div key={item.name}>
              <div
                className={`h-full rounded-card p-7 transition duration-300 hover:-translate-y-0.5 sm:p-8 ${
                  dark
                    ? "bg-[#0b0d12] text-white"
                    : "border border-line bg-card hover:border-line-strong"
                }`}
              >
                <span
                  aria-hidden
                  className={`font-mono text-sm ${dark ? "text-[#00E5FF]" : "text-accent"}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div
                  className={`mt-4 border-t pt-5 ${dark ? "border-white/15" : "border-line"}`}
                >
                  <h3
                    className={`text-lg font-medium sm:text-xl ${dark ? "text-white" : "text-ink"}`}
                  >
                    {item.name}
                  </h3>
                  <p
                    className={`mt-3 text-sm leading-relaxed ${dark ? "text-white/60" : "text-muted"}`}
                  >
                    {item.body}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </FadeIn>
    </Section>
  );
}
