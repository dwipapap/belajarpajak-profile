/**
 * Single source of truth for company facts used across nav, footer, contact,
 * WhatsApp deep-links and JSON-LD. Verified against COMPANY PROFILE PT. KBS 2026.pdf.
 *
 * The PDF carries two addresses: the Data Umum / cover version (below) and the NPWP
 * registration version ("Sidomulyo Barat, Tuahmadani"). The cover version is canonical
 * for the site, Maps pin and structured data — decided 2026-08-01. The NPWP wording
 * stays verbatim in the Legalitas section (Unit 4) because it quotes a legal document.
 */

export const COMPANY = {
  legalName: 'PT. Konsultan Bisnis Sudarno',
  shortName: 'PT. KBS',
  formerName: 'KKP Sudarno & Rekan',
  tagline: 'Konsultan pajak berizin — melayani sejak 2004.',
  foundingDate: '2004',
  email: 'sdntalenta@yahoo.com',
  address: {
    street: 'Jl. Komp. Damai Langgeng',
    locality: 'Sidomulyo Bar., Kec. Tampan',
    city: 'Kota Pekanbaru',
    region: 'Riau',
    postalCode: '28294',
    country: 'ID'
  }
} as const

export const ADDRESS_LINES = [
  'Jl. Komp. Damai Langgeng',
  'Sidomulyo Bar., Kec. Tampan',
  'Kota Pekanbaru, Riau 28294'
] as const

/** One-line form of the canonical address — Maps queries and (later) JSON-LD. */
export const ADDRESS_ONE_LINE = ADDRESS_LINES.join(', ')

/**
 * Google Maps targets for Kontak.
 *
 * TODO: the PDF carries no coordinates and no Google Business Profile link, so these
 * resolve the street rather than the office door. Ask the client for the exact pin
 * (or a Business Profile URL) and replace the query with a place ID / lat,lng.
 */
export const MAPS_LINK
  = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS_ONE_LINE)}`

/** `output=embed` renders the same query in an iframe without needing a Maps API key. */
export const MAPS_EMBED_LINK
  = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS_ONE_LINE)}&output=embed`

/** Spec §4: Pringgo's line is the primary number behind the float button and every CTA. */
export const CONTACTS = [
  { name: 'Pringgo', phone: '+62 822-8948-7779', primary: true },
  { name: 'Arih', phone: '+62 822-6864-7796', primary: false },
  { name: 'Hairudin', phone: '+62 813-6574-4729', primary: false }
] as const

export const PRIMARY_WHATSAPP = CONTACTS.find(c => c.primary)!

export const WHATSAPP_GREETING
  = 'Halo PT. KBS, saya ingin berkonsultasi mengenai layanan perpajakan.'

/** Builds a wa.me deep-link; strips the formatting characters wa.me rejects. */
export function whatsappLink(phone: string = PRIMARY_WHATSAPP.phone, message: string = WHATSAPP_GREETING) {
  const digits = phone.replace(/\D/g, '')
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}

export const NAV_LINKS = [
  { label: 'Beranda', to: '/#beranda' },
  { label: 'Tentang', to: '/#tentang' },
  // The catalog page, not the homepage summary — spec §3 breaks it out for SEO.
  { label: 'Layanan', to: '/layanan' },
  { label: 'Tim', to: '/#tim' },
  { label: 'Legalitas', to: '/#legalitas' },
  { label: 'Kontak', to: '/#kontak' }
] as const

/** Cross-link target — the LMS runs under the same brand (spec §6). */
export const LMS_URL = 'https://lms.websiteprofile.com'
