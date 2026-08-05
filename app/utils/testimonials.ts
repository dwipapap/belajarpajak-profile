/**
 * Testimoni — spec §4.8. The six quotes the deck prints, transcribed from
 * planning/company-profile.md ("Testimoni Klien").
 *
 * Quotes are verbatim, down to the deck's own inconsistent capitalisation
 * ("responsivitas dan perhatian…" mid-sentence). Nothing is trimmed, joined or tidied:
 * these are attributed statements from named people at named companies, and editing one
 * would put words in their mouth. The uneven lengths — two long paragraphs, two medium,
 * two single sentences — are a layout problem, solved in `TestimonialCard` with a common
 * minimum height rather than by shortening anyone.
 *
 * Only four of the six name a person; the other two are attributed to the organisation.
 * Five reuse a logo already staged in `public/client/` for Unit 6 — no new image files.
 * The sixth (SMK Muhammadiyah) has none and falls back to an icon in the card.
 */
export interface Testimonial {
  /** `v-for` key. */
  id: string
  /** The quote as the deck prints it, without the surrounding quotation marks. */
  quote: string
  /** The person, where the deck names one. Two of the six are attributed to the company. */
  person?: string
  /**
   * The qualifier line under the primary attribution: a job title when `person` is set,
   * otherwise how the deck describes the organisation ("Dealer Alat-alat Musik (Yamaha)").
   */
  role?: string
  /** The organisation, as the deck writes it. Always present. */
  company: string
  /** Path to a logo already staged in `public/client/`. Absent for SMK Muhammadiyah. */
  logo?: string
}

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: 'tiki',
    quote: 'Kita sudah menjadi klien Konsultan pajak bapak sudarno dari 2022 (lebih kurang sudah 2 tahun). Pengerjaan SPT Masa dan Tahunan serta konsultasi perihal keuangan sangat memuaskan, kerjanya sangat cepat, selalu memberikan solusi terbaik, profesional serta memberitahu resiko-resiko yang terjadi jika tidak sesuai aturan berlaku. Selama bekerja sama saya pribadi merasa puas atas layanan dan komunikasi yang saya dapat dari PT. KBS.',
    person: 'Nuri Attami',
    role: 'Finance & Accounting SPV',
    company: 'PT Titipan Kilat Riau (TIKI)',
    logo: '/client/tiki.webp'
  },
  {
    id: 'jasa-barutama-perkasa',
    quote: 'Kami sangat bangga dan senang bekerjasama dengan Konsultan Bisnis Sudarno, tidak terasa sudah puluhan tahun perusahaan kami menjadi klien Bapak Sudarno, dan segala kesulitan dan masalah pajak bisa terselesaikan dengan baik dengan bantuan Konsultan Sudarno. Untuk itu Saya mewakili owner PT. Jasa Barutama Perkasa mengucapkan banyak terima kasih atas usaha keras dan kinerja yang baik dari staff Konsultan Bisnis Sudarno. Dan tidak lupa saya doakan semoga Konsultan Bisnis Sudarno tetap Jaya dan kami akan selalu menjadi klien tetap dari Konsultan Bisnis Sudarno.',
    person: 'Chen Chen',
    role: 'Kepala Accounting',
    company: 'PT Jasa Barutama Perkasa',
    logo: '/client/jasa-barutama-perkasa.webp'
  },
  {
    id: 'tribahana-gita-mulia',
    quote: 'Kami telah menggunakan konsultan pajak Sudarno selama lima tahun terakhir, dan merasa sangat puas dengan layanan yang mereka berikan. Dari awal kerja sama, tim mereka selalu menunjukkan profesionalisme dan keahlian yang luar biasa dalam menangani semua kebutuhan perpajakan kami. Yang paling kami hargai adalah dedikasi mereka untuk memastikan selalu mematuhi peraturan perpajakan terbaru dan mengoptimalkan kewajiban pajak kami secara efisien. Setiap kali ada perubahan dalam regulasi pajak, mereka selalu memberikan informasi dan solusi yang jelas dan mudah dipahami.',
    company: 'Tribahana Gita Mulia',
    role: 'Dealer Alat-alat Musik (Yamaha)',
    logo: '/client/yamaha-tribahana-gita-mulia.webp'
  },
  {
    id: 'yamaha-i-homes',
    quote: 'Merasa sangat puas bekerja sama dengan konsultan pajak Sudarno. responsivitas dan perhatian terhadap detail yang mereka tunjukkan dalam setiap interaksi membuat kami merasa sangat diperhatikan. Kami benar-benar merasa seperti memiliki mitra pajak yang berdedikasi untuk mendukung kesuksesan bisnis kami. Terima kasih kepada konsultan pajak Sudarno atas kerja sama yang luar biasa. Kami sangat merekomendasikan jasa mereka kepada siapa saja yang mencari konsultan pajak yang handal dan terpercaya.',
    company: 'Yamaha Music School — I-Homes Pekanbaru',
    logo: '/client/homes.webp'
  },
  {
    id: 'pekanbaru-musik',
    quote: 'Konsultan pajak Sudarno benar benar andal, terampil, dan benar-benar peduli terhadap kliennya. Terima kasih banyak atas segala bantuan dan dukungan yang telah diberikan selama ini.',
    company: 'Pekanbaru Musik',
    logo: '/client/pekanbaru-musik.webp'
  },
  {
    id: 'smk-muhammadiyah',
    quote: 'SMK Muhammadiyah sangat senang bekerjasama dengan KP Sudarno dan akan terus ditingkatkan.',
    company: 'Peserta Pelatihan Perpajakan SMK Muhammadiyah Pekanbaru'
  }
]
