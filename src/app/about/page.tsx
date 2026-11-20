import Image from "next/image";
import { GraduationCap, MapPin, Building2, Target } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { Pillars } from "@/components/Pillars";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { education, profile, stats } from "@/data/profile";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description: "About Thierry Oteyami — cloud engineer, software developer and Oracle DBA designing, automating and securing cloud solutions on AWS, OCI and Azure.",
  path: "/about",
});

const facts = [
  { icon: MapPin, label: "Based in", value: `${profile.location} · ${profile.citizenship}` },
  { icon: Building2, label: "Company", value: `Founder, ${profile.company}` },
  { icon: GraduationCap, label: "Studying", value: "M.S. Cloud Computing Systems, UMGC" },
  { icon: Target, label: "Focus", value: "AWS · OCI · Azure · Oracle DB" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About me" title={<>Infrastructure engineer. <span className="text-gradient">Data guardian.</span> Builder.</>} lead={profile.intro} />

      <section className="container-site" aria-label="Profile">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-[1.75rem] border border-cyan-300/20">
              <Image src={profile.photo} alt={`Portrait of ${profile.name}`} width={800} height={800} priority className="h-auto w-full" sizes="(max-width: 1024px) 90vw, 420px" />
            </div>
            <dl className="mt-6 grid gap-3">
              {facts.map((f) => (
                <div key={f.label} className="glass flex items-center gap-4 px-4 py-3">
                  <f.icon className="h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
                  <div>
                    <dt className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-mist-400">{f.label}</dt>
                    <dd className="text-sm text-white">{f.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>

          <div className="space-y-6 text-base leading-relaxed text-mist-300 sm:text-lg">
            <Reveal>
              <p>{profile.summary}</p>
            </Reveal>
            <Reveal>
              <p>
                As a freelance Oracle DBA with BRONTECH SOLUTIONS I installed, patched, tuned and secured Oracle environments — RMAN and Data Pump recovery, RAC, ASM and Data Guard, and disaster-recovery testing. That background shapes how I approach the cloud: I design for failure, test the recovery path, and treat security and observability as requirements, not afterthoughts.
              </p>
            </Reveal>
            <Reveal>
              <p>
                As a freelance software developer I built data-driven applications, backend components and automation in Java, Python, C#, C++ and SQL. In 2025 I founded <strong className="text-white">{profile.company}</strong>, where I design and implement secure, scalable cloud solutions for small businesses and professional-service clients on AWS, OCI and Azure — with security grounded in least privilege, MFA, encryption and frameworks such as RMF, NIST SP 800-53 and DISA STIG.
              </p>
            </Reveal>
            <Reveal>
              <p>
                I&apos;m completing a Master of Science in Cloud Computing Systems at UMGC, and I publish my project work — CloudFormation and ARM templates, migration runbooks, validation SQL and CI pipelines — openly on GitHub.
              </p>
            </Reveal>

            <Reveal>
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-cyan-300/10 bg-cyan-300/10">
                {stats.map((s) => (
                  <div key={s.label} className="flex flex-col-reverse bg-ink-950 p-5">
                    <dt className="mt-1 text-sm text-mist-400">{s.label}</dt>
                    <dd className="font-display text-3xl font-semibold text-white">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container-site mt-28" aria-labelledby="approach-title">
        <SectionHeading eyebrow="Approach" id="approach-title" title="What I bring to a team." />
        <div className="mt-12"><Pillars /></div>
      </section>

      <section className="container-site mt-28" aria-labelledby="edu-title">
        <SectionHeading eyebrow="Education" id="edu-title" title="Grounded in software, security and cloud systems." />
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {education.map((e, i) => (
            <Reveal as="li" key={e.degree} delay={i * 0.06} className="glass glass-hover p-6">
              <GraduationCap className="h-7 w-7 text-cyan-300" aria-hidden="true" />
              <p className={`mt-4 inline-block rounded-full px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] ${e.status === "In progress" ? "bg-amber-400/15 text-amber-400" : "bg-cyan-400/10 text-cyan-300"}`}>{e.status}</p>
              <h3 className="mt-3 font-display text-lg font-semibold text-white">{e.degree}</h3>
              <p className="mt-1 text-sm text-cyan-300">{e.school}</p>
              <p className="mt-3 text-sm leading-relaxed text-mist-300">{e.detail}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <CtaBand />
    </>
  );
}
