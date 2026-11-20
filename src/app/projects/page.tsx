import { PageHeader } from "@/components/PageHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { CtaBand } from "@/components/CtaBand";
import { GitHubIcon } from "@/components/BrandIcons";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects",
  description: "Cloud engineering case studies: BallotOnline AWS Cloud Migration, BallotOnline Azure Cloud Orchestration and the Cloud Tech Inter LLC multi-account AWS foundation.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title={<>Architecture you can <span className="text-gradient">inspect</span>. Code you can read.</>}
        lead="Each case study covers the problem, the architecture, how it was built, what broke along the way and what I learned — with links to the repositories."
      >
        <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
          <GitHubIcon className="h-4 w-4" /> View all repositories on GitHub
        </a>
      </PageHeader>
      <section className="container-site" aria-label="Project case studies">
        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((p, i) => <ProjectCard key={p.slug} project={p} index={i} />)}
        </div>
      </section>
      <CtaBand title="Have a migration or platform to build?" />
    </>
  );
}
