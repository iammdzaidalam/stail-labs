
"use client";

import { useRef } from "react";
import { HERO, HERO_CARDS, SITE, STATS } from "@/lib/data";
import { Accent } from "@/components/ui/Accent";
import { Button } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { Marquee } from "@/components/ui/Marquee";
import { BODY_SM, DISPLAY, LEAD, META, NUMERAL } from "@/components/ui/type";
import { gsap, useGSAP, EASE, prefersReducedMotion } from "@/lib/gsap";

/*
 * Hero — Spatial Cards Slider & Masked Window Transition
 *
 * Implements the exact 3D spatial fan out and clip-path page transition 
 * as requested from the Osmo.supply references.
 */

const FAN_ANGLES = [-45, -30, -15, 0, 15, 30, 45]; // Degrees of rotation for the 3D fan
const CARD_WIDTH = 200; // Uniform width for all 3D cards
const LAYER = [1, 2, 3, 6, 3, 2, 1]; // Z-index stacking
const ON_MOBILE = [1, 3, 4, 5];

const CARD = "rounded-2xl shadow-onpanel h-[210px] flex flex-col justify-center";
const barHeights = [38, 62, 48, 80, 96];

const FAN: React.ReactNode[] = [
  <div key="ops" className={`${CARD} bg-white p-4`}>
    <p className={`${META} text-[#5c636e]`}>{HERO_CARDS.ops.title}</p>
    <div className="mt-3 flex h-11 items-end gap-1.5">
      {barHeights.map((h, i) => (
        <span
          key={h}
          className="w-2.5 rounded-[3px] bg-[#1560f0]"
          style={{ height: `${h}%`, opacity: 0.4 + i * 0.15 }}
        />
      ))}
    </div>
    <p className={`${META} mt-3 text-[#0a7d3d]`}>{HERO_CARDS.ops.trend}</p>
  </div>,

  <div key="data" className={`${CARD} bg-[#f3f5f8] p-4`}>
    <p className={`${NUMERAL} text-[1.75rem] text-[#0a0c10]`}>
      {STATS[2].value}
      {STATS[2].suffix}
    </p>
    <p className={`${META} mt-1.5 text-[#5c636e]`}>{STATS[2].label}</p>
  </div>,

  <div key="citizen" className={`${CARD} bg-white p-4`}>
    <p className={`${META} text-[#5c636e]`}>{HERO_CARDS.citizen.title}</p>
    <p className="mt-3 w-fit rounded-xl rounded-bl-sm bg-[#f0f2f5] px-3 py-1.5 text-[11px] leading-snug text-[#0a0c10]">
      {HERO_CARDS.citizen.question}
    </p>
    <p className="mt-1.5 ml-auto w-fit rounded-xl rounded-br-sm bg-[#1560f0] px-3 py-1.5 text-[11px] leading-snug text-white">
      {HERO_CARDS.citizen.answer}
    </p>
  </div>,

  <div key="sovereign" className={`${CARD} bg-[#0a0c10] p-5`}>
    <p className="text-[13px] leading-[1.45] tracking-body text-white">
      {HERO_CARDS.sovereign.lead}{" "}
      <span className="text-white/45">{HERO_CARDS.sovereign.body}</span>{" "}
      {HERO_CARDS.sovereign.tail}
    </p>
    <p className={`${META} mt-4 text-white/35`}>{HERO_CARDS.sovereign.meta}</p>
  </div>,

  <div key="safety" className={`${CARD} bg-white p-4`}>
    <p className={`${META} flex items-center gap-1.5 text-[#5c636e]`}>
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#22a45d]" />
      {HERO_CARDS.safety.status}
    </p>
    <p className={`${NUMERAL} mt-2 text-[1.75rem] text-[#0a0c10]`}>
      {HERO_CARDS.safety.value}
    </p>
    <p className={`${META} mt-1.5 text-[#5c636e]`}>{HERO_CARDS.safety.label}</p>
  </div>,

  <div key="ops247" className={`${CARD} bg-[#1560f0] p-4`}>
    <p className={`${NUMERAL} text-[1.75rem] text-white`}>24×7</p>
    <p className={`${META} mt-1.5 text-white/70`}>AI operations</p>
  </div>,

  <div key="deploy" className={`${CARD} bg-[#0a0c10] p-4`}>
    <p className="font-mono text-[10px] leading-relaxed text-white/75">
      <span className="text-[#7fb0ff]">$</span> {HERO_CARDS.deploy.command}
    </p>
    {HERO_CARDS.deploy.lines.map((line) => (
      <p
        key={line}
        className="font-mono text-[10px] leading-relaxed text-[#6ede9e]"
      >
        {line}
      </p>
    ))}
  </div>,
];

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const tl = gsap.timeline();

      // Masked Window Page Transition 
      // Emulating the Osmo Supply expanding window effect
      tl.fromTo(
        containerRef.current,
        {
          clipPath: "inset(20% 20% 20% 20% round 32px)",
          scale: 0.95
        },
        {
          clipPath: "inset(0% 0% 0% 0% round 24px)",
          scale: 1,
          duration: 1.6,
          ease: "power4.inOut",
        }
      );

      tl.from(
        "[data-hero-line] > span",
        {
          yPercent: 108,
          duration: 0.9,
          ease: EASE.out,
          stagger: 0.07,
        },
        "-=0.7"
      )
      .from(
        "[data-hero-fade]",
        { y: 18, autoAlpha: 0, duration: 0.7, ease: EASE.out, stagger: 0.08 },
        "-=0.5"
      );

      // Spatial Cards Slider 3D setup
      const cards = gsap.utils.toArray<HTMLElement>("[data-spatial-card]");

      gsap.set(cards, {
        transformOrigin: "50% 50%",
      });

      // Float entrance for the cards
      tl.from(
        cards,
        {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: EASE.out,
          stagger: { each: 0.05, from: "center" },
        },
        "-=0.45"
      );

    },
    { scope: rootRef },
  );

  const radius = 800; // Match GSAP radius

  return (
    <section ref={rootRef} className="relative pt-[76px] sm:pt-[88px] overflow-hidden">
      {/* ——— Masked Window Container ——— */}
      <div className="px-3 sm:px-5">
        <div 
          ref={containerRef}
          className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] bg-[#072f88]"
        >
          {/* Five-stop vertical gradient: deep azure overhead falling to a pale
              horizon, so the fan of white cards sits on the lightest band. */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(180deg,#072f88 0%,#0d4fce 26%,#1f74ef 48%,#5ea5f6 70%,#a8d1fb 86%,#d8ecff 100%)",
            }}
          />
          {/* Soft overhead bloom — keeps the top band from reading as a flat fill. */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(120% 70% at 50% -12%, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0) 62%)",
            }}
          />

          <div className="relative z-10 px-5 pt-16 pb-12 text-center sm:px-8 sm:pt-24 sm:pb-14 min-h-[85vh] flex flex-col justify-start">
            <p data-hero-fade className="flex justify-center">
              <span
                className={`${META} inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/15 px-4 py-1.5 text-white backdrop-blur-md`}
              >
                <span
                  aria-hidden
                  className="h-1 w-1 rounded-full bg-white"
                />
                {HERO.kicker}
              </span>
            </p>

            <h1
              className={`${DISPLAY} mx-auto mt-7 max-w-4xl text-white [text-shadow:0_2px_28px_rgba(6,24,68,0.28)]`}
            >
              <span data-hero-line className="block overflow-hidden">
                <span className="block">{HERO.headline[0]}</span>
              </span>
              <span data-hero-line className="block overflow-hidden">
                <span className="block">
                  <Accent>{HERO.headline[1]}</Accent>
                </span>
              </span>
            </h1>

            <p
              data-hero-fade
              className={`${LEAD} mx-auto mt-6 max-w-xl text-white/90 [text-shadow:0_1px_14px_rgba(6,24,68,0.4)]`}
            >
              {HERO.sub}
            </p>

            <div
              data-hero-fade
              className="mt-9 flex flex-wrap items-center justify-center gap-3"
            >
              <Button href={SITE.calendly} external variant="onPanel" arrow="chip">
                Book a strategy call
              </Button>
              <Button href="#products" variant="glass">
                Explore products
              </Button>
            </div>

            {/* ——— Spatial Cards Slider (Osmo Implementation) ——— */}
            <div aria-hidden className="mt-8 hidden grid-cols-2 gap-3 relative z-20">
              {ON_MOBILE.map((i) => (
                <div key={i}>{FAN[i]}</div>
              ))}
            </div>

            {/* 3D Container */}
            <div
              aria-hidden
              className="relative mx-auto mt-12 hidden h-[400px] w-full max-w-[1280px] lg:block"
              style={{ perspective: "1500px" }}
            >
              <div 
                ref={sliderRef} 
                className="absolute inset-0 flex items-center justify-center"
                style={{ 
                  transformStyle: "preserve-3d",
                  // Pull the entire track backward so the front card (z: radius) lands at z: 0
                  transform: `translateZ(-${radius}px)`
                }}
              >
                {FAN.map((node, i) => (
                  <div
                    key={i}
                    data-spatial-card
                    className="absolute top-1/2 left-1/2 -mt-[100px]"
                    style={{
                      width: CARD_WIDTH,
                      marginLeft: -CARD_WIDTH / 2,
                      // Translate out to radius, then rotate into arc position
                      transform: `rotateY(${FAN_ANGLES[i]}deg) translateZ(${radius}px)`,
                      zIndex: LAYER[i],
                      backfaceVisibility: "hidden"
                    }}
                  >
                    {node}
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* ——— Sector strip ——— */}
      <div className="border-b border-line py-12 sm:py-14">
        <p className={`${META} text-center text-muted`}>{HERO.sectorsLabel}</p>
        <Marquee duration={38} className="mt-7">
          {HERO.sectors.map((sector) => (
            <span
              key={sector}
              className="flex items-center px-6 text-[0.9375rem] tracking-body text-ink-2"
            >
              <span aria-hidden className="mr-6 text-line-strong">
                ·
              </span>
              {sector}
            </span>
          ))}
        </Marquee>
      </div>

      {/* ——— Bento stats ——— */}
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <StatCard
            label={STATS[0].label}
            tone="border border-line bg-card"
            labelTone="text-muted"
          >
            <Counter
              value={STATS[0].value}
              suffix={STATS[0].suffix}
              className={`${NUMERAL} text-4xl text-ink sm:text-[2.75rem]`}
            />
          </StatCard>

          <StatCard
            label={STATS[1].label}
            tone="border border-line bg-elev"
            labelTone="text-muted"
          >
            <Counter
              value={STATS[1].value}
              suffix={STATS[1].suffix}
              className={`${NUMERAL} text-4xl text-ink sm:text-[2.75rem]`}
            />
          </StatCard>

          <StatCard
            label={STATS[2].label}
            tone="bg-accent-raw text-white"
            labelTone="text-white/70"
          >
            <Counter
              value={STATS[2].value}
              suffix={STATS[2].suffix}
              className={`${NUMERAL} text-4xl sm:text-[2.75rem]`}
            />
            <p className={`${BODY_SM} mt-2 text-white/75`}>
              Streaming through sovereign AI pipelines every month.
            </p>
          </StatCard>

          <StatCard
            label={STATS[3].label}
            tone="bg-[#0a0c10] text-white"
            labelTone="text-white/45"
          >
            <p className={`${NUMERAL} text-4xl sm:text-[2.75rem]`}>
              {STATS[3].value}
              {STATS[3].suffix}
            </p>
          </StatCard>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  label,
  tone,
  labelTone,
  children,
}: {
  label: string;
  tone: string;
  labelTone: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex min-h-[170px] flex-col justify-between rounded-card p-6 ${tone}`}
    >
      <p className={`${META} ${labelTone}`}>{label}</p>
      <div>{children}</div>
    </div>
  );
}
