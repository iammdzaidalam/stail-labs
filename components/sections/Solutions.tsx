"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { SOLUTIONS } from "@/lib/data";
import { Accent } from "@/components/ui/Accent";
import { Section, SectionLabel } from "@/components/ui/Section";
import { FadeIn, TextReveal } from "@/components/ui/Reveal";

type SolutionTab = (typeof SOLUTIONS.tabs)[number];
type TabKey = SolutionTab["key"];

/** Solutions — keyboard-accessible tabbed pathways per organization type. */
export function Solutions() {
  const [activeKey, setActiveKey] = useState<TabKey>(SOLUTIONS.tabs[0].key);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduceMotion = useReducedMotion();

  const active: SolutionTab =
    SOLUTIONS.tabs.find((t) => t.key === activeKey) ?? SOLUTIONS.tabs[0];

  const onTablistKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const count = SOLUTIONS.tabs.length;
    const current = SOLUTIONS.tabs.findIndex((t) => t.key === activeKey);
    let next: number | null = null;

    if (e.key === "ArrowRight") next = (current + 1) % count;
    else if (e.key === "ArrowLeft") next = (current - 1 + count) % count;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = count - 1;

    if (next === null) return;
    e.preventDefault();
    setActiveKey(SOLUTIONS.tabs[next].key);
    tabRefs.current[next]?.focus();
  };

  return (
    <Section id="solutions" className="bg-elev py-24 sm:py-32 lg:py-40">
      <SectionLabel>{SOLUTIONS.label}</SectionLabel>
      <TextReveal className="mt-4 text-4xl font-medium tracking-tight text-ink sm:text-5xl lg:text-6xl">
        Tailored for <Accent>every stage</Accent>
      </TextReveal>
      <FadeIn delay={0.15}>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {SOLUTIONS.sub}
        </p>
      </FadeIn>

      <FadeIn delay={0.2} className="mt-10 sm:mt-12">
        <div
          role="tablist"
          aria-label={SOLUTIONS.heading}
          className="flex flex-wrap gap-2"
          onKeyDown={onTablistKeyDown}
        >
          {SOLUTIONS.tabs.map((tab, i) => {
            const selected = tab.key === activeKey;
            return (
              <button
                key={tab.key}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`solutions-tab-${tab.key}`}
                aria-selected={selected}
                aria-controls={`solutions-panel-${tab.key}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveKey(tab.key)}
                className={`rounded-full border px-5 py-2.5 font-mono text-xs uppercase tracking-[0.14em] transition ${
                  selected
                    ? "border-ink bg-ink text-bg"
                    : "border-line text-muted hover:border-line-strong hover:text-ink"
                }`}
              >
                {tab.tab}
              </button>
            );
          })}
        </div>

        <div className="mt-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.key}
              role="tabpanel"
              id={`solutions-panel-${active.key}`}
              aria-labelledby={`solutions-tab-${active.key}`}
              tabIndex={0}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="rounded-[2rem] border border-line bg-card p-8 sm:p-12 lg:grid lg:grid-cols-[1.4fr_1fr] lg:gap-10"
            >
              <div>
                <h3 className="text-2xl font-medium text-ink sm:text-3xl">
                  {active.title}
                </h3>
                <p className="mt-4 leading-relaxed text-muted">{active.body}</p>
                <ul className="mt-7 space-y-3">
                  {active.points.map((point) => (
                    <li key={point} className="flex gap-3.5">
                      {/* Editorial dash bullet: short accent rule, no glyph. */}
                      <span
                        aria-hidden
                        className="mt-[0.72em] h-px w-4 shrink-0 bg-accent"
                      />
                      <span className="text-[15px] leading-relaxed text-ink-2">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 flex flex-col gap-4 lg:mt-0">
                <div className="rounded-2xl border border-line bg-elev p-5 sm:p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                    {active.stackLabel}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {active.stack.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-line bg-accent-soft px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-accent"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Always-dark outcomes card — explicit hex allowed per spec (dark panel exception). */}
                <div className="rounded-2xl border border-white/10 bg-[#0b0d12] p-5 text-white sm:p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">
                    Expected Outcomes
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {active.outcomes.map((outcome) => (
                      <li key={outcome} className="flex gap-2.5">
                        {/* Pinned gold — the token flips too dark on this always-dark card. */}
                        <span aria-hidden className="font-mono text-[#F5C842]">
                          ▸
                        </span>
                        <span className="text-sm leading-relaxed text-white/70">
                          {outcome}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </FadeIn>
    </Section>
  );
}
