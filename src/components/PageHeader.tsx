import type { ReactNode } from "react";
import { SectionHeading } from "./SectionHeading";

export function PageHeader({ eyebrow, title, lead, children }: { eyebrow: string; title: ReactNode; lead?: ReactNode; children?: ReactNode }) {
  return (
    <header className="relative overflow-hidden pb-12 pt-32 sm:pt-40">
      <div className="aurora pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="container-site relative">
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} lead={lead} />
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </header>
  );
}
