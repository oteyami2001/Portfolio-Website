"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useMemo, useState } from "react";
import { certifications, education, experience, profile } from "@/data/profile";
import { projects } from "@/data/projects";

type Cluster = "core" | "cloud" | "projects" | "credentials" | "career" | "craft";
type GNode = { id: string; label: string; cluster: Cluster; detail: string; href?: string; x: number; y: number; hub?: boolean };

const COLORS: Record<Cluster, string> = {
  core: "#FFFFFF",
  cloud: "#35C8E8",
  projects: "#F3B65D",
  credentials: "#4ADE9B",
  career: "#5B8CFF",
  craft: "#9B8CFF",
};
const NAMES: Record<Cluster, string> = { core: "Core", cloud: "Clouds", projects: "Projects", credentials: "Credentials", career: "Career", craft: "Craft" };

const W = 1000, H = 660, CX = 500, CY = 330;

function buildGraph(): { nodes: GNode[]; edges: [string, string][] } {
  const groups: { cluster: Exclude<Cluster, "core">; angle: number; items: Omit<GNode, "x" | "y" | "cluster">[] }[] = [
    {
      cluster: "cloud", angle: -90,
      items: [
        { id: "aws", label: "AWS", detail: "EC2, VPC, IAM, RDS/Aurora, ECS/Fargate, Lambda, CloudFormation, DMS, MGN, Organizations.", href: "/skills" },
        { id: "oci", label: "OCI", detail: "Compute, VCN, IAM, Load Balancer, DBCS, Exadata, Autonomous Database, GoldenGate.", href: "/skills" },
        { id: "azure", label: "Azure", detail: "VMs, VM Scale Sets, App Service, Load Balancer, ARM templates, Azure CLI, Azure Monitor.", href: "/skills" },
        { id: "gcp", label: "GCP", detail: "Listed among cloud platforms on the resume.", href: "/skills" },
      ],
    },
    {
      cluster: "projects", angle: -18,
      items: projects.map((p) => ({ id: p.slug, label: p.title.replace("BallotOnline ", "").replace(" Cloud Infrastructure", ""), detail: p.summary, href: `/projects/${p.slug}` })),
    },
    {
      cluster: "credentials", angle: 54,
      items: [
        ...certifications.map((c) => ({ id: c.id, label: c.short, detail: `${c.name} — ${c.issuer}.`, href: "/certifications" })),
        ...education.map((e, i) => ({ id: `edu-${i}`, label: e.degree.split(",")[0].replace("Master of Science", "M.S.").replace("Bachelor of Science", "B.S.").replace("Associate Degree", "A.A.S."), detail: `${e.degree} — ${e.school} (${e.status}).`, href: "/certifications" })),
      ],
    },
    {
      cluster: "career", angle: 126,
      items: experience.map((r) => ({ id: r.id, label: r.company.replace(" LLC", ""), detail: `${r.role}, ${r.period}. ${r.summary}`, href: "/experience" })),
    },
    {
      cluster: "craft", angle: 198,
      items: [
        { id: "terraform", label: "Terraform", detail: "Infrastructure as code for AWS environments and the WordPress on Fargate platform.", href: "/skills" },
        { id: "k8s", label: "Kubernetes", detail: "Container orchestration alongside Docker, ECS and Fargate.", href: "/skills" },
        { id: "oracle", label: "Oracle DB", detail: "Oracle 12c–19c: RAC, ASM, Data Guard, RMAN, Data Pump, performance tuning.", href: "/experience" },
        { id: "code", label: "Python · Java", detail: "Software development in Python, Java, C#, C++, SQL and PL/SQL.", href: "/skills" },
        { id: "sec", label: "RMF · NIST · STIG", detail: "Security with RMF, NIST SP 800-53, DISA STIG, encryption, MFA and least privilege.", href: "/skills" },
      ],
    },
  ];

  const nodes: GNode[] = [{ id: "core", label: profile.shortName, cluster: "core", detail: profile.summary, href: "/about", x: CX, y: CY, hub: true }];
  const edges: [string, string][] = [];
  for (const g of groups) {
    const a = (g.angle * Math.PI) / 180;
    const hx = CX + Math.cos(a) * 165, hy = CY + Math.sin(a) * 150;
    const hubId = `hub-${g.cluster}`;
    nodes.push({ id: hubId, label: NAMES[g.cluster], cluster: g.cluster, detail: `${NAMES[g.cluster]} connected to Thierry's work.`, x: hx, y: hy, hub: true });
    edges.push(["core", hubId]);
    const n = g.items.length;
    g.items.forEach((it, i) => {
      const spread = Math.min(1.9, 0.42 * n);
      const t = n === 1 ? 0 : i / (n - 1) - 0.5;
      const ang = a + t * spread;
      const r = 120 + (i % 2) * 34;
      nodes.push({ ...it, cluster: g.cluster, x: hx + Math.cos(ang) * r, y: hy + Math.sin(ang) * r * 0.82 });
      edges.push([hubId, it.id]);
    });
  }
  // cross-links
  const cross: [string, string][] = [
    ["aws", "ballotonline-aws-migration"], ["azure", "ballotonline-azure-orchestration"], ["aws", "wordpress-ecs-fargate"],
    ["terraform", "wordpress-ecs-fargate"], ["aws-saa", "aws"], ["oci-arch", "oci"], ["oracle", "brontech"], ["cloud-tech-inter", "cloud-tech-inter-foundation"], ["edu-0", "ballotonline-aws-migration"],
  ];
  const ids = new Set(nodes.map((n) => n.id));
  for (const c of cross) if (ids.has(c[0]) && ids.has(c[1])) edges.push(c);
  return { nodes, edges };
}

