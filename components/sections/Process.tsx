"use client";

import { useRef } from "react";
import { PROCESS } from "@/lib/data";
import { Accent } from "@/components/ui/Accent";
import { Section, SectionLabel } from "@/components/ui/Section";
import { FadeIn, TextReveal } from "@/components/ui/Reveal";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type Step = (typeof PROCESS.steps)[number];

/** Aligns the horizontal track's first/last card with the max-w-7xl container. */
const TRACK_GUTTER = "pl-[max(3rem,calc((100vw-80rem)/2+3rem))] pr-[max(3rem,calc((100vw-80rem)/2+3rem))]";

/**
 * Step card — mono index in accent above a thin rule (editorial, no stroked
 * display numbers). The final step is the section's one always-dark moment.
 */
function StepCard({ step, dark = false }: { step: Step; dark?: boolean }) {
  return (
    <article
      className={
        dark
          ? // Always-dark accent card — explicit hex allowed per spec (dark panel exception).
            "h-full rounded-card border border-white/10 bg-[#0b0d12] p-8 text-white"
          : "h-full rounded-card border border-line bg-card p-8 transition-colors duration-300 hover:border-line-strong"
      }
    >
      <p
        className={`font-mono text-[13px] font-bold tracking-[0.2em] ${
          dark ? "text-[#00E5FF]" : "text-accent"
        }`}
      >
        {step.num}
      </p>
      <div aria-hidden className={`mt-5 border-t ${dark ? "border-white/15" : "border-line"}`} />
      <h3 className={`mt-6 text-2xl font-medium ${dark ? "text-white" : "text-ink"}`}>
        {step.name}
      </h3>
      <p className={`mt-3 leading-relaxed ${dark ? "text-white/60" : "text-muted"}`}>
        {step.body}
      </p>
    </article>
  );
}

function ProcessHeader() {
  return (
    <div>
      <SectionLabel>{PROCESS.label}</SectionLabel>
      <TextReveal className="mt-4 text-4xl font-medium tracking-tight text-ink sm:text-5xl lg:text-6xl">
        Our delivery <Accent>process</Accent>
      </TextReveal>
      <FadeIn delay={0.15}>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {PROCESS.sub}
        </p>
      </FadeIn>
    </div>
  );
}

/**
 * Process — on lg+ the section pins and the 5 step cards scroll horizontally,
 * scrubbed to the vertical scroll; below lg (and for reduced motion / no JS)
 * content stays a plain, fully reachable layout.
 *
 * Pinning notes: the pinned element (`pinRef`) has no overflow/transform on
 * any ancestor inside this section. The track wrapper defaults to
 * `overflow-x-auto` so no-JS / reduced-motion desktop users can still scroll
 * the cards natively; the GSAP setup switches it to `visible` (auto-reverted
 * by the useGSAP context) while the pinned tween owns the movement.
 */
export function Process() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const pin = pinRef.current;
      const wrapper = wrapperRef.current;
      const track = trackRef.current;
      if (!pin || !wrapper || !track) return;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const distance = () => Math.max(0, track.scrollWidth - pin.clientWidth);

        // Hand movement to the scrubbed tween; native x-scroll would desync.
        gsap.set(wrapper, { overflowX: "visible" });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => "+=" + distance(),
            scrub: 1,
            pin: true,
            // Lenis scrolls the window natively, so fixed-position pinning is
            // correct; the auto-detected "transform" mode misrenders here.
            pinType: "fixed",
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        tl.to(track, { x: () => -distance() }, 0);
        if (progressRef.current) {
          tl.fromTo(progressRef.current, { scaleX: 0 }, { scaleX: 1 }, 0);
        }
      });
    },
    { scope: rootRef },
  );

  const lastIndex = PROCESS.steps.length - 1;

  return (
    // overflow-x-clip contains the horizontal track; safe for the pin since
    // pinType "fixed" escapes ancestor clipping (no transformed ancestors).
    <Section className="overflow-x-clip bg-elev" bleed>
      <div ref={rootRef}>
        {/* Below lg: simple vertical stack */}
        <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:hidden">
          <ProcessHeader />
          <FadeIn stagger={0.08} className="mt-14 grid gap-4 sm:grid-cols-2">
            {PROCESS.steps.map((step, i) => (
              <StepCard key={step.num} step={step} dark={i === lastIndex} />
            ))}
          </FadeIn>
        </div>

        {/* lg+: pinned horizontal scroll */}
        <div ref={pinRef} className="hidden lg:block">
          <div className="flex h-screen flex-col justify-center gap-10 py-10">
            <div className="mx-auto w-full max-w-7xl px-12">
              <ProcessHeader />
            </div>

            <div ref={wrapperRef} className="overflow-x-auto">
              <div
                ref={trackRef}
                className={`flex w-max items-stretch gap-5 ${TRACK_GUTTER}`}
              >
                {PROCESS.steps.map((step, i) => (
                  <div key={step.num} className="w-[420px] shrink-0 xl:w-[480px]">
                    <StepCard step={step} dark={i === lastIndex} />
                  </div>
                ))}
              </div>
            </div>

            {/* Scrub progress line */}
            <div aria-hidden className="mx-auto w-full max-w-7xl px-12">
              <div className="h-px w-full bg-line">
                <div ref={progressRef} className="h-px w-full origin-left bg-accent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
