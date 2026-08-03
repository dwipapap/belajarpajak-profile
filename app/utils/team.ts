/**
 * Tim & Manajemen — spec §4.5. The firm's leadership hierarchy and staff, transcribed from
 * the PDF (planning/company-profile.md "Kepemimpinan & Tim"). Shared by the homepage
 * `TeamSection` and the `/tim` page so the names and titles exist in exactly one place.
 *
 * Two tiers are modelled:
 *  - `TEAM_LEADERS` — the showcase tier (Founder, Mitra, Direktur Utama, Direktur,
 *    Controller). These get the homepage accordion, carry a one-line `credential` for its
 *    caption, and carry the deck's full education / certification / expertise lists for the
 *    dossier at the bottom of `/tim`.
 *  - `MANAGERS` / `STAFF` — everyone else the deck lists. The deck gives these as name +
 *    role rows only: no credentials, no photos.
 *
 * `TEAM_SECTIONS` flattens all three groups into the shape `/tim` renders: one grid per
 * group, each with a brand label card.
 *
 * PHOTO GAP (CLAUDE.md): only the founder's photo is real. Everyone else runs on the
 * placeholder set, which holds 9 files for 17 people — faces therefore repeat on the same
 * page. The placeholders are stand-ins, never real people, and must all be swapped for
 * originals before launch. The name rendered is the data, not the file.
 */

export interface TeamLeader {
  /** Anchor-safe id; also the `v-for` key. */
  id: string
  name: string
  role: string
  /** One line of the person's strongest credential(s), for the accordion caption. */
  credential: string
  /** Public path to a photo (placeholder until real originals are collected). */
  photo: string
  /** Degrees, as the deck prints them. */
  education: readonly string[]
  certifications?: readonly string[]
  expertise?: readonly string[]
  experience?: readonly string[]
}

/** A name + role row, as the deck prints the Manajer and Tim tables. */
export interface TeamRow {
  name: string
  title: string
}

/** What a `/tim` grid cell needs — leaders and rows normalised to one shape. */
export interface TeamMember {
  name: string
  title: string
  photo: string
}

/** A group of the roster, rendered as one grid with its own label card. */
export interface TeamSection {
  /** Jump-link target. */
  id: string
  /** Screen-reader heading; the label card carries the visible version. */
  heading: string
  /** Small line above the label on the brand card. */
  eyebrow: string
  /** The label card's headline. */
  label: string
  members: readonly TeamMember[]
}

/**
 * Stand-in portraits, in file order. Indices 0-3 belong to the leaders; the roster picks up
 * at index 4 and wraps. Assignment is index-based and never random — prerender has to emit
 * the same face on every build.
 */
const PLACEHOLDER_PHOTOS = [
  '/team/placeholder/Ninomae-Inanis_pr-img_03.webp',
  '/team/placeholder/Ninomae-Inanis_pr-img_04.webp',
  '/team/placeholder/Ninomae-Inanis_pr-img_05.webp',
  '/team/placeholder/Ninomae-Inanis_pr-img_06.webp',
  '/team/placeholder/Ninomae-Inanis_pr-img_07.webp',
  '/team/placeholder/Ninomae-Inanis_pr-img_08.webp',
  '/team/placeholder/Ninomae-Inanis_pr-img_09.webp',
  '/team/placeholder/Ninomae-Inanis_pr-img_10.webp',
  '/team/placeholder/Ninomae-Inanis_pr-img_11.webp'
] as const

function placeholderPhoto(index: number) {
  return PLACEHOLDER_PHOTOS[index % PLACEHOLDER_PHOTOS.length]!
}

