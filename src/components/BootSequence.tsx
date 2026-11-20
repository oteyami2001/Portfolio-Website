"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const LINES = [
  "$ terraform apply -target=portfolio",
  "▸ provisioning vpc · subnets · route tables ........ ok",
  "▸ attaching iam roles (least privilege) ........... ok",
  "▸ replicating oracle → aurora · data guard ........ ok",
  "▸ health checks passing across 3 clouds ........... ok",
  "Apply complete. Welcome.",
];

/** Short, skippable intro shown once per browser session. Never shown with reduced motion. */
export function BootSequence() {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("boot-seen") === "1";
      sessionStorage.setItem("boot-seen", "1");
    } catch {
      /* storage unavailable: show once per load */
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) return;
    setShow(true);
  }, []);

  useEffect(() => {
    if (!show) return;
    if (count < LINES.length) {
      const id = setTimeout(() => setCount((c) => c + 1), count === 0 ? 220 : 240);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => setShow(false), 550);
    return () => clearTimeout(id);
  }, [show, count]);

  useEffect(() => {
    if (!show) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") setShow(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [show]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="boot"
          className="no-print fixed inset-0 z-[100] flex items-center justify-center bg-ink-950 px-4"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, filter: "blur(6px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-label="Intro animation"
        >
          <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative w-full max-w-xl">
            <div className="glass overflow-hidden">
              <div className="flex items-center gap-2 border-b border-cyan-300/10 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF6B5B]/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#4ADE9B]/80" />
                <span className="ml-3 font-mono text-xs text-mist-400">thierry@cloud-control-plane</span>
              </div>
              <pre className="min-h-[13rem] whitespace-pre-wrap px-5 py-4 font-mono text-[0.72rem] leading-6 text-mist-100 sm:text-sm" aria-live="polite">
                {LINES.slice(0, count).map((l, i) => (
                  <div key={i} className={i === LINES.length - 1 ? "text-cyan-300" : l.startsWith("$") ? "text-white" : "text-mist-300"}>
                    {l}
                  </div>
                ))}
                <span className="inline-block h-4 w-2 animate-pulse bg-cyan-300 align-middle" />
              </pre>
            </div>
            <button type="button" onClick={() => setShow(false)} className="btn-ghost mx-auto mt-6 flex !min-h-[40px] !py-2 text-xs" autoFocus>
              Skip intro
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
