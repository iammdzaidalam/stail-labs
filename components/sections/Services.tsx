import { SERVICES } from "@/lib/data";
import { Accent } from "@/components/ui/Accent";
import { Section, SectionLabel } from "@/components/ui/Section";
import { FadeIn, TextReveal } from "@/components/ui/Reveal";

/**
 * Services — editorial numbered rows: mono index, service name, body on the
 * right. Hovering a row lifts it to a white card surface, nudges the name
 * right, and slides in the arrow.
 */
export function Services() {
  return (
    <Section id="services" className="py-24 sm:py-32">
      <SectionLabel>{SERVICES.label}</SectionLabel>
      <TextReveal className="mt-4 text-4xl font-medium tracking-tight text-ink sm:text-5xl lg:text-6xl">
        Full-stack AI <Accent>partnership</Accent>
      </TextReveal>
      <FadeIn delay={0.15}>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {SERVICES.sub}
        </p>
      </FadeIn>

      <FadeIn stagger={0.05} className="mt-12 sm:mt-16">
        {SERVICES.items.map((service) => (
          <div
            key={service.num}
            className="group -mx-2 grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-2 rounded-xl border-t border-line px-2 py-8 transition-colors duration-300 last:border-b hover:bg-card sm:-mx-4 sm:grid-cols-[80px_1fr_1.2fr_auto] sm:px-4"
          >
            <span aria-hidden className="font-mono text-sm text-accent">
              {service.num}
            </span>
            <h3 className="text-xl font-medium text-ink sm:text-2xl">
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                {service.name}
              </span>
            </h3>
            <p className="col-span-2 text-[15px] leading-relaxed text-muted sm:col-span-1">
              {service.body}
            </p>
            <span
              aria-hidden
              className="hidden -translate-x-2 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block"
            >
              →
            </span>
          </div>
        ))}
      </FadeIn>
    </Section>
  );
}
