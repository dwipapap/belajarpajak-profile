/**
 * Klien — spec §4.7. The eighteen logos the deck prints, plus the "Klien Lainnya" table of
 * names it lists without a logo. Transcribed from planning/company-profile.md ("Klien").
 *
 * The logos in `public/client/` are all 600x300 WebP, but their backgrounds are not uniform:
 * most are white or near-white, one is transparent, and four are solid black. They were cut
 * out of the deck, and the repo carries no image pipeline to normalise them (dropped in
 * 81e68c3), so the black ones are corrected in the layer above — see `dark` below.
 *
 * Order deliberately spreads the four `dark` logos across the list so the two marquee rows
 * in `ClientSection` never end up with the dark tiles clumped together.
 */

/**
 * Named `ClientEntry`, not `Client`: the DOM lib declares a global `Client` (Service Worker
 * API), and since these types are auto-imported the global would silently win in any file
 * that did not import ours explicitly.
 */
export interface ClientEntry {
  /** `v-for` key; also the file name in `public/client/`. */
  id: string
  /** Name as the deck prints it. Used as the image `alt` and in the accessible list. */
  name: string
  /** Public path to the logo. */
  logo: string
  /**
   * The logo sits on solid black. Its tile is given a dark background so the seam between
   * image and card disappears; without it the logo reads as a black rectangle dropped into
   * a white card. A transparent-background file from the client removes the need for this.
   */
  dark?: boolean
}

/** Everyone the deck gives a logo for. */
export const CLIENTS: readonly ClientEntry[] = [
  { id: 'tiki', name: 'TIKI', logo: '/client/tiki.webp', dark: true },
  { id: 'jasa-barutama-perkasa', name: 'PT. Jasa Barutama Perkasa', logo: '/client/jasa-barutama-perkasa.webp' },
  { id: 'multi-guna-precast-mandiri', name: 'PT. Multi Guna Precast Mandiri', logo: '/client/multi-guna-precast-mandiri.webp', dark: true },
  { id: 'nurfa-cargo', name: 'Nurfa Cargo', logo: '/client/nurfa-cargo.webp' },
  { id: 'sultan-resto', name: 'Sultan Resto', logo: '/client/sultan-resto.webp', dark: true },
  { id: 'lingga-cargo', name: 'Lingga Cargo', logo: '/client/lingga-cargo.webp' },
  { id: 'sarana-andalan-semesta', name: 'PT. Sarana Andalan Semesta', logo: '/client/sarana-andalan-semesta.webp' },
  { id: 'audi-variasi', name: 'Audi Variasi', logo: '/client/audi-variasi.webp', dark: true },
  { id: 'bawdi', name: 'PT. Bantu Kawal Distribusi', logo: '/client/bawdi.webp' },
  { id: 'stai-hm-lukman-edy', name: 'STAI H.M. Lukman Edy', logo: '/client/stai-hm-lukman-edy.webp' },
  { id: 'cv-nusantara-mandiri', name: 'CV. Nusantara Mandiri', logo: '/client/cv-nusantara-mandiri.webp' },
  { id: 'nusantara-mandiri-printing', name: 'Nusantara Mandiri Printing', logo: '/client/nusantara-mandiri-printing.webp' },
  { id: 'pekanbaru-musik', name: 'Pekanbaru Musik', logo: '/client/pekanbaru-musik.webp' },
  { id: 'mitra-riau-perkasa-lestari', name: 'PT. Mitra Riau Perkasa Lestari', logo: '/client/mitra-riau-perkasa-lestari.webp' },
  { id: 'reza-motor', name: 'Reza Motor', logo: '/client/reza-motor.webp' },
  { id: 'yamaha-tribahana-gita-mulia', name: 'Yamaha Tribahana Gita Mulia', logo: '/client/yamaha-tribahana-gita-mulia.webp' },
  { id: 'homes', name: 'Yamaha I-Homes', logo: '/client/homes.webp' },
  { id: 'jaringan-komunikasi-data', name: 'Jaringan Komunikasi Data', logo: '/client/jaringan-komunikasi-data.webp' }
]

/**
 * The "Klien Lainnya" table — names the deck lists without a logo.
 *
 * TODO: spec §4 flags "CV. Jaya Mandrini", "KUD Tenera Mukti" and "PT Iskandar Sari Andalas"
 * as suspected OCR typos in the transcript. Proofread against the PDF before launch; they are
 * kept verbatim here until the client confirms the spelling.
 */
export const OTHER_CLIENTS: readonly string[] = [
  'Edcona Maju Sejahtera',
  'PT. Prasepta',
  'PT. Global Swasembada',
  'PT. Delta',
  'PT. Riau Sarana Sejahtera',
  'PT. Nurwati Maju Bersama',
  'PT. Kirim Cepat Industri',
  'Sonic Motor',
  'Mitra Honda',
  'PT. Bumi Damai Mandiri',
  'CV. Jaya Mandrini',
  'PT Iskandar Sari Andalas',
  'KUD Manunggal Jaya',
  'KUD Tri Manunggal',
  'KUD Harapan Mulya',
  'KUD Tenera Mukti'
]

/**
 * The logos split into the two marquee rows, which scroll in opposite directions. Splitting
 * here rather than in the template keeps the component free of index arithmetic.
 */
export const CLIENT_ROWS: readonly (readonly ClientEntry[])[] = [
  CLIENTS.slice(0, Math.ceil(CLIENTS.length / 2)),
  CLIENTS.slice(Math.ceil(CLIENTS.length / 2))
]
