import { ABOUT } from "@/lib/data";
import { Section, SectionLabel } from "@/components/ui/Section";
import { FadeIn, TextReveal } from "@/components/ui/Reveal";
import { Accent } from "@/components/ui/Accent";
import { HEADLINE, LEAD, META, TITLE_LG } from "@/components/ui/type";

/*
 * About — centred editorial intro, then the vision/mission pair.
 *
 * Both cards are light. v2 made the mission card always-dark, which was one
 * of eight near-black surfaces on a page whose whole premise is an airy light
 * ground; the dark-panel budget (three) is spent on the hero, Research and
 * the footer. The pair is separated by fill and by which side carries the
 * accent rule, not by inverting one of them.
 */
export function About() {
  return (
    <Section id="about" className="py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <SectionLabel className="flex justify-center">
          {ABOUT.label}
        </SectionLabel>
        <TextReveal className={`${HEADLINE} mx-auto mt-5`}>
          An AI research &amp; product lab building <Accent>sovereign AI</Accent>{" "}
          for India
        </TextReveal>

        <FadeIn delay={0.1} className="mx-auto mt-6 max-w-xl space-y-4">
          <p className={LEAD}>{ABOUT.body1}</p>
          <p className={LEAD}>{ABOUT.body2}</p>
        </FadeIn>

        <FadeIn
          stagger={0.05}
          className="mt-8 flex flex-wrap justify-center gap-2"
        >
          {ABOUT.tags.map((tag) => (
            <span
              key={tag}
              className={`${META} rounded-full border border-line px-3 py-1.5 text-muted`}
            >
              {tag}
            </span>
          ))}
        </FadeIn>
      </div>

      <FadeIn stagger={0.1} className="mt-16 grid gap-4 lg:grid-cols-2">
        <VisionCard
          label={ABOUT.vision.title}
          body={ABOUT.vision.body}
          tone="bg-card"
        />
        <VisionCard
          label={ABOUT.mission.title}
          body={ABOUT.mission.body}
          tone="bg-elev"
          pillars={["Sovereign", "Secure", "Scalable"]}
        />
      </FadeIn>
    </Section>
  );
}

function VisionCard({
  label,
  body,
  tone,
  pillars,
}: {
  label: string;
  body: string;
  tone: string;
  pillars?: readonly string[];
}) {
  return (
    <div
      className={`flex h-full flex-col rounded-[1.5rem] border border-line p-8 sm:rounded-[2rem] sm:p-10 ${tone}`}
    >
      <p className={`${META} text-muted`}>{label}</p>
      <span aria-hidden className="mt-4 block h-px w-10 bg-accent-raw" />
      <p className={`${TITLE_LG} mt-7 text-ink`}>{body}</p>
      {pillars && (
        <ul className="mt-auto flex flex-wrap gap-2 pt-8">
          {pillars.map((pillar) => (
            <li
              key={pillar}
              className={`${META} rounded-full border border-line px-3 py-1.5 text-muted`}
            >
              {pillar}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
