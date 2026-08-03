# PT KBS — Company Profile Website Build Spec

Static company-profile site for **PT. Konsultan Bisnis Sudarno** (Pekanbaru tax consulting firm).
Content source of truth: the client's 2026 Company Profile PDF.

---

## 1. Architecture (locked)

| Decision | Value | Why |
|---|---|---|
| Framework | Nuxt 4 + Nuxt UI 4 | Consistency with existing LMS; share the design system |
| Rendering | **SSG / prerendered** (`nitro.prerender`, `ssr: true`) | Public + SEO-critical. **Do NOT copy `ssr: false` from the LMS repo.** |
| Repo | Separate from LMS | Independent deploy + failure domain |
| Domain | Apex/`www` (e.g. `websiteprofile.com`) | LMS lives on `lms.` subdomain |
| Language | UI copy Bahasa Indonesia; code + comments English | Matches LMS convention |
| Auth | None | It's a brochure site |

Reuse the LMS's theme tokens so the marketing site and app share one brand — **but the brand source of truth is the client's 2026 Company Profile PDF, not the LMS.** Sample the brand colors from the PDF logo/cover and lock them as canonical OKLCH tokens in this repo's `DESIGN.md` (PDF hex recorded as reference). This site **defines** the brand; the LMS (`pajak-simulator-frontend`) will be re-tokened to match in a later pass. Do **not** port the LMS theme: its `app.config.ts` only sets `ui.colors: { primary: 'indigo', neutral: 'slate' }` for Nuxt UI primitives — the navy/gold brand colors live in OKLCH CSS classes, not in `app.config.ts` (see §5).

---

## 2. Deployment topology

```
websiteprofile.com        → this profile site (SSG, CDN/static host)
lms.websiteprofile.com    → existing belajarpajak-frontend (Nuxt SPA + FastAPI)
```

- Profile can host anywhere static (Vercel / Netlify / Cloudflare Pages / Nginx).
- When the LMS moves refresh tokens to httpOnly cookies, scope them to `lms.websiteprofile.com`, **not** `.websiteprofile.com` — the profile never needs the session.

---

## 3. Information architecture

Single-page scroll with anchor nav; a couple of routes broken out for SEO.

| Route | Purpose |
|---|---|
| `/` | Hero → About → Visi/Misi → Layanan (summary) → Tim → Legalitas → Klien → Testimoni → Kontak |
| `/layanan` | Full service catalog (8 groups) — better for SEO than a cramped homepage block |
| `/legalitas` | Full legal record (registrations + certifications); the homepage keeps key points only |
| `/artikel` | **Reserve the route + nav slot only. Build nothing.** (Out of scope — see §8) |

Sticky top nav: Beranda · Tentang · Layanan · Tim · Legalitas · Kontak + a `Konsultasi` CTA button.

---

## 4. Section content (from the PDF)

Pull exact copy, names, credentials, and photos from the PDF. Structure:

> **Content cleanup — resolve with the client before/while building:**
> - **Address conflict:** Data Umum (*"Jl. Komp. Damai Langgeng, Sidomulyo Bar., Kec. Tampan, Pekanbaru, Riau 28294"*) vs the NPWP block (*"Jalan Komplek Damai Langgeng, Sidomulyo Barat, Tuahmadani, Pekanbaru"*) differ → pick **one canonical address** for Kontak, the Google Maps pin, and structured data.
> - **Founder cert list** ends with stray *"Akuntansi" / "Manajemen Keuangan"* (PDF table bleed) → drop after verifying against the PDF.
> - **Proofread client tables for OCR typos** vs the PDF: *"CV. Jaya Mandrini"*, *"KUD Tenera Mukti"*, *"PT Iskandar Sari Andalas"*.
> - **Primary WhatsApp** (float button + CTAs) = general line `+62-822-8948-7779` (Pringgo).
> - **Email `sdntalenta@yahoo.com`** — raise a branded inbox with the client before domain launch (business decision, not a site bug).
> - **Asset gap:** team headshots + the 15 client logos are **NOT** in `company-profile.md` (text-only source). Extract from the PDF at usable resolution or re-collect high-res originals from the client. Treat as a per-section gate — do not assume these assets exist.

1. **Hero** — headline value prop + subhead + primary CTA (WhatsApp / Konsultasi). Trust strip: *"Konsultan pajak berizin — melayani sejak 2004."*
2. **Tentang Kami** — the history arc: KKP Sudarno & Rekan (2004) → Izin Praktik Konsultan Pajak Tingkat B (1 Juli 2015) → PT. Konsultan Bisnis Sudarno (16 Agustus 2024). Founder photo + name (Dr. Sudarno, S.Pd., M.M., BKP).
3. **Visi & Misi** — verbatim from PDF (1 visi, 3 misi points).
4. **Layanan** — 8 service groups as cards:
   - Jasa Kepatuhan Pajak (e-SPT Masa/Tahunan)
   - Jasa Konsultasi Pajak
   - Jasa Analisa Pajak
   - Jasa Pendampingan (Assessment / Objection / Appeal / Restitution)
   - Jasa Perencanaan Pajak
   - Jasa Administrasi Pajak
   - Jasa Pelatihan Pajak
   - Jasa Accounting
   Homepage shows the 8 cards; `/layanan` shows each with its full bullet detail.
5. **Tim / Manajemen** — grouped: Founder → Mitra → Direktur Utama → Direktur → Controller → Managers (5) → Team (8). Photo, name, title, key credentials. Real photos from the PDF.
6. **Legalitas** — prominent, not buried. This is a top trust driver for a tax firm:
   - NPWP 07.514.937.7-216.000
   - NIB 1908240057603
   - Sertifikat Perubahan Perseroan AHU-006151.AH.01.31.Tahun 2024
   - Founder/leadership certifications (BKP, USKP A/B, Brevet, etc.)
