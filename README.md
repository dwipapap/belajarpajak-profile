# PT. Konsultan Bisnis Sudarno — Company Profile Site

Static company-profile site for **PT. Konsultan Bisnis Sudarno** (Pekanbaru tax
consulting firm). Build spec: `planning/kbs-profile-site-spec.md`. Design tokens:
`DESIGN.md`.

## Stack

Nuxt 4 + Nuxt UI 4, TypeScript, Tailwind v4, npm.

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Start the dev server on http://localhost:3000.

## Quality gates

```bash
npm run lint       # must pass before every commit
npm run typecheck
npm run test       # unit tests for company utils
npm run build      # prerenders every route (SSG)
```

## Content

Content comes from `COMPANY PROFILE PT. KBS 2026.pdf` via the transcript at
`planning/company-profile.md`. Nothing is invented — no fabricated credentials,
client names, testimonials, or statistics. UI copy is Bahasa Indonesia.

Company facts (address, e-mail, WhatsApp numbers, nav links) live in one place:
`app/utils/company.ts`.

## Deploy

- `npm run build` prerenders all routes to static HTML.
- `npm run preview` serves the production build locally.
- Host anywhere static (Vercel / Netlify / Cloudflare Pages / Nginx).

## Branching

One branch + PR per unit, in spec §7 order. See `planning/kbs-profile-site-spec.md`.
