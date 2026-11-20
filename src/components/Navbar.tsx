"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems } from "@/lib/nav";
import { Logo } from "./Logo";

const desktopItems = navItems.filter((i) => !["/", "/resume", "/contact"].includes(i.href));

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`no-print fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "border-b border-cyan-300/10 bg-ink-950/80 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="container-site flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]" aria-label="Primary">
        <Link href="/" className="group flex items-center gap-3" aria-label="Thierry Oteyami — home">
          <Logo className="h-9 w-9 transition-transform duration-300 group-hover:rotate-[-6deg]" />
          <span className="hidden leading-tight sm:block">
            <span className="block font-display text-[0.95rem] font-semibold text-white">Thierry Oteyami</span>
            <span className="block font-mono text-[0.65rem] uppercase tracking-[0.18em] text-cyan-300/80">Cloud Engineer</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 xl:flex">
          {desktopItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`relative rounded-full px-3.5 py-2 text-sm transition-colors ${
                  isActive(item.href) ? "text-white" : "text-mist-300 hover:text-white"
                }`}
              >
                {isActive(item.href) ? (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-cyan-400/10 ring-1 ring-cyan-300/20" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
                ) : null}
                <span className="relative">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link href="/resume" className="btn-ghost hidden !min-h-[40px] !py-2 sm:inline-flex">Resume</Link>
          <Link href="/contact" className="btn-primary hidden !min-h-[40px] !py-2 sm:inline-flex">Hire me</Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-mist-300/20 text-white xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100dvh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden xl:hidden"
          >
            <ul className="container-site flex flex-col gap-1 pb-10 pt-4">
              {navItems.map((item, i) => (
                <motion.li key={item.href} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`flex items-center justify-between border-b border-cyan-300/10 py-4 font-display text-2xl ${
                      isActive(item.href) ? "text-cyan-300" : "text-white"
                    }`}
                  >
                    {item.label}
                    <span className="font-mono text-xs text-mist-400">0{i + 1}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
