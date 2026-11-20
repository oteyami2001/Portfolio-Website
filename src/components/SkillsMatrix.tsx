"use client";

import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { AnimatePresence, motion } from "framer-motion";
import { useState, type KeyboardEvent } from "react";
import { skillGroups } from "@/data/profile";

/** Tabbed skills view grouped by platform / discipline. */
export function SkillsMatrix() {
  const [active, setActive] = useState(skillGroups[0].id);
  const reduce = useReducedMotionSafe();
  const group = skillGroups.find((g) => g.id === active)!;

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = skillGroups.findIndex((g) => g.id === active);
    let next = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % skillGroups.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + skillGroups.length) % skillGroups.length;
    else return;
    e.preventDefault();
    setActive(skillGroups[next].id);
    document.getElementById(`skill-tab-${skillGroups[next].id}`)?.focus();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
      <div role="tablist" aria-label="Skill areas" aria-orientation="vertical" onKeyDown={onKey} className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
        {skillGroups.map((g) => {
          const on = g.id === active;
          return (
            <button
              key={g.id}
              id={`skill-tab-${g.id}`}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls="skill-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(g.id)}
              className={`relative flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition ${on ? "border-cyan-300/40 bg-cyan-400/[0.08] text-white" : "border-cyan-300/10 text-mist-300 hover:border-cyan-300/25 hover:text-white"}`}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: g.accent, boxShadow: on ? `0 0 12px ${g.accent}` : undefined }} aria-hidden="true" />
              <span className="font-medium">{g.title}</span>
              <span className="ml-auto hidden font-mono text-xs text-mist-400 lg:inline">{g.skills.length}</span>
            </button>
          );
        })}
      </div>

      <div id="skill-panel" role="tabpanel" aria-labelledby={`skill-tab-${group.id}`} className="glass relative overflow-hidden p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full blur-3xl" style={{ background: `${group.accent}22` }} aria-hidden="true" />
        <AnimatePresence mode="wait">
          <motion.div key={group.id} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
            <h3 className="font-display text-2xl font-semibold text-white">{group.title}</h3>
            <p className="mt-2 max-w-2xl text-mist-300">{group.blurb}</p>
            <ul className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4">
              {group.skills.map((s, i) => (
                <motion.li
                  key={s}
                  initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.025 }}
                  className="flex items-center gap-2 rounded-lg border border-cyan-300/10 bg-ink-950/50 px-3 py-2.5 text-sm text-mist-100"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: group.accent }} aria-hidden="true" />
                  {s}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
