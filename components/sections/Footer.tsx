import { Logo } from "@/components/ui/Logo";
import { FOOTER, NAV_LINKS, SITE } from "@/lib/data";

/*
 * Dark mega-footer (WeHexa-style): a floating rounded ink panel inset from
 * the page edges. Big brand block + Calendly arrow-chip CTA on the left,
 * mono-labelled link columns on the right, hairline divider, copyright row.
 * Always-dark surface — explicit hex per spec, constant in both themes.
 */

const columnLabel =
  "font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white/40";

export function Footer() {
  return (
    <footer className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="mx-auto max-w-[1400px] rounded-[2rem] border border-white/10 bg-[#0b0d12] px-8 py-14 text-white sm:px-12 sm:py-16">
        <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1.1fr] lg:gap-10">
          {/* ——— Brand block ——— */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo variant="white" className="h-9 w-auto sm:h-11" />
            <p className="mt-6 max-w-sm font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-white/50">
              {FOOTER.tagline}
            </p>
            <a
              href={SITE.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 inline-flex items-center gap-2.5 rounded-full bg-white py-2 pl-7 pr-2 font-mono text-[13px] font-bold uppercase tracking-[0.14em] text-[#0b0d12] transition-colors duration-300 select-none hover:bg-[#00E5FF]"
            >
              Book Strategy Call
              <span
                aria-hidden
                className="grid h-9 w-9 place-items-center rounded-full bg-[#0b0d12] text-sm text-[#00E5FF] transition-transform duration-300 group-hover:rotate-45"
              >
                ↗
              </span>
            </a>
          </div>

          {/* ——— Pages ——— */}
          <nav aria-label="Footer">
            <p className={columnLabel}>Pages</p>
            <ul className="mt-6 flex flex-col gap-3.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[15px] text-white/60 transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ——— Contact ——— */}
          <div>
            <p className={columnLabel}>Contact</p>
            <address className="mt-6 not-italic">
              <p className="text-[15px] leading-relaxed text-white/60">
                {SITE.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <a
                href={SITE.phoneHref}
                className="mt-5 inline-block font-mono text-sm text-white/60 transition-colors duration-300 hover:text-white"
              >
                {SITE.phone}
              </a>
            </address>
          </div>
        </div>

        {/* ——— Hairline + copyright ——— */}
        <div className="mt-14 border-t border-white/10 pt-7 sm:mt-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">
            {FOOTER.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
