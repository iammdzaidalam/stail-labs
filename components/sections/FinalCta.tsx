import { Section } from "@/components/ui/Section";
import { TextReveal, FadeIn } from "@/components/ui/Reveal";
import { CTA, SITE } from "@/lib/data";
import { Accent } from "@/components/ui/Accent";

/*
 * Final call-to-action — the page's one dark panel moment: an always-dark
 * ink surface (explicit hex — constant in both themes, per spec) with a
 * serif-accent headline, subtle top glow, and paired pill CTAs.
 */

const pill =
  "inline-flex items-center gap-2.5 rounded-full font-mono text-[13px] font-bold uppercase tracking-[0.14em] transition-colors duration-300 select-none";

export function FinalCta() {
  return (
    <Section className="py-24 sm:py-32">
      {/* Always-dark panel — explicit hex per spec */}
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0d12] p-10 text-center text-white sm:p-16 lg:p-20">
        {/* Subtle cyan glow inside the panel — explicit rgba, always-dark surface */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [background:radial-gradient(55%_60%_at_50%_0%,rgba(0,229,255,0.1),transparent_72%)]"
        />

        <div className="relative">
          <TextReveal className="mx-auto max-w-3xl text-4xl font-medium tracking-tight sm:text-6xl lg:text-7xl">
            Sovereign AI. <Accent>India&apos;s future.</Accent>
          </TextReveal>

          <FadeIn delay={0.15}>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
              {CTA.body}
            </p>
          </FadeIn>

          <FadeIn
            delay={0.25}
            className="mt-10 flex flex-wrap items-center justify-center gap-3.5"
          >
            <a
              href={SITE.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className={`${pill} group bg-white py-2 pl-7 pr-2 text-[#0b0d12] hover:bg-[#00E5FF]`}
            >
              Book Strategy Call
              <span
                aria-hidden
                className="grid h-9 w-9 place-items-center rounded-full bg-[#0b0d12] text-sm text-[#00E5FF] transition-transform duration-300 group-hover:rotate-45"
              >
                ↗
              </span>
            </a>
            <a
              href={SITE.phoneHref}
              className={`${pill} border border-white/25 bg-white/5 px-7 py-3.5 text-white backdrop-blur-md hover:border-white/60 hover:bg-white/15`}
            >
              Call {SITE.phone}
            </a>
          </FadeIn>
        </div>
      </div>
    </Section>
  );
}
