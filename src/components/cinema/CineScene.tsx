"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { NetworkField } from "./NetworkField";
import { span } from "./keyframes";
import { DataExtras, HeroExtras } from "./SceneExtras";

export type Beat = {
  from: number;
  to: number;
  content: ReactNode;
  /** horizontal placement of the copy block */
  align?: "left" | "center" | "right";
  /** vertical placement of the copy block */
  place?: "center" | "bottom" | "top";
};

export type Portrait = {
  /** where the portrait sits horizontally (percent of width for its centre) */
  x?: [number, number];
  scale?: [number, number];
  y?: [number, number];
  /** 0 = natural, 1 = deep blue grade */
  grade?: number;
  size?: "lg" | "md";
};

type Props = {
  id?: string;
  label: string;
  /** total scroll length in viewport heights */
  length?: number;
  beats: Beat[];
  portrait?: Portrait | null;
  density?: number;
  beams?: boolean;
  extras?: "hero" | "data";
};

const PLACE = {
  center: "items-center",
  bottom: "items-end pb-[12vh]",
  top: "items-start pt-[18vh]",
};
const ALIGN = {
  left: "justify-start text-left",
  center: "justify-center text-center",
  right: "justify-end text-right",
};

function BeatLayer({ beat, progress, first, last }: { beat: Beat; progress: MotionValue<number>; first: boolean; last: boolean }) {
  const f = 0.07;
  // keyframe offsets must stay inside [0, 1] and be non-decreasing
  const input: number[] = [];
  const shape: number[] = []; // 0 = hidden, 1 = shown, -1 = exited
  if (!first) { input.push(beat.from, Math.min(beat.from + f, beat.to)); shape.push(0, 1); } else { input.push(0); shape.push(1); }
  if (!last) { input.push(Math.max(beat.to - f, input[input.length - 1]), beat.to); shape.push(1, -1); } else { input.push(1); shape.push(1); }
  const opacity = useTransform(progress, ...span(input, shape.map((v) => (v === 1 ? 1 : 0))));
  const y = useTransform(progress, ...span(input, shape.map((v) => (v === 1 ? 0 : v === 0 ? 50 : -50))));
  const blur = useTransform(progress, ...span(input, shape.map((v) => (v === 1 ? 0 : 8))));
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  const pointerEvents = useTransform(opacity, (o) => (o > 0.5 ? "auto" : "none"));
  return (
    <motion.div
      style={{ opacity, y, filter, pointerEvents }}
      className={`container-site absolute inset-0 z-20 flex ${PLACE[beat.place ?? "center"]} ${ALIGN[beat.align ?? "left"]}`}
    >
      <div className={beat.align === "center" ? "max-w-5xl" : "max-w-3xl"}>{beat.content}</div>
    </motion.div>
  );
}

function PortraitLayer({ p, progress }: { p: Portrait; progress: MotionValue<number> }) {
  const x = useTransform(progress, [0, 1], (p.x ?? [62, 62]).map((v) => `${v - 50}%`));
  const scale = useTransform(progress, [0, 1], p.scale ?? [1.06, 1]);
  const y = useTransform(progress, [0, 1], (p.y ?? [0, 0]).map((v) => `${v}%`));
  const grade = p.grade ?? 0.35;
  return (
    <motion.div style={{ x, scale, y }} className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center">
      <div className={`relative ${p.size === "md" ? "w-[min(70vw,460px)]" : "w-[min(92vw,640px)]"} aspect-square`}>
        {/* rim light behind the subject */}
        <div className="absolute inset-[8%] rounded-full bg-cyan-400/25 blur-[70px]" />
        <Image
          src="/images/thierry-cutout.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 92vw, 640px"
          className="object-contain object-bottom"
          style={{
            filter: `drop-shadow(0 0 1px rgba(127,227,245,.9)) drop-shadow(0 0 22px rgba(53,200,232,${0.35 + grade * 0.3})) contrast(1.05) saturate(${1 - grade * 0.35}) brightness(${1 - grade * 0.12})`,
            maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
          }}
        />
        {/* cool grade overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />
      </div>
    </motion.div>
  );
}

/** Full-screen, scroll-driven scene: sticky stage + timed copy beats. */
export function CineScene({ id, label, length = 3, beats, portrait = {}, density = 1, beams = true, extras }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const stage = (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(80rem_50rem_at_60%_10%,rgba(47,107,255,0.22),transparent_60%),radial-gradient(50rem_40rem_at_20%_90%,rgba(53,200,232,0.12),transparent_60%)]" />
      <NetworkField density={density} className="absolute inset-0 h-full w-full opacity-60" />
      {beams ? (
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <span className="beam sway left-[30%]" />
          <span className="beam sway left-[52%] [animation-delay:-3s] opacity-70" />
          <span className="beam sway left-[70%] [animation-delay:-6s] opacity-50" />
        </div>
      ) : null}
      <div className="absolute inset-x-0 bottom-0 z-[15] h-1/3 bg-gradient-to-t from-ink-950 to-transparent" />
    </>
  );

  if (reduce) {
    return (
      <section id={id} aria-label={label} className="relative overflow-hidden py-24">
        <div className="absolute inset-0" aria-hidden="true">{stage}</div>
        <div className="container-site relative z-20 space-y-16">
          {beats.map((b, i) => <div key={i} className="max-w-3xl">{b.content}</div>)}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} id={id} aria-label={label} className="relative" style={{ height: `${length * 100}svh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">{stage}</div>
        {portrait ? <PortraitLayer p={portrait} progress={scrollYProgress} /> : null}
        {extras === "hero" ? <HeroExtras progress={scrollYProgress} /> : extras === "data" ? <DataExtras progress={scrollYProgress} /> : null}
        {beats.map((b, i) => (
          <BeatLayer key={i} beat={b} progress={scrollYProgress} first={i === 0 && b.from === 0} last={i === beats.length - 1 && b.to === 1} />
        ))}
        <ScrollRail progress={scrollYProgress} />
      </div>
    </section>
  );
}

function ScrollRail({ progress }: { progress: MotionValue<number> }) {
  const scaleY = useTransform(progress, [0, 1], [0, 1]);
  return (
    <div className="absolute right-4 top-1/2 z-30 hidden h-40 w-px -translate-y-1/2 bg-cyan-300/15 md:block" aria-hidden="true">
      <motion.div style={{ scaleY }} className="h-full w-px origin-top bg-cyan-300" />
    </div>
  );
}

