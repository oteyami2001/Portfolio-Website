import { capabilities, certifications, contactEmail, contactPhone, education, experience, profile, skillGroups } from "@/data/profile";
import { projects } from "@/data/projects";

/** Plain-text knowledge base generated from the portfolio data. Grounds the AI assistant. */
export function buildKnowledge(): string {
  const lines: string[] = [];
  lines.push(`# ${profile.name}`);
  lines.push(`Title: ${profile.title}. Location: ${profile.location}. Citizenship: ${profile.citizenship}. Company: Founder & Cloud Engineer at ${profile.company}.`);
  lines.push(`Summary: ${profile.summary}`);
  lines.push(`Target roles: ${profile.targetRoles.join(", ")}. Also available for consulting.`);
  lines.push(`Total professional experience: ${profile.yearsExperience} years.`);
  lines.push(`Email: ${contactEmail}. Phone: ${contactPhone.display}. LinkedIn: ${profile.links.linkedin}. GitHub: ${profile.links.github}. Resume: available on the /resume page.`);

  lines.push(`\n## Experience`);
  for (const r of experience) {
    lines.push(`- ${r.role}, ${r.company} (${r.period}, ${r.type}). ${r.summary} Highlights: ${r.highlights.join(" ")} Stack: ${r.stack.join(", ")}.`);
  }

  lines.push(`\n## Education`);
  for (const e of education) lines.push(`- ${e.degree} — ${e.school} (${e.status}). ${e.detail}`);

  lines.push(`\n## Certifications`);
  for (const c of certifications) lines.push(`- ${c.name} (${c.issuer}). Covers: ${c.focus.join(", ")}.`);

  lines.push(`\n## Skills`);
  for (const g of skillGroups) lines.push(`- ${g.title}: ${g.skills.join(", ")}.`);

  lines.push(`\n## Capabilities by domain`);
  for (const c of capabilities) {
    lines.push(`- ${c.label}: ${c.summary} AWS: ${c.aws.join(", ")}. Azure: ${c.azure.join(", ")}. OCI: ${c.oci.join(", ")}. Tools: ${c.tools.join(", ")}.`);
  }

  lines.push(`\n## Projects`);
  for (const p of projects) {
    lines.push(`### ${p.title} (${p.platform})`);
    lines.push(`Summary: ${p.summary}`);
    lines.push(`Context: ${p.context} Challenge: ${p.challenge}`);
    lines.push(`Approach: ${p.approach.map((a) => `${a.title}: ${a.body}`).join(" ")}`);
    lines.push(`Services: ${p.services.join(", ")}.`);
    if (p.troubleshooting) lines.push(`Troubleshooting: ${p.troubleshooting.map((t) => [t.issue, t.cause && `cause: ${t.cause}`, t.fix && `fix: ${t.fix}`].filter(Boolean).join(" — ")).join(" | ")}`);
    lines.push(`Outcomes: ${p.outcomes.join(" ")}`);
    lines.push(`Lessons: ${p.lessons.join(" ")}`);
    if (p.evidence) lines.push(`Scope note: ${p.evidence}`);
    if (p.github) lines.push(`GitHub: ${p.github}`);
    lines.push(`Case study page: /projects/${p.slug}`);
  }
  return lines.join("\n");
}
