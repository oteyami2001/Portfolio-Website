import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { Loader } from "@/components/cinema/Loader";
import { CineScene } from "@/components/cinema/CineScene";
import { HorizontalTimeline, type Milestone } from "@/components/cinema/HorizontalTimeline";
import { KnowledgeGraph } from "@/components/cinema/KnowledgeGraph";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { CertGrid } from "@/components/CertGrid";
import { Reveal } from "@/components/Reveal";
import { certifications, contactEmail, education, experience, profile, stats } from "@/data/profile";
import { projects } from "@/data/projects";

const milestones: Milestone[] = [
  { kicker: "2020 – 2022 · Database", title: "Oracle DBA", org: "BRONTECH SOLUTIONS", body: "Installed, patched, tuned and secured Oracle environments — RMAN, Data Pump, RAC, ASM and Data Guard.", tone: "blue" },
  { kicker: "2022 – 2025 · Software", title: "Software Developer", org: "Upwork / Freelance", body: "Data-driven applications, backend components and automation in Java, Python, C#, C++ and SQL.", tone: "blue" },
  { kicker: "Education", title: "B.S. Software Dev & Security", org: education[1].school, body: education[1].detail, tone: "amber" },
  ...certifications.map((c): Milestone => ({ kicker: "Credential", title: c.short, org: c.issuer, body: c.name, tone: "amber" })),
  { kicker: "2025 · Founder", title: "Cloud Tech Inter LLC", org: "Self-employed cloud engineering", body: experience[0].summary, tone: "cyan" },
  { kicker: "In progress", title: "M.S. Cloud Computing", org: education[0].school, body: "Graduate study in cloud architecture, migration, orchestration and security.", tone: "amber" },
];

const facts: [string, string][] = [
  ["Discipline", "Cloud engineering"],
  ["Company", profile.company],
  ["Clouds", "AWS · OCI · Azure"],
  ["Based", "Silver Spring, MD"],
  ["Citizenship", profile.citizenship],
  ["Studying", "M.S. Cloud Computing, UMGC"],
  ["Experience", `${profile.yearsExperience} years`],
];

const pillars = [
  { n: "01", word: "Architect", line: "Networks, identity and data tiers — private by default, designed to survive failure.", tags: ["Landing zones", "Multi-account", "Hybrid VPN"] },
  { n: "02", word: "Migrate", line: "Databases and servers moved with a plan you can roll back: replicate, validate, cut over.", tags: ["AWS DMS", "AWS MGN", "Cutover & DR"] },
  { n: "03", word: "Automate", line: "Infrastructure as code, validated in CI, secured with least privilege from day one.", tags: ["Terraform", "CloudFormation", "GitHub Actions"] },
];

