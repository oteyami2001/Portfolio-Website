"use client";

import { useState, type FormEvent } from "react";
import { Mail, Phone, Send } from "lucide-react";
import { LinkedInIcon } from "./BrandIcons";

/**
 * When a public contact email is configured, the form composes a pre-filled email
 * in the visitor's mail app (no data is stored on the server). Otherwise it points
 * visitors to LinkedIn rather than pretending to send a message.
 */
export function ContactForm({ email, phone, linkedin }: { email: string; phone: { display: string; tel: string }; linkedin: string }) {
  const [topic, setTopic] = useState("Employment opportunity");
  const [sent, setSent] = useState(false);

  if (!email) {
    return (
      <div className="glass flex h-full flex-col justify-center p-8">
        <h2 className="font-display text-2xl font-semibold text-white">Send me a message</h2>
        <p className="mt-3 text-mist-300">The fastest way to reach me is a LinkedIn message — include the role or project and a little context, and I&apos;ll get back to you.</p>
        <a href={linkedin} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 self-start">
          <LinkedInIcon className="h-4 w-4" /> Message on LinkedIn
        </a>
      </div>
    );
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const company = String(data.get("company") || "").trim();
    const message = String(data.get("message") || "").trim();
    const subject = `${topic}${company ? ` — ${company}` : ""}`;
    const body = `${message}\n\n— ${name}${company ? `, ${company}` : ""}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field = "mt-1.5 w-full rounded-xl border border-cyan-300/15 bg-ink-950/70 px-4 py-3 text-sm text-white placeholder:text-mist-400 focus:border-cyan-300/60 focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="glass space-y-4 p-6 sm:p-8">
      <h2 className="font-display text-2xl font-semibold text-white">Send me a message</h2>
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <a href={`mailto:${email}`} className="inline-flex items-center gap-2 text-cyan-300 hover:underline"><Mail className="h-4 w-4" aria-hidden="true" />{email}</a>
        <a href={`tel:${phone.tel}`} className="inline-flex items-center gap-2 text-cyan-300 hover:underline"><Phone className="h-4 w-4" aria-hidden="true" />{phone.display}</a>
      </div>
      <fieldset>
        <legend className="text-sm text-mist-300">I&apos;m reaching out about</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {["Employment opportunity", "Consulting project", "Something else"].map((t) => (
            <label key={t} className={`cursor-pointer rounded-full border px-3.5 py-2 text-xs transition ${topic === t ? "border-cyan-300 bg-cyan-400/15 text-white" : "border-cyan-300/15 text-mist-300 hover:border-cyan-300/40"}`}>
              <input type="radio" name="topic" value={t} checked={topic === t} onChange={() => setTopic(t)} className="sr-only" />
              {t}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-mist-300">Name<input name="name" required autoComplete="name" className={field} /></label>
        <label className="block text-sm text-mist-300">Company <span className="text-mist-400">(optional)</span><input name="company" autoComplete="organization" className={field} /></label>
      </div>
      <label className="block text-sm text-mist-300">Message<textarea name="message" required rows={5} className={field} placeholder="Tell me about the role or project…" /></label>
      <button type="submit" className="btn-primary w-full sm:w-auto"><Send className="h-4 w-4" aria-hidden="true" /> Open in email app</button>
      <p className="text-xs text-mist-400" aria-live="polite">
        {sent ? "Your email app should open with the message ready to send." : `Opens your email app addressed to ${email}. Nothing is stored on this site.`}
      </p>
    </form>
  );
}
