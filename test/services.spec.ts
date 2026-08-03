import { describe, expect, it } from 'vitest'
import { SERVICES, SERVICES_PATH, servicePath } from '../app/utils/services'
import { NAV_LINKS } from '../app/utils/company'

describe('service catalog', () => {
  it('carries the eight groups the deck lists', () => {
    expect(SERVICES).toHaveLength(8)
  })

  it('gives every group a unique slug usable as an anchor id', () => {
    const slugs = SERVICES.map(service => service.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
    }
  })

  it('describes every group with either the deck prose or its bullets, never both', () => {
    for (const service of SERVICES) {
      expect(Boolean(service.body) !== Boolean(service.points)).toBe(true)
      if (service.points) {
        expect(service.points.length).toBeGreaterThan(0)
      }
    }
  })

  it('names icons statically so the icon bundler can scan them', () => {
    for (const service of SERVICES) {
      expect(service.icon).toMatch(/^i-[a-z0-9-]+$/)
    }
  })

  it('summarises each group in one line for the homepage card', () => {
    for (const service of SERVICES) {
      expect(service.summary.length).toBeLessThanOrEqual(110)
      expect(service.summary).not.toContain('\n')
    }
  })
})

describe('service links', () => {
  it('builds anchors on the catalog route', () => {
    expect(servicePath('accounting')).toBe(`${SERVICES_PATH}#accounting`)
  })

  it('points the Layanan nav item at the catalog page', () => {
    expect(NAV_LINKS.find(link => link.label === 'Layanan')?.to).toBe(SERVICES_PATH)
  })
})
