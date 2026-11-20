import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, Lightbulb, Wrench } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { GitHubIcon } from "@/components/BrandIcons";
import { getProject, projects } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return pageMetadata({ title: p.title, description: p.summary, path: `/projects/${p.slug}` });
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <>
      <PageHeader eyebrow={`${project.platform} · ${project.kicker}`} title={project.title} lead={project.summary}>
        <div className="flex flex-wrap gap-3">
          {project.github ? (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-primary"><GitHubIcon className="h-4 w-4" /> View repository</a>
          ) : null}
          {project.liveDemo ? (
            <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="btn-ghost"><ExternalLink className="h-4 w-4" aria-hidden="true" /> Live demo</a>
          ) : null}
          <Link href="/projects" className="btn-ghost"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> All projects</Link>
        </div>
      </PageHeader>

      <section className="container-site" aria-labelledby="ctx-title">
        <div className="grid gap-4 md:grid-cols-2">
          <Reveal className="glass p-7">
            <h2 id="ctx-title" className="eyebrow">Context</h2>
            <p className="mt-4 leading-relaxed text-mist-100">{project.context}</p>
          </Reveal>
          <Reveal delay={0.08} className="glass p-7">
            <h2 className="eyebrow">The challenge</h2>
            <p className="mt-4 leading-relaxed text-mist-100">{project.challenge}</p>
          </Reveal>
        </div>
      </section>

      <section className="container-site mt-20" aria-labelledby="arch-title">
        <SectionHeading eyebrow="Architecture" id="arch-title" title="How it fits together." />
        <Reveal className="mt-10"><ArchitectureDiagram diagram={project.diagram} /></Reveal>
      </section>

      <section className="container-site mt-20" aria-labelledby="impl-title">
        <SectionHeading eyebrow="Implementation" id="impl-title" title="What I built." />
        <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {project.approach.map((a, i) => (
            <Reveal as="li" key={a.title} delay={i * 0.05} className="glass glass-hover p-6">
              <span className="font-mono text-xs text-cyan-300">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-white">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist-300">{a.body}</p>
            </Reveal>
          ))}
        </ol>
        <Reveal className="mt-8">
          <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-mist-400">Services & tools</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.services.map((s) => <li key={s} className="chip">{s}</li>)}
          </ul>
        </Reveal>
      </section>

      {project.troubleshooting ? (
        <section className="container-site mt-20" aria-labelledby="ts-title">
          <SectionHeading eyebrow="Engineering challenges" id="ts-title" title="What broke — and how I fixed it." />
          <Reveal className="mt-10 overflow-hidden rounded-2xl border border-cyan-300/10">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-ink-850 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-mist-400">
                  <tr><th scope="col" className="px-5 py-3">Issue</th><th scope="col" className="px-5 py-3">Root cause</th><th scope="col" className="px-5 py-3">Resolution</th></tr>
                </thead>
                <tbody>
                  {project.troubleshooting.map((t) => (
                    <tr key={t.issue} className="border-t border-cyan-300/10 align-top">
                      <th scope="row" className="px-5 py-4 font-medium text-white"><Wrench className="mr-2 inline h-4 w-4 text-amber-400" aria-hidden="true" />{t.issue}</th>
                      <td className="px-5 py-4 text-mist-300">{t.cause}</td>
                      <td className="px-5 py-4 text-mist-100">{t.fix}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>
      ) : null}

      <section className="container-site mt-20" aria-labelledby="out-title">
        <div className="grid gap-4 md:grid-cols-2">
          <Reveal className="glass p-7">
            <h2 id="out-title" className="flex items-center gap-2 font-display text-2xl font-semibold text-white"><CheckCircle2 className="h-6 w-6 text-[#4ADE9B]" aria-hidden="true" /> Outcomes</h2>
            <ul className="mt-5 space-y-3">
              {project.outcomes.map((o) => <li key={o} className="flex gap-3 text-sm leading-relaxed text-mist-100"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#4ADE9B]" aria-hidden="true" />{o}</li>)}
            </ul>
          </Reveal>
          <Reveal delay={0.08} className="glass p-7">
            <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-white"><Lightbulb className="h-6 w-6 text-amber-400" aria-hidden="true" /> Lessons learned</h2>
            <ul className="mt-5 space-y-3">
              {project.lessons.map((l) => <li key={l} className="flex gap-3 text-sm leading-relaxed text-mist-100"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-400" aria-hidden="true" />{l}</li>)}
            </ul>
          </Reveal>
        </div>
        {project.evidence ? (
          <Reveal className="mt-4 rounded-2xl border border-dashed border-mist-300/20 px-6 py-4 text-sm text-mist-400">
            <strong className="text-mist-300">Scope note: </strong>{project.evidence}
          </Reveal>
        ) : null}
      </section>

      <nav className="container-site mt-16" aria-label="Next project">
        <Link href={`/projects/${next.slug}`} className="glass glass-hover group flex items-center justify-between gap-4 p-6">
          <span>
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-mist-400">Next case study</span>
            <span className="mt-1 block font-display text-xl font-semibold text-white">{next.title}</span>
          </span>
          <ArrowRight className="h-6 w-6 text-cyan-300 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </nav>

      <CtaBand />
    </>
  );
}
