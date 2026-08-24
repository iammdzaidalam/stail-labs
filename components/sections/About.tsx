import { ABOUT } from "@/lib/data";
import { Section, SectionLabel } from "@/components/ui/Section";
import { FadeIn, TextReveal } from "@/components/ui/Reveal";
import { Accent } from "@/components/ui/Accent";

/*
 * About — centered editorial intro (kicker, serif-accent heading, two body
 * paragraphs, chip row), then the vision/mission pair: a large white
 * editorial quote card next to its always-dark counterpart — this section's
 * one dark moment.
 */
export function About() {
  return (
    <Section id="about" className="py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-4xl text-center">
        <SectionLabel className="text-center">{ABOUT.label}</SectionLabel>
        <TextReveal className="mx-auto mt-5 max-w-4xl text-4xl font-medium leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl">
          An AI research &amp; product lab building <Accent>sovereign AI</Accent>{" "}
          for India
        </TextReveal>

        <FadeIn delay={0.15} className="mx-auto mt-7 max-w-2xl space-y-4">
          <p className="text-base leading-relaxed text-muted sm:text-lg">
            {ABOUT.body1}
          </p>
          <p className="text-base leading-relaxed text-muted sm:text-lg">
            {ABOUT.body2}
          </p>
        </FadeIn>

        <FadeIn
          stagger={0.06}
          className="mt-9 flex flex-wrap justify-center gap-2.5"
        >
          {ABOUT.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line bg-accent-soft px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-accent"
            >
              {tag}
            </span>
          ))}
        </FadeIn>
      </div>

      {/* ——— Vision (white editorial card) + mission (always-dark counterpart) ——— */}
      <FadeIn stagger={0.12} className="mt-16 grid gap-5 sm:gap-6 lg:grid-cols-2">
        <div className="flex h-full flex-col rounded-[2rem] border border-line bg-card p-8 transition-colors duration-300 hover:border-line-strong sm:p-10">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-accent">
            {ABOUT.vision.title}
          </p>
          <span aria-hidden className="mt-4 block h-px w-12 bg-accent" />
          <blockquote className="mt-8">
            <p className="text-2xl font-medium leading-snug text-ink sm:text-3xl">
              {ABOUT.vision.body}
            </p>
          </blockquote>
        </div>

        {/* Always-dark in both themes — explicit hex per spec's dark-panel exception. */}
        <div className="flex h-full flex-col rounded-[2rem] border border-white/10 bg-[#0b0d12] p-8 text-white sm:p-10">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#00E5FF]">
            {ABOUT.mission.title}
          </p>
          <span aria-hidden className="mt-4 block h-px w-12 bg-[#00E5FF]/40" />
          {/* Set at quote scale so this card carries the same visual weight as
              the vision card beside it rather than trailing empty space. */}
          <p className="mt-8 text-2xl font-medium leading-snug text-white sm:text-3xl">
            {ABOUT.mission.body}
          </p>
          <ul className="mt-auto flex flex-wrap gap-2 pt-10">
            {["Sovereign", "Secure", "Scalable"].map((pillar) => (
              <li
                key={pillar}
                className="rounded-full border border-white/15 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/60"
              >
                {pillar}
              </li>
            ))}
          </ul>
        </div>
      </FadeIn>
    </Section>
  );
}
