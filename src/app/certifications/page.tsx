import { GraduationCap } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { CertGrid } from "@/components/CertGrid";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";
import { education } from "@/data/profile";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Certifications",
  description: "AWS Certified Solutions Architect – Associate, OCI Architect Associate, OCI Foundations, Oracle Certified Associate and CompTIA Security+, plus UMGC degrees.",
  path: "/certifications",
});

export default function CertificationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Certifications & education"
        title={<>Credentials across <span className="text-gradient">cloud, data and security</span>.</>}
        lead="Industry certifications from Amazon Web Services, Oracle and CompTIA, backed by degrees in software development, security and cloud computing systems."
      />
      <section className="container-site" aria-label="Certifications">
        <CertGrid detailed />
      </section>
      <section className="container-site mt-28" aria-labelledby="edu-title">
        <SectionHeading eyebrow="Education" id="edu-title" title="Degrees in software, security and cloud." />
        <ol className="mt-10 space-y-4">
          {education.map((e, i) => (
            <Reveal as="li" key={e.degree} delay={i * 0.06} className="glass flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-400/10">
                <GraduationCap className="h-6 w-6 text-cyan-300" aria-hidden="true" />
              </span>
              <div className="flex-1">
                <h3 className="font-display text-lg font-semibold text-white">{e.degree}</h3>
                <p className="text-sm text-cyan-300">{e.school}</p>
                <p className="mt-2 text-sm text-mist-300">{e.detail}</p>
              </div>
              <span className={`self-start rounded-full px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] sm:self-center ${e.status === "In progress" ? "bg-amber-400/15 text-amber-400" : "bg-cyan-400/10 text-cyan-300"}`}>{e.status}</span>
            </Reveal>
          ))}
        </ol>
      </section>
      <CtaBand />
    </>
  );
}
