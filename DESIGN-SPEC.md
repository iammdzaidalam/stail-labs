# STAIL build spec v3 — "Editorial Azure"

Derived from a forensic read of the four references: **Ramp** (TWK Lausanne,
weight-400 everything, zero shadows, chroma as a rounding error),
**claude-brief.textura.agency** (single reading column, inverted tracking ramp,
three-layer ambient shadow), **farce** (floating black pill nav, serif-italic
accent word, cool page), **Aeline / Supaste** (saturated media panel, fanned
product mini-cards, one serif-italic display line).

**Every agent follows this exactly. Do not invent a size, weight, colour,
radius or tracking value that is not listed here.**

---

## 0. The five rules that matter most

These are what separate the references from generated marketing pages. If a
change conflicts with anything below, these win.

1. **Nothing is bold.** Display and section headings are **weight 400**. Card
   titles are **500**. There is no `font-bold` and no `font-semibold` anywhere
   on this site. Hierarchy comes from **size, colour-alpha and space** — never
   from weight.
2. **Uppercase is rationed.** Uppercase + positive tracking is the single
   loudest template tell. It is allowed ONLY for the section kicker
   (`<SectionLabel>`) and card eyebrow/meta micro-type (`META`). Buttons, nav
   links, tags, footer links and body copy are **sentence case**.
3. **One accent hue, used sparingly.** Azure. Outside the hero and contact
   panels it appears only as small marks and at most **one** saturated fill per
   section. It is never a heading colour and never a border colour.
4. **Rules are alpha, never grey hex.** `border-line` / `border-line-strong` /
   `border-white/10`. Always 1px. No 2px, no rings, no double borders.
5. **Subtract.** No faux terminals, no macOS traffic-light dots, no emoji, no
   glyph ornament (`✦ ◆ ▲ ● ■ ▸`), no outlined ghost text, no magnetic
   buttons, no decorative tilts, no radial "glow" overlays.

---

## 1. Type — import from `@/components/ui/type`

Never hand-roll a size/weight/tracking combination. Compose from these:

| Constant | Use |
|---|---|
| `DISPLAY` | hero h1 only |
| `HEADLINE` | section h2 |
| `HEADLINE_SM` | h2 inside a card or dark panel |
| `TITLE` | card / row h3 |
| `TITLE_LG` | feature + flagship card h3 |
| `LEAD` | sub-copy directly under a section heading |
| `BODY` | body copy in cards and rows |
| `BODY_SM` | dense card footers, captions |
| `LABEL` | section kicker (via `<SectionLabel>`) |
| `META` | card eyebrows, meta rows, tag lists |
| `NUMERAL` | stats, counters, indices — always tabular |

Fonts: `font-sans` → **Geist** (300/400/500 only) · `font-mono` → **Geist Mono**
· `font-serif` → **Instrument Serif italic**, reachable ONLY through `<Accent>`.

**Tracking rides an optical curve**, already encoded in the `tracking-*`
tokens: `-0.035em` at display → `-0.01em` at body → **inverts** to `+0.08em`
/ `+0.12em` for uppercase micro-type. Never use Tailwind's `tracking-tight`,
`tracking-wide`, or an arbitrary `tracking-[…]`.

### The serif accent

Sentence case heading, **exactly one** `<Accent>` phrase, never more:

| Section | Heading |
|---|---|
| About | `An AI research & product lab building <Accent>sovereign AI</Accent> for India` |
| Products | `11 sovereign AI <Accent>products</Accent>` |
| Process | `Our delivery <Accent>process</Accent>` |
| Industries | `Built for <Accent>critical sectors</Accent>` |
| Solutions | `Tailored for <Accent>every stage</Accent>` |
| Services | `Full-stack AI <Accent>partnership</Accent>` |
| Advantages | `Why choose <Accent>STAIL</Accent>` |
| Studio | three stacked lines, last is `<Accent>AI storytelling.</Accent>` |
| Research | `AI research at <Accent>STAIL</Accent>` |
| Case study | `AI in <Accent>action</Accent>` |
| Careers | `Build India's AI <Accent>future</Accent>` |
| Contact | `Let's build India's AI future, <Accent>together</Accent>` |
| Footer CTA | `Sovereign AI. <Accent>India's future.</Accent>` |

