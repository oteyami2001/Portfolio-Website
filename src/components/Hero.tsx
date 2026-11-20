"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { profile, stats } from "@/data/profile";
import { CloudGlobe } from "./CloudGlobe";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % profile.targetRoles.length), 2600);
    return () => clearInterval(id);
  }, [reduce]);

  const fade = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease } };

  return (
    <section className="relative isolate overflow-hidden pt-28 sm:pt-32 lg:pt-20" aria-labelledby="hero-title">
      <div className="aurora pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

      <div className="container-site grid items-center gap-8 lg:min-h-[calc(100svh-8rem)] lg:grid-cols-[1.1fr_1fr] lg:gap-4">
        <div className="relative z-10 py-6 lg:py-24">
          <motion.p {...fade(0.1)} className="eyebrow">
            Cloud Engineer · Solutions Architect · Oracle DBA
          </motion.p>

          <motion.h1 {...fade(0.2)} id="hero-title" className="mt-6 font-display text-[2.6rem] font-semibold leading-[1.02] text-white sm:text-6xl lg:text-[4.6rem]">
            <span className="block text-mist-300 text-[0.42em] font-medium tracking-normal mb-3">{profile.name}</span>
            Engineering <span className="text-gradient">secure, scalable</span> and intelligent cloud infrastructure.
          </motion.h1>

          <motion.p {...fade(0.35)} className="lead mt-6 max-w-xl">
            {profile.intro}
          </motion.p>

          <motion.div {...fade(0.45)} className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-sm text-mist-300">
            <span className="text-mist-400">Ready for</span>
            <span className="relative inline-flex h-7 min-w-[14rem] items-center overflow-hidden rounded-md border border-cyan-300/20 bg-cyan-400/[0.07] px-2.5 text-cyan-300" aria-live="off">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIdx}
                  initial={reduce ? false : { y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={reduce ? undefined : { y: -16, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  {profile.targetRoles[roleIdx]}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="inline-flex items-center gap-1.5 text-mist-400">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> {profile.location}
            </span>
          </motion.div>

          <motion.div {...fade(0.55)} className="mt-9 flex flex-wrap gap-3">
            <Link href="/projects" className="btn-primary">
              View projects <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a href={profile.resumePdf} className="btn-ghost" download>
              <Download className="h-4 w-4" aria-hidden="true" /> Download resume
            </a>
            <Link href="/contact" className="btn-ghost">Contact me</Link>
          </motion.div>

          <motion.div {...fade(0.65)} className="mt-8 flex items-center gap-4 text-sm text-mist-400">
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white">
              <LinkedInIcon className="h-4 w-4" /> LinkedIn
            </a>
            <span className="h-4 w-px bg-mist-400/30" aria-hidden="true" />
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white">
              <GitHubIcon className="h-4 w-4" /> GitHub
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease }}
          className="relative -mx-4 aspect-square sm:mx-auto sm:w-[80%] lg:w-full"
        >
          <CloudGlobe className="h-full w-full" />
          <div className="pointer-events-none absolute bottom-[12%] left-[6%] hidden rounded-xl border border-cyan-300/15 bg-ink-900/70 px-3 py-2 font-mono text-[0.68rem] text-mist-300 backdrop-blur sm:block">
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#4ADE9B] align-middle" />AWS · OCI · Azure — healthy
          </div>
        </motion.div>
      </div>

      <div className="container-site relative z-10 pb-16 lg:-mt-6">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-cyan-300/10 bg-cyan-300/10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse justify-end bg-ink-950/90 px-5 py-6 backdrop-blur">
              <dt className="mt-1 text-xs leading-snug text-mist-400 sm:text-sm">{s.label}</dt>
              <dd className="font-display text-3xl font-semibold text-white sm:text-4xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
