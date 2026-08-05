# PT. Konsultan Bisnis Sudarno — Company Profile Site

Static company-profile site for **PT. Konsultan Bisnis Sudarno** (Pekanbaru tax
consulting firm). Build spec: `planning/kbs-profile-site-spec.md`. Design tokens:
`DESIGN.md`.

## Status

- Phase 1 complete (spec Units 1–8): homepage plus `/layanan`, `/legalitas`, `/tim`.
- `/artikel` route is reserved but unbuilt (spec §8); excluded from prerender.
- Phase 2 (SEO/OG, sitemap, JSON-LD, analytics, contact-form delivery) is pending.

## Stack

Nuxt 4 + Nuxt UI 4, TypeScript, Tailwind v4, npm. Fully prerendered static site
(`ssr: true`).

## Getting started

```bash
npm install
npm run dev
```

Start the dev server on http://localhost:3000.

## Pages

| Route | Content |
|---|---|
| `/` | Hero, Tentang, Visi & Misi, Layanan, Tim, Legalitas, Klien, Testimoni, Kontak |
| `/layanan` | Full service catalog (8 groups with details) |
| `/legalitas` | Full legal record: NPWP, NIB, AHU, certifications |
| `/tim` | Team hierarchy grouped by role |

## Structure

```
app/components/   sections, cards, nav, footer
app/pages/        route views
app/utils/        data files: company, services, legality, team, clients, testimonials
test/             unit tests for the data utils
planning/         build spec + PDF content transcript
```

## Content

Content comes from `COMPANY PROFILE PT. KBS 2026.pdf` via the transcript at
`planning/company-profile.md`. Nothing is invented — no fabricated credentials,
client names, testimonials, or statistics. UI copy is Bahasa Indonesia.

Company facts (address, e-mail, WhatsApp numbers, nav links) live in one place:
`app/utils/company.ts`.

## Quality gates

```bash
npm run lint       # must pass before every commit
npm run typecheck
npm run test       # unit tests for the data utils
npm run build      # prerenders every route
```

## Deploy

- `npm run build` prerenders all routes to static HTML.
- `npm run preview` serves the production build locally.
- Host anywhere static (Vercel / Netlify / Cloudflare Pages / Nginx).
