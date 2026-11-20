# Thierry Arcadius Oteyami — Cloud Engineering Portfolio

A personal portfolio for Thierry Oteyami (Cloud Engineer, Cloud Solutions Architect, Oracle DBA, and founder of Cloud Tech Inter LLC). It is built with **Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS and Framer Motion**.

## Features

- **Cinematic home page.** A 3D cloud-region globe drawn on canvas (no WebGL dependency, pauses when off-screen), a skippable "terraform apply" intro shown once per session, and scroll-revealed sections.
- **Interactive architecture diagrams.** Data-driven SVG diagrams for each project. Every component can be selected with the mouse, by touch or with the keyboard, and each diagram has a text alternative.
- **Skills topology.** Six capability domains mapped to AWS, Azure and OCI services, with a tabbed skills inventory.
- **Animated career timeline** with a scroll-linked progress rail.
- **Project case studies** covering the context, architecture, implementation, troubleshooting, outcomes and lessons, with GitHub links.
- **Portfolio assistant.** A chat widget that answers recruiters' questions:
  - Without an API key, it answers deterministically from the portfolio data in `src/lib/faq.ts`.
  - With `ANTHROPIC_API_KEY` set, it streams Claude answers grounded only in the portfolio content (`src/lib/knowledge.ts`). Inputs are validated and requests are rate-limited.
- **Resume page** with a print stylesheet and a downloadable PDF.
- **SEO and accessibility.** Per-page metadata, Open Graph image, JSON-LD `Person` schema, sitemap and robots, skip link, visible focus states, `prefers-reduced-motion` support, and no horizontal overflow from 320px up.

## Pages

`/` · `/about` · `/experience` · `/skills` · `/certifications` · `/projects` · `/projects/[slug]` · `/cloud-tech-inter` · `/resume` · `/contact`

## Updating content (living portfolio)

All content lives in two typed files, and every page, the resume and the assistant read from them:

| File | What to edit |
|---|---|
| `src/data/profile.ts` | Summary, stats, experience, education, certifications, skills, capability topology |
| `src/data/projects.ts` | Project case studies and architecture diagrams (nodes, zones and edges in a 1000×560 coordinate space) |

- **Add a project:** append an object to `projects`. Its page, card, sitemap entry and assistant knowledge are generated automatically.
- **Add a certification:** append it to `certifications`.
- **Refresh the resume PDF** after changing content:

```bash
npm run build && npm start
```

```bash
npx -y -p playwright node scripts/generate-resume-pdf.mjs
```

## Local development

```bash
npm install
```

```bash
cp .env.example .env.local
```

```bash
npm run dev
```

Checks:

```bash
npm run typecheck && npm test && npm run build
```

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical URL for metadata, sitemap and Open Graph (e.g. `https://www.yourdomain.com`) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Optional | Overrides the contact email (default set in `src/data/profile.ts`, along with the phone number). |
| `ANTHROPIC_API_KEY` | Optional | Turns on AI answers in the portfolio assistant. Keep it server-side only; never prefix it with `NEXT_PUBLIC_`. |

## Deployment

### Vercel (recommended)

1. Push this repository to GitHub.
2. In Vercel, choose **Add New → Project**, import the repository, and keep the Next.js defaults.
3. Add the environment variables above, then deploy. Add your custom domain under **Settings → Domains**.

### AWS Amplify Hosting

1. In the Amplify console, choose **Create new app → GitHub** and select this repository and branch.
2. Amplify detects Next.js SSR, and `amplify.yml` is included.
3. Add the environment variables under **Hosting → Environment variables**, then deploy.

CI (`.github/workflows/ci.yml`) runs the type check, the tests and the production build on every push and pull request.

## Project structure

```text
src/
  app/            routes, metadata, sitemap, robots, OG image, /api/assistant
  components/     Hero, CloudGlobe, ArchitectureDiagram, CloudTopology, Timeline, Assistant, …
  data/           profile.ts, projects.ts  ← edit content here
  lib/            assistant knowledge + offline FAQ, SEO helpers, navigation
public/           photo, resume PDF
tests/            content and assistant grounding tests (Vitest)
```

The `CLAUDE.md`, `docs/` and `.claude/skills/` files are the Claude Code skill pack used to guide development of this site.
