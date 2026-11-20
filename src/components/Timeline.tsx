"use client";

import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import type { Role } from "@/data/profile";

const TYPE_COLOR: Record<Role["type"], string> = {
  Founder: "#F3B65D",
  Freelance: "#5B8CFF",
};

/** Vertical career timeline with a scroll-linked progress rail. No scroll-jacking. */
export function Timeline({ roles, compact = false }: { roles: Role[]; compact?: boolean }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <ol ref={ref} className="relative ml-3 sm:ml-0">
      <span className="absolute left-0 top-2 h-[calc(100%-1rem)] w-px bg-cyan-300/10 sm:left-[11.5rem]" aria-hidden="true" />
      <motion.span
        className="absolute left-0 top-2 h-[calc(100%-1rem)] w-px origin-top bg-gradient-to-b from-cyan-300 via-azure-400 to-transparent sm:left-[11.5rem]"
        style={{ scaleY: reduce ? 1 : scaleY }}
        aria-hidden="true"
      />
      {roles.map((r, i) => (
        <motion.li
          key={r.id}
          className="relative grid gap-2 pb-12 pl-8 last:pb-0 sm:grid-cols-[11.5rem_1fr] sm:gap-0 sm:pl-0"
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 0.7, delay: Math.min(i * 0.05, 0.2), ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="sm:pr-10 sm:pt-1 sm:text-right">
            <p className="font-mono text-sm text-white">{r.period}</p>
            <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.16em]" style={{ color: TYPE_COLOR[r.type] }}>{r.type}</p>
          </div>
          <span
            className="absolute left-0 top-2 h-3 w-3 -translate-x-1/2 rounded-full ring-4 ring-ink-950 sm:left-[11.5rem]"
            style={{ background: TYPE_COLOR[r.type], boxShadow: `0 0 18px ${TYPE_COLOR[r.type]}` }}
            aria-hidden="true"
          />
          <article className="glass glass-hover p-5 sm:ml-10 sm:p-6">
            <h3 className="font-display text-xl font-semibold text-white">{r.role}</h3>
            <p className="mt-0.5 text-sm font-medium text-cyan-300">{r.company}</p>
            <p className="mt-3 text-sm leading-relaxed text-mist-300">{r.summary}</p>
            {!compact ? (
              <ul className="mt-4 space-y-2">
                {r.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm leading-relaxed text-mist-100/90">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-300" aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>
            ) : null}
            <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
              {r.stack.slice(0, compact ? 5 : undefined).map((s) => (
                <li key={s} className="chip !text-[0.68rem]">{s}</li>
              ))}
            </ul>
          </article>
        </motion.li>
      ))}
    </ol>
  );
}
