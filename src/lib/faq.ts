import { certifications, contactEmail, contactPhone, education, experience, profile, skillGroups } from "@/data/profile";
import { projects } from "@/data/projects";

/**
 * Offline, deterministic answers used when no AI key is configured
 * (and as a fallback if the AI call fails). Every answer is built from portfolio data.
 */
type Entry = { keys: string[]; answer: (q: string) => string };

const list = (xs: readonly string[]) => xs.join(", ");

const ENTRIES: Entry[] = [
  {
    keys: ["certif", "cert", "credential", "associate", "exam"],
    answer: () => `Thierry holds ${certifications.length} professional certifications: ${list(certifications.map((c) => c.name))}. See the Certifications page for details.`,
  },
  {
    keys: ["aws"],
    answer: () => {
      const g = skillGroups.find((s) => s.id === "aws")!;
      return `Thierry is an AWS Certified Solutions Architect – Associate. His AWS toolkit includes ${list(g.skills)}. His flagship AWS work is the BallotOnline AWS Cloud Migration (MySQL → Aurora with DMS, Hyper-V → EC2 with MGN, seven CloudFormation stacks), and he designs multi-account AWS Organizations foundations at Cloud Tech Inter LLC.`;
    },
  },
  {
    keys: ["oci", "oracle cloud"],
    answer: () => `Thierry holds the OCI Architect Associate and OCI Foundations certifications and designs OCI solutions at Cloud Tech Inter LLC. His OCI skills include ${list(skillGroups.find((s) => s.id === "oci")!.skills)}.`,
  },
  {
    keys: ["azure", "microsoft"],
    answer: () => `On Microsoft Azure, Thierry built the BallotOnline Azure Cloud Orchestration project: a load-balanced VM Scale Set from a Compute Gallery golden image, a Linux App Service deployed from Git, ARM templates, Azure CLI automation and NSG/managed-identity security. Azure skills: ${list(skillGroups.find((s) => s.id === "azure")!.skills)}.`,
  },
  {
    keys: ["dba", "database", "oracle", "rac", "data guard", "goldengate", "rman", "sql server", "postgres", "mysql"],
    answer: () => `Thierry worked as a freelance Oracle Database Administrator with BRONTECH SOLUTIONS (2020–2022), handling installation, patching, upgrades, RMAN and Data Pump recovery, RAC, ASM, Data Guard and performance tuning. His database skills include ${list(skillGroups.find((s) => s.id === "database")!.skills)}.`,
  },
  {
    keys: ["devops", "terraform", "automation", "pipeline", "kubernetes", "docker", "ansible", "jenkins", "iac"],
    answer: () => `For DevOps and automation, Thierry works with ${list(skillGroups.find((s) => s.id === "devops")!.skills)}. Both BallotOnline repositories run GitHub Actions validation on every change.`,
  },
  {
    keys: ["security", "iam", "governance", "compliance", "mfa", "nist", "rmf", "stig"],
    answer: () => `Security is built into everything Thierry designs: ${list(skillGroups.find((s) => s.id === "security")!.skills)}. He applies least privilege, MFA, KMS encryption, CloudTrail auditing and GuardDuty in his AWS work.`,
  },
  {
    keys: ["project", "portfolio", "ballot", "migration", "github", "repo", "wordpress", "fargate", "parallelcluster", "hpc"],
    answer: (q) => {
      const hit = projects.filter((p) => (q.includes("azure") && p.platform === "Azure") || (q.includes("aws") && q.includes("ballot") && p.slug === "ballotonline-aws-migration") || (q.includes("cloud tech") && p.slug === "cloud-tech-inter-foundation") || ((q.includes("wordpress") || q.includes("fargate")) && p.slug === "wordpress-ecs-fargate") || ((q.includes("hpc") || q.includes("parallelcluster")) && p.slug === "aws-parallelcluster-hpc"));
      if (hit.length === 1) {
        const p = hit[0];
        return `${p.title}: ${p.summary} ${p.evidence ?? ""} Read the case study at /projects/${p.slug}${p.github ? ` or the code at ${p.github}` : ""}.`;
      }
      return `Featured projects: ${projects.map((p) => `${p.title} — ${p.summary}`).join(" ")} Code: ${profile.links.github}.`;
    },
  },
  {
    keys: ["cloud tech", "company", "founder", "llc", "business", "consult"],
    answer: () => `Thierry founded Cloud Tech Inter LLC in 2025, where he designs and implements cloud solutions for small businesses on AWS, OCI and Azure — including multi-account AWS Organizations foundations with IAM Identity Center and permission sets. He is available for consulting engagements via the Contact page.`,
  },
  {
    keys: ["education", "degree", "umgc", "master", "bachelor", "school", "university", "study"],
    answer: () => `Education: ${education.map((e) => `${e.degree}, ${e.school} (${e.status})`).join("; ")} — ${profile.yearsExperience} years of professional experience in total.`,
  },
  {
    keys: ["experience", "career", "job", "work", "role", "brontech", "upwork", "freelance", "history", "years"],
    answer: () => `Career highlights: ${experience.map((r) => `${r.role} at ${r.company} (${r.period})`).join("; ")}.`,
  },
  {
    keys: ["contact", "hire", "email", "reach", "available", "interview", "linkedin"],
    answer: () => `Thierry is open to ${list(profile.targetRoles)} roles and consulting. Reach him by email at ${contactEmail}, by phone at ${contactPhone.display}, via the Contact page, or on LinkedIn: ${profile.links.linkedin}.`,
  },
  {
    keys: ["location", "where", "based", "relocat", "remote", "citizen", "clearance"],
    answer: () => `Thierry is based in ${profile.location} and is a ${profile.citizenship}. For questions about remote work or relocation, please reach out via the Contact page.`,
  },
];

export const SUGGESTED_QUESTIONS = [
  "What AWS experience does Thierry have?",
  "Which certifications does he hold?",
  "Tell me about the BallotOnline AWS migration.",
  "How many years of Oracle DBA experience?",
  "Is he available for consulting?",
];

export function answerFromFaq(question: string): string {
  const q = question.toLowerCase();
  let best: { score: number; entry?: Entry } = { score: 0 };
  for (const e of ENTRIES) {
    const score = e.keys.reduce((s, k) => (q.includes(k) ? s + k.length : s), 0);
    if (score > best.score) best = { score, entry: e };
  }
  if (best.entry) return best.entry.answer(q);
  return `I can answer questions about Thierry's experience, skills (AWS, OCI, Azure, DevOps, Oracle databases, security), certifications, projects, education and availability. ${profile.summary}`;
}
