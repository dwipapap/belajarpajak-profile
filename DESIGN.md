# DESIGN.md — PT KBS Profile Site

Brand source of truth: **`COMPANY PROFILE PT. KBS 2026.pdf`**. Every color below was sampled
pixel-wise from that PDF (renders at 100 DPI + the embedded logo PNG), not guessed and not
ported from the LMS. This repo *defines* the brand; `pajak-simulator-frontend` gets re-tokened
to match in a later pass.

---

## 1. Palette

The deck runs on one royal blue with a periwinkle support tint, a near-black ink, and a single
high-energy yellow used sparingly as a marker. The logo adds a deeper navy and a metallic gold.

### Sampled reference (PDF hex → OKLCH)

| Role | Hex | OKLCH | Where it appears in the PDF |
|---|---|---|---|
| Brand blue (primary) | `#1E439D` | `oklch(41.4% 0.1529 264)` | Section bars, service cards, headings, TOC rows |
| Deep navy | `#001F5F` | `oklch(26.9% 0.1196 261.4)` | Logo ellipse |
| Navy square | `#243867` | `oklch(35% 0.086 265)` | Accent square, "Our Service" header |
| Periwinkle | `#617BBA` | `oklch(59% 0.1017 266.3)` | Decorative circles, cover overlay |
| Tint 300 | `#AFBCDC` | `oklch(79.6% 0.0477 267.8)` | Cover wash, dividers |
| Tint 200 | `#CED6E9` | `oklch(87.6% 0.0276 267.5)` | Light fills |
| Tint 100 | `#E2E7F2` | `oklch(92.7% 0.0158 266.3)` | Page tint |
| Accent yellow | `#FFD800` | `oklch(88.9% 0.1827 95.8)` | Marker square on section headers |
| Logo gold | `#E6C039` | `oklch(81.9% 0.1505 92.4)` | Logo stars + ellipse outline |
| Ink | `#1C2120` | `oklch(24.2% 0.0076 182.3)` | Body + display type |

> **Spec correction:** `kbs-profile-site-spec.md` §5 guessed the brand as navy `#1e2a5a` +
> gold `#F5C518`. The sampled deck is royal blue `#1E439D` + yellow `#FFD800`; navy and gold
> are **logo-only** colors. The spec's hexes are superseded by this table.

### Ramps

`--color-kbs-*` is built so the sampled PDF colors land on real steps — 200/300/400/600/900
are literal PDF colors, the rest are interpolated in OKLCH at constant hue.

| Step | Value | Note |
|---|---|---|
| 50 | `oklch(97.5% 0.008 265)` | |
| 100 | `oklch(94% 0.016 266.3)` | ≈ PDF tint 100 |
| 200 | `oklch(87.6% 0.0276 267.5)` | **sampled** `#CED6E9` |
| 300 | `oklch(79.6% 0.0477 267.8)` | **sampled** `#AFBCDC` |
| 400 | `oklch(59% 0.1017 266.3)` | **sampled** `#617BBA` |
| 500 | `oklch(49% 0.135 265)` | interpolated |
| 600 | `oklch(41.4% 0.1529 264)` | **sampled** `#1E439D` — the brand blue |
| 700 | `oklch(35% 0.086 265)` | **sampled** `#243867` |
| 800 | `oklch(30.5% 0.13 262)` | |
| 900 | `oklch(26.9% 0.1196 261.4)` | **sampled** `#001F5F` — logo navy |
| 950 | `oklch(20% 0.09 261)` | |

`--color-gold-*` anchors the deck yellow at 400 and the logo gold at 500. Accent only —
never a surface, never body text.

### Semantic mapping

- Nuxt UI `primary` → `kbs`, `neutral` → `slate` (in `app.config.ts`).
- `--ui-primary` is pinned to `kbs-600` in light mode so buttons and links render the exact
  deck blue rather than Nuxt UI's default 500 step.
- **No pure white, no pure black.** Page surface is `--color-paper` (`oklch(98.6% 0.004 265)`),
  text is `--color-ink` (`#1C2120`). Cards sit on `paper` with `kbs-100` borders.

### Contrast (verified)

| Pair | Ratio | Verdict |
|---|---|---|
| White on `kbs-600` | 8.96:1 | AAA |
| `kbs-600` on paper | ~8.8:1 | AAA |
| Ink on `gold-400` | 11.71:1 | AAA |
| White on `kbs-900` | 15.8:1 | AAA |

Gold on white is **not** accessible (~1.6:1) — gold carries no text and no meaning on its own.

---

## 2. Type

- **Family:** Poppins (deck uses a geometric sans throughout — Poppins is the closest
  metric match and is what Canva templates of this kind ship with). Served locally by
  `@nuxt/fonts`, which Nuxt UI 4 bundles — no Google Fonts request at runtime.
- **Display:** 600/700 weight, tight tracking (`-0.02em`), used for section titles.
- **Body:** 400, `line-height: 1.7`, max measure ~68ch.
- Indonesian copy runs long — never set body below 16px, and let headings wrap to two lines
  rather than shrinking.

---

## 3. Layout & motion

- Mobile-first. ID traffic is majority mobile; design the 375px column first, then widen.
- Container `max-w-6xl`, section rhythm `py-16 md:py-24`.
- Strong grid, generous whitespace, real photos from the PDF over stock.
- **Motion:** subtle scroll reveals only (fade + 12px rise, ~400ms, honoring
  `prefers-reduced-motion`). No parallax, no counters, no carousel autoplay.

---

## 4. Assets

Extracted from the PDF with `pdfimages -all`. Only the logo is staged so far; each remaining
unit stages its own assets when it lands.

- `public/brand/logo-kbs.png` — 687×292 RGBA, alpha recovered from the PDF soft mask. **Staged.**
- Team headshots — PDF pages 5–11, 517×775 up to 1016×1576. Usable for cards at 2x. *(Unit 5)*
- Client logos — PDF page 12, 15 marks ranging 256×179 to 679×960. *(Unit 6)* The small ones
  (`389×114`, `256×179`) cap out around 200px wide; re-collect originals from the client
  before pushing the logo wall past that.

Convert to WebP/AVIF and lazy-load everything below the fold at Phase 2.
