import { CloudCog, DatabaseZap, ShieldCheck } from "lucide-react";
import { Reveal } from "./Reveal";

const PILLARS = [
  {
    icon: CloudCog,
    title: "Architect",
    body: "Design secure, scalable landing zones and application platforms on AWS, OCI and Azure — networks, identity, compute and data tiers that are private by default.",
    tags: ["Landing zones", "Multi-account", "Hybrid VPN"],
  },
  {
    icon: DatabaseZap,
    title: "Migrate",
    body: "Move enterprise workloads and databases with a plan you can roll back: assessment, replication, validation, cutover runbooks and disaster recovery.",
    tags: ["DMS · MGN", "Data Guard · RMAN", "Cutover & DR"],
  },
  {
    icon: ShieldCheck,
    title: "Automate & secure",
    body: "Codify infrastructure, validate every change in CI and bake in least privilege, encryption, auditing and monitoring from day one.",
    tags: ["Terraform", "GitHub Actions", "IAM · KMS"],
  },
];

export function Pillars() {
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {PILLARS.map((p, i) => (
        <Reveal as="li" key={p.title} delay={i * 0.08} className="glass glass-hover relative overflow-hidden p-7">
          <span className="font-mono text-xs text-mist-400">0{i + 1}</span>
          <p.icon className="mt-4 h-8 w-8 text-cyan-300" aria-hidden="true" />
          <h3 className="mt-5 font-display text-2xl font-semibold text-white">{p.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-mist-300">{p.body}</p>
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {p.tags.map((t) => <li key={t} className="chip !text-[0.68rem]">{t}</li>)}
          </ul>
        </Reveal>
      ))}
    </ul>
  );
}
