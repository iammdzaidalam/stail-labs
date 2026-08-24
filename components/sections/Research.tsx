import { RESEARCH } from "@/lib/data";
import { Accent } from "@/components/ui/Accent";
import { Section, SectionLabel } from "@/components/ui/Section";
import { FadeIn, TextReveal } from "@/components/ui/Reveal";
import { Marquee } from "@/components/ui/Marquee";

/**
 * Research — the page's ALWAYS-DARK moment, rendered v2-style as a large
 * inset rounded panel (not a full-bleed band) holding two outlined-text
 * marquee rows of research areas.
 *
 * Explicit hex exception: this panel stays dark in BOTH themes, so the
 * theme-flipping tokens would invert it. The dark palette is pinned
 * instead — #0b0d12 surface, white text, #00E5FF accent.
 */
export function Research() {
  // Second row starts mid-list so the two marquees never mirror each other.
  const rotated = [...RESEARCH.areas.slice(6), ...RESEARCH.areas.slice(0, 6)];

  return (
    <Section id="research" bleed>
      <div className="px-3 sm:px-5">
        <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0b0d12] py-20 text-white sm:rounded-[2rem] sm:py-28">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
            <SectionLabel onDark>{RESEARCH.label}</SectionLabel>
            <TextReveal className="mt-4 text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl">
              AI <Accent>research</Accent> at STAIL
            </TextReveal>
            <FadeIn delay={0.15}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
                {RESEARCH.sub}
              </p>
            </FadeIn>
          </div>

          <div className="mt-12 flex flex-col gap-6 sm:mt-16">
            <Marquee duration={38}>
              {RESEARCH.areas.map((area) => (
                <ResearchArea key={area} label={area} />
              ))}
            </Marquee>
            <Marquee duration={46} reverse>
              {rotated.map((area) => (
                <ResearchArea key={area} label={area} />
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </Section>
  );
}

function ResearchArea({ label }: { label: string }) {
  return (
    <span className="flex items-center">
      <span className="whitespace-nowrap px-8 text-4xl font-medium tracking-tight text-transparent transition-colors duration-300 [-webkit-text-stroke:1px_rgba(255,255,255,0.28)] hover:text-[#00E5FF] hover:[-webkit-text-stroke:0px] sm:text-6xl">
        {label}
      </span>
      <span aria-hidden className="text-xl text-[#00E5FF]/60 sm:text-2xl">
        ✦
      </span>
    </span>
  );
}
