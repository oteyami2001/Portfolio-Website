import { describe, expect, it } from "vitest";
import { certifications, experience, profile, skillGroups, capabilities } from "@/data/profile";
import { projects, getProject } from "@/data/projects";
import { answerFromFaq } from "@/lib/faq";
import { buildKnowledge } from "@/lib/knowledge";

describe("portfolio content", () => {
  it("lists the five certifications", () => {
    expect(certifications.map((c) => c.id)).toEqual(["aws-saa", "oci-arch", "oci-found", "oca", "secplus"]);
  });

  it("has unique ids and slugs", () => {
    const ids = [...experience.map((r) => r.id), ...projects.map((p) => p.slug), ...skillGroups.map((g) => g.id)];
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("links projects to the right GitHub repositories", () => {
    expect(getProject("ballotonline-aws-migration")?.github).toBe("https://github.com/oteyami2001/BallotOnline-AWS-Cloud-Migration");
    expect(getProject("ballotonline-azure-orchestration")?.github).toBe("https://github.com/oteyami2001/BallotOnline-Azure-Cloud-Orchestration");
  });

  it("has architecture diagrams whose edges reference existing nodes", () => {
    for (const p of projects) {
      const ids = new Set(p.diagram.nodes.map((n) => n.id));
      for (const e of p.diagram.edges) {
        expect(ids.has(e.from), `${p.slug}: ${e.from}`).toBe(true);
        expect(ids.has(e.to), `${p.slug}: ${e.to}`).toBe(true);
      }
    }
  });

  it("references only existing projects from the skills topology", () => {
    for (const c of capabilities) for (const slug of c.projects) expect(getProject(slug), slug).toBeDefined();
  });

  it("uses https links for professional profiles", () => {
    expect(profile.links.linkedin).toMatch(/^https:\/\/www\.linkedin\.com\//);
    expect(profile.links.github).toBe("https://github.com/oteyami2001");
  });
});

describe("assistant grounding", () => {
  it("answers certification questions from data", () => {
    const a = answerFromFaq("What certifications does he have?");
    for (const c of certifications) expect(a).toContain(c.name);
  });

  it("answers project questions with project names", () => {
    expect(answerFromFaq("Tell me about the BallotOnline migration project")).toContain("BallotOnline AWS Cloud Migration");
    expect(answerFromFaq("Tell me about the WordPress Fargate project")).toContain("/projects/wordpress-ecs-fargate");
  });

  it("falls back to a helpful default", () => {
    expect(answerFromFaq("qwerty")).toContain("I can answer questions");
  });

  it("builds a knowledge base covering every project and certification", () => {
    const k = buildKnowledge();
    for (const p of projects) expect(k).toContain(p.title);
    for (const c of certifications) expect(k).toContain(c.name);
  });
});

describe("experience from verified resume", () => {
  it("contains only the resume roles", () => {
    expect(experience.map((r) => r.company)).toEqual(["Cloud Tech Inter LLC", "Upwork / Freelance", "BRONTECH SOLUTIONS"]);
    expect(experience.map((r) => r.period)).toEqual(["2025 – Present", "2022 – 2025", "2020 – 2022"]);
  });

  it("does not mention removed employers anywhere in the assistant knowledge", () => {
    const k = buildKnowledge();
    for (const name of ["Synacore", "MOOV", "CooperVision", "Westsides"]) expect(k).not.toContain(name);
  });
});
