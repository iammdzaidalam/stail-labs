import { INDUSTRIES } from "@/lib/data";
import { Accent } from "@/components/ui/Accent";
import { Section, SectionLabel } from "@/components/ui/Section";
import { FadeIn, TextReveal } from "@/components/ui/Reveal";
import { HEADLINE, LEAD, META, TITLE } from "@/components/ui/type";

/**
 * Industries — 12 indexed tiles on an exact-fill 2 / 3 / 4 grid.
 *
 * v2 broke the rhythm with two always-dark tiles. Per the spec's dark-panel
 * budget (three for the whole page, none of them here) every tile is now the
 * same light card, and the only differentiation left is the accent index —
 * a small mark rather than a black rectangle. The tile is also tightened:
 * `px-5 py-6` wrapped a one-word noun in more padding than content.
 */
export function Industries() {
  return (
    <Section id="industries" className="py-24 sm:py-28 lg:py-32">
      <SectionLabel>{INDUSTRIES.label}</SectionLabel>
      <TextReveal className={`${HEADLINE} mt-4`}>
        Built for <Accent>critical sectors</Accent>
      </TextReveal>
      <FadeIn>
        <p className={`${LEAD} mt-5 max-w-xl`}>{INDUSTRIES.sub}</p>
      </FadeIn>

      <FadeIn
        stagger={0.05}
        className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:grid-cols-3 lg:grid-cols-4"
      >
        {INDUSTRIES.items.map((name, i) => (
          <div key={name}>
            <div
              className="group h-full rounded-tile border border-line bg-card px-4 py-4 transition duration-300 hover:-translate-y-0.5 hover:border-line-strong sm:px-5"
            >
              <p aria-hidden className={`${META} text-accent`}>
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className={`${TITLE} mt-2 transition-colors group-hover:text-accent`}>
                {name}
              </p>
            </div>
          </div>
        ))}
      </FadeIn>
    </Section>
  );
}
