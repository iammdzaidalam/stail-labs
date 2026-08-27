import { FLAGSHIP, PRODUCTS } from "@/lib/data";
import { Section, SectionLabel } from "@/components/ui/Section";
import { FadeIn, TextReveal } from "@/components/ui/Reveal";
import { Accent } from "@/components/ui/Accent";
import { Button } from "@/components/ui/Button";
import {
  BODY,
  BODY_SM,
  HEADLINE,
  LEAD,
  META,
  TITLE,
  TITLE_LG,
} from "@/components/ui/type";

/*
 * Products — the flagship TMI panel plus a 10-product grid closed by a
 * bespoke-build CTA.
 *
 * Two things are load-bearing here:
 *
 *  1. ONE dark surface. The page's dark-panel budget is three (hero azure,
 *     Research, final CTA + footer) and none of them is this section, so the
 *     flagship panel spends the section's entire allowance. The portfolio
 *     cards below it are all light — a second near-black card 16px under a
 *     700px near-black panel read as one smeared surface with a white seam
 *     through it.
 *
 *  2. ONE reveal per panel. `autoAlpha:0` reserves layout, so the previous
 *     two FadeIns inside the flagship left its bottom half as a
 *     content-sized hole while the top half was already on screen.
 */

/**
 * Section-local copy — this text does not exist in `@/lib/data` (it was
 * written for this section rather than ported from the old site), so it lives
 * here per the spec's data rule. The heading itself is inline so the single
 * <Accent> phrase stays visible in the markup.
 */
const PORTFOLIO = {
  label: "Product Portfolio",
  sub: "Purpose-built AI platforms designed for security, sovereignty, and scale across India's most critical sectors.",
  cta: {
    eyebrow: "Something else?",
    line: "Your sector's sovereign AI, purpose-built by STAIL.",
    action: "Talk to us",
  },
} as const;

export function Products() {
  return (
    <Section id="products" className="py-24 sm:py-28 lg:py-32">
      <SectionLabel>{PORTFOLIO.label}</SectionLabel>
      <TextReveal className={`${HEADLINE} mt-4`}>
        11 sovereign AI <Accent>products</Accent>
      </TextReveal>
      <FadeIn delay={0.15} className="mt-5">
        <p className={`${LEAD} max-w-xl`}>{PORTFOLIO.sub}</p>
      </FadeIn>

      {/*
       * Flagship: the section's only dark surface. Explicit hex per the
       * spec's always-dark-panel exception — #0a0c10 ground with alpha-white
       * type, identical in both themes.
       */}
      <FadeIn className="mt-12 sm:mt-16">
        <article className="rounded-[1.5rem] border border-white/10 bg-[#0a0c10] p-8 sm:rounded-[2rem] sm:p-12">
          <p
            className={`${META} inline-flex items-center rounded-full border border-gold/25 bg-gold-soft px-3.5 py-1.5 text-gold`}
          >
            {FLAGSHIP.badge}
          </p>

          <h3 className={`${TITLE_LG} mt-5 text-white`}>{FLAGSHIP.name}</h3>

          <p className={`${LEAD} mt-4 max-w-2xl text-white/70`}>
            {FLAGSHIP.tagline}
          </p>
          <p className={`${BODY} mt-4 max-w-2xl text-white/55`}>
            {FLAGSHIP.body}
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {FLAGSHIP.modules.map((mod) => (
              <div
                key={mod.name}
                className="rounded-tile border border-white/10 bg-white/[0.04] p-5 transition-colors duration-200 hover:border-white/25"
              >
                <h4 className={`${TITLE} text-white`}>{mod.name}</h4>
                <p className={`${BODY_SM} mt-2 text-white/50`}>{mod.features}</p>
              </div>
            ))}
          </div>
        </article>
      </FadeIn>

      {/*
       * Portfolio grid: products 02–11 plus the CTA. The CTA spans two
       * columns, so 10 + 2 = 12 cells fills the 3-col and 2-col layouts
       * exactly — no ragged final row at any breakpoint.
       */}
      <FadeIn
        stagger={0.06}
        className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        {PRODUCTS.map((product, i) => {
          const index = String(i + 2).padStart(2, "0");
          return (
            <article
              key={product.name}
              className="group flex flex-col gap-3 rounded-card border border-line bg-card p-7 transition-colors duration-200 hover:border-line-strong"
            >
              <div className="flex items-baseline justify-between gap-3">
                <p
                  className={`${META} text-muted transition-colors duration-200 group-hover:text-accent`}
                >
                  {product.category}
                </p>
                <span aria-hidden className={`${META} tabular text-muted/60`}>
                  {index}
                </span>
              </div>
              <h3 className={TITLE}>{product.name}</h3>
              <p className={`${BODY} flex-1`}>{product.body}</p>
              <p className={`${META} mt-2 text-muted/70`}>
                {product.tags.join(" · ")}
              </p>
            </article>
          );
        })}

        {/*
         * The section's single saturated fill. Not a link itself — it carries
         * a real <Button>, so the affordance is the shared pill rather than a
         * hand-rolled chip, and a card-sized anchor never swallows the label.
         */}
        <div className="flex flex-col justify-between gap-8 rounded-card bg-accent-raw p-7 text-white sm:col-span-2">
          <p className={`${META} text-white/70`}>{PORTFOLIO.cta.eyebrow}</p>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <p className={`${TITLE_LG} max-w-md`}>{PORTFOLIO.cta.line}</p>
            <Button href="#contact" variant="onPanel" arrow="chip">
              {PORTFOLIO.cta.action}
            </Button>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}