/** Everyone given the showcase treatment. Order is the deck's own hierarchy. */
export const TEAM_LEADERS: readonly TeamLeader[] = [
  {
    id: 'founder',
    name: 'Dr. Sudarno, S.Pd., M.M., BKP',
    role: 'Founder',
    credential: 'S3 Manajemen Keuangan · Universitas Brawijaya',
    photo: '/team/founder-sudarno.webp',
    education: [
      'S3 Manajemen Keuangan, Universitas Brawijaya',
      'S2 Magister Manajemen Keuangan, Universitas Riau',
      'S1 Pendidikan Akuntansi, Universitas Riau'
    ],
    // The deck's certification table bleeds two stray cells ("Akuntansi", "Manajemen
    // Keuangan") that are column headers, not certificates — spec §4 says to drop them.
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
    id: 'mitra',
    name: 'T. Arsono, S.E., MBA., LLM., BKP',
    role: 'Mitra PT. KBS',
    credential: 'International Tax Center — Leiden University',
    photo: placeholderPhoto(0),
    education: [
      'International Tax Center, Leiden University',
      'MA / LLM (Adv. Master) in European and International Tax Law, Inter-university '
      + 'Program — Katholieke University of Leuven (Belgium) & Tilburg University',
      'Magister Management (MBA), Universitas Gadjah Mada (UGM)',
      'Accounting, Universitas Airlangga (UNAIR)'
    ],
    expertise: [
      'International Taxes',
      'Corporate Income Taxes',
      'Value Added Taxes'
    ]
  },
  {
    id: 'direktur-utama',
    name: 'Arih Dwi Prihastomo S, S.Aktr., M.M.',
    role: 'Direktur Utama',
    credential: 'S2 Manajemen — Institut Teknologi dan Bisnis Pelita Indonesia Pekanbaru',
    photo: placeholderPhoto(1),
    education: [
      'S2 Manajemen, Institut Teknologi dan Bisnis Pelita Indonesia Pekanbaru',
      'S1 Sarjana Aktuaria, Sekolah Tinggi Manajemen Risiko dan Asuransi'
    ],
    certifications: [
      'Brevet A',
      'Brevet B',
      'Komisaris Bank Perekonomian Rakyat'
    ]
  },
  {
    id: 'direktur',
    name: 'M. Pringgo Prayetno, S.E., M.M., CTT',
    role: 'Direktur',
    credential: 'S2 Magister Manajemen — Universitas Sebelas Maret',
    photo: placeholderPhoto(2),
    education: [
      'S2 Manajemen, Institut Teknologi dan Bisnis Pelita Indonesia Pekanbaru (Transfer)',
      'S2 Magister Manajemen, Universitas Sebelas Maret Surakarta',
      'S1 Sarjana Ekonomi, Universitas Muhammadiyah Surakarta'
    ],
    certifications: [
      'Brevet A',
      'Brevet B',
      'Komisaris Bank Perekonomian Rakyat'
    ]
  },
  {
    id: 'controller',
    name: 'Muhammad Ridwan, M.M.',
    role: 'Controller',
    credential: 'S2 Magister Manajemen — Universitas Lancang Kuning',
    photo: placeholderPhoto(3),
    education: [
      'S2 Magister Manajemen, Universitas Lancang Kuning Pekanbaru',
      'S1 FKIP, Universitas Riau'
    ],
    experience: [
      'Direktur Utama PT. Kampar Agro Sejahtera (Usaha Bidang Pertanian)',
      'Wakil Ketua Komite Tetap Riau, KADIN Indonesia',
      'Konsultan SDM Produktivitas bersertifikat BNSP',
      'Praktisi Coach bersertifikat KCUN-ICF (International Coaching Federation)',
      'Dosen Luar Biasa di beberapa Perguruan Tinggi di Pekanbaru',
      'Sekretaris Nasional Kerjasama Ekonomi Sub Regional Indonesia Malaysia Thailand '
      + '(IMT-GT) Joint Business Council (JBC) Indonesia'
    ]
  }
]

/** The deck's "Manajer" table. */
const MANAGERS: readonly TeamRow[] = [
  { name: 'Hairudin, S.E., M.M., CPTT', title: 'Client & Policy Manager' },
  { name: 'Ramli Aman, S.E., M.M', title: 'Office Manager' },
  { name: 'Sri Budi Firman, S.E., M.M', title: 'Assistant Manager' },
  { name: 'Marice Br. Hutahuruk, S.Pd., M.M', title: 'Finance & Accounting Manager' },
  { name: 'Dr. Nicholas Renaldo, S.E., M.M., CHRTDS., CDMP., CHRM', title: 'Training & Research Manager' }
]

/** The deck's "Tim (Meet Our Team)" table. */
const STAFF: readonly TeamRow[] = [
  { name: 'Rahayu Purwaningsih, S.E., MM', title: 'Tax, Accounting & Marketing' },
  { name: 'Desna Miarti, S.E', title: 'Tax & Finance' },
  { name: 'Rokiyah, S.E., MM', title: 'Tax & Marketing' },
  { name: 'M. Sayyid Akrimi, S.E., M.M', title: 'Tax, Accounting & Marketing' },
  { name: 'Tekad Ridho Perbatas', title: 'Tax & Accounting' },
  { name: 'Marvin Khewardana', title: 'Tax & Accounting' },
  { name: 'Ilham Romadhona F, S.E', title: 'Tax, Accounting & Marketing' },
  { name: 'Steven Valencia', title: 'Tax & Accounting' }
]

/** Gives a photo-less row a stand-in, continuing the leaders' run through the set. */
function withPhotos(rows: readonly TeamRow[], offset: number): readonly TeamMember[] {
  return rows.map((row, index) => ({ ...row, photo: placeholderPhoto(offset + index) }))
}

/** The three grids on `/tim`, in the deck's hierarchy order. */
export const TEAM_SECTIONS: readonly TeamSection[] = [
  {
    id: 'pimpinan',
    heading: 'Pimpinan',
    eyebrow: 'Jajaran',
    label: 'Pimpinan',
    members: TEAM_LEADERS.map(leader => ({
      name: leader.name,
      title: leader.role,
      photo: leader.photo
    }))
  },
  {
    id: 'manajemen',
    heading: 'Manajemen',
    eyebrow: 'Jajaran',
    label: 'Manajemen',
    members: withPhotos(MANAGERS, 4)
  },
  {
    id: 'tim-kami',
    heading: 'Tim Kami',
    eyebrow: 'Anggota',
    label: 'Tim Kami',
    members: withPhotos(STAFF, 4 + MANAGERS.length)
  }
]

/** The roster route. Nav and the homepage CTA point here rather than re-typing the path. */
export const TEAM_PATH = '/tim'
