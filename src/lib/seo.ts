import type { Metadata } from "next";
import { profile, siteUrl } from "@/data/profile";

export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} · ${profile.shortName}`, description, url: `${siteUrl}${path}`, type: "website" },
    twitter: { card: "summary_large_image", title: `${title} · ${profile.shortName}`, description },
  };
}
