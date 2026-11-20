import { PageHeader } from "@/components/PageHeader";
import { Timeline } from "@/components/Timeline";
import { CtaBand } from "@/components/CtaBand";
import { experience } from "@/data/profile";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Experience",
  description: "Career timeline: Founder & Cloud Engineer at Cloud Tech Inter LLC, freelance software developer, and freelance Oracle Database Administrator at BRONTECH SOLUTIONS.",
  path: "/experience",
});

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title={<>From databases and code <span className="text-gradient">to the cloud</span>.</>}
        lead="Oracle database administration, software development and, since 2025, cloud engineering for small businesses on AWS, OCI and Azure."
      />
      <section className="container-site" aria-label="Career timeline">
        <Timeline roles={experience} />
      </section>
      <CtaBand title="Looking for a cloud engineer who understands data?" />
    </>
  );
}
