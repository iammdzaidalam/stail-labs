import { Section, SectionLabel } from "@/components/ui/Section";
import { TextReveal, FadeIn } from "@/components/ui/Reveal";
import { Terminal } from "@/components/ui/Terminal";
import { Accent } from "@/components/ui/Accent";
import { CASE_STUDY } from "@/lib/data";

/*
 * Case study — this area's ONE dark panel moment: a hero-grade always-dark
 * rounded card (TMI sovereign deployment) with a gold category label, cyan
 * proof stats, and the deploy terminal embedded on the right.
 */
export function CaseStudy() {
  return (
    <Section id="case-study" className="bg-elev py-24 sm:py-32 lg:py-40">
      <SectionLabel>{CASE_STUDY.label}</SectionLabel>
      {/* v2 heading per DESIGN-SPEC */}
      <TextReveal className="mt-4 text-4xl font-medium tracking-tight text-ink sm:text-5xl lg:text-6xl">
        AI in <Accent>action</Accent>
      </TextReveal>

      <FadeIn className="mt-14">
        {/* Always-dark panel — explicit hex so it stays identical in both themes */}
        <article className="rounded-[1.5rem] border border-white/10 bg-[#0b0d12] p-8 text-white shadow-2xl shadow-black/25 sm:rounded-[2rem] sm:p-12">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center">
            <div>
              {/* gold hex — the gold token flips too dark for this always-dark surface */}
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#F5C842]">
                {CASE_STUDY.category}
              </p>
              <h3 className="mt-3 text-2xl font-medium tracking-tight text-white sm:text-4xl">
                {CASE_STUDY.title}
              </h3>
              <p className="mt-5 leading-relaxed text-white/60">{CASE_STUDY.body}</p>

              <FadeIn stagger={0.08} className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6">
                {CASE_STUDY.stats.map((stat) => (
                  <div key={stat.label}>
                    {/* vivid cyan hex — small accent inside the always-dark panel */}
                    <p className="font-mono text-3xl text-[#00E5FF] sm:text-4xl">
                      {stat.value}
                    </p>
                    <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </FadeIn>
            </div>

            {/* Terminal is already dark — a white/10 border separates it from the panel */}
            <Terminal data={CASE_STUDY.terminal} borderClassName="border-white/10" />
          </div>
        </article>
      </FadeIn>
    </Section>
  );
}
