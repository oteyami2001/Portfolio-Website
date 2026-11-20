"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { span } from "./keyframes";

export type Milestone = { kicker: string; title: string; org: string; body: string; tone?: "cyan" | "amber" | "blue" };

const TONE = { cyan: "#35C8E8", amber: "#F3B65D", blue: "#5B8CFF" };

/** Sticky, scroll-driven horizontal timeline. Falls back to a swipeable row on small screens / reduced motion. */
export function HorizontalTimeline({ items }: { items: Milestone[] }) {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const distance = useMotionValue(0);
  const [wide, setWide] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(() => {
    const t = Math.min(1, Math.max(0, (scrollYProgress.get() - 0.08) / 0.84));
    return -distance.get() * t;
  });
  const bar = useTransform(scrollYProgress, ...span([0.08, 0.92], [0, 1]));

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => setWide(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!wide) return;
    const measure = () => {
      if (track.current) distance.set(Math.max(0, track.current.scrollWidth - window.innerWidth + 64));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, [wide, distance]);

  const cards = items.map((m, i) => (
    <li key={m.title + i} className="glass glass-hover relative w-[80vw] shrink-0 snap-start p-6 sm:w-[24rem] sm:p-8">
      <p className="font-mono text-[0.68rem] tracking-[0.18em] text-mist-400">{String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</p>
      <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.2em]" style={{ color: TONE[m.tone ?? "cyan"] }}>{m.kicker}</p>
      <h3 className="mt-2 font-display text-3xl font-semibold uppercase leading-none text-white">{m.title}</h3>
      <p className="mt-2 text-sm text-cyan-300">{m.org}</p>
      <p className="mt-4 text-sm leading-relaxed text-mist-300">{m.body}</p>
    </li>
  ));

  const heading = (
    <div className="container-site">
      <p className="eyebrow">The long arc</p>
      <h2 className="h-section mt-4">Timeline</h2>
    </div>
  );

  const flat = reduce || !wide;

  return (
    <section ref={ref} aria-label="Career and education timeline" className={flat ? "py-24" : "relative"} style={flat ? undefined : { height: `${Math.max(220, items.length * 55)}svh` }}>
      {flat ? (
        <>
          {heading}
          <ol className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-6 sm:px-6">{cards}</ol>
        </>
      ) : (
        <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
          {heading}
          <motion.ol ref={track} style={{ x }} className="mt-12 flex gap-5 pl-[max(1rem,calc((100vw-76rem)/2+2rem))] pr-16">
            {cards}
          </motion.ol>
          <div className="container-site mt-12">
            <div className="h-px w-full bg-cyan-300/15">
              <motion.div style={{ scaleX: bar }} className="h-px origin-left bg-gradient-to-r from-cyan-300 to-amber-400" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
