"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight 3D "cloud region" globe drawn on a 2D canvas (no WebGL dependency).
 * Points on a Fibonacci sphere are projected with perspective; a handful of
 * region hubs are linked by arcs carrying data packets. Rendering pauses when
 * off-screen or when the tab is hidden, and draws a single static frame for
 * users who prefer reduced motion.
 */

type Vec = { x: number; y: number; z: number };

const HUBS: { lat: number; lon: number; label: string }[] = [
  { lat: 39, lon: -77, label: "us-east" },
  { lat: 45, lon: -122, label: "us-west" },
  { lat: 51, lon: 0, label: "eu-west" },
  { lat: 50, lon: 8, label: "" },
  { lat: 1, lon: 103, label: "ap-southeast" },
  { lat: 35, lon: 139, label: "ap-northeast" },
  { lat: -23, lon: -46, label: "sa-east" },
  { lat: 5, lon: -4, label: "af-west" },
  { lat: -33, lon: 151, label: "ap-south-2" },
];

const LINKS: [number, number][] = [
  [0, 1], [0, 2], [2, 3], [3, 4], [4, 5], [5, 1], [0, 6], [2, 7], [7, 6], [4, 8], [3, 7],
];

function fromLatLon(lat: number, lon: number): Vec {
  const phi = (lat * Math.PI) / 180;
  const theta = (lon * Math.PI) / 180;
  return { x: Math.cos(phi) * Math.sin(theta), y: -Math.sin(phi), z: Math.cos(phi) * Math.cos(theta) };
}

function slerp(a: Vec, b: Vec, t: number, lift: number): Vec {
  const dot = Math.min(1, Math.max(-1, a.x * b.x + a.y * b.y + a.z * b.z));
  const omega = Math.acos(dot);
  const so = Math.sin(omega) || 1;
  const k1 = Math.sin((1 - t) * omega) / so;
  const k2 = Math.sin(t * omega) / so;
  const h = 1 + lift * Math.sin(Math.PI * t);
  return { x: (a.x * k1 + b.x * k2) * h, y: (a.y * k1 + b.y * k2) * h, z: (a.z * k1 + b.z * k2) * h };
}

export function CloudGlobe({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 640px)").matches;
    const N = small ? 520 : 900;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const points: Vec[] = Array.from({ length: N }, (_, i) => {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = golden * i;
      return { x: Math.cos(t) * r, y, z: Math.sin(t) * r };
    });
    const hubs = HUBS.map((h) => fromLatLon(h.lat, h.lon));
    const arcs = LINKS.map(([a, b]) => Array.from({ length: 48 }, (_, i) => slerp(hubs[a], hubs[b], i / 47, 0.22)));

    let w = 0, h = 0, dpr = 1, raf = 0, visible = true, running = true;
    let rotY = -1.2, tiltX = -0.32, targetTiltX = -0.32, targetRotOffset = 0, rotOffset = 0;
    let t0 = performance.now();

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const project = (p: Vec, R: number, cx: number, cy: number) => {
      const ry = rotY + rotOffset;
      const cosY = Math.cos(ry), sinY = Math.sin(ry);
      const x1 = p.x * cosY + p.z * sinY;
      const z1 = -p.x * sinY + p.z * cosY;
      const cosX = Math.cos(tiltX), sinX = Math.sin(tiltX);
      const y2 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;
      const persp = 4 / (4 - z2);
      return { x: cx + x1 * R * persp, y: cy + y2 * R * persp, z: z2 };
    };

    const draw = (now: number) => {
      const dt = Math.min(64, now - t0);
      t0 = now;
      if (!reduce) rotY += dt * 0.00009;
      tiltX += (targetTiltX - tiltX) * 0.05;
      rotOffset += (targetRotOffset - rotOffset) * 0.05;

      ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * 0.36;
      const cx = w / 2, cy = h / 2;

      // atmosphere
      const g = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, R * 1.35);
      g.addColorStop(0, "rgba(47,107,255,0.10)");
      g.addColorStop(0.7, "rgba(53,200,232,0.06)");
      g.addColorStop(1, "rgba(5,10,20,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // points
      for (const p of points) {
        const s = project(p, R, cx, cy);
        const depth = (s.z + 1) / 2;
        if (s.z < -0.15) continue;
        ctx.fillStyle = `rgba(127,227,245,${0.12 + depth * 0.65})`;
        const size = 0.8 + depth * 1.4;
        ctx.fillRect(s.x - size / 2, s.y - size / 2, size, size);
      }

      // arcs + packets
      const time = now / 1000;
      arcs.forEach((arc, ai) => {
        ctx.beginPath();
        let started = false;
        for (const p of arc) {
          const s = project(p, R, cx, cy);
          if (s.z < -0.2) { started = false; continue; }
          if (!started) { ctx.moveTo(s.x, s.y); started = true; } else ctx.lineTo(s.x, s.y);
        }
        ctx.strokeStyle = "rgba(91,140,255,0.35)";
        ctx.lineWidth = 1;
        ctx.stroke();

        const phase = reduce ? 0.5 : (time * 0.25 + ai * 0.37) % 1;
        const idx = Math.floor(phase * (arc.length - 1));
        const sp = project(arc[idx], R, cx, cy);
        if (sp.z > -0.2) {
          ctx.fillStyle = "rgba(243,182,93,0.95)";
          ctx.beginPath();
          ctx.arc(sp.x, sp.y, 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // hubs
      hubs.forEach((hub, i) => {
        const s = project(hub, R, cx, cy);
        if (s.z < -0.05) return;
        const pulse = reduce ? 0.5 : (Math.sin(time * 2 + i) + 1) / 2;
        ctx.strokeStyle = `rgba(53,200,232,${0.25 + pulse * 0.35})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 6 + pulse * 6, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = "#7FE3F5";
        ctx.beginPath();
        ctx.arc(s.x, s.y, 3, 0, Math.PI * 2);
        ctx.fill();
        if (!small && s.z > 0.35 && HUBS[i].label) {
          ctx.font = "10px var(--font-mono), monospace";
          ctx.fillStyle = "rgba(182,194,217,0.75)";
          ctx.fillText(HUBS[i].label, s.x + 9, s.y + 3);
        }
      });

      if (running && visible && !reduce) raf = requestAnimationFrame(draw);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      t0 = performance.now();
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      targetRotOffset = nx * 0.5;
      targetTiltX = -0.32 + ny * 0.25;
      if (reduce) requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reduce) start();
    });
    const onVis = () => {
      running = !document.hidden;
      if (running && visible && !reduce) start();
    };

    resize();
    start();
    io.observe(canvas);
    const ro = new ResizeObserver(() => { resize(); if (reduce) requestAnimationFrame(draw); });
    ro.observe(canvas);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
