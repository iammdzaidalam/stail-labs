"use client";

import { useEffect, useState, type FormEvent } from "react";
import { CONTACT, SITE } from "@/lib/data";

type Status = "idle" | "submitting" | "success" | "error";

const inputCls =
  "w-full rounded-tile border border-line bg-card px-4 py-3.5 text-[15px] text-ink placeholder:text-muted/60 outline-none transition-colors focus:border-accent";
const labelCls =
  "font-mono text-[11px] uppercase tracking-[0.16em] text-muted mb-2 block";

/** Enquiry form posting JSON to /api/contact. Uncontrolled fields + a small state machine. */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [showCalendly, setShowCalendly] = useState(false);

  // Revert "✓ Message Sent" back to idle after 5s.
  useEffect(() => {
    if (status !== "success") return;
    const t = window.setTimeout(() => setStatus("idle"), 5000);
    return () => window.clearTimeout(t);
  }, [status]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      organization: String(fd.get("organization") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      sector: String(fd.get("sector") ?? ""),
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""),
    };

    setStatus("submitting");
    setError("");
    setShowCalendly(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data: { ok?: boolean; error?: string } | null = null;
      try {
        data = (await res.json()) as { ok?: boolean; error?: string };
      } catch {
        data = null;
      }

      if (res.ok && data?.ok) {
        form.reset();
        setStatus("success");
      } else {
        setError(data?.error ?? "Something went wrong sending your message. Please try again.");
        setShowCalendly(res.status === 503);
        setStatus("error");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  const buttonLabel =
    status === "submitting"
      ? "Sending…"
      : status === "success"
        ? "✓ Message Sent"
        : "Send Message →";

  return (
    <form onSubmit={handleSubmit} className="relative grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelCls}>
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            maxLength={120}
            autoComplete="name"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="contact-organization" className={labelCls}>
            Organization
          </label>
          <input
            id="contact-organization"
            name="organization"
            type="text"
            required
            maxLength={160}
            autoComplete="organization"
            className={inputCls}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-email" className={labelCls}>
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className={labelCls}>
            Phone <span className="normal-case tracking-normal">(optional)</span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-sector" className={labelCls}>
          Sector
        </label>
        <select
          id="contact-sector"
          name="sector"
          required
          defaultValue=""
          className={`${inputCls} cursor-pointer`}
        >
          <option value="" disabled>
            Select your sector
          </option>
          {CONTACT.sectors.map((sector) => (
            <option key={sector} value={sector}>
              {sector}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelCls}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          maxLength={4000}
          placeholder="Tell us about your AI goals"
          className={`${inputCls} resize-y`}
        />
      </div>

      {/* Honeypot — invisible to humans, tempting to bots. */}
      <div aria-hidden="true" className="pointer-events-none absolute h-0 w-0 overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded-full bg-ink px-8 py-4 font-mono text-[13px] font-bold uppercase tracking-[0.14em] text-bg transition-colors hover:bg-accent disabled:opacity-60 sm:w-auto"
        >
          {buttonLabel}
        </button>

        {status === "error" && (
          <p role="alert" className="mt-3 text-sm text-[#e5484d]">
            {error}
            {showCalendly && (
              <>
                {" "}
                You can also{" "}
                <a
                  href={SITE.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 transition-colors hover:text-accent"
                >
                  book directly on Calendly
                </a>
                .
              </>
            )}
          </p>
        )}
        {status === "success" && (
          <p role="status" className="sr-only">
            Message sent successfully.
          </p>
        )}
      </div>
    </form>
  );
}
