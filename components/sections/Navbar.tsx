"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, EASE, DUR, prefersReducedMotion } from "@/lib/gsap";
import { NAV_LINKS, SITE } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { HEADLINE_SM, META } from "@/components/ui/type";

/**
 * Floating black pill navbar (farce-style): a detached rounded-full dark
 * bar centered near the top of the viewport, constant in both themes.
 * Below lg the links collapse into a full-screen overlay menu.
 *
 * Type note: nav links are sentence-case sans, not uppercase mono. Uppercase
 * is rationed to the section kicker and card micro-type — a bar of tracked-out
 * caps is the loudest template tell there is.
 */
export function Navbar() {
  const rootRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
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

  /* Navbar load entrance */
  useGSAP(
    () => {
      gsap.from(navRef.current, {
        yPercent: -150,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 1.2,
        clearProps: "all",
      });
    },
    { scope: rootRef, dependencies: [] },
  );

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
            ease: EASE.out,
            stagger: 0.05,
            clearProps: "all",
          },
          0.05,
        )
        .from(
          "[data-menu-extra]",
          {
            y: 15,
            autoAlpha: 0,
            duration: DUR.fast,
            ease: EASE.out,
            clearProps: "all",
          },
          0.15,
        );
    },
    { scope: rootRef, dependencies: [open] },
  );

  return (
    <header
      ref={rootRef}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5"
    >
      {/* Theme-aware pill */}
      <nav
        ref={navRef}
        aria-label="Primary"
        className="mx-auto flex h-[58px] w-full max-w-4xl items-center justify-between rounded-full border border-line bg-card/90 pl-6 pr-2 shadow-xl shadow-black/5 backdrop-blur-xl"
      >
        <a
          href="#"
          aria-label="STAIL — back to top"
          onClick={() => setOpen(false)}
          className="shrink-0"
        >
          <Logo className="h-[22px] w-auto sm:h-6" priority />
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative text-sm font-normal tracking-body text-muted transition-colors duration-200 hover:text-ink"
              >
                {link.label}
                <span
                  aria-hidden
                  className="absolute inset-x-0 -bottom-1.5 h-px origin-left scale-x-0 bg-ink/50 transition-transform duration-200 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <span className="hidden lg:block">
            <Button href={SITE.calendly} external variant="primary">
              Book a call
            </Button>
          </span>

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
              className={`h-[1.5px] w-6 rounded-full bg-ink transition-transform duration-300 ${
                open ? "translate-y-[3.75px] rotate-45" : ""
              }`}
            />
            <span
              aria-hidden
              className={`h-[1.5px] w-6 rounded-full bg-ink transition-transform duration-300 ${
                open ? "-translate-y-[3.75px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-0 -z-10 flex flex-col justify-between overflow-y-auto bg-bg px-5 pb-6 pt-24 sm:px-8 sm:pb-8 sm:pt-28 lg:hidden"
        >
          <nav aria-label="Mobile">
            <ul className="flex flex-col">
              {NAV_LINKS.map((link, i) => (
                <li key={link.href} className="overflow-hidden">
                  <a
                    data-menu-item
                    href={link.href}
                    onClick={closeMenu}
                    className={`${HEADLINE_SM} flex items-baseline gap-4 py-2 text-ink transition-colors duration-200 hover:text-accent`}
                  >
                    <span aria-hidden className={`${META} tabular text-muted`}>
                      0{i + 1}
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div data-menu-extra className="flex flex-col gap-4 pt-6 sm:gap-6">
            <p className={`${META} text-muted`}>{SITE.legalName}</p>
            <Button
              href={SITE.calendly}
              external
              variant="primary"
              arrow="nudge"
              className="w-fit"
            >
              Book a strategy call
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
