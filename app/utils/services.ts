/**
 * Layanan — spec §4.4. The eight service groups from the deck's "Our Service" pages,
 * shared by the homepage cards (`ServicesSection`) and the `/layanan` catalog so the
 * copy exists once.
 *
 * Wording follows the PDF; only its typos are corrected ("Complience" → Compliance,
 * "Assesment" → Assessment, "tinggkat" → tingkat, "lainya" → lainnya). Where the deck
 * writes prose it stays prose, where it writes bullets it stays bullets — nothing is
 * merged, reordered or added.
 *
 * `summary` is the one exception: the deck has no card-length blurb, so each one
 * condenses that service's own detail below. It introduces no claim the detail does
 * not already make.
 */

export interface ServicePoint {
  /** Sub-service name where the deck names one (only Jasa Pendampingan does). */
  label?: string
  text: string
}

export interface Service {
  /** Anchor id on `/layanan`; the homepage card links to it. */
  slug: string
  title: string
  /** Static `i-*` name — a runtime-built name is invisible to the icon scanner (CLAUDE.md). */
  icon: string
  /** One line for the homepage card. */
  summary: string
  /** The deck's paragraph, for the groups it describes in prose. */
  body?: string
  /** The deck's bullets, for the groups it lists. */
  points?: readonly ServicePoint[]
}

export const SERVICES: readonly Service[] = [
  {
    slug: 'kepatuhan-pajak',
    title: 'Jasa Kepatuhan Pajak',
    icon: 'i-lucide-file-check',
    summary: 'Penyusunan dan pelaporan e-SPT Masa maupun Tahunan, untuk badan maupun orang pribadi.',
    points: [
      { text: 'e-SPT Masa PPh Pasal 21/26' },
      { text: 'e-SPT Masa PPh Pasal 23/26' },
      { text: 'e-SPT Masa PPh Final' },
      { text: 'e-SPT Masa PPN/PPnBM' },
      { text: 'e-SPT Tahunan PPh Badan' },
      { text: 'e-SPT Tahunan PPh Orang Pribadi' },
      { text: 'e-SPT Tahunan PPh Karyawan' }
    ]
  },
  {
    slug: 'konsultasi-pajak',
    title: 'Jasa Konsultasi Pajak',
    icon: 'i-lucide-messages-square',
    summary: 'Konsultasi rutin maupun insidentil, atas permasalahan pajak umum maupun khusus.',
    body: 'Jasa konsultasi perpajakan secara rutin maupun insidentil, baik atas permasalahan '
      + 'perpajakan yang bersifat umum maupun yang bersifat khusus. Konsultasi kami lakukan '
      + 'melalui pertemuan ataupun sarana komunikasi lainnya.'
  },
  {
    slug: 'analisa-pajak',
    title: 'Jasa Analisa Pajak',
    icon: 'i-lucide-file-search',
    summary: 'Review praktik akuntansi perusahaan untuk memetakan tingkat kepatuhan dan risiko pajak.',
    body: 'Melakukan review atas semua praktek akuntansi yang telah dijalankan perusahaan untuk '
      + 'memberikan gambaran atas tingkat kepatuhan klien pada peraturan pajak yang berlaku dan '
      + 'tingkat risiko pajak.'
  },
  {
    slug: 'pendampingan',
    title: 'Jasa Pendampingan',
    icon: 'i-lucide-gavel',
    summary: 'Pendampingan pemeriksaan, keberatan, banding, hingga restitusi pajak.',
    points: [
      {
        label: 'Tax Assessment Assistance',
        text: 'Mendampingi proses pemeriksaan, memberikan penjelasan atas hasil temuan pemeriksa, '
          + 'hingga mendapatkan hasil berupa Surat Ketetapan Pajak (SKP).'
      },
      {
        label: 'Tax Objection Assistance',
        text: 'Mendampingi proses keberatan, menyiapkan surat keberatan, memberikan penjelasan '
          + 'kepada fiskus sampai mendapatkan hasil putusan berupa Surat Keputusan Keberatan (SKK).'
      },
      {
        label: 'Tax Appeal',
        text: 'Mendampingi proses banding di pengadilan pajak, menyiapkan surat banding dan '
          + 'bantahan, memberikan penjelasan kepada majelis hakim sampai mendapatkan hasil '
          + 'putusan banding.'
      },
      {
        label: 'Tax Restitution',
        text: 'Mendampingi proses restitusi pajak hingga mendapatkan hasil berupa surat perintah '
          + 'pembayaran kelebihan pajak.'
      }
    ]
  },
  {
    slug: 'perencanaan-pajak',
    title: 'Jasa Perencanaan Pajak',
    icon: 'i-lucide-target',
    summary: 'Menyusun rencana dan strategi perpajakan yang patuh sekaligus efisien.',
    points: [
      { text: 'Membantu perusahaan menyusun rencana perpajakan' },
      { text: 'Menyampaikan aspek-aspek dan strategi perencanaan pajak' },
      { text: 'Menghindari pelanggaran terhadap peraturan pajak' },
      { text: 'Mengoptimalkan kredit pajak yang diperkenankan' }
    ]
  },
  {
    slug: 'administrasi-pajak',
    title: 'Jasa Administrasi Pajak',
    icon: 'i-lucide-clipboard-list',
    summary: 'Pengurusan pendaftaran, perpindahan, dan permohonan administrasi ke kantor pajak.',
    points: [
      { text: 'Pendaftaran Wajib Pajak, Pengusaha Kena Pajak, penghapusan NPWP/PKP' },
      { text: 'Pengajuan pindah alamat KPP domisili atau lokasi usaha' },
      { text: 'Pengajuan pengurangan angsuran PPh Pasal 25' },
      { text: 'Pengajuan permohonan e-Faktur secara elektronik' },
      { text: 'Pengajuan permohonan Surat Keterangan Bebas (SKB) PPN dan/atau PPh Pasal 21, 22, 23' }
    ]
  },
  {
    slug: 'pelatihan-pajak',
    title: 'Jasa Pelatihan Pajak',
    icon: 'i-lucide-graduation-cap',
    summary: 'Pelatihan perpajakan umum maupun topik khusus sesuai kebutuhan industri klien.',
    body: 'Menyelenggarakan pelatihan perpajakan baik dalam perpajakan umum untuk semua jenis '
      + 'pajak maupun topik khusus perpajakan untuk industri khusus sesuai kebutuhan klien.'
  },
  {
    slug: 'accounting',
    title: 'Jasa Accounting',
    icon: 'i-lucide-calculator',
    summary: 'Layanan akuntansi, konsultasi keuangan, software, dan review keuangan.',
    body: 'Melayani berbagai kebutuhan layanan akuntansi dan konsultasi keuangan, software, '
      + 'dan review keuangan.'
  }
]

/** The catalog route. Nav, cards and CTAs all point here rather than re-typing the path. */
export const SERVICES_PATH = '/layanan'

/** Deep-link to one service on the catalog page. */
export function servicePath(slug: string) {
  return `${SERVICES_PATH}#${slug}`
}
