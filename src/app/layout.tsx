import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontDisplay, fontMono, fontSans } from "./fonts";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Assistant } from "@/components/Assistant";
import { certifications, profile, siteUrl } from "@/data/profile";

const description =
  "Thierry Arcadius Oteyami — Cloud Engineer, Cloud Solutions Architect and Oracle DBA in Silver Spring, Maryland. Designs, migrates, automates and secures cloud solutions on AWS, OCI and Azure. Founder of Cloud Tech Inter LLC.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${profile.name} · Cloud Engineer & Oracle DBA`, template: `%s · ${profile.shortName}` },
  description,
  applicationName: `${profile.shortName} Portfolio`,
  authors: [{ name: profile.name, url: profile.links.linkedin }],
  keywords: [
    "Cloud Engineer", "AWS Cloud Engineer", "OCI Cloud Engineer", "Cloud Solutions Architect", "DevOps Engineer", "Oracle DBA",
    "AWS", "Oracle Cloud Infrastructure", "Azure", "Terraform", "CloudFormation", "Maryland", "Thierry Oteyami",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: siteUrl,
    siteName: `${profile.shortName} — Cloud Engineer`,
    title: `${profile.name} · Cloud Engineer & Oracle DBA`,
    description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: `${profile.name} · Cloud Engineer`, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#050A14", colorScheme: "dark", width: "device-width", initialScale: 1 };

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Cloud Engineer",
  description,
  url: siteUrl,
  image: `${siteUrl}${profile.photo}`,
  address: { "@type": "PostalAddress", addressLocality: "Silver Spring", addressRegion: "MD", addressCountry: "US" },
  worksFor: { "@type": "Organization", name: profile.company },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "University of Maryland Global Campus" },
    { "@type": "CollegeOrUniversity", name: "Kingsborough Community College" },
  ],
  hasCredential: certifications.map((c) => ({ "@type": "EducationalOccupationalCredential", name: c.name, recognizedBy: { "@type": "Organization", name: c.issuer } })),
  knowsAbout: ["Amazon Web Services", "Oracle Cloud Infrastructure", "Microsoft Azure", "Oracle Database", "Terraform", "DevOps", "Cloud Security"],
  sameAs: [profile.links.linkedin, profile.links.github],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable}`}>
      <body>
        <a href="#main" className="sr-only z-[200] rounded-full bg-cyan-400 px-4 py-2 font-semibold text-ink-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        <Navbar />
        <main id="main" tabIndex={-1} className="outline-none">{children}</main>
        <Footer />
        <Assistant />
      </body>
    </html>
  );
}
