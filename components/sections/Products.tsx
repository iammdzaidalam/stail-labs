import { FLAGSHIP, PRODUCTS } from "@/lib/data";
import { Section, SectionLabel } from "@/components/ui/Section";
import { FadeIn, TextReveal } from "@/components/ui/Reveal";
import { Accent } from "@/components/ui/Accent";

/*
 * Products — flagship TMI dark panel + 10-product grid with one dark
 * feature card (WeHexa-style) and a vivid CTA card closing the grid.
 */

/**
 * Section-local copy — this header text does not exist in `@/lib/data`
 * (ported from the old site), so it lives here per the spec's data rule.
 * The heading itself is written inline with <Accent> per the v2 spec.
 */
const PORTFOLIO = {
  label: "Product Portfolio",
  sub: "Purpose-built AI platforms designed for security, sovereignty, and scale across India's most critical sectors.",
} as const;

export function Products() {
  return (
    <Section id="products" className="py-24 sm:py-32 lg:py-40">
      <SectionLabel>{PORTFOLIO.label}</SectionLabel>
      <TextReveal className="mt-4 text-4xl font-medium tracking-tight text-ink sm:text-5xl lg:text-6xl">
        11 sovereign AI <Accent>products</Accent>
      </TextReveal>
      <FadeIn delay={0.15}>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {PORTFOLIO.sub}
        </p>
      </FadeIn>

      {/*
       * Flagship: full-width always-dark panel — explicit hex per spec's
       * dark-panel exception (#0b0d12 ground, #00E5FF accent, #F5C842 gold).
       */}
      <article className="mt-14 rounded-[2rem] border border-white/10 bg-[#0b0d12] p-8 sm:mt-16 sm:p-12">
        <FadeIn className="flex flex-col items-start gap-5">
          <p className="inline-flex items-center rounded-full border border-[#F5C842]/25 bg-[#F5C842]/12 px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#F5C842]">
            {FLAGSHIP.badge}
          </p>
          <h3 className="text-3xl font-medium tracking-tight text-white sm:text-5xl">
            {FLAGSHIP.name}
          </h3>
          <p className="font-mono text-sm uppercase tracking-[0.18em] text-[#00E5FF]">
            {FLAGSHIP.tagline}
          </p>
          <p className="max-w-2xl leading-relaxed text-white/60">{FLAGSHIP.body}</p>
        </FadeIn>

        <FadeIn stagger={0.06} className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FLAGSHIP.modules.map((mod) => (
            <div
              key={mod.name}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors duration-300 hover:border-white/25"
            >
              <h4 className="font-mono text-sm font-bold text-white">{mod.name}</h4>
              <p className="mt-2 text-[13px] leading-relaxed text-white/50">
                {mod.features}
              </p>
            </div>
          ))}
        </FadeIn>
      </article>

      {/* Portfolio grid: products 02–11 (first card is the dark feature card) */}
      <FadeIn stagger={0.06} className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((product, i) => {
          const index = String(i + 2).padStart(2, "0");
          /* One dark accent card per grid (WeHexa-style) — always-dark, so
             explicit hex is allowed here per spec. */
          const dark = i === 0;
          return (
            <article
              key={product.name}
              className={`group flex flex-col gap-3 rounded-card p-7 transition duration-300 hover:-translate-y-0.5 ${
                dark
                  ? "border border-white/10 bg-[#0b0d12] text-white"
                  : "border border-line bg-card hover:border-line-strong"
              }`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <p
                  className={`font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                    dark ? "text-[#00E5FF]" : "text-muted group-hover:text-accent"
                  }`}
                >
                  {product.category}
                </p>
                <span
                  aria-hidden
                  className={`font-mono text-[11px] leading-none ${
                    dark ? "text-white/30" : "text-muted/50"
                  }`}
                >
                  {index}
                </span>
              </div>
              <h3 className={`text-xl font-medium ${dark ? "text-white" : "text-ink"}`}>
                {product.name}
              </h3>
              <p
                className={`flex-1 text-sm leading-relaxed ${
                  dark ? "text-white/60" : "text-muted"
                }`}
              >
                {product.body}
              </p>
              <p
                className={`mt-2 font-mono text-[10.5px] uppercase tracking-wide ${
                  dark ? "text-white/40" : "text-muted/70"
                }`}
              >
                {product.tags.join(" · ")}
              </p>
            </article>
          );
        })}

        {/* Fills the final grid row: CTA card for bespoke builds */}
        <a
          href="#contact"
          className="group flex flex-col justify-between gap-6 rounded-card bg-accent-raw p-7 text-[#04121a] transition-colors duration-300 hover:bg-ink hover:text-bg sm:col-span-2 lg:col-span-2"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] opacity-70">
            Something else?
          </p>
          <div className="flex items-end justify-between gap-6">
            <p className="max-w-md text-xl font-medium leading-snug sm:text-2xl">
              Your sector&apos;s sovereign AI, purpose-built by STAIL.
            </p>
            <span
              aria-hidden
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#04121a]/10 text-lg transition-transform duration-300 group-hover:rotate-45"
            >
              ↗
            </span>
          </div>
        </a>
      </FadeIn>
    </Section>
  );
}
