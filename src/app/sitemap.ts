import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/profile";
import { projects } from "@/data/projects";
import { navItems } from "@/lib/nav";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...navItems.map((i) => ({ url: `${siteUrl}${i.href === "/" ? "" : i.href}`, lastModified: now, changeFrequency: "monthly" as const, priority: i.href === "/" ? 1 : 0.8 })),
    ...projects.map((p) => ({ url: `${siteUrl}/projects/${p.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
