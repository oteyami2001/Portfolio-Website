"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { MouseEvent } from "react";
import type { Project } from "@/data/projects";
import { GitHubIcon } from "./BrandIcons";
import { MiniDiagram } from "./MiniDiagram";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [5, -5]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-5, 5]), { stiffness: 200, damping: 20 });

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => { mx.set(0.5); my.set(0.5); };

  return (
    <motion.article
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="glass glass-hover group relative flex h-full flex-col overflow-hidden"
    >
      <div className="relative border-b border-cyan-300/10 bg-ink-950/60">
        <MiniDiagram diagram={project.diagram} />
        <span className="absolute left-4 top-4 rounded-full border border-cyan-300/20 bg-ink-950/80 px-3 py-1 font-mono text-[0.68rem] text-cyan-300">
          {project.platform}
        </span>
        <span className="absolute right-4 top-4 font-mono text-xs text-mist-400">0{index + 1}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-mist-400">{project.kicker}</p>
        <h3 className="mt-2 font-display text-2xl font-semibold text-white">
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {project.title}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-mist-300">{project.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Services used">
          {project.services.slice(0, 7).map((s) => <li key={s} className="chip !text-[0.68rem]">{s}</li>)}
          {project.services.length > 7 ? <li className="chip !text-[0.68rem] text-mist-400">+{project.services.length - 7}</li> : null}
        </ul>
        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300">
            Read case study <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
          {project.github ? (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="relative z-10 inline-flex items-center gap-1.5 rounded-full border border-mist-300/20 px-3 py-1.5 text-xs text-mist-100 hover:border-cyan-300/60" aria-label={`${project.title} on GitHub (opens in new tab)`}>
              <GitHubIcon className="h-3.5 w-3.5" /> Code
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
