"use client";

import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = { children: ReactNode; delay?: number; y?: number; className?: string; as?: "div" | "li" | "section" };

export function Reveal({ children, delay = 0, y = 24, className, as = "div" }: Props) {
  const reduce = useReducedMotionSafe();
  const MotionTag = motion[as];
  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