Never italicise the STAIL brand name itself.

---

## 2. Colour

Tokens only: `bg-bg` · `bg-elev` · `bg-card` · `text-ink` · `text-ink-2` ·
`text-muted` · `border-line` · `border-line-strong` · `text-accent` ·
`bg-accent-raw` · `bg-accent-soft`.

Literal hex is allowed **only** inside an always-dark panel (`#0a0c10`
surfaces, white/alpha-white text) or on a card sitting on the azure panel —
and must carry a comment naming the exception. `#00E5FF`, `#0b0d12`,
`#F5C842`, `#5a6478`, `#123a7a`, `#0d2f5e`, `#7ee0a3` are **retired**.

**Dark-panel budget: three for the whole page.** The hero azure panel, the
Research band, and the combined final-CTA + footer. Everything else is a light
card on the light page. (v2 shipped eight, which is why the page read as
striped.)

---

## 3. Layout

- Container: `<Section>` → `max-w-6xl px-5 sm:px-8 lg:px-10`. Full-bleed
  panels use `px-3 sm:px-5` + `max-w-[1400px]`.
- **Section rhythm is uniform: `py-24 sm:py-28 lg:py-32`.** No section deviates.
  Heading → sub is `mt-5`. Heading block → content is `mt-12 sm:mt-16`.
- Grid gaps: `gap-4` for card grids, `gap-3` for dense tile grids.
- Radii: cards `rounded-card` (1.25rem) · tiles `rounded-tile` (0.875rem) ·
  major panels `rounded-[1.5rem] sm:rounded-[2rem]`. Nothing else.

---

## 4. Depth

Ramp ships **zero** drop shadows; textura uses a three-layer ambient lift. We
split the difference:

- Cards on the **light page**: no shadow. Separation comes from `bg-card`
  against `bg-bg` plus a 1px `border-line`.
- Cards on the **azure panel** only: `shadow-onpanel` (inset white rim +
  hairline ring + large-negative-spread ambient). Never `shadow-2xl`.

---

## 5. Buttons — `@/components/ui/Button`

The only button. Never hand-roll a pill. Sentence case, weight 500, `h-12`,
`rounded-full`. Variants: `primary` · `accent` · `ghost` · `onPanel` ·
`glass` · `onDark` · `onDarkGhost`. Arrow: `none` | `nudge` (3px) |
`chip` (rotates 45°).

---

## 6. Motion

One curve for the whole site: **easeOutCubic** (`EASE.out` → `power2.out`).

- Reveals: 0.8–0.9s, travel ≤ 18px, stagger 0.06s, one-shot.
- Never `back.out`, `elastic`, `expo`, `bounce`, or a scale/rotate reveal.
- Every scroll animation sits behind `prefersReducedMotion()` — the primitives
  handle it. Content must be fully visible with JS disabled (`gsap.from` only).
- No pinning and no scrubbed horizontal scrollers. They reserve large empty
  scroll blocks and none of the references use one.
- `autoAlpha:0` reserves layout space, so a stranded reveal leaves a
  content-sized **hole**. Never nest a `FadeIn` inside another `FadeIn`, and
  never put more than one reveal inside a single panel.

---

## 7. Hard constraints

- Tailwind utilities only; copy comes from `@/lib/data`; primitives from
  `@/components/ui/*`.
- `"use client"` only where interaction or animation demands it.
- No new npm dependencies. No new raster assets.
- Responsive 360 → 1440+. Semantic HTML. Keyboard accessible. No layout shift.
- Real typographic characters: `—` `·` `'` `©`. Never `->`, never `...`.
