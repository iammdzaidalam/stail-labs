import { NextResponse } from "next/server";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  organization: z.string().trim().min(2, "Please enter your organization").max(160),
  email: z.string().trim().email("Please enter a valid email").max(200),
  phone: z
    .string()
    .trim()
    .max(24)
    .regex(/^[+\d][\d\s()-]{6,}$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  sector: z.string().trim().min(1, "Please select a sector").max(60),
  message: z.string().trim().min(10, "Tell us a little more about your goals").max(4000),
  // Honeypot — real users never fill this. Any value must parse successfully
  // (no length ceiling) so bots always get the silent-success path below
  // rather than a 400 that would reveal the trap.
  website: z.string().optional(),
});

// Basic in-memory rate limit: 5 requests / 10 min per client. Resets on
// redeploy, which is acceptable for a low-volume contact form.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
// Requests we cannot attribute to a client share one bucket, so it gets a
// much higher ceiling — otherwise five anonymous posts would lock out
// everyone else for the whole window.
const MAX_UNATTRIBUTED = 60;
const MAX_ENTRIES = 10_000;
const hits = new Map<string, { count: number; start: number }>();

/**
 * Client key for rate limiting. Only platform-set headers are trusted:
 * `x-forwarded-for` is client-spoofable when no proxy rewrites it, so it is
 * used last and never as an identity we rely on for anything but throttling.
 */
function clientKey(req: Request): string | null {
  const vercel = req.headers.get("x-vercel-forwarded-for");
  if (vercel) return vercel.split(",")[0]!.trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return null;
}

/** Drop windows that have already expired; bounded work per call. */
function sweep(now: number) {
  for (const [key, entry] of hits) {
    if (now - entry.start > WINDOW_MS) hits.delete(key);
  }
  // Pathological growth guard: if a flood of unique keys still overflows the
  // map after sweeping, drop the oldest entries rather than everything.
  if (hits.size > MAX_ENTRIES) {
    const oldest = [...hits.entries()]
      .sort((a, b) => a[1].start - b[1].start)
      .slice(0, hits.size - MAX_ENTRIES);
    for (const [key] of oldest) hits.delete(key);
  }
}

function rateLimited(key: string | null): boolean {
  const now = Date.now();
  const bucket = key ?? "__unattributed__";
  const ceiling = key ? MAX_PER_WINDOW : MAX_UNATTRIBUTED;

  const entry = hits.get(bucket);
  if (!entry || now - entry.start > WINDOW_MS) {
    hits.set(bucket, { count: 1, start: now });
    if (hits.size > 512) sweep(now);
    return false;
  }
  entry.count += 1;
  return entry.count > ceiling;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function POST(req: Request) {
  if (rateLimited(clientKey(req))) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { ok: false, error: first?.message ?? "Invalid form data." },
      { status: 400 },
    );
  }

  // Honeypot filled → silently accept so bots learn nothing.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const { name, organization, email, phone, sector, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    console.error("[contact] RESEND_API_KEY / CONTACT_TO_EMAIL not configured — submission dropped:", {
      name,
      organization,
      email,
      sector,
    });
    return NextResponse.json(
      {
        ok: false,
        error:
          "The contact form is temporarily unavailable. Please book a call on Calendly or reach us by phone.",
      },
      { status: 503 },
    );
  }

  const html = `
    <h2>New enquiry — stail.co.in</h2>
    <table cellpadding="6" style="font-family:sans-serif;font-size:14px">
      <tr><td><b>Name</b></td><td>${escapeHtml(name)}</td></tr>
      <tr><td><b>Organization</b></td><td>${escapeHtml(organization)}</td></tr>
      <tr><td><b>Email</b></td><td>${escapeHtml(email)}</td></tr>
      <tr><td><b>Phone</b></td><td>${escapeHtml(phone || "—")}</td></tr>
      <tr><td><b>Sector</b></td><td>${escapeHtml(sector)}</td></tr>
    </table>
    <p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(message)}</p>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "STAIL Website <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject: `New enquiry from ${name} — ${organization} (${sector})`,
        html,
      }),
    });

    if (!res.ok) {
      console.error("[contact] Resend error:", res.status, await res.text());
      return NextResponse.json(
        { ok: false, error: "Something went wrong sending your message. Please try again." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[contact] Resend request failed:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong sending your message. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
