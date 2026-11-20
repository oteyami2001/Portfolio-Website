"use client";

import { useId, useState } from "react";
import type { Diagram, DiagramNode } from "@/data/projects";

const KIND_COLOR: Record<DiagramNode["kind"], string> = {
  network: "#5B8CFF",
  compute: "#35C8E8",
  data: "#9B8CFF",
  security: "#4ADE9B",
  ops: "#F3B65D",
  automation: "#7FE3F5",
  user: "#B6C2D9",
};

const KIND_LABEL: Record<DiagramNode["kind"], string> = {
  network: "Networking",
  compute: "Compute",
  data: "Data",
  security: "Security",
  ops: "Operations",
  automation: "Automation",
  user: "Actor",
};

const ZONE_STYLE = {
  onprem: { stroke: "rgba(182,194,217,0.35)", fill: "rgba(182,194,217,0.04)", dash: "6 6" },
  cloud: { stroke: "rgba(53,200,232,0.35)", fill: "rgba(53,200,232,0.03)", dash: "" },
  subnet: { stroke: "rgba(91,140,255,0.35)", fill: "rgba(91,140,255,0.05)", dash: "4 4" },
  control: { stroke: "rgba(243,182,93,0.3)", fill: "rgba(243,182,93,0.035)", dash: "" },
} as const;

const NODE_W = 168;
const NODE_H = 54;

/**
 * Data-driven, keyboard-accessible architecture diagram.
 * Nodes are focusable buttons; selecting one highlights its connections and
 * shows details. A text list mirrors the diagram for screen readers and small screens.
 */
