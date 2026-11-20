import Link from "next/link";
import { ArrowRight, Building, CloudUpload, DatabaseBackup, LockKeyhole, Network, Workflow } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { getProject } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cloud Tech Inter LLC",
  description: "Cloud Tech Inter LLC designs and implements secure cloud solutions for small businesses on AWS, Oracle Cloud Infrastructure and Microsoft Azure.",
  path: "/cloud-tech-inter",
});

const SERVICES = [
  { icon: Building, title: "Cloud foundations", body: "Multi-account AWS Organizations, OUs, IAM Identity Center and guardrails sized for small teams." },
  { icon: CloudUpload, title: "Migration", body: "Assessment, migration planning and execution for servers and databases, with cutover and rollback runbooks." },
  { icon: DatabaseBackup, title: "Database modernization", body: "Oracle, SQL Server, PostgreSQL and MySQL — moved to managed services or OCI, with tested backup and DR." },
  { icon: Network, title: "Network & hybrid", body: "VPC/VCN design, segmentation, site-to-site VPN and DRG connectivity between offices and the cloud." },
  { icon: Workflow, title: "Automation & DevOps", body: "Terraform, CloudFormation and ARM templates, delivered through GitHub Actions pipelines." },
  { icon: LockKeyhole, title: "Security & governance", body: "Least privilege, MFA, encryption, logging and audit readiness built into every environment." },
];

const CLIENT_PROJECTS = [
  { title: "AWS Multi-Account Business Environment", body: "AWS Organizations and IAM Identity Center with administrative, cloud engineering, database, security, developer, billing, read-only and intern access patterns; permission sets and MFA.", href: "/projects/cloud-tech-inter-foundation" },
  { title: "CPA & Tax Professional Cloud Solution", body: "A secure AWS migration concept for independent accounting and tax practices: protected document storage, backups, controlled access, business continuity and scalable cloud services." },
  { title: "WordPress on AWS ECS Fargate", body: "Terraform-based architecture with ECS Fargate, Application Load Balancer, RDS MariaDB, VPC networking, security groups, IAM roles and monitoring.", href: "/projects/wordpress-ecs-fargate" },
  { title: "Cloud Migration Architecture", body: "Database and server migration approaches with AWS DMS and AWS Application Migration Service, including replication, validation, cutover, rollback, security and monitoring.", href: "/projects/ballotonline-aws-migration" },
];

const PROCESS = [
  { step: "Assess", body: "Inventory workloads, dependencies, risks and goals." },
  { step: "Design", body: "Target architecture, security model and migration strategy per workload." },
  { step: "Build", body: "Everything as code, validated in CI, deployed in small safe steps." },
  { step: "Operate", body: "Monitoring, runbooks, cost reviews and continuous improvement." },
];

export default function CloudTechInterPage() {
  const foundation = getProject("cloud-tech-inter-foundation")!;
  return (
    <>
      <PageHeader
        eyebrow="Cloud Tech Inter LLC · Founded 2025"
        title={<>Enterprise-grade cloud, <span className="text-gradient">sized for small business</span>.</>}
        lead="Cloud Tech Inter LLC designs and implements cloud solutions for small businesses on AWS, Oracle Cloud Infrastructure and Microsoft Azure — secure foundations, smooth migrations and automation that keeps environments reliable."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="btn-primary">Discuss a project <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          <Link href="/projects/cloud-tech-inter-foundation" className="btn-ghost">Reference architecture</Link>
        </div>
      </PageHeader>

      <section className="container-site" aria-labelledby="svc-title">
        <h2 id="svc-title" className="sr-only">Services</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.05} className="glass glass-hover p-6">
              <s.icon className="h-7 w-7 text-cyan-300" aria-hidden="true" />
              <h3 className="mt-4 font-display text-lg font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist-300">{s.body}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="container-site mt-28" aria-labelledby="work-title">
        <SectionHeading eyebrow="Selected work" id="work-title" title="Cloud Tech Inter projects." />
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {CLIENT_PROJECTS.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 0.05} className="glass glass-hover relative p-6">
              <span className="font-mono text-xs text-cyan-300">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-white">
                {p.href ? <Link href={p.href} className="after:absolute after:inset-0 after:content-['']">{p.title}</Link> : p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mist-300">{p.body}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="container-site mt-28" aria-labelledby="org-title">
        <SectionHeading eyebrow="Reference architecture" id="org-title" title="A governed multi-account AWS foundation." lead={foundation.summary} />
        <Reveal className="mt-10"><ArchitectureDiagram diagram={foundation.diagram} /></Reveal>
      </section>

      <section className="container-site mt-28" aria-labelledby="process-title">
        <SectionHeading eyebrow="Engagement model" id="process-title" title="Assess. Design. Build. Operate." />
        <ol className="relative mt-12 grid gap-4 md:grid-cols-4">
          <span className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-cyan-300/0 via-cyan-300/40 to-cyan-300/0 md:block" aria-hidden="true" />
          {PROCESS.map((p, i) => (
            <Reveal as="li" key={p.step} delay={i * 0.08} className="relative">
              <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-cyan-300/40 bg-ink-900 font-mono text-sm text-cyan-300">{i + 1}</span>
              <h3 className="mt-4 font-display text-xl font-semibold text-white">{p.step}</h3>
              <p className="mt-2 text-sm text-mist-300">{p.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <CtaBand title="Ready to move your business to the cloud — securely?" lead="Tell me about your workloads, timeline and goals. I'll come back with a practical plan." />
    </>
  );
}
