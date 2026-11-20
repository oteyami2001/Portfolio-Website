import { Download } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { PrintButton } from "@/components/PrintButton";
import { certifications, education, experience, profile, skillGroups } from "@/data/profile";
import { projects } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Resume",
  description: "Resume of Thierry Arcadius Oteyami — Cloud Engineer, Cloud Solutions Architect and Oracle DBA. Download as PDF.",
  path: "/resume",
});

function H({ children }: { children: React.ReactNode }) {
  return <h2 className="border-b border-slate-300 pb-1 font-display text-[0.8rem] font-bold uppercase tracking-[0.18em] text-[#0B3A8C]">{children}</h2>;
}

export default function ResumePage() {
  return (
    <>
      <div className="no-print">
        <PageHeader eyebrow="Resume" title="Resume" lead="A one-page view of my experience, skills and credentials. Download the PDF or print this page.">
          <div className="flex flex-wrap gap-3">
            <a href={profile.resumePdf} download className="btn-primary"><Download className="h-4 w-4" aria-hidden="true" /> Download PDF</a>
            <PrintButton />
          </div>
        </PageHeader>
      </div>

      <div className="container-site print:max-w-none print:p-0">
        <article id="resume" className="mx-auto max-w-[52rem] rounded-2xl bg-white p-6 text-[13px] leading-relaxed text-slate-800 shadow-2xl print:text-[11.5px] print:leading-snug sm:p-12 print:rounded-none print:p-0 print:shadow-none">
          <header className="flex flex-col gap-2 border-b-2 border-[#0B3A8C] pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight text-[#0B1220]">{profile.name}</h1>
              <p className="mt-1 font-semibold text-[#0B3A8C]">{profile.tagline}</p>
            </div>
            <ul className="whitespace-nowrap text-xs text-slate-600 sm:text-right">
              <li>{profile.location} · {profile.citizenship}</li>
              <li>linkedin.com/in/thierry-oteyami-645335347</li>
              <li>github.com/oteyami2001</li>
            </ul>
          </header>

          <section className="mt-5">
            <H>Professional summary</H>
            <p className="mt-2">{profile.summary}</p>
          </section>

          <section className="mt-5">
            <H>Certifications</H>
            <ul className="mt-2 grid gap-x-6 gap-y-0.5 sm:grid-cols-2">
              {certifications.map((c) => <li key={c.id}>• {c.name}</li>)}
            </ul>
          </section>

          <section className="mt-5">
            <H>Technical skills</H>
            <dl className="mt-2 space-y-1">
              {skillGroups.map((g) => (
                <div key={g.id} className="sm:flex sm:gap-2">
                  <dt className="shrink-0 font-semibold text-[#0B1220] sm:w-48">{g.title}:</dt>
                  <dd>{g.skills.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mt-5">
            <H>Professional experience</H>
            <div className="mt-2 space-y-4">
              {experience.map((r) => (
                <div key={r.id} className="break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="font-semibold text-[#0B1220]">{r.role} — {r.company}</h3>
                    <span className="text-xs font-medium text-slate-500">{r.period}</span>
                  </div>
                  <ul className="mt-1 list-disc space-y-0.5 pl-5">
                    {r.highlights.map((h) => <li key={h}>{h}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-5 break-inside-avoid">
            <H>Selected projects</H>
            <ul className="mt-2 space-y-2">
              {projects.map((p) => (
                <li key={p.slug}>
                  <span className="font-semibold text-[#0B1220]">{p.title}</span>
                  {p.github ? <span className="text-xs text-slate-500"> — {p.github.replace("https://", "")}</span> : null}
                  <p>{p.summary}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-5 break-inside-avoid">
            <H>Education</H>
            <ul className="mt-2 space-y-1">
              {education.map((e) => (
                <li key={e.degree} className="flex flex-wrap justify-between gap-x-4">
                  <span><span className="font-semibold text-[#0B1220]">{e.degree}</span> — {e.school}</span>
                  <span className="text-xs text-slate-500">{e.status}</span>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </div>
    </>
  );
}
