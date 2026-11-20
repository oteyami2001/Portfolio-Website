import { Briefcase, Handshake, MessageSquare } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { GitHubIcon, LinkedInIcon } from "@/components/BrandIcons";
import { contactEmail, profile } from "@/data/profile";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Contact Thierry Oteyami about AWS, OCI or Azure cloud engineering roles, Oracle DBA opportunities or consulting with Cloud Tech Inter LLC.",
  path: "/contact",
});

const REASONS = [
  { icon: Briefcase, title: "Employment", body: `${profile.targetRoles.join(", ")} roles — full-time or contract.` },
  { icon: Handshake, title: "Consulting", body: "Cloud foundations, migrations, database modernization and automation through Cloud Tech Inter LLC." },
  { icon: MessageSquare, title: "Collaboration", body: "Speaking, writing, mentoring or open-source work on cloud and databases." },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={<>Let&apos;s talk about <span className="text-gradient">your cloud</span>.</>}
        lead="Whether you're hiring or planning a cloud project, I'd like to hear from you."
      />
      <section className="container-site" aria-label="Ways to get in touch">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-4">
            {REASONS.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.06} className="glass flex gap-4 p-5">
                <r.icon className="h-6 w-6 shrink-0 text-cyan-300" aria-hidden="true" />
                <div>
                  <h2 className="font-display text-lg font-semibold text-white">{r.title}</h2>
                  <p className="mt-1 text-sm text-mist-300">{r.body}</p>
                </div>
              </Reveal>
            ))}
            <Reveal className="grid gap-3 sm:grid-cols-2">
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="glass glass-hover flex items-center gap-3 p-5">
                <LinkedInIcon className="h-6 w-6 text-[#5B8CFF]" />
                <span><span className="block font-semibold text-white">LinkedIn</span><span className="text-xs text-mist-400">Message me directly</span></span>
              </a>
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="glass glass-hover flex items-center gap-3 p-5">
                <GitHubIcon className="h-6 w-6 text-white" />
                <span><span className="block font-semibold text-white">GitHub</span><span className="text-xs text-mist-400">@oteyami2001</span></span>
              </a>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <ContactForm email={contactEmail} linkedin={profile.links.linkedin} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
