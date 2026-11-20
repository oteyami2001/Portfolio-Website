import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BootSequence } from "@/components/BootSequence";
import { Hero } from "@/components/Hero";
import { Pillars } from "@/components/Pillars";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { CloudTopology } from "@/components/CloudTopology";
import { Timeline } from "@/components/Timeline";
import { CertGrid } from "@/components/CertGrid";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";
import { experience, profile } from "@/data/profile";
import { projects } from "@/data/projects";

export default function HomePage() {
  return (
    <>
      <BootSequence />
      <Hero />

      {/* Story */}
      <section className="container-site mt-12 sm:mt-20" aria-labelledby="story-title">
        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-cyan-400/30 via-azure-500/20 to-transparent blur-2xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-cyan-300/20">
              <Image src={profile.photo} alt={`Portrait of ${profile.name}`} width={800} height={800} className="h-auto w-full" sizes="(max-width: 1024px) 90vw, 380px" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-transparent p-5 pt-16">
                <p className="font-display text-lg font-semibold text-white">{profile.shortName}</p>
                <p className="font-mono text-xs text-cyan-300">Founder · {profile.company}</p>
              </div>
            </div>
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="The story"
              id="story-title"
              title={<>From production databases to <span className="text-gradient">cloud platforms</span>.</>}
              lead={profile.summary}
            />
            <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-3">
              <Link href="/about" className="btn-ghost">More about me <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              <Link href="/experience" className="btn-ghost">Career timeline</Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="container-site mt-28" aria-labelledby="pillars-title">
        <SectionHeading eyebrow="How I work" id="pillars-title" title="Architect. Migrate. Automate & secure." lead="Three disciplines that run through every engagement — from a small-business landing zone to an enterprise database migration." />
        <div className="mt-12"><Pillars /></div>
      </section>

      {/* Projects */}
      <section className="container-site mt-28" aria-labelledby="projects-title">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Featured work" id="projects-title" title="Cloud engineering, in practice." lead="Case studies with architecture, implementation detail, real troubleshooting and the code to back them up." />
          <Reveal><Link href="/projects" className="btn-ghost">All projects <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></Reveal>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {projects.map((p, i) => <ProjectCard key={p.slug} project={p} index={i} />)}
        </div>
      </section>

      {/* Architecture showcase */}
      <section className="container-site mt-28" aria-labelledby="arch-title">
        <SectionHeading eyebrow="Interactive architecture" id="arch-title" title="Explore a migration, component by component." lead="The BallotOnline target architecture on AWS — hover, tap or tab through each component to see what it does and why it's there." />
        <Reveal className="mt-10"><ArchitectureDiagram diagram={projects[0].diagram} /></Reveal>
      </section>

      {/* Topology */}
      <section className="relative mt-28 overflow-hidden py-20" aria-labelledby="topology-title">
        <div className="aurora pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-site relative">
          <SectionHeading eyebrow="Skills topology" id="topology-title" title="One engineer, six cloud domains, three providers." lead="Select a domain to see the services I use for it on AWS, Azure and OCI — and the projects where they appear." />
          <div className="mt-12"><CloudTopology /></div>
          <Reveal className="mt-8"><Link href="/skills" className="btn-ghost">Full skills inventory <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="container-site mt-20" aria-labelledby="timeline-title">
        <SectionHeading eyebrow="Career" id="timeline-title" title="A decade-plus of keeping systems running." />
        <div className="mt-12"><Timeline roles={experience.slice(0, 4)} compact /></div>
        <Reveal className="mt-10"><Link href="/experience" className="btn-ghost">Full experience <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></Reveal>
      </section>

      {/* Certifications */}
      <section className="container-site mt-28" aria-labelledby="certs-title">
        <SectionHeading eyebrow="Certified" id="certs-title" title="Validated across AWS, Oracle and security." />
        <div className="mt-12"><CertGrid /></div>
      </section>

      <CtaBand />
    </>
  );
}
