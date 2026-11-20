"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const STEPS = ["Allocating VPC", "Attaching IAM roles", "Replicating data", "Health checks passing"];

/** Brief, skippable loading screen shown once per session (never with reduced motion). */
export function Loader() {
  const [show, setShow] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("cine-loader") === "1";
      sessionStorage.setItem("cine-loader", "1");
    } catch { /* storage unavailable */ }
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShow(true);
    const start = performance.now();
    const dur = 1700;
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / dur);
      setPct(Math.round((1 - Math.pow(1 - k, 3)) * 100));
      if (k < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setShow(false), 350);
    };
    raf = requestAnimationFrame(tick);
    const onKey = (e: KeyboardEvent) => { if (["Escape", "Enter", " "].includes(e.key)) setShow(false); };
    window.addEventListener("keydown", onKey);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("keydown", onKey); };
  }, []);

  const step = STEPS[Math.min(STEPS.length - 1, Math.floor((pct / 100) * STEPS.length))];

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="loader"
          className="no-print fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-950"
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
          role="dialog"
          aria-label="Loading"
        >
          <motion.p initial={{ opacity: 0, letterSpacing: "0.6em" }} animate={{ opacity: 1, letterSpacing: "0.38em" }} transition={{ duration: 1 }} className="font-display text-2xl uppercase text-white sm:text-3xl">
            Thierry <span className="text-cyan-300">Oteyami</span>
          </motion.p>
          <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.3em] text-mist-400">Cloud control plane</p>
          <div className="mt-10 h-px w-56 overflow-hidden bg-cyan-300/15">
            <div className="h-full bg-gradient-to-r from-cyan-300 to-azure-400" style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-4 font-mono text-xs text-mist-300" aria-live="polite">
            {step} · <span className="tabular-nums text-cyan-300">{pct}%</span>
          </p>
          <button type="button" onClick={() => setShow(false)} className="mt-10 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-mist-400 underline-offset-4 hover:text-white hover:underline">
            Skip
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
