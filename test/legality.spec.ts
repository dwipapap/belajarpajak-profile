import { describe, expect, it } from 'vitest'
import {
  CERTIFIED_PEOPLE,
  LEGALITY_PATH,
  LEGAL_DOCUMENTS,
  documentHeadline
} from '../app/utils/legality'
import { ADDRESS_ONE_LINE, NAV_LINKS } from '../app/utils/company'

describe('legal documents', () => {
  it('carries the four registrations the deck records', () => {
    expect(LEGAL_DOCUMENTS.map(document => document.id)).toEqual([
      'izin-praktik',
      'perseroan',
      'nib',
      'npwp'
    ])
  })

  it('transcribes the registration numbers exactly as printed', () => {
    const numbers = Object.fromEntries(LEGAL_DOCUMENTS.map(d => [d.id, d.number]))

    expect(numbers.npwp).toBe('07.514.937.7-216.000')
    expect(numbers.nib).toBe('1908240057603')
    expect(numbers.perseroan).toBe('AHU-006151.AH.01.31.Tahun 2024')
    // The deck dates the Izin Praktik but never prints its number.
    expect(numbers['izin-praktik']).toBeUndefined()
  })

  it('names icons statically so the icon bundler can scan them', () => {
    for (const document of LEGAL_DOCUMENTS) {
      expect(document.icon).toMatch(/^i-[a-z0-9-]+$/)
    }
  })

  it('gives every document an issuer and at least one detail line', () => {
    for (const document of LEGAL_DOCUMENTS) {
      expect(document.issuer).not.toBe('')
      expect(document.details.length).toBeGreaterThan(0)
    }
  })

  it('quotes the NPWP address from the certificate, not the canonical site address', () => {
    const address = LEGAL_DOCUMENTS
      .find(document => document.id === 'npwp')
      ?.details.find(detail => detail.label === 'Alamat terdaftar')?.value

    expect(address).toBe(
      'Jalan Komplek Damai Langgeng, Sidomulyo Barat, Tuahmadani, Kota Pekanbaru, Riau'
    )
    expect(address).not.toBe(ADDRESS_ONE_LINE)
  })

  it('keeps the NPWP address wording out of every other document', () => {
    const elsewhere = LEGAL_DOCUMENTS
      .filter(document => document.id !== 'npwp')
      .flatMap(document => document.details.map(detail => detail.value))

    for (const value of elsewhere) {
      expect(value).not.toContain('Tuahmadani')
    }
  })
})

describe('legality links', () => {
  it('points the Legalitas nav item at the detail page', () => {
    expect(NAV_LINKS.find(link => link.label === 'Legalitas')?.to).toBe(LEGALITY_PATH)
  })

  it('gives every document a usable anchor id', () => {
    for (const document of LEGAL_DOCUMENTS) {
      expect(document.id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
    }
    expect(new Set(LEGAL_DOCUMENTS.map(d => d.id)).size).toBe(LEGAL_DOCUMENTS.length)
  })
})

describe('homepage key point', () => {
  it('shows the number where the document has one', () => {
    const npwp = LEGAL_DOCUMENTS.find(document => document.id === 'npwp')!
    expect(documentHeadline(npwp)).toBe('07.514.937.7-216.000')
  })

  it('falls back to the first detail for the numberless Izin Praktik', () => {
    const izin = LEGAL_DOCUMENTS.find(document => document.id === 'izin-praktik')!
    expect(documentHeadline(izin)).toBe('1 Juli 2015')
  })

  it('always resolves to a non-empty line', () => {
    for (const document of LEGAL_DOCUMENTS) {
      expect(documentHeadline(document)).toBeTruthy()
    }
  })
})

describe('profession certifications', () => {
  it('lists only people the deck gives a certification list for', () => {
    expect(CERTIFIED_PEOPLE.map(person => person.role)).toEqual([
      'Founder',
      'Direktur Utama',
      'Direktur'
    ])
  })

  it('gives every person at least one certification', () => {
    for (const person of CERTIFIED_PEOPLE) {
      expect(person.certifications.length).toBeGreaterThan(0)
    }
  })

  it('drops the education fields that bleed into the founder list in the PDF', () => {
    const founder = CERTIFIED_PEOPLE.find(person => person.role === 'Founder')!

    expect(founder.certifications).toHaveLength(7)
    expect(founder.certifications).not.toContain('Akuntansi')
    expect(founder.certifications).not.toContain('Manajemen Keuangan')
  })
})
