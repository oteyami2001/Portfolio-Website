"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { span } from "./keyframes";

/** Floating "holographic" service tag that parallaxes with the scene. */
export function HoloTag({ progress, label, sub, left, top, speed = 1, range = [0, 1] }: { progress: MotionValue<number>; label: string; sub?: string; left: string; top: string; speed?: number; range?: [number, number] }) {
  const y = useTransform(progress, [0, 1], [60 * speed, -60 * speed]);
  const opacity = useTransform(progress, ...span([range[0], range[0] + 0.08, range[1] - 0.08, range[1]], [0, 1, 1, 0]));
  return (
    <motion.div style={{ y, opacity, left, top }} className="pointer-events-none absolute z-[12] hidden rounded-xl border border-cyan-300/30 bg-ink-900/50 px-3.5 py-2 shadow-[0_0_30px_-8px_rgba(53,200,232,0.6)] backdrop-blur-md sm:block" aria-hidden="true">
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-cyan-300">{label}</p>
      {sub ? <p className="mt-0.5 font-mono text-[0.62rem] text-mist-400">{sub}</p> : null}
    </motion.div>
  );
}
