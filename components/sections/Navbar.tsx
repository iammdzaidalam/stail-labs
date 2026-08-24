"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, EASE, DUR, prefersReducedMotion } from "@/lib/gsap";
import { NAV_LINKS, SITE } from "@/lib/data";
import { Logo } from "@/components/ui/Logo";

/**
 * Floating black pill navbar (farce-style): a detached rounded-full dark
 * bar centered near the top of the viewport, constant in both themes.
 * Below lg the links collapse into a full-screen overlay menu.
 */
export function Navbar() {
  const rootRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  /** Closing unmounts the overlay, so focus must be handed back explicitly. */
  const closeMenu = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  /* While the overlay is open: lock scroll, close on Escape / desktop resize. */
  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add("overflow-hidden");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      document.documentElement.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, [open]);

  /* Staggered entrance for the overlay links each time the menu opens. */
  useGSAP(
    () => {
      if (!open || prefersReducedMotion()) return;
      gsap
        .timeline()
        .from(
          "[data-menu-item]",
          {
            yPercent: 110,
            duration: DUR.base,
            ease: EASE.expo,
            stagger: 0.07,
          },
          0.05,
        )
        .from(
          "[data-menu-extra]",
          { y: 20, autoAlpha: 0, duration: DUR.fast, ease: EASE.out },
          "-=0.45",
        );
    },
    { scope: rootRef, dependencies: [open] },
  );

  return (
    <header ref={rootRef} className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-[58px] w-full max-w-4xl items-center justify-between rounded-full border border-white/10 bg-[#0b0d12]/92 pl-6 pr-2 shadow-xl shadow-black/20 backdrop-blur-xl"
      >
        <a
          href="#"
          aria-label="STAIL — back to top"
          onClick={() => setOpen(false)}
          className="shrink-0"
        >
          <Logo className="h-[22px] w-auto sm:h-6" priority variant="white" />
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative font-mono text-[11px] uppercase tracking-[0.16em] text-white/60 transition-colors duration-300 hover:text-white"
              >
                {link.label}
                <span
                  aria-hidden
                  className="absolute inset-x-0 -bottom-1.5 h-px origin-left scale-x-0 bg-[#00E5FF] transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <a
            href={SITE.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center rounded-full bg-[#00E5FF] px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#04121a] transition-colors duration-300 hover:bg-white lg:inline-flex"
          >
            Book a Call
          </a>

          <button
            ref={toggleRef}
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            /* Only reference the overlay while it is actually mounted. */
            aria-controls={open ? "mobile-menu" : undefined}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span
              aria-hidden
              className={`h-[1.5px] w-6 rounded-full bg-white transition-transform duration-300 ${
                open ? "translate-y-[3.75px] rotate-45" : ""
              }`}
            />
            <span
              aria-hidden
              className={`h-[1.5px] w-6 rounded-full bg-white transition-transform duration-300 ${
                open ? "-translate-y-[3.75px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-0 -z-10 flex flex-col justify-between bg-bg px-5 pb-10 pt-[110px] sm:px-8 lg:hidden"
        >
          <nav aria-label="Mobile">
            <ul className="flex flex-col">
              {NAV_LINKS.map((link, i) => (
                <li key={link.href} className="overflow-hidden">
                  <a
                    data-menu-item
                    href={link.href}
                    onClick={closeMenu}
                    className="flex items-baseline gap-4 py-2 text-4xl font-medium tracking-tight text-ink transition-colors duration-300 hover:text-accent"
                  >
                    <span
                      aria-hidden
                      className="font-mono text-[11px] tracking-[0.18em] text-muted"
                    >
                      0{i + 1}
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div data-menu-extra className="flex flex-col gap-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              {SITE.legalName}
            </p>
            <a
              href={SITE.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center rounded-full bg-[#00E5FF] px-7 py-3.5 font-mono text-[13px] font-bold uppercase tracking-[0.14em] text-[#04121a] transition-colors duration-300 hover:bg-ink hover:text-bg"
            >
              Book Strategy Call
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
