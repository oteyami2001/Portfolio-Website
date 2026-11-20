"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Like useReducedMotion, but returns false until after hydration so the server
 * HTML and the first client render match (avoids React hydration errors).
 */
export function useReducedMotionSafe(): boolean {
  const prefers = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && !!prefers;
}
