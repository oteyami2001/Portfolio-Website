"use client";

import type { MotionValue } from "framer-motion";
import { HoloTag } from "./HoloTag";

export function HeroExtras({ progress }: { progress: MotionValue<number> }) {
  return (
    <>
      <HoloTag progress={progress} label="AWS" sub="vpc · iam · ecs" left="50%" top="22%" speed={1.2} range={[0.28, 0.72]} />
      <HoloTag progress={progress} label="OCI" sub="vcn · dbcs" left="84%" top="30%" speed={0.8} range={[0.3, 0.74]} />
      <HoloTag progress={progress} label="Azure" sub="vmss · app service" left="56%" top="58%" speed={1.5} range={[0.32, 0.76]} />
      <HoloTag progress={progress} label="Terraform" sub="plan · apply" left="80%" top="66%" speed={1} range={[0.34, 0.78]} />
      <HoloTag progress={progress} label="Oracle DB" sub="rac · data guard" left="88%" top="14%" speed={1.3} range={[0.36, 0.8]} />
    </>
  );
}

export function DataExtras({ progress }: { progress: MotionValue<number> }) {
  return (
    <>
      <HoloTag progress={progress} label="Backup" sub="rman · data pump" left="12%" top="48%" speed={1.1} range={[0.2, 0.7]} />
      <HoloTag progress={progress} label="Replication" sub="dms · data guard" left="74%" top="44%" speed={0.9} range={[0.3, 0.8]} />
      <HoloTag progress={progress} label="IaC" sub="terraform · cfn" left="16%" top="72%" speed={1.4} range={[0.55, 1]} />
      <HoloTag progress={progress} label="Least privilege" sub="iam · mfa" left="72%" top="74%" speed={1.2} range={[0.6, 1]} />
    </>
  );
}