7. **Klien** — logo wall (grid) + the client name table from the PDF.
8. **Testimoni** — carousel/grid of the PDF testimonials (TIKI, JBP, Tribahana Gita Mulia, Yamaha I-Homes, Pekanbaru Musik, SMK Muhammadiyah).
9. **Kontak** — contact form + WhatsApp numbers (Arih / Pringgo / Hairudin) + email (sdntalenta@yahoo.com) + address (Jl. Komp. Damai Langgeng, Sidomulyo Bar., Kec. Tampan, Pekanbaru, Riau 28294) + embedded Google Map.

---

## 5. Design system

Corporate, trustworthy, conservative-modern. **Not** startup-flashy.

- **Palette:** navy primary + gold accent + tinted paper (no pure white/black). Sample the exact colors from the client PDF logo/cover and define as OKLCH tokens with the PDF hex as reference (navy ≈ `#1e2a5a`, gold ≈ `#F5C518`). Brand navy/gold are OKLCH class tokens (same pattern as the LMS); `app.config.ts` `ui.colors` carries only `primary`/`neutral` for Nuxt UI primitives. Note: the LMS's `≈` hexes are guesses, not sampled values — sample the PDF properly.
- **Type:** clean sans-serif, high readability, generous line-height.
- **Layout:** strong grid, lots of whitespace, real photos over stock.
- **Motion:** subtle scroll reveals only. No gimmicks.
- When building components, follow the `frontend-design` skill.

---

## 6. Web features

- Floating **WhatsApp** button (near-mandatory for ID conversion; deep-link to the primary WA number).
- Contact form → email or WA (see §9 open question for backend).
- Google Maps embed (address above).
- SEO: per-page meta + Open Graph, `sitemap.xml`, `robots.txt`, semantic headings, and `ProfessionalService`/`LocalBusiness` JSON-LD (name, address, geo, phone, foundingDate, certifications) using the canonical address from §4.
- Cross-link the LMS product (`lms.` subdomain) from the profile site and vice versa — internal-link/SEO win; the LMS already operates under the "Konsultan Bisnis Sudarno" brand.
- Images: optimized WebP/AVIF, lazy-loaded below the fold (team photos sourced from a PDF are an LCP risk).
- Analytics: lightweight privacy-friendly counter (e.g. Plausible/Umami) — decide before launch.
- **Mobile-first** — ID traffic is majority mobile.

---

## 7. Build phases

**Phase 0 — Scaffold**
- Nuxt 4 + Nuxt UI 4, `ssr: true` + prerender config.
- Sample brand tokens from the client PDF and set them as OKLCH tokens in `DESIGN.md` (do not port the LMS theme — see §1).
- Add agent docs (`CLAUDE.md` / `AGENTS.md` / `DESIGN.md`) mirroring the LMS repo *structure*, but rewrite the content for a marketing site (the LMS's docs are LMS-specific: auth, eBupot shell, portal fidelity).

**Phase 1 — Static profile (delivered unit-by-unit — one branch/PR per unit, in order)**

- **Unit 0 — Foundation (mandatory first):** scaffold, design tokens sampled from the PDF, layout/sticky nav/footer, fonts, WA float button, anchor system, responsive shell.
- **Unit 1 — Hero + Tentang** (value prop, trust strip, history arc, founder).
- **Unit 2 — Kontak** (WA numbers, email, address, contact form, Google Maps).
- **Unit 3 — Layanan** (homepage 8 cards + `/layanan` full page — one shared data file, built together).
- **Unit 4 — Legalitas** (NPWP/NIB/AHU + Izin Praktik + certifications; homepage key-point
  tiles + `/legalitas` detail page — one shared data file, built together).
- **Unit 5 — Tim** (grouped hierarchy + photos).
- **Unit 6 — Klien** (logo wall + client table).
- **Unit 7 — Testimoni** (6 testimonials).
- **Unit 8 — Visi & Misi.**

Each unit = content verified against the PDF + responsive component + anchor wired + assets staged. Content is hardcoded from the PDF (no CMS). Site is complete when Unit 8 lands.

**Phase 2 — Wiring & SEO**
- Contact-form delivery decision (see §9; WA deep-link default), SEO/OG/sitemap/robots/JSON-LD, analytics, image optimization pass, cross-link with the LMS.

**Phase 3 — (Optional, paid, later)**
- Articles via Nuxt Content, only if commissioned. Route is already reserved.

---

## 8. Explicitly out of scope

- **Tax articles / blog.** Cut from this engagement. `/artikel` route + nav slot reserved so it's a clean, cheap add-on later — but zero posts, zero CMS now. Revisit only as a separately scoped, paid phase (and that's when the "who edits it — you or the client?" question decides Nuxt Content vs. a headless CMS). Reserve the URL + nav slot **only** — do **not** create an empty `/artikel` route file (prerendering would emit a blank page) and keep it out of `sitemap.xml` until the phase is commissioned.

---

## 9. Open question before Phase 2

Contact form delivery: simplest is a WhatsApp deep-link (no backend). If they want submissions by email, wire a form service (Formspree/Resend) or a small endpoint on the FastAPI backend you already run.

> Note: an email-collecting contact form triggers Indonesia's PDP (UU PDP) obligations; a WhatsApp deep-link avoids data-processing requirements entirely — prefer it unless the client explicitly wants email.