export function KnowledgeGraph() {
  const { nodes, edges } = useMemo(buildGraph, []);
  const byId = useMemo(() => Object.fromEntries(nodes.map((n) => [n.id, n])), [nodes]);
  const [active, setActive] = useState<string | null>(null);
  const [filter, setFilter] = useState<Cluster | null>(null);
  const reduce = useReducedMotion();
  const sel = active ? byId[active] : null;
  const linked = new Set(active ? edges.flatMap(([a, b]) => (a === active ? [b] : b === active ? [a] : [])) : []);

  return (
    <div className="relative">
      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter graph by category">
        {(Object.keys(NAMES) as Cluster[]).filter((c) => c !== "core").map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={filter === c}
            onClick={() => setFilter(filter === c ? null : c)}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] transition ${filter === c ? "border-white/60 text-white" : "border-cyan-300/15 text-mist-400 hover:text-white"}`}
          >
            <span className="h-2 w-2 rounded-full" style={{ background: COLORS[c] }} aria-hidden="true" /> {NAMES[c]}
          </button>
        ))}
      </div>

      <div className="glass relative overflow-hidden">
        <div className="overflow-x-auto">
          <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full min-w-[720px]" role="group" aria-label="Knowledge graph of Thierry's clouds, projects, credentials, career and craft. Use Tab to move between nodes and Enter to open one.">
            <defs>
              <radialGradient id="kg-glow"><stop offset="0" stopColor="rgba(53,200,232,0.35)" /><stop offset="1" stopColor="rgba(53,200,232,0)" /></radialGradient>
            </defs>
            <circle cx={CX} cy={CY} r={260} fill="url(#kg-glow)" />
            {edges.map(([a, b], i) => {
              const A = byId[a], B = byId[b];
              const hot = active && (a === active || b === active);
              const dim = (filter && A.cluster !== filter && B.cluster !== filter && A.cluster !== "core") || (active && !hot);
              return (
                <line key={i} x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke={hot ? "#7FE3F5" : "rgba(127,227,245,0.2)"} strokeWidth={hot ? 1.6 : 0.8} opacity={dim ? 0.15 : 1} style={{ transition: "opacity .3s" }} className={hot ? "flow-line" : undefined} />
              );
            })}
            {nodes.map((n) => {
              const c = COLORS[n.cluster];
              const on = active === n.id;
              const dim = (filter && n.cluster !== filter && n.cluster !== "core") || (active && !on && !linked.has(n.id));
              const r = n.cluster === "core" ? 14 : n.hub ? 8 : 5;
              const labelRight = n.x >= CX;
              return (
                <motion.g
                  key={n.id}
                  initial={false}
                  animate={{ opacity: dim ? 0.25 : 1 }}
                  transition={{ duration: reduce ? 0 : 0.3 }}
                  tabIndex={0}
                  role="button"
                  aria-label={`${n.label}${n.hub ? " (category)" : ""}`}
                  aria-pressed={on}
                  onClick={() => setActive(on ? null : n.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(on ? null : n.id); }
                    if (e.key === "Escape") setActive(null);
                  }}
                  className="cursor-pointer outline-none [&:focus-visible>circle:nth-child(2)]:stroke-white"
                >
                  <circle cx={n.x} cy={n.y} r={r + 10} fill="transparent" />
                  <circle cx={n.x} cy={n.y} r={r} fill={n.hub ? "#0B1220" : c} stroke={c} strokeWidth={n.hub ? 2 : 1} style={{ filter: `drop-shadow(0 0 ${on ? 10 : 5}px ${c})` }} />
                  {on ? <circle cx={n.x} cy={n.y} r={r + 6} fill="none" stroke={c} className="pulse-ring" /> : null}
                  <text
                    x={n.cluster === "core" ? n.x : labelRight ? n.x + r + 6 : n.x - r - 6}
                    y={n.cluster === "core" ? n.y + 32 : n.y + 3.5}
                    textAnchor={n.cluster === "core" ? "middle" : labelRight ? "start" : "end"}
                    fill={n.hub || n.cluster === "core" ? "#fff" : "rgba(232,238,248,0.82)"}
                    fontSize={n.cluster === "core" ? 15 : n.hub ? 12 : 10.5}
                    fontFamily={n.hub || n.cluster === "core" ? "var(--font-display), sans-serif" : "var(--font-mono), monospace"}
                    style={{ textTransform: n.hub || n.cluster === "core" ? "uppercase" : undefined, letterSpacing: n.hub ? "0.08em" : undefined }}
                  >
                    {n.label}
                  </text>
                </motion.g>
              );
            })}
          </svg>
        </div>

        <AnimatePresence>
          {sel ? (
            <motion.aside
              key={sel.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              className="border-t border-cyan-300/15 bg-ink-900/95 p-5 sm:absolute sm:bottom-4 sm:right-4 sm:w-80 sm:rounded-2xl sm:border"
              aria-live="polite"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em]" style={{ color: COLORS[sel.cluster] }}>{NAMES[sel.cluster]}</p>
                  <p className="mt-1 font-display text-xl font-semibold uppercase text-white">{sel.label}</p>
                </div>
                <button type="button" onClick={() => setActive(null)} className="rounded-full p-1.5 text-mist-400 hover:text-white" aria-label="Close details"><X className="h-4 w-4" /></button>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-mist-300">{sel.detail}</p>
              {linked.size ? (
                <p className="mt-3 font-mono text-[0.65rem] text-mist-400">Connected to: {Array.from(linked).map((id) => byId[id]?.label).join(" · ")}</p>
              ) : null}
              {sel.href ? <Link href={sel.href} className="mt-4 inline-block text-sm font-semibold text-cyan-300 hover:underline">Open →</Link> : null}
            </motion.aside>
          ) : (
            <p className="pointer-events-none absolute bottom-4 left-5 hidden font-mono text-[0.68rem] text-mist-400 sm:block">Click any node</p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
