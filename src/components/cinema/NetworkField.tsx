"use client";

import { useEffect, useRef } from "react";

/**
 * Drifting "infrastructure" node field drawn on canvas: nodes link to nearby
 * nodes and occasional packets travel along links. Pauses off-screen; draws a
 * single still frame for reduced motion.
 */
export function NetworkField({ density = 1, className = "", tone = "cyan" }: { density?: number; className?: string; tone?: "cyan" | "blue" }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rgb = tone === "cyan" ? "127,227,245" : "91,140,255";
    let w = 0, h = 0, raf = 0, visible = true;
    type N = { x: number; y: number; vx: number; vy: number; r: number };
    let nodes: N[] = [];
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(((w * h) / 16000) * density);
      nodes = Array.from({ length: Math.min(count, 140) }, () => ({
        x: rnd() * w, y: rnd() * h, vx: (rnd() - 0.5) * 0.18, vy: (rnd() - 0.5) * 0.18, r: 0.8 + rnd() * 1.8,
      }));
    };

    const maxD = 150;
    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        if (!reduce) { n.x += n.vx; n.y += n.vy; }
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > maxD) continue;
          const o = (1 - d / maxD) * 0.35;
          ctx.strokeStyle = `rgba(${rgb},${o})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          if ((i * 31 + j) % 23 === 0) {
            const p = reduce ? 0.5 : ((t / 2600 + (i % 7) / 7) % 1);
            ctx.fillStyle = "rgba(243,182,93,0.9)";
            ctx.beginPath(); ctx.arc(a.x + (b.x - a.x) * p, a.y + (b.y - a.y) * p, 1.6, 0, Math.PI * 2); ctx.fill();
          }
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = `rgba(${rgb},0.85)`;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
      }
      if (!reduce && visible) raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);
    const ro = new ResizeObserver(() => { resize(); if (reduce) requestAnimationFrame(draw); });
    ro.observe(canvas);
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); };
  }, [density, tone]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
