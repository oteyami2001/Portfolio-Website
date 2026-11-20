import { PageHeader } from "@/components/PageHeader";
import { Timeline } from "@/components/Timeline";
import { CtaBand } from "@/components/CtaBand";
import { experience } from "@/data/profile";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Experience",
  description: "Career timeline: Founder & Cloud Engineer at Cloud Tech Inter LLC, Oracle Cloud Engineer / Solutions Architect at Synacore, freelance DBA and software development, and earlier database engineering roles.",
  path: "/experience",
});

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title={<>Thirteen years of production. <span className="text-gradient">Now in the cloud.</span></>}
        lead="From Oracle database engineering in telecom and enterprise environments to architecting Oracle Cloud Infrastructure and founding a cloud consultancy."
      />
      <section className="container-site" aria-label="Career timeline">
        <Timeline roles={experience} />
      </section>
      <CtaBand title="Looking for a cloud engineer who understands data?" />
    </>
  );
}
