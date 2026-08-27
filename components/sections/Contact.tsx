
import { Section, SectionLabel } from "@/components/ui/Section";
import { TextReveal, FadeIn } from "@/components/ui/Reveal";
import { Accent } from "@/components/ui/Accent";
import { CONTACT, SITE } from "@/lib/data";
import { ContactForm } from "./ContactForm";
import { PixelatedImage } from "@/components/ui/OsmoTransitions";

/*
 * Contact — split layout: office details + Calendly CTA sitting on a sky
 * imagery panel (white card + glass card), the enquiry form in a plain
 * white card alongside. Cards on imagery use explicit hex — they stay
 * light in both themes.
 */

const microLabel = "font-mono text-[11px] uppercase tracking-[0.16em]";

export function Contact() {
  return (
    <Section id="contact" className="py-24 sm:py-32">
      <SectionLabel>{CONTACT.label}</SectionLabel>
      <TextReveal className="mt-4 max-w-3xl text-4xl font-medium tracking-tight text-ink sm:text-5xl lg:text-6xl">
        Let&apos;s build India&apos;s AI future, <Accent>together</Accent>
      </TextReveal>
      <FadeIn delay={0.15}>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {CONTACT.sub}
        </p>
      </FadeIn>

      <div className="mt-14 grid gap-4 sm:mt-16 sm:gap-5 lg:grid-cols-[1fr_1.15fr]">
        {/* ——— Sky panel: office card + Calendly glass card ——— */}
        <FadeIn className="h-full">
          <div className="relative flex h-full flex-col gap-4 overflow-hidden rounded-[2rem] p-4 sm:gap-5 sm:p-6">
            <PixelatedImage
              src="/img/contact-sky.jpg"
              alt=""
              className="object-cover"
            />
            {/* soft scrim for card + type contrast */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-b from-[#123a7a]/20 via-transparent to-transparent"
            />

            {/* Always-light card on imagery — explicit hex per spec */}
            <div className="relative rounded-2xl bg-white p-6 text-[#0b0d12] shadow-2xl shadow-[#0d2f5e]/35 sm:p-7">
              <p className={`${microLabel} text-[#5a6478]`}>Organization</p>
              <p className="mt-2 font-medium">{SITE.legalName}</p>

              <p className={`${microLabel} mt-6 text-[#5a6478]`}>Head office</p>
              <address className="mt-2 text-sm not-italic leading-relaxed text-[#5a6478]">
                {SITE.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <a
                href={SITE.phoneHref}
                className="mt-4 block w-fit font-mono text-sm transition-colors duration-300 hover:text-[#00B8D9]"
              >
                {SITE.phone}
              </a>
            </div>

            {/* White-on-glass Calendly card on imagery — explicit hex per spec */}
            <div className="relative mt-auto rounded-2xl border border-white/40 bg-white/15 p-6 text-white backdrop-blur-md sm:p-7">
              <h3 className="text-xl font-medium">{CONTACT.callCard.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/85">
                {CONTACT.callCard.body}
              </p>
              <a
                href={SITE.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex items-center gap-2.5 rounded-full bg-white py-2 pl-7 pr-2 font-mono text-[13px] font-bold uppercase tracking-[0.14em] text-[#0b0d12] transition-colors duration-300 select-none hover:bg-[#00E5FF]"
              >
                Book on Calendly
                <span
                  aria-hidden
                  className="grid h-9 w-9 place-items-center rounded-full bg-[#0b0d12] text-sm text-[#00E5FF] transition-transform duration-300 group-hover:rotate-45"
                >
                  ↗
                </span>
              </a>
            </div>
          </div>
        </FadeIn>

        {/* ——— Enquiry form in a plain white card ——— */}
        <FadeIn delay={0.1} className="h-full">
          <div className="h-full rounded-[2rem] border border-line bg-card p-8 transition-colors duration-300 hover:border-line-strong sm:p-10">
            <ContactForm />
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