export function ArchitectureDiagram({ diagram }: { diagram: Diagram }) {
  const [active, setActive] = useState<string | null>(null);
  const uid = useId().replace(/:/g, "");
  const nodeById = Object.fromEntries(diagram.nodes.map((n) => [n.id, n]));
  const activeNode = active ? nodeById[active] : null;
  const connected = new Set(
    active ? diagram.edges.flatMap((e) => (e.from === active || e.to === active ? [e.from, e.to] : [])) : [],
  );

  return (
    <figure className="glass overflow-hidden">
      <figcaption className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan-300/10 px-5 py-3">
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300/90">{diagram.title}</span>
        <span className="font-mono text-[0.68rem] text-mist-400">Select a component to inspect it</span>
      </figcaption>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${diagram.width} ${diagram.height}`}
          className="block h-auto w-full min-w-[640px]"
          role="group"
          aria-label={`${diagram.title}. Interactive diagram — use Tab to move between components and Enter to inspect.`}
        >
          <defs>
            <marker id={`arrow-${uid}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="rgba(127,227,245,0.8)" />
            </marker>
          </defs>

          {diagram.zones.map((z) => {
            const s = ZONE_STYLE[z.tone];
            return (
              <g key={z.id}>
                <rect x={z.x} y={z.y} width={z.w} height={z.h} rx={14} fill={s.fill} stroke={s.stroke} strokeDasharray={s.dash} />
                <text x={z.x + 14} y={z.y + 20} fill="rgba(182,194,217,0.85)" fontSize="11" fontFamily="var(--font-mono), monospace" letterSpacing="0.06em">
                  {z.label.toUpperCase()}
                </text>
              </g>
            );
          })}

          {diagram.edges.map((e, i) => {
            const a = nodeById[e.from];
            const b = nodeById[e.to];
            if (!a || !b) return null;
            const hot = active && (e.from === active || e.to === active);
            const dim = active && !hot;
            // trim the line so it starts/ends at the node border
            const dx = b.x - a.x, dy = b.y - a.y;
            const len = Math.hypot(dx, dy) || 1;
            const tx = (NODE_W / 2) / Math.abs(dx / len || 1e-6);
            const ty = (NODE_H / 2) / Math.abs(dy / len || 1e-6);
            const pad = Math.min(tx, ty) + 6;
            const x1 = a.x + (dx / len) * pad, y1 = a.y + (dy / len) * pad;
            const x2 = b.x - (dx / len) * pad, y2 = b.y - (dy / len) * pad;
            return (
              <g key={i} opacity={dim ? 0.18 : 1} style={{ transition: "opacity .3s" }}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={hot ? "#7FE3F5" : "rgba(127,227,245,0.45)"} strokeWidth={hot ? 2 : 1.3}
                  className={e.dashed ? undefined : "flow-line"} strokeDasharray={e.dashed ? "3 6" : undefined} markerEnd={`url(#arrow-${uid})`} />
                {e.label ? (
                  <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 7} textAnchor="middle" fill="rgba(232,238,248,0.8)" fontSize="10.5" fontFamily="var(--font-mono), monospace">
                    {e.label}
                  </text>
                ) : null}
              </g>
            );
          })}

          {diagram.nodes.map((n) => {
            const color = KIND_COLOR[n.kind];
            const isActive = active === n.id;
            const dim = active && !isActive && !connected.has(n.id);
            return (
              <g
                key={n.id}
                transform={`translate(${n.x - NODE_W / 2}, ${n.y - NODE_H / 2})`}
                tabIndex={0}
                role="button"
                aria-pressed={isActive}
                aria-label={`${n.label}${n.sub ? `, ${n.sub}` : ""}`}
                onClick={() => setActive(isActive ? null : n.id)}
                onKeyDown={(ev) => {
                  if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); setActive(isActive ? null : n.id); }
                  if (ev.key === "Escape") setActive(null);
                }}
                onMouseEnter={() => setActive(n.id)}
                className="cursor-pointer outline-none [&:focus-visible>rect:first-child]:stroke-white"
                opacity={dim ? 0.3 : 1}
                style={{ transition: "opacity .3s" }}
              >
                {isActive ? <rect className="pulse-ring" width={NODE_W} height={NODE_H} rx={12} fill="none" stroke={color} strokeOpacity={0.6} /> : null}
                <rect width={NODE_W} height={NODE_H} rx={12} fill="#0B1220" stroke={color} strokeOpacity={isActive ? 1 : 0.6} strokeWidth={isActive ? 2 : 1.2} />
                <rect x={0} y={0} width={4} height={NODE_H} rx={2} fill={color} />
                <text x={14} y={n.sub ? 23 : 32} fill="#fff" fontSize="13" fontWeight="600" fontFamily="var(--font-display), sans-serif">{n.label}</text>
                {n.sub ? (
                  <text x={14} y={40} fill="rgba(182,194,217,0.9)" fontSize="10" fontFamily="var(--font-mono), monospace">{n.sub.length > 27 ? `${n.sub.slice(0, 26)}…` : n.sub}</text>
                ) : null}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="grid gap-4 border-t border-cyan-300/10 p-5 md:grid-cols-[1fr_auto]" aria-live="polite">
        {activeNode ? (
          <div>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em]" style={{ color: KIND_COLOR[activeNode.kind] }}>
              {KIND_LABEL[activeNode.kind]}
            </p>
            <p className="mt-1 font-display text-lg font-semibold text-white">{activeNode.label}</p>
            <p className="mt-1 text-sm leading-relaxed text-mist-300">{activeNode.detail}</p>
          </div>
        ) : (
          <p className="text-sm text-mist-400">Hover, tap or tab to a component to see how it fits into the architecture.</p>
        )}
        <ul className="flex flex-wrap content-start gap-x-4 gap-y-1.5 md:max-w-[16rem] md:justify-end" aria-label="Legend">
          {Array.from(new Set(diagram.nodes.map((n) => n.kind))).map((k) => (
            <li key={k} className="inline-flex items-center gap-1.5 font-mono text-[0.68rem] text-mist-400">
              <span className="h-2 w-2 rounded-full" style={{ background: KIND_COLOR[k] }} aria-hidden="true" /> {KIND_LABEL[k]}
            </li>
          ))}
        </ul>
      </div>

      <details className="border-t border-cyan-300/10 px-5 py-3 text-sm text-mist-300">
        <summary className="cursor-pointer font-mono text-xs text-mist-400 hover:text-white">Text description of this diagram</summary>
        <ul className="mt-3 space-y-2">
          {diagram.nodes.map((n) => (
            <li key={n.id}>
              <strong className="text-white">{n.label}</strong>{n.sub ? ` (${n.sub})` : ""} — {n.detail}
            </li>
          ))}
        </ul>
      </details>
    </figure>
  );
}
