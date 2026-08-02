import { describe, expect, it } from 'vitest'
import { CONTACTS, PRIMARY_WHATSAPP, WHATSAPP_GREETING, whatsappLink } from '../app/utils/company'

describe('whatsappLink', () => {
  it('builds a wa.me deep-link with the primary number by default', () => {
    expect(whatsappLink()).toBe(`https://wa.me/6282289487779?text=${encodeURIComponent(WHATSAPP_GREETING)}`)
  })

  it('strips +, spaces and dashes from any contact number', () => {
    for (const contact of CONTACTS) {
      const url = whatsappLink(contact.phone)
      expect(url).toMatch(/^https:\/\/wa\.me\/\d+\?text=/)
      expect(url).not.toMatch(/[+ -]/)
    }
  })

  it('URL-encodes the greeting and keeps it recoverable', () => {
    const url = whatsappLink()
    expect(url).not.toContain(' ')
    expect(url.split('?text=')[1]).toBe(encodeURIComponent(WHATSAPP_GREETING))
    expect(decodeURIComponent(url.split('?text=')[1])).toBe(WHATSAPP_GREETING)
  })

  it('accepts a custom message', () => {
    expect(whatsappLink('+62 813-6574-4729', 'Halo')).toBe('https://wa.me/6281365744729?text=Halo')
  })
})

describe('company facts', () => {
  it('marks exactly one contact as primary', () => {
    expect(CONTACTS.filter(c => c.primary)).toHaveLength(1)
  })

  it('PRIMARY_WHATSAPP is that contact', () => {
    expect(PRIMARY_WHATSAPP).toBe(CONTACTS.find(c => c.primary))
  })

  it('the primary line is Pringgo (+62 822-8948-7779)', () => {
    expect(PRIMARY_WHATSAPP.name).toBe('Pringgo')
    expect(PRIMARY_WHATSAPP.phone).toBe('+62 822-8948-7779')
  })
})
