"use client";

import Image from "next/image";
import { useRef } from "react";
import { HERO, HERO_CARDS, SITE, STATS } from "@/lib/data";
import { Accent } from "@/components/ui/Accent";
import { Counter } from "@/components/ui/Counter";
import { Marquee } from "@/components/ui/Marquee";
import { gsap, useGSAP, EASE, prefersReducedMotion } from "@/lib/gsap";

/*
 * Hero — editorial sky panel: a large rounded card inset from the page
 * edges, filled with painterly sky imagery, white type with a serif-italic
 * accent line, pill CTAs, and a fan of floating product mini-cards with
 * scroll parallax. Below the panel: sector strip + bento stat cards.
 */

const pill =
  "inline-flex items-center gap-2.5 rounded-full font-mono text-[13px] font-bold uppercase tracking-[0.14em] transition-colors duration-300 select-none";

type FloatCard = {
  pos: string;
  rotate: number;
  depth: number;
  mobile?: boolean;
  node: React.ReactNode;
};

const barHeights = [40, 65, 50, 82, 96];
const cardShadow = "shadow-2xl shadow-[#0d2f5e]/35";

const FLOAT_CARDS: FloatCard[] = [
  {
    pos: "left-[1%] top-[110px] w-40 xl:w-44",
    rotate: -10,
    depth: 1.35,
    node: (
      <div className={`rounded-2xl bg-white p-4 ${cardShadow}`}>
        <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#5a6478]">
          {HERO_CARDS.ops.title}
        </p>
        <div className="mt-3 flex h-12 items-end gap-1.5">
          {barHeights.map((h, i) => (
            <span
              key={h}
              className="w-2.5 rounded-sm bg-[#00B8D9]"
              style={{ height: `${h}%`, opacity: 0.55 + i * 0.11 }}
            />
          ))}
        </div>
        <p className="mt-3 font-mono text-[10px] text-[#0a7d3d]">
          {HERO_CARDS.ops.trend}
        </p>
      </div>
    ),
  },
  {
    pos: "left-[14%] top-[48px] w-36 xl:w-40",
    rotate: -7,
    depth: 0.85,
    node: (
      <div className={`rounded-2xl bg-[#f2f3f5] p-4 ${cardShadow}`}>
        <p className="font-mono text-2xl font-bold text-[#0b0d12]">
          {STATS[2].value}
          {STATS[2].suffix}
        </p>
        <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[#5a6478]">
          {STATS[2].label}
        </p>
      </div>
    ),
  },
  {
    pos: "left-[-2%] top-0 w-40 md:left-[27%] md:top-[6px] md:w-44 xl:w-48",
    rotate: -3,
    depth: 1.1,
    mobile: true,
    node: (
      <div className={`rounded-2xl bg-white p-4 ${cardShadow}`}>
        <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#5a6478]">
          {HERO_CARDS.citizen.title}
        </p>
        <p className="mt-3 w-fit rounded-lg rounded-bl-sm bg-[#f0f2f5] px-3 py-1.5 text-[11px] text-[#0b0d12]">
          {HERO_CARDS.citizen.question}
        </p>
        <p className="ml-auto mt-2 w-fit rounded-lg rounded-br-sm bg-[#00E5FF]/20 px-3 py-1.5 text-[11px] text-[#0b0d12]">
          {HERO_CARDS.citizen.answer}
        </p>
      </div>
    ),
  },
  {
    pos: "left-1/2 top-[86px] z-10 w-52 -translate-x-1/2 md:top-0 xl:w-56",
    rotate: 0,
    depth: 0.6,
    mobile: true,
    node: (
      <div className={`rounded-2xl border border-white/10 bg-[#0b0d12] p-5 ${cardShadow}`}>
        <p className="text-[13px] font-medium leading-snug text-white">
          {HERO_CARDS.sovereign.lead}{" "}
          <span className="text-[#00E5FF]">✦</span>{" "}
          <span className="text-white/50">{HERO_CARDS.sovereign.body}</span>{" "}
          {HERO_CARDS.sovereign.tail}
        </p>
        <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">
          {HERO_CARDS.sovereign.meta}
        </p>
      </div>
    ),
  },
  {
    pos: "right-[-2%] top-[186px] w-36 md:right-[27%] md:top-[6px] md:w-40 xl:w-44",
    rotate: 3,
    depth: 1.1,
    mobile: true,
    node: (
      <div className={`rounded-2xl bg-white p-4 ${cardShadow}`}>
        <p className="flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#5a6478]">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#28C840]" />
          {HERO_CARDS.safety.status}
        </p>
        <p className="mt-2 font-mono text-2xl font-bold text-[#0b0d12]">
          {HERO_CARDS.safety.value}
        </p>
        <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[#5a6478]">
          {HERO_CARDS.safety.label}
        </p>
      </div>
    ),
  },
  {
    pos: "right-[14%] top-[48px] w-36 xl:w-40",
    rotate: 7,
    depth: 0.85,
    node: (
      <div className={`rounded-2xl bg-[#00E5FF] p-4 ${cardShadow}`}>
        <p className="font-mono text-2xl font-bold text-[#04121a]">24×7</p>
        <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[#04121a]/70">
          AI operations
        </p>
      </div>
    ),
  },
  {
    pos: "right-[1%] top-[110px] w-44",
    rotate: 10,
    depth: 1.35,
    node: (
      <div
        className={`rounded-2xl border border-white/10 bg-[#0b0d12] p-4 font-mono text-[10px] leading-relaxed ${cardShadow}`}
      >
        <p className="text-white/80">
          <span className="text-[#00E5FF]">$</span> {HERO_CARDS.deploy.command}
        </p>
        {HERO_CARDS.deploy.lines.map((line) => (
          <p key={line} className="text-[#7ee0a3]">
            {line}
          </p>
        ))}
      </div>
    ),
  },
];

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap
        .timeline()
        .from("[data-hero-line] > span", {
          yPercent: 112,
          duration: 1,
          ease: EASE.expo,
          stagger: 0.1,
        })
        .from(
          "[data-hero-fade]",
          { y: 26, autoAlpha: 0, duration: 0.7, ease: EASE.out, stagger: 0.1 },
          "-=0.55",
        )
        .from(
          "[data-float]",
          {
            y: 90,
            autoAlpha: 0,
            rotate: (i, el) =>
              Number((el as HTMLElement).dataset.rotate ?? 0) * 2.2,
            duration: 0.9,
            ease: "back.out(1.3)",
            stagger: 0.06,
          },
          "-=0.4",
        );

      gsap.utils.toArray<HTMLElement>("[data-float]").forEach((el) => {
        gsap.to(el, {
          yPercent: -16 * Number(el.dataset.depth ?? 1),
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="relative pt-[76px] sm:pt-[88px]">
      {/* ——— Sky panel ——— */}
      <div className="px-3 sm:px-5">
        <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[1.5rem] sm:rounded-[2rem]">
          <Image
            src="/img/hero-sky.jpg"
            alt=""
            aria-hidden
            fill
            priority
            quality={88}
            sizes="(max-width: 1400px) 100vw, 1400px"
            className="object-cover"
          />
          {/* soft scrim for type contrast */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-[#123a7a]/25 via-transparent to-transparent"
          />

          <div className="relative px-5 pb-14 pt-16 text-center sm:px-8 sm:pb-16 sm:pt-24">
            <p data-hero-fade className="flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/20 px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md sm:text-[11px]">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#00E5FF]" />
                {HERO.kicker}
              </span>
            </p>

            <h1 className="mx-auto mt-7 max-w-5xl text-[2.7rem] font-medium leading-[1.02] tracking-tight text-white [text-shadow:0_2px_24px_rgba(15,50,110,0.35)] sm:text-6xl lg:text-7xl xl:text-[5.4rem]">
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
              className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/90 [text-shadow:0_1px_14px_rgba(15,50,110,0.35)] sm:text-lg"
            >
              {HERO.sub}
            </p>

            <div
              data-hero-fade
              className="mt-9 flex flex-wrap items-center justify-center gap-3.5"
            >
              <a
                href={SITE.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className={`${pill} group bg-white py-2 pl-7 pr-2 text-[#0b0d12] hover:bg-[#0b0d12] hover:text-white`}
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
                href="#products"
                className={`${pill} border border-white/45 bg-white/15 px-7 py-3.5 text-white backdrop-blur-md hover:bg-white hover:text-[#0b0d12]`}
              >
                Explore Products
              </a>
            </div>

            {/* ——— Floating product mini-cards over the meadow ——— */}
            <div
              aria-hidden
              className="relative mx-auto mt-12 h-[290px] max-w-6xl sm:mt-14 md:h-[300px]"
            >
              {FLOAT_CARDS.map((card) => (
                <div
                  key={card.pos}
                  data-float
                  data-rotate={card.rotate}
                  data-depth={card.depth}
                  className={`absolute ${card.pos} ${card.mobile ? "" : "hidden md:block"}`}
                  style={{ rotate: `${card.rotate}deg` }}
                >
                  {card.node}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ——— Sector strip ——— */}
      <div className="border-b border-line py-10 sm:py-12">
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
          {HERO.sectorsLabel}
        </p>
        <Marquee duration={32} className="mt-6">
          {HERO.sectors.map((sector) => (
            <span
              key={sector}
              className="flex items-center px-7 font-mono text-sm uppercase tracking-[0.18em] text-muted"
            >
              <span aria-hidden className="mr-7 text-accent/60">
                ✦
              </span>
              {sector}
            </span>
          ))}
        </Marquee>
      </div>

      {/* ——— Bento stat cards ——— */}
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="grid grid-cols-2 gap-3.5 sm:gap-4 lg:grid-cols-4">
          <div className="flex min-h-[170px] flex-col justify-between rounded-card border border-line bg-card p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              {STATS[0].label}
            </p>
            <Counter
              value={STATS[0].value}
              suffix={STATS[0].suffix}
              className="font-mono text-4xl font-bold text-ink sm:text-5xl"
            />
          </div>
          <div className="flex min-h-[170px] flex-col justify-between rounded-card border border-line bg-elev p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              {STATS[1].label}
            </p>
            <Counter
              value={STATS[1].value}
              suffix={STATS[1].suffix}
              className="font-mono text-4xl font-bold text-ink sm:text-5xl"
            />
          </div>
          <div className="flex min-h-[170px] flex-col justify-between rounded-card bg-accent-raw p-6 text-[#04121a]">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-70">
              {STATS[2].label}
            </p>
            <div>
              <Counter
                value={STATS[2].value}
                suffix={STATS[2].suffix}
                className="font-mono text-4xl font-bold sm:text-5xl"
              />
              <p className="mt-2 text-[13px] leading-snug opacity-80">
                Streaming through sovereign AI pipelines every month.
              </p>
            </div>
          </div>
          <div className="flex min-h-[170px] flex-col justify-between rounded-card bg-[#0b0d12] p-6 text-white">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
              {STATS[3].label}
            </p>
            <p className="font-mono text-4xl font-bold sm:text-5xl">
              {STATS[3].value}
              <span className="text-[#00E5FF]">{STATS[3].suffix.charAt(0)}</span>
              {STATS[3].suffix.slice(1)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
