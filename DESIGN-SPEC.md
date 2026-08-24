# STAIL redesign — build spec v2 "Editorial Sky" (all agents follow exactly)

References: WeHexa (sky hero card, /Our Service cards, dark mega-footer),
farce (floating black pill nav, big rounded image banner, serif-italic accent
words, cool gray page), Supaste (vivid panel in dark surround, serif italic
line), Aeline (floating fanned mini-cards, bento stats, mono kickers).

The aesthetic: **airy light-gray editorial page · white rounded cards ·
large rounded imagery panels · serif-italic accent words · one dark panel
moment · vivid cyan only as small accents**. Theme still follows
`prefers-color-scheme` ONLY (no toggle). Dark mode = same components with
token colors flipped; imagery panels and explicit-hex cards stay identical.

## Hard rules (unchanged from v1)

- Tailwind utilities only; token classes below; copy comes from `@/lib/data`.
- Shared primitives from `@/components/ui/*`; client components only where
  interaction/animation demands; `useGSAP({ scope })`; every scroll animation
  behind `prefersReducedMotion()` (primitives handle it).
- Responsive 360→1440+; semantic HTML; keyboard accessible; no layout shift;
  content visible without JS (gsap.from only).
- No new npm deps. No emoji. **No decorative glyph tiles (◆▲●■) — v2 kills
  them; use mono index numbers or nothing.** `next/image` for real imagery.

## Tokens

Colors: `bg-bg` #f0f1f3 light / #05070d dark · `bg-elev` · `bg-card` ·
`text-ink` · `text-ink-2` · `text-muted` · `border-line` / `border-line-strong`
· `text-accent` / `bg-accent-soft` (tinted chips) · `bg-accent-raw` (#00B8D9
light / #00E5FF dark — vivid pill fills) · gold for rare highlights.
Explicit hex allowed ONLY inside always-dark panels (`#0b0d12` surfaces,
`#00E5FF` accents, white/near-white text) and always-light cards sitting on
imagery — comment the exception.

Radii: cards `rounded-card` (1.25rem) or `rounded-2xl`; **major panels
(imagery, dark footer, flagship) `rounded-[2rem]`** (sm: may be 1.5rem).
Fonts: `font-sans` (Space Grotesk) · `font-mono` (labels/numbers) ·
`font-serif` via the `Accent` component only.

## The serif accent (signature move)

`import { Accent } from "@/components/ui/Accent"` — wraps a word/phrase in
Instrument Serif italic. Every section heading is **sentence case** with ONE
Accent phrase. TextReveal supports nested elements; single-line headings may
use FadeIn instead. Exact headings:

- About: `An AI research & product lab building <Accent>sovereign AI</Accent> for India`
- Products: `11 sovereign AI <Accent>products</Accent>`
- Process: `Our delivery <Accent>process</Accent>`
- Industries: `Built for <Accent>critical sectors</Accent>`
- Solutions: `Tailored for <Accent>every stage</Accent>`
- Services: `Full-stack AI <Accent>partnership</Accent>`
- Advantages: `Why choose <Accent>STAIL</Accent>`
- Studio: three stacked lines, last line `<Accent>AI storytelling.</Accent>`
- Research: `AI research at <Accent>STAIL</Accent>`
- Case study: `AI in <Accent>action</Accent>`
- Careers: `Build India's AI <Accent>future</Accent>`
- Contact: `Let's build India's AI future, <Accent>together</Accent>`
- Footer CTA: `Sovereign AI. <Accent>India's future.</Accent>`

Heading scale: `text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight
text-ink`. Kicker: `<SectionLabel>`. Sub copy: `text-muted max-w-xl
leading-relaxed`. Section rhythm: `py-24 sm:py-32`.

## Buttons

Primary dark pill: `rounded-full bg-ink text-bg hover:bg-accent-raw
hover:text-[#04121a]` mono uppercase 13px, px-7 py-3.5. Vivid pill:
`bg-accent-raw text-[#04121a] hover:bg-ink hover:text-bg`. Arrow-chip
variant (hero/footer CTAs): pill with trailing `h-9 w-9 rounded-full` circle
containing ↗ that rotates 45° on group-hover. On imagery: white pill
(`bg-white text-[#0b0d12]`) and glass pill (`bg-white/15 border-white/45
backdrop-blur-md text-white`).

## Imagery panels

Wrap in `px-3 sm:px-5` then `relative mx-auto max-w-[1400px] overflow-hidden
rounded-[1.5rem] sm:rounded-[2rem]` with `<Image fill className="object-cover">`
+ optional gradient scrim. Assets: `/img/hero-sky.jpg` (hero),
`/img/contact-sky.jpg` (contact). Cards ON imagery are explicitly white
(`bg-white text-[#0b0d12]`) with `shadow-2xl shadow-[#0d2f5e]/35`.

## Cards

White card: `rounded-card border border-line bg-card p-7 sm:p-8
transition-colors hover:border-line-strong`. Dark feature card (one per
grid, WeHexa-style): `rounded-card bg-[#0b0d12] text-white` — body
`text-white/60`, accents `#00E5FF`. Chips: `rounded-full border border-line
bg-accent-soft px-3.5 py-1.5 font-mono text-[11px] uppercase
tracking-[0.14em] text-accent`.
