# CLAUDE.md — PT KBS Profile Site

Static company-profile site for **PT. Konsultan Bisnis Sudarno** (tax consulting, Pekanbaru).
Build spec: `planning/kbs-profile-site-spec.md`. Design tokens: `DESIGN.md`.

## Stack

Nuxt 4 + Nuxt UI 4, TypeScript, Tailwind v4, npm. `@nuxt/fonts` and `@nuxt/icon` ship inside
Nuxt UI — do not add them to `modules`.

```bash
npm run dev
npm run lint       # must pass before every commit
npm run typecheck
npm run build      # prerenders every route
```

## Non-negotiables

- **`ssr: true` + full prerender.** This is a public, SEO-critical brochure site. The sibling
  LMS repo (`pajak-simulator-frontend`) runs `ssr: false` — never copy that here.
- **Content comes from the PDF**, `COMPANY PROFILE PT. KBS 2026.pdf`, via the transcript at
  `planning/company-profile.md`. Nothing is invented: no fabricated credentials, client names,
  testimonials, or statistics. If a fact is not in the PDF, leave a TODO and ask.
- **Copy is Bahasa Indonesia. Code, comments and commit messages are English.**
- **No CMS, no auth, no backend.** Content is hardcoded per unit.
- **`/artikel` is out of scope** (spec §8). The nav slot and URL are reserved; do not create
  the route file — prerendering would emit a blank page. It is excluded in
  `nitro.prerender.ignore` and stays out of `sitemap.xml`.

## Facts live in one place

`app/utils/company.ts` holds the address, e-mail, WhatsApp numbers, nav links and the
`whatsappLink()` builder. Auto-imported — never re-type a phone number or address in a
component.

The canonical address is the Data Umum / cover version (`Jl. Komp. Damai Langgeng, Sidomulyo
Bar., Kec. Tampan, Kota Pekanbaru, Riau 28294`), decided 2026-08-01. The PDF's NPWP block
words it differently; that wording is quoted verbatim **only** inside Legalitas because it
reproduces a legal document.

Primary WhatsApp for every CTA and the float button: **+62 822-8948-7779 (Pringgo)**.

## Build order

One branch + PR per unit, in spec §7 order. Unit 0 (foundation) is done. Each unit = content
verified against the PDF + responsive component + anchor wired + assets staged.

Homepage anchors already exist as placeholders in `app/pages/index.vue`; a unit replaces its
own `<section>` and nothing else.

## Conventions

- Components in `app/components/`, `PascalCase.vue`, auto-imported.
- Prefer Nuxt UI components over hand-rolled markup; brand via the `kbs`/`gold` ramps, never
  raw hex in a template (the one exception is WhatsApp's own `#25D366` in `WhatsAppFab.vue`).
- Mobile-first: design the 375px column first. ID traffic is majority mobile.
- Motion: `v-reveal` only. No parallax, no autoplay, no counters.
- ESLint is `@nuxt/eslint` with stylistic rules (no trailing commas, 1tbs braces).

## Gotchas already paid for

- **Icons must be bundled, not fetched.** `icon.clientBundle.scan` in `nuxt.config.ts` compiles
  every `i-*` name found in source into the build. Without it, any icon outside Nuxt UI's own
  precompiled set renders as an empty `<svg viewBox="0 0 16 16">` in the prerendered HTML —
  it silently fails at prerender time, not at runtime, so nothing turns red. If a new icon
  comes out blank, check that its name is a static string the scanner can see (a name built
  at runtime is invisible to it).
- **Directives used in prerendered markup cannot be `.client`-only.** Vue's SSR renderer
  resolves every directive it meets; a missing one throws
  `Cannot read properties of undefined (reading 'getSSRProps')` and fails the whole route.
  `app/plugins/reveal.ts` is registered universally for this reason.

## Known gaps

- Client logos extracted from the PDF are small (down to 389×114); the logo wall (Unit 6) may
  need higher-res originals from the client.
- `sdntalenta@yahoo.com` is the PDF's e-mail. A branded inbox is a client decision, not a bug.
- Contact-form delivery is undecided (spec §9). Default is a WhatsApp deep-link, which avoids
  UU PDP data-processing obligations entirely.
