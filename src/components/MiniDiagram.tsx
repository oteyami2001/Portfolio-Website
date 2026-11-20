import type { Diagram } from "@/data/projects";

/** Decorative thumbnail of an architecture diagram (no text), used on project cards. */
export function MiniDiagram({ diagram }: { diagram: Diagram }) {
  const byId = Object.fromEntries(diagram.nodes.map((n) => [n.id, n]));
  return (
    <svg viewBox={`0 0 ${diagram.width} ${diagram.height}`} className="block aspect-[16/9] h-auto w-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <rect width={diagram.width} height={diagram.height} fill={`url(#mini-${diagram.nodes[0]?.id})`} />
      <defs>
        <radialGradient id={`mini-${diagram.nodes[0]?.id}`} cx="50%" cy="40%" r="70%">
          <stop offset="0" stopColor="rgba(47,107,255,0.18)" />
          <stop offset="1" stopColor="rgba(5,10,20,0)" />
        </radialGradient>
      </defs>
      {diagram.zones.map((z) => (
        <rect key={z.id} x={z.x} y={z.y} width={z.w} height={z.h} rx={16} fill="rgba(53,200,232,0.03)" stroke="rgba(53,200,232,0.22)" strokeDasharray={z.tone === "onprem" || z.tone === "subnet" ? "6 6" : undefined} />
      ))}
      {diagram.edges.map((e, i) => {
        const a = byId[e.from], b = byId[e.to];
        if (!a || !b) return null;
        return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgba(127,227,245,0.5)" strokeWidth={2} className={e.dashed ? undefined : "flow-line"} strokeDasharray={e.dashed ? "4 8" : undefined} />;
      })}
      {diagram.nodes.map((n) => (
        <g key={n.id}>
          <rect x={n.x - 60} y={n.y - 20} width={120} height={40} rx={10} fill="#0B1220" stroke="rgba(127,227,245,0.55)" strokeWidth={1.5} />
          <rect x={n.x - 44} y={n.y - 5} width={70} height={6} rx={3} fill="rgba(232,238,248,0.55)" />
          <rect x={n.x - 44} y={n.y + 6} width={44} height={4} rx={2} fill="rgba(127,227,245,0.4)" />
        </g>
      ))}
    </svg>
  );
}
