import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { SITE } from "@/lib/data";
import "./globals.css";

/*
 * Type system.
 *
 * `display` is the single swappable knob for the whole site's voice — every
 * heading and every line of body copy resolves through `--font-display`.
 * Geist is a neutral Swiss grotesque; it stays quiet so the Instrument Serif
 * italic accent words carry the personality.
 */
const display = Geist({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  // The design never sets a weight above 500 — size and tracking do the work,
  // so the heavier faces are simply not downloaded.
  weight: ["300", "400", "500"],
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

/*
 * Accent face — used ONLY by <Accent> for one italic phrase per heading.
 * Instrument Serif ships a single weight with a true italic, which is exactly
 * the constraint we want: it can never be pressed into service as body copy.
 */
const serif = Instrument_Serif({
  variable: "--font-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  keywords: [
    "Sovereign AI",
    "AI India",
    "Enterprise AI",
    "Government AI",
    "Mining AI",
    "Private LLM",
    "AI Infrastructure",
    "STAIL",
    "ShivTrinetrix AI Labs",
  ],
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "en_IN",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "STAIL — India's Sovereign AI Future" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eef0f4" },
    { media: "(prefers-color-scheme: dark)", color: "#06080c" },
  ],
  width: "device-width",
  initialScale: 1,
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.legalName,
  alternateName: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/brand/stail-black.png`,
  telephone: SITE.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Om Chambers, 648/A, 4th Floor, Binnamangala 1st Stage, Indiranagar",
    addressLocality: "Bangalore",
    addressRegion: "Karnataka",
    postalCode: "560038",
    addressCountry: "IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${mono.variable} ${serif.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
