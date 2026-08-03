/**
 * Legalitas — spec §4.6. The firm's registrations and the profession certifications the
 * deck records, shared by the homepage key points (`LegalitySection`) and the `/legalitas`
 * detail page so the numbers exist in exactly one place.
 *
 * Every number, date and issuer below is transcribed from the PDF (planning/company-profile.md
 * "Legalitas", plus the Izin Praktik date from the Introduction page). Nothing is expanded,
 * inferred or rounded: dates are the deck's own, only reformatted from `16/08/2024` to the
 * long form used everywhere else on the site.
 *
 * The NPWP card quotes the registration address verbatim — "Jalan Komplek Damai Langgeng,
 * Sidomulyo Barat, Tuahmadani" — which differs from the canonical site address in
 * `company.ts`. That is deliberate and the only place the second wording appears: it
 * reproduces what is printed on the certificate (decided 2026-08-01, see CLAUDE.md).
 */

export interface LegalDetail {
  label: string
  value: string
}

export interface LegalDocument {
  /** Anchor-safe id; also the `v-for` key. */
  id: string
  /** The document's name as it reads on its face. */
  title: string
  /** Issuing authority, worded as the deck words it. */
  issuer: string
  /** Static `i-*` name — a runtime-built name is invisible to the icon scanner (CLAUDE.md). */
  icon: string
  /** Registration number as printed. Absent for the Izin Praktik: the deck records its date, not its number. */
  number?: string
  /** Everything else printed on the document. */
  details: readonly LegalDetail[]
}

export const LEGAL_DOCUMENTS: readonly LegalDocument[] = [
  {
    id: 'izin-praktik',
    title: 'Izin Praktik Konsultan Pajak Tingkat B',
    issuer: 'Direktorat Jenderal Pajak',
    icon: 'i-lucide-badge-check',
    details: [
      { label: 'Terbit', value: '1 Juli 2015' }
    ]
  },
  {
    id: 'perseroan',
    title: 'Sertifikat Pendaftaran Perubahan Perseroan Perorangan',
    issuer: 'Kementerian Hukum dan Hak Asasi Manusia Republik Indonesia',
    icon: 'i-lucide-scroll-text',
    number: 'AHU-006151.AH.01.31.Tahun 2024',
    details: [
      { label: 'Kedudukan', value: 'Kota Pekanbaru' },
      { label: 'Terbit', value: 'Jakarta, 16 Agustus 2024' }
    ]
  },
  {
    id: 'nib',
    title: 'Nomor Induk Berusaha (NIB)',
    issuer: 'Perizinan Berusaha Berbasis Risiko',
    icon: 'i-lucide-building-2',
    number: '1908240057603',
    details: [
      { label: 'Terbit', value: '19 Agustus 2024' },
      { label: 'Status penanaman modal', value: 'PMDN' },
      { label: 'Skala usaha', value: 'Usaha Mikro' }
    ]
  },
  {
    id: 'npwp',
    title: 'Nomor Pokok Wajib Pajak (NPWP)',
    issuer: 'KPP Pratama Pekanbaru Tampan',
    icon: 'i-lucide-receipt-text',
    number: '07.514.937.7-216.000',
    details: [
      { label: 'NPWP 16 digit', value: '0075 1493 7721 6000' },
      { label: 'Terdaftar', value: '16 Agustus 2024' },
      {
        label: 'Alamat terdaftar',
        value: 'Jalan Komplek Damai Langgeng, Sidomulyo Barat, Tuahmadani, Kota Pekanbaru, Riau'
      }
    ]
  }
]

/** The detail route. Nav, homepage and CTAs point here rather than re-typing the path. */
export const LEGALITY_PATH = '/legalitas'

/**
 * The single line the homepage shows under a document title: its number, or — for the
 * Izin Praktik, which the deck records by date only — that first detail instead. Every
 * document has at least one detail, so this always resolves.
 */
export function documentHeadline(document: LegalDocument) {
  return document.number ?? document.details[0]!.value
}

export interface CertifiedPerson {
  name: string
  role: string
  certifications: readonly string[]
}

/**
 * Only the people whose certifications the deck actually lists.
 *
 * - The Mitra (T. Arsono) is left out: his page records education and areas of expertise,
 *   no certification list. Unit 5 (Tim) carries that.
 * - The Controller's BNSP and ICF credentials sit under "Pengalaman Profesional" in the
 *   deck, not under certifications, so they stay with Unit 5 rather than being relabelled here.
 * - The founder's list ends with stray "Akuntansi" / "Manajemen Keuangan" in the transcript —
 *   those are his degree fields bleeding in from the adjacent education table (spec §4),
 *   so they are dropped here.
 */
export const CERTIFIED_PEOPLE: readonly CertifiedPerson[] = [
  {
    name: 'Dr. Sudarno, S.Pd., M.M., BKP',
    role: 'Founder',
    certifications: [
      'Sertifikasi Konsultan Pajak A — USKP A',
      'Sertifikasi Konsultan Pajak B — USKP B',
      'Sertifikat Instruktur Pelatihan Brevet Pajak A dan B',
      'Sertifikat Kompetensi Manajemen Risiko Perbankan',
      'Sertifikasi Manajemen Risiko Profesional dan Publik',
      'Sertifikasi Kompetensi Komisaris Bank Perkreditan Rakyat',
      'Sertifikasi Kompetensi Direktur 1 Bank Perkreditan Rakyat'
    ]
  },
  {
    name: 'Arih Dwi Prihastomo S, S.Aktr., M.M.',
    role: 'Direktur Utama',
    certifications: [
      'Brevet A',
      'Brevet B',
      'Komisaris Bank Perekonomian Rakyat'
    ]
  },
  {
    name: 'M. Pringgo Prayetno, S.E., M.M., CTT',
    role: 'Direktur',
    certifications: [
      'Brevet A',
      'Brevet B',
      'Komisaris Bank Perekonomian Rakyat'
    ]
  }
]
