import { Section, SectionLabel } from "@/components/ui/Section";
import { TextReveal, FadeIn } from "@/components/ui/Reveal";
import { Terminal } from "@/components/ui/Terminal";
import { Accent } from "@/components/ui/Accent";
import { STUDIO } from "@/lib/data";

/*
 * STAIL Studio — editorial split: three stacked heading lines closing on
 * a serif-italic accent, chips row, and a typing terminal on the right
 * with a slight rotation flourish that settles flat on hover.
 */
export function Studio() {
  return (
    <Section id="studio" className="py-24 sm:py-32 lg:py-40">
      <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionLabel>{STUDIO.label}</SectionLabel>
          {/* v2 heading — sentence case per DESIGN-SPEC, Accent on the last line */}
          <TextReveal className="mt-4 text-4xl font-medium tracking-tight text-ink sm:text-5xl lg:text-6xl">
            <span className="block">AI content.</span>
            <span className="block">AI media.</span>
            <span className="block">
              <Accent>AI storytelling.</Accent>
            </span>
          </TextReveal>
          <FadeIn delay={0.15}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {STUDIO.body}
            </p>
          </FadeIn>
          <FadeIn stagger={0.06} className="mt-8 flex flex-wrap gap-2.5">
            {STUDIO.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-line bg-accent-soft px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-accent"
              >
                {tag}
              </span>
            ))}
          </FadeIn>
        </div>

        <FadeIn delay={0.1}>
          <div className="transition-transform duration-500 hover:rotate-0 lg:rotate-1">
            <Terminal data={STUDIO.terminal} />
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
