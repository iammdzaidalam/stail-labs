import { Section, SectionLabel } from "@/components/ui/Section";
import { TextReveal, FadeIn } from "@/components/ui/Reveal";
import { Accent } from "@/components/ui/Accent";
import { STUDIO } from "@/lib/data";
import {
  BODY_SM,
  HEADLINE,
  LEAD,
  META,
  NUMERAL,
  TITLE,
} from "@/components/ui/type";

/*
 * STAIL Studio — editorial split.
 *
 * Left: three stacked heading lines closing on the serif-italic accent.
 * Right: the actual output catalogue — the six formats the studio ships,
 * numbered, with the delivery spec underneath.
 *
 * The right column used to be a skeuomorphic macOS terminal (traffic-light
 * dots, blinking cursor, emoji result line, a hardcoded box-drawing rule that
 * wrapped mid-flag at 1024–1280px). It said nothing a reader could use and
 * broke spec rules 3 and 5, so it is gone. A plain light card on the light
 * page carries the same information and survives a narrow viewport.
 */

/** The delivery spec pairs — Format / Render / Languages. */
const SPECS = STUDIO.terminal.meta;

export function Studio() {
  return (
    <Section id="studio" className="py-24 sm:py-28 lg:py-32">
      {/* items-start, not items-center: centring inside a tall grid row left
          ~50px of dead space above AND below the shorter column. */}
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
        <div>
          <SectionLabel>{STUDIO.label}</SectionLabel>
          {/* Sentence case per spec; STUDIO.heading in data is still title case. */}
          <TextReveal className={`${HEADLINE} mt-4`}>
            <span className="block">AI content.</span>
            <span className="block">AI media.</span>
            <span className="block">
              <Accent>AI storytelling.</Accent>
            </span>
          </TextReveal>
          <p className={`${LEAD} mt-5 max-w-xl`}>{STUDIO.body}</p>
        </div>

        {/* One reveal for the whole column — four independent triggers in a
            single band meant the panel could fade in half-populated. */}
        <FadeIn>
          <div className="rounded-card border border-line bg-card p-6 sm:p-8">
            <p className={`${META} text-muted`}>Output formats</p>

            <ul className="mt-5 border-t border-line">
              {STUDIO.tags.map((tag, i) => (
                <li
                  key={tag}
                  className="flex items-baseline gap-4 border-b border-line py-3.5"
                >
                  <span className={`${NUMERAL} text-[0.8125rem] text-muted`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={TITLE}>{tag}</span>
                </li>
              ))}
            </ul>

            <dl className="mt-7 grid gap-x-8 gap-y-4 sm:grid-cols-3">
              {SPECS.map(([term, value]) => (
                <div key={term}>
                  <dt className={`${META} text-muted`}>{term}</dt>
                  <dd className={`${BODY_SM} mt-1.5 text-ink-2`}>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
