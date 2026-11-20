import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { SkillsMatrix } from "@/components/SkillsMatrix";
import { CloudTopology } from "@/components/CloudTopology";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";
import { skillGroups } from "@/data/profile";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Skills",
  description: "Technical skills across AWS, Oracle Cloud Infrastructure, Microsoft Azure, DevOps and automation, database administration, and security and governance.",
  path: "/skills",
});

export default function SkillsPage() {
  const total = skillGroups.reduce((n, g) => n + g.skills.length, 0);
  return (
    <>
      <PageHeader
        eyebrow="Technical expertise"
        title={<>The stack behind <span className="text-gradient">the systems</span>.</>}
        lead={`${total}+ technologies across three clouds, automation, databases and security — organized the way I use them.`}
      />
      <section className="container-site" aria-label="Skills by area">
        <SkillsMatrix />
      </section>
      <section className="container-site mt-28" aria-labelledby="topo-title">
        <SectionHeading eyebrow="Cross-cloud view" id="topo-title" title="Same problems, three providers." lead="Each capability domain mapped to the equivalent services on AWS, Azure and OCI." />
        <div className="mt-12"><CloudTopology /></div>
      </section>
      <section className="container-site mt-28" aria-labelledby="all-title">
        <SectionHeading eyebrow="Inventory" id="all-title" title="Everything at a glance." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => (
            <Reveal key={g.id} delay={i * 0.05} className="glass p-6">
              <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-white">
                <span className="h-2 w-2 rounded-full" style={{ background: g.accent }} aria-hidden="true" /> {g.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-mist-300">{g.skills.join(" · ")}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
