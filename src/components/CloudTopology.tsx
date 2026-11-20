"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Activity, Boxes, Database, Network, ShieldCheck, Workflow } from "lucide-react";
import { useState, type KeyboardEvent } from "react";
import { capabilities } from "@/data/profile";
import { projects } from "@/data/projects";

const ICONS = { networking: Network, compute: Boxes, databases: Database, security: ShieldCheck, observability: Activity, automation: Workflow } as const;

const PROVIDERS = [
  { key: "aws", label: "AWS", color: "#F3B65D" },
  { key: "azure", label: "Azure", color: "#5B8CFF" },
  { key: "oci", label: "OCI", color: "#FF6B5B" },
  { key: "tools", label: "Tools & platforms", color: "#35C8E8" },
] as const;

/** Interactive capability topology: six domains orbiting a core, each revealing services per cloud. */
export function CloudTopology() {
  const [selected, setSelected] = useState(capabilities[0].id);
  const reduce = useReducedMotion();
  const cap = capabilities.find((c) => c.id === selected)!;
  const n = capabilities.length;
  const positions = capabilities.map((_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return { x: 50 + Math.cos(a) * 38, y: 50 + Math.sin(a) * 38 };
  });

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const idx = capabilities.findIndex((c) => c.id === selected);
    let next = idx;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (idx + 1) % n;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (idx - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    else return;
    e.preventDefault();
    setSelected(capabilities[next].id);
    document.getElementById(`cap-tab-${capabilities[next].id}`)?.focus();
  };

  return (
    <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
      <div className="relative mx-auto aspect-square w-full max-w-[30rem]">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(127,227,245,0.12)" strokeWidth="0.3" />
          <circle cx="50" cy="50" r="24" fill="none" stroke="rgba(127,227,245,0.08)" strokeWidth="0.3" strokeDasharray="1 1.5" />
          {positions.map((p, i) => {
            const on = capabilities[i].id === selected;
            return (
              <line key={i} x1="50" y1="50" x2={p.x} y2={p.y} stroke={on ? "#7FE3F5" : "rgba(127,227,245,0.18)"} strokeWidth={on ? 0.5 : 0.3}
                className={on ? "flow-line" : undefined} style={{ strokeDasharray: on ? "1.5 1.5" : undefined }} />
            );
          })}
          <circle cx="50" cy="50" r="12.5" fill="#0B1220" stroke="url(#core-g)" strokeWidth="0.6" />
          <circle cx="50" cy="50" r="12.5" fill="none" stroke="#35C8E8" strokeWidth="0.4" className="pulse-ring" />
          <defs>
            <linearGradient id="core-g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#7FE3F5" /><stop offset="1" stopColor="#2F6BFF" />
            </linearGradient>
          </defs>
          <text x="50" y="49" textAnchor="middle" fill="#fff" fontSize="3.6" fontWeight="600" fontFamily="var(--font-display), sans-serif">Cloud</text>
          <text x="50" y="53.5" textAnchor="middle" fill="#7FE3F5" fontSize="2" fontFamily="var(--font-mono), monospace">control plane</text>
        </svg>

        <div role="tablist" aria-label="Cloud capability domains" aria-orientation="horizontal" onKeyDown={onKey}>
          {capabilities.map((c, i) => {
            const Icon = ICONS[c.id as keyof typeof ICONS];
            const on = c.id === selected;
            return (
              <button
                key={c.id}
                id={`cap-tab-${c.id}`}
                role="tab"
                type="button"
                aria-selected={on}
                aria-controls="cap-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => setSelected(c.id)}
                className={`absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-2xl px-2 py-2 text-center transition ${on ? "scale-105" : "opacity-80 hover:opacity-100"}`}
                style={{ left: `${positions[i].x}%`, top: `${positions[i].y}%` }}
              >
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl border backdrop-blur sm:h-14 sm:w-14 ${on ? "border-cyan-300 bg-cyan-400/15 shadow-[0_0_30px_-4px_rgba(53,200,232,0.7)]" : "border-cyan-300/20 bg-ink-900/80"}`}>
                  <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${on ? "text-cyan-300" : "text-mist-300"}`} aria-hidden="true" />
                </span>
                <span className={`font-mono text-[0.65rem] uppercase tracking-[0.12em] sm:text-[0.7rem] ${on ? "text-white" : "text-mist-400"}`}>{c.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div id="cap-panel" role="tabpanel" aria-labelledby={`cap-tab-${cap.id}`} className="glass min-h-[24rem] p-6 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={cap.id}
            initial={reduce ? false : { opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: -16 }}
            transition={{ duration: 0.3 }}
          >
            <p className="eyebrow">Capability</p>
            <h3 className="mt-3 font-display text-3xl font-semibold text-white">{cap.label}</h3>
            <p className="mt-2 text-mist-300">{cap.summary}</p>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              {PROVIDERS.map((p) => (
                <div key={p.key}>
                  <dt className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em]" style={{ color: p.color }}>
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.color }} aria-hidden="true" /> {p.label}
                  </dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {cap[p.key].map((s) => <span key={s} className="chip !text-[0.68rem]">{s}</span>)}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 border-t border-cyan-300/10 pt-5">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-mist-400">Seen in</p>
              <ul className="mt-2 flex flex-col gap-1.5">
                {cap.projects.map((slug) => {
                  const p = projects.find((x) => x.slug === slug);
                  return p ? (
                    <li key={slug}>
                      <Link href={`/projects/${slug}`} className="text-sm text-cyan-300 underline-offset-4 hover:underline">{p.title} →</Link>
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
