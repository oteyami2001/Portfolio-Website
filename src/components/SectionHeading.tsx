import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = { eyebrow: string; title: ReactNode; lead?: ReactNode; align?: "left" | "center"; id?: string; as?: "h1" | "h2" };

export function SectionHeading({ eyebrow, title, lead, align = "left", id, as = "h2" }: Props) {
  const Heading = as;
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <Heading id={id} className={as === "h1" ? "h-cine mt-4 text-5xl sm:text-7xl lg:text-8xl" : "h-section mt-4"}>
        {title}
      </Heading>
      {lead ? <p className="lead mt-5">{lead}</p> : null}
    </Reveal>
  );
}
