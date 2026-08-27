"use client";

import { useRef } from "react";
import {
  gsap,
  useGSAP,
  alreadyOnScreen,
  guardReveal,
  prefersReducedMotion,
} from "@/lib/gsap";

export type TerminalData = {
  title: string;
  command: string;
  lines: readonly string[];
  result: string;
  meta: readonly (readonly [string, string])[];
};

/**
 * macOS-style terminal window that "runs" its command when scrolled into
 * view: the command types out, then output lines appear one by one.
 * Reduced-motion users see the finished state immediately.
 */
export function Terminal({
  data,
  className = "",
  borderClassName = "border-line",
}: {
  data: TerminalData;
  className?: string;
  /** Replaces the default border colour (callers on dark panels pass their own). */
  borderClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || prefersReducedMotion()) return;
      // Already visible on mount — leave the finished terminal on screen.
      if (alreadyOnScreen(root)) return;

      const cmd = root.querySelector<HTMLElement>("[data-cmd]");
      const outs = root.querySelectorAll<HTMLElement>("[data-out]");
      if (!cmd) return;

      const full = cmd.dataset.cmd ?? "";
      const state = { i: 0 };

      // Blank the output immediately on mount. Doing this inside the timeline
      // would let the finished terminal paint first and then visibly reset
      // when the trigger fires.
      gsap.set(cmd, { textContent: "" });
      gsap.set(outs, { autoAlpha: 0, y: 6 });

      const tl = gsap.timeline({
        // `toggleActions` rather than `once`: a fast scroll past the terminal
        // would otherwise kill this timeline and leave the output blank.
        scrollTrigger: {
          trigger: root,
          start: "top 78%",
          toggleActions: "play none play none",
        },
      });

      tl.to(state, {
          i: full.length,
          duration: Math.min(1.6, full.length * 0.028),
          ease: "none",
          onUpdate: () => {
            cmd.textContent = full.slice(0, Math.round(state.i));
          },
        })
        .to(outs, { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.22, ease: "power2.out" }, "+=0.25");

      // Never leave the terminal blank if its trigger never runs.
      guardReveal(root, tl);
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      className={`overflow-hidden rounded-card border bg-terminal font-mono text-[12.5px] leading-relaxed text-terminal-ink shadow-2xl shadow-black/30 sm:text-[13px] ${borderClassName} ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
        <span aria-hidden className="h-3 w-3 rounded-full bg-[#FF5F57]" />
        <span aria-hidden className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
        <span aria-hidden className="h-3 w-3 rounded-full bg-[#28C840]" />
        <span className="ml-3 truncate text-[11px] text-white/40">{data.title}</span>
      </div>
      <div className="space-y-1.5 px-5 py-5">
        <p className="text-white/90">
          <span className="text-[#00E5FF]">$ </span>
          <span data-cmd={data.command}>{data.command}</span>
          <span aria-hidden className="animate-blink ml-0.5 inline-block h-[1.05em] w-[7px] translate-y-[3px] bg-[#00E5FF]/80" />
        </p>
        {data.lines.map((line) => (
          <p key={line} data-out className="text-[#7ee0a3]">
            {line}
          </p>
        ))}
        <p data-out aria-hidden className="pt-1 text-white/25">
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        </p>
        <p data-out className="font-bold text-[#F5C842]">
          {data.result}
        </p>
        <div data-out className="space-y-0.5 pt-1">
          {data.meta.map(([k, v]) => (
            <p key={k} className="text-white/50">
              <span className="inline-block min-w-[7.5rem] text-white/35">{k}</span>: {v}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
