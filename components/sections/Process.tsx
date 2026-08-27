import { PROCESS } from "@/lib/data";
import { Accent } from "@/components/ui/Accent";
import { Section, SectionLabel } from "@/components/ui/Section";
import { FadeIn, TextReveal } from "@/components/ui/Reveal";
import { BODY, HEADLINE, LEAD, NUMERAL, TITLE } from "@/components/ui/type";

/*
 * Process — a sticky editorial heading beside a numbered step list.
 *
 * v2 pinned this section and scrubbed the five cards horizontally. That is
 * gone, for three reasons: a pin reserves a screen-height block of empty
 * scroll (it read as ~1400px of blank page in a static capture), a scrubbed
 * horizontal track hides content behind a gesture nobody asks for, and none
 * of the four design references use one. A left rule with hanging indices is
 * the same information in a form that can simply be read.
 *
 * Server component — there is nothing here that needs to run on the client.
 */
export function Process() {
  return (
    <Section id="process" className="bg-elev py-24 sm:py-28 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        {/* The heading holds its position while the steps scroll past it. */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionLabel>{PROCESS.label}</SectionLabel>
          <TextReveal className={`${HEADLINE} mt-5`}>
            Our delivery <Accent>process</Accent>
          </TextReveal>
          <FadeIn delay={0.1}>
            <p className={`${LEAD} mt-5 max-w-md`}>{PROCESS.sub}</p>
          </FadeIn>
        </div>

        <FadeIn stagger={0.06} className="lg:pt-2">
          {PROCESS.steps.map((step) => (
            <div
              key={step.num}
              className="grid grid-cols-[auto_1fr] gap-x-5 border-t border-line py-7 first:border-t-0 first:pt-0 sm:gap-x-8 sm:py-8"
            >
              {/*
                `pt-[0.3rem]` is optical, not arithmetic: the 13px index and
                the 20px title sit on different baselines, and matching their
                box tops leaves the number visibly high.
              */}
              <span
                className={`${NUMERAL} pt-[0.3rem] font-mono text-[13px] text-muted`}
              >
                {step.num}
              </span>
              <div>
                <h3 className={TITLE}>{step.name}</h3>
                <p className={`${BODY} mt-2.5 max-w-md`}>{step.body}</p>
              </div>
            </div>
          ))}
        </FadeIn>
      </div>
    </Section>
  );
}
