import Link from "next/link";
import { profile } from "@/data/profile";
import { navItems } from "@/lib/nav";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="no-print relative mt-24 border-t border-cyan-300/10 bg-ink-950">
      <div className="container-site grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Logo />
            <span className="font-display text-lg font-semibold text-white">{profile.name}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-mist-400">
            Cloud Engineer, Cloud Solutions Architect and Oracle DBA based in {profile.location}. Founder of {profile.company}.
          </p>
          <div className="mt-5 flex gap-3">
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost !min-h-[44px] !w-11 !px-0" aria-label="LinkedIn profile (opens in new tab)">
              <LinkedInIcon />
            </a>
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="btn-ghost !min-h-[44px] !w-11 !px-0" aria-label="GitHub profile (opens in new tab)">
              <GitHubIcon />
            </a>
          </div>
        </div>
        <nav aria-label="Footer">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300/80">Explore</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {navItems.map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="text-mist-300 hover:text-white">{i.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300/80">Open to</p>
          <ul className="mt-4 space-y-2 text-sm text-mist-300">
            {profile.targetRoles.map((r) => (
              <li key={r}>{r}</li>
            ))}
            <li>Consulting engagements</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cyan-300/10">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-mist-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <p className="font-mono">Built with Next.js · TypeScript · Tailwind CSS · Framer Motion</p>
        </div>
      </div>
    </footer>
  );
}