export default function HomePage() {
  return (
    <>
      <Loader />

      {/* SCENE 1 — THE ENGINEER */}
      <CineScene
        label="Introduction"
        length={3.2}
        portrait={{ x: [64, 70], scale: [1.08, 1], y: [0, 4], grade: 0.3 }}
        extras="hero"
        beats={[
          {
            from: 0, to: 0.32,
            content: (
              <>
                <p className="eyebrow">The cloud engineer</p>
                <h1 className="h-cine mt-5 text-[3.4rem] sm:text-8xl lg:text-[9rem]">
                  Thierry<br /><span className="text-cyan-300">Oteyami</span>
                </h1>
                <p className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-mist-300 sm:text-sm">Architect · Migrate · Automate · Secure</p>
                <p className="mt-10 hidden font-mono text-[0.68rem] uppercase tracking-[0.3em] text-mist-400 sm:block">Scroll to deploy ↓</p>
              </>
            ),
          },
          {
            from: 0.34, to: 0.64,
            content: (
              <>
                <h2 className="h-cine text-5xl sm:text-7xl lg:text-8xl">
                  Secure.<br /><span className="text-cyan-300">Scalable.</span><br />Intelligent.
                </h2>
                <p className="serif-quote mt-6 max-w-lg text-2xl sm:text-3xl">Cloud infrastructure on AWS, OCI and Azure — engineered to last.</p>
              </>
            ),
          },
          {
            from: 0.66, to: 1, place: "bottom",
            content: (
              <>
                <p className="eyebrow">Enter the system</p>
                <h2 className="h-cine mt-4 text-5xl sm:text-7xl lg:text-8xl">Infrastructure<br />is a <span className="text-cyan-300">promise.</span></h2>
                <p className="serif-quote mt-4 text-xl sm:text-2xl">Uptime, security and recovery — kept.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/projects" className="btn-primary">Explore projects <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
                  <Link href="/contact" className="btn-ghost">Start a conversation</Link>
                  <a href={profile.resumePdf} download className="btn-ghost"><Download className="h-4 w-4" aria-hidden="true" /> Resume</a>
                </div>
              </>
            ),
          },
        ]}
      />

      {/* STATS */}
      <section className="container-site relative z-10 -mt-[10vh]" aria-label="At a glance">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-cyan-300/10 bg-cyan-300/10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse justify-end bg-ink-950/90 px-5 py-6 backdrop-blur">
              <dt className="mt-1 text-xs leading-snug text-mist-400 sm:text-sm">{s.label}</dt>
              <dd className="font-display text-5xl font-semibold text-white">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* STORY */}
      <section className="container-site mt-32" aria-labelledby="story-title">
        <p className="eyebrow">The story</p>
        <h2 id="story-title" className="h-section mt-4">Not a résumé.<br /><span className="serif-quote normal-case text-cyan-300">A system log.</span></h2>
        <div className="mt-14 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div className="space-y-6 text-base leading-relaxed text-mist-300 sm:text-lg">
            <Reveal>
              <p className="first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-cyan-300">
                It started with data. As a freelance <strong className="text-white">Oracle Database Administrator</strong>, the job was simple to say and hard to do: keep databases fast, recoverable and secure — patch them, tune them, back them up and prove the restore works.
              </p>
            </Reveal>
            <Reveal>
              <p>Then came code. As a freelance <strong className="text-white">software developer</strong>, Thierry built data-driven applications, backend logic and automation in Java, Python, C#, C++ and SQL — and learned to ship, troubleshoot and deploy on Linux and in the cloud.</p>
            </Reveal>
            <Reveal>
              <p>In 2025 the two paths met. He founded <strong className="text-white">{profile.company}</strong> to design and implement secure, scalable cloud solutions for small businesses and professional-service firms on <strong className="text-white">AWS, OCI and Azure</strong> — multi-account foundations, migrations, infrastructure as code and least-privilege security.</p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <blockquote className="border-l border-cyan-300/40 pl-6">
              <p className="serif-quote text-3xl leading-snug sm:text-4xl">&ldquo;A system isn&apos;t finished when it runs. It&apos;s finished when it can recover.&rdquo;</p>
            </blockquote>
            <dl className="mt-10 divide-y divide-cyan-300/10 border-y border-cyan-300/10">
              {facts.map(([k, v]) => (
                <div key={k} className="flex items-center justify-between gap-4 py-3">
                  <dt className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-mist-400">{k}</dt>
                  <dd className="text-right text-sm text-white">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* TIMELINE */}
      <div className="mt-24">
        <HorizontalTimeline items={milestones} />
      </div>

      {/* SCENE 2 — DATA SURVIVES */}
      <CineScene
        label="Principles"
        length={2.6}
        density={1.6}
        beams={false}
        portrait={{ x: [50, 50], scale: [0.92, 1.04], y: [6, 0], grade: 0.6, size: "md" }}
        extras="data"
        beats={[
          { from: 0, to: 0.3, align: "center", place: "top", content: <h2 className="h-cine text-6xl sm:text-8xl lg:text-9xl">Clouds <span className="text-cyan-300">change.</span></h2> },
          { from: 0.32, to: 0.62, align: "center", place: "top", content: <h2 className="h-cine text-6xl sm:text-8xl lg:text-9xl">Data <span className="text-cyan-300">survives.</span></h2> },
          {
            from: 0.64, to: 1, align: "center", place: "top",
            content: (
              <>
                <h2 className="h-cine text-6xl sm:text-8xl lg:text-9xl">Automation <span className="text-cyan-300">compounds.</span></h2>
                <p className="serif-quote mx-auto mt-6 max-w-2xl text-2xl sm:text-3xl">Reliability isn&apos;t a feature. It&apos;s a responsibility.</p>
              </>
            ),
          },
        ]}
      />

      {/* SCENE 3 — PILLARS */}
      <CineScene
        label="Operating model"
        length={3.4}
        beams
        portrait={{ x: [68, 72], scale: [1, 1.04], grade: 0.4 }}
        beats={[
          {
            from: 0, to: 0.22,
            content: (
              <>
                <p className="eyebrow">The operating model</p>
                <h2 className="h-cine mt-4 text-7xl sm:text-8xl lg:text-9xl">Three<br /><span className="text-cyan-300">pillars</span></h2>
              </>
            ),
          },
          ...pillars.map((pl, i) => ({
            from: 0.25 + i * 0.25, to: i === 2 ? 1 : 0.47 + i * 0.25,
            content: (
              <>
                <p className="font-mono text-sm text-cyan-300">{pl.n}</p>
                <h3 className="h-cine mt-2 text-7xl sm:text-8xl lg:text-9xl">{pl.word}</h3>
                <p className="serif-quote mt-4 max-w-md text-2xl sm:text-3xl">{pl.line}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {pl.tags.map((t) => <li key={t} className="chip">{t}</li>)}
                </ul>
              </>
            ),
          })),
        ]}
      />

      {/* FEATURED WORK */}
      <section className="container-site mt-24" aria-labelledby="work-title">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Featured work</p>
            <h2 id="work-title" className="h-section mt-4">Built to run.<br /><span className="serif-quote normal-case text-cyan-300">Built to recover.</span></h2>
          </div>
          <Reveal><Link href="/projects" className="btn-ghost">All projects <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></Reveal>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => <ProjectCard key={p.slug} project={p} index={i} />)}
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section className="container-site mt-32" aria-labelledby="arch-title">
        <SectionHeading eyebrow="Interactive architecture" id="arch-title" title="Inspect a migration." lead="The BallotOnline target architecture on AWS — hover, tap or tab through each component." />
        <Reveal className="mt-10"><ArchitectureDiagram diagram={projects[0].diagram} /></Reveal>
      </section>

      {/* KNOWLEDGE GRAPH */}
      <section className="container-site mt-32" aria-labelledby="graph-title">
        <p className="eyebrow">You are now inside the control plane</p>
        <h2 id="graph-title" className="h-section mt-4">Everything <span className="text-cyan-300">connects.</span></h2>
        <p className="lead mt-5 max-w-2xl">Clouds, projects, credentials, career and craft — every node is real. Click one.</p>
        <div className="mt-10"><KnowledgeGraph /></div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="container-site mt-32" aria-labelledby="certs-title">
        <SectionHeading eyebrow="Certified" id="certs-title" title="AWS and Oracle Cloud." />
        <div className="mt-12"><CertGrid /></div>
      </section>

      {/* FINALE */}
      <CineScene
        label="Get in touch"
        length={2}
        portrait={{ x: [50, 50], scale: [1.1, 1], y: [8, 0], grade: 0.5 }}
        beats={[
          {
            from: 0, to: 1, align: "center", place: "top",
            content: (
              <>
                <p className="serif-quote text-4xl leading-tight sm:text-6xl">
                  <span className="text-cyan-300">Design</span> the cloud.<br />
                  <span className="text-amber-400">Protect</span> the data.<br />
                  Leave every system better than you found it.
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-3">
                  <Link href="/contact" className="btn-primary">Connect with me <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
                  <a href={`mailto:${contactEmail}`} className="btn-ghost">{contactEmail}</a>
                </div>
              </>
            ),
          },
        ]}
      />
    </>
  );
}
