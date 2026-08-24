import { Section, SectionLabel } from "@/components/ui/Section";
import { TextReveal, FadeIn } from "@/components/ui/Reveal";
import { Accent } from "@/components/ui/Accent";
import { CAREERS } from "@/lib/data";

/*
 * Careers — editorial role list in the Services row style: mono index,
 * full-row anchors to the contact section, card-white hover lift, and a
 * sliding cyan arrow reveal.
 */
export function Careers() {
  return (
    <Section id="careers" className="py-24 sm:py-32 lg:py-40">
      <SectionLabel>{CAREERS.label}</SectionLabel>
      {/* v2 heading per DESIGN-SPEC */}
      <TextReveal className="mt-4 text-4xl font-medium tracking-tight text-ink sm:text-5xl lg:text-6xl">
        Build India&apos;s AI <Accent>future</Accent>
      </TextReveal>
      <FadeIn delay={0.15}>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {CAREERS.sub}
        </p>
      </FadeIn>

      <FadeIn stagger={0.05} className="mt-12 sm:mt-16">
        {CAREERS.roles.map((role, i) => (
          <a
            key={role.name}
            href="#contact"
            aria-label={`Apply for ${role.name}`}
            className="group -mx-2 flex items-center justify-between gap-4 rounded-lg border-t border-line px-2 py-6 transition-colors last:border-b hover:bg-card sm:-mx-4 sm:px-4 sm:py-7"
          >
            <span className="flex items-baseline gap-5 sm:gap-7">
              <span aria-hidden className="font-mono text-sm text-accent">
                0{i + 1}
              </span>
              <span className="text-xl font-medium text-ink sm:text-2xl">
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  {role.name}
                </span>
              </span>
            </span>
            <span className="flex shrink-0 items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                {role.meta}
              </span>
              <span
                aria-hidden
                className="-translate-x-2 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
              >
                →
              </span>
            </span>
          </a>
        ))}
      </FadeIn>
    </Section>
  );
}
