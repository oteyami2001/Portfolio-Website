import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { profile } from "@/data/profile";
import { Reveal } from "./Reveal";

export function CtaBand({ title = "Let's build cloud infrastructure that lasts.", lead }: { title?: string; lead?: string }) {
  return (
    <section className="container-site mt-24" aria-labelledby="cta-title">
      <Reveal className="relative overflow-hidden rounded-3xl border border-cyan-300/20 p-8 sm:p-14">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60rem_30rem_at_0%_0%,rgba(47,107,255,0.35),transparent_60%),radial-gradient(40rem_30rem_at_100%_100%,rgba(53,200,232,0.25),transparent_60%)]" aria-hidden="true" />
        <div className="grid-bg absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
        <p className="eyebrow">Open to opportunities</p>
        <h2 id="cta-title" className="h-section mt-4 max-w-3xl">{title}</h2>
        <p className="lead mt-4 max-w-2xl">
          {lead ?? `Hiring for ${profile.targetRoles.slice(0, 3).join(", ")} or a related role — or need a consultant for an AWS, OCI or Azure project? Let's talk.`}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/contact" className="btn-primary">Start a conversation <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          <a href={profile.resumePdf} download className="btn-ghost"><Download className="h-4 w-4" aria-hidden="true" /> Download resume</a>
        </div>
      </Reveal>
    </section>
  );
}
