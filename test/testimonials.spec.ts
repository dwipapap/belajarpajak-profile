import { readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { TESTIMONIALS } from '../app/utils/testimonials'

const logoDirectory = fileURLToPath(new URL('../public/client', import.meta.url))
const stagedLogos = readdirSync(logoDirectory)

describe('testimonials', () => {
  it('carries the six quotes the deck prints, with unique ids', () => {
    expect(TESTIMONIALS).toHaveLength(6)
    expect(new Set(TESTIMONIALS.map(testimonial => testimonial.id)).size).toBe(TESTIMONIALS.length)
  })

  it('quotes verbatim — no empty, truncated or untrimmed text', () => {
    for (const testimonial of TESTIMONIALS) {
      expect(testimonial.quote).toBe(testimonial.quote.trim())
      expect(testimonial.quote.length).toBeGreaterThan(40)
      expect(testimonial.quote).not.toMatch(/[…]|\.\.\.$/)
    }
  })

  it('attributes every quote to an organisation', () => {
    for (const testimonial of TESTIMONIALS) {
      expect(testimonial.company.trim()).not.toBe('')
    }
  })

  it('reuses logos already staged for Unit 6 rather than adding files', () => {
    for (const testimonial of TESTIMONIALS) {
      if (!testimonial.logo) continue
      expect(stagedLogos).toContain(testimonial.logo.replace('/client/', ''))
    }
  })

  it('leaves SMK Muhammadiyah as the only entry without a logo — the deck prints none', () => {
    expect(TESTIMONIALS.filter(testimonial => !testimonial.logo).map(testimonial => testimonial.id))
      .toEqual(['smk-muhammadiyah'])
  })
})
