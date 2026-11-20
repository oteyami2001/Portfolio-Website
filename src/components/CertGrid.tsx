import { Award } from "lucide-react";
import { certifications } from "@/data/profile";
import { Reveal } from "./Reveal";

const ISSUER_STYLE = {
  "Amazon Web Services": { color: "#F3B65D", mark: "AWS" },
  Oracle: { color: "#FF6B5B", mark: "ORACLE" },
} as const;

export function CertGrid({ detailed = false }: { detailed?: boolean }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {certifications.map((c, i) => {
        const s = ISSUER_STYLE[c.issuer];
        const Icon = Award;
        return (
          <Reveal as="li" key={c.id} delay={i * 0.06} className="glass glass-hover group relative overflow-hidden p-6">
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-40 blur-2xl transition-opacity group-hover:opacity-70" style={{ background: s.color }} aria-hidden="true" />
            <div className="relative flex items-start justify-between gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border" style={{ borderColor: `${s.color}55`, background: `${s.color}14` }}>
                <Icon className="h-6 w-6" style={{ color: s.color }} aria-hidden="true" />
              </span>
              <span className="font-mono text-[0.65rem] tracking-[0.18em]" style={{ color: s.color }}>{s.mark}</span>
            </div>
            <h3 className="relative mt-5 font-display text-lg font-semibold leading-snug text-white">{c.name}</h3>
            <p className="relative mt-1 text-sm text-mist-400">{c.issuer} · {c.level}</p>
            {detailed ? (
              <ul className="relative mt-4 flex flex-wrap gap-1.5" aria-label="Domains covered">
                {c.focus.map((f) => <li key={f} className="chip !text-[0.66rem]">{f}</li>)}
              </ul>
            ) : null}
          </Reveal>
        );
      })}
    </ul>
  );
}
