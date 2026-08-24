# STAIL — stail.co.in

Production redesign of [stail.co.in](https://stail.co.in) for ShivTrinetrix AI
Labs (STAIL). Single-page marketing site.

## Stack

- **Next.js 16** (App Router, TypeScript) + **Tailwind CSS v4**
- **GSAP** (ScrollTrigger + SplitText) for scroll animations
- **Lenis** for smooth scrolling (synced to GSAP's ticker)
- **Motion** (framer-motion v13) for tab/micro interactions

## Design system — "Editorial Sky" (v2)

`DESIGN-SPEC.md` is the contract every section follows. In short: an airy
light-gray page, white rounded cards, large rounded imagery panels, a
serif-italic accent phrase in every heading (`components/ui/Accent.tsx`,
Instrument Serif), exactly one always-dark panel per area, and vivid cyan
used only for small accents. A floating black pill navbar sits over it all.

Typography: Space Grotesk (UI) · Space Mono (labels/numbers) · Instrument
Serif (accents only).

### Imagery

`public/img/hero-sky.jpg` and `public/img/contact-sky.jpg` are generated
procedurally (painterly sky + bokeh wildflower meadow) rather than licensed
stock, so there is no attribution or licensing risk. Regenerate with:

```bash
python3 -m venv .venv && .venv/bin/pip install numpy pillow
.venv/bin/python scripts/generate-sky.py
```

Tune the `make_sky()` seeds and parameters to taste, or swap in real
photography by replacing these two files at the same paths/aspect ratios.

## Behavior

- **Theme** follows `prefers-color-scheme` only — black logo on the light
  theme, white logo on the dark theme. There is intentionally no toggle.
- All copy lives in `lib/data.ts`; sections in `components/sections/`;
  shared animation primitives in `components/ui/`.
- All animations respect `prefers-reduced-motion` (Lenis disabled, reveals
  render static).

## Contact form

`app/api/contact/route.ts` — zod-validated, honeypot field, per-IP rate
limiting, delivers via [Resend](https://resend.com). Configure:

```bash
cp .env.example .env.local   # then fill RESEND_API_KEY + CONTACT_TO_EMAIL
```

Unconfigured, the form responds 503 and the UI falls back to Calendly/phone.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Security

Strict security headers (CSP, HSTS, X-Frame-Options DENY, nosniff,
Permissions-Policy) are set in `next.config.ts`. Fonts are self-hosted via
`next/font`, so the CSP needs no third-party origins.
