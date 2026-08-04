import { readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { CLIENTS, CLIENT_ROWS, OTHER_CLIENTS } from '../app/utils/clients'

const logoDirectory = fileURLToPath(new URL('../public/client', import.meta.url))
const stagedLogos = readdirSync(logoDirectory)

describe('client logos', () => {
  it('carries every logo staged in public/client', () => {
    expect(CLIENTS).toHaveLength(stagedLogos.length)
    expect(new Set(CLIENTS.map(client => client.id)).size).toBe(CLIENTS.length)
  })

  it('derives every path from the id, and every path resolves to a staged file', () => {
    for (const client of CLIENTS) {
      expect(client.logo).toBe(`/client/${client.id}.webp`)
      expect(stagedLogos).toContain(`${client.id}.webp`)
    }
  })

  it('names every client', () => {
    for (const client of CLIENTS) {
      expect(client.name.trim()).not.toBe('')
    }
  })

  it('flags exactly the four logos that come off the deck on solid black', () => {
    expect(CLIENTS.filter(client => client.dark).map(client => client.id)).toEqual([
      'tiki',
      'multi-guna-precast-mandiri',
      'sultan-resto',
      'audi-variasi'
    ])
  })

  it('never puts two dark tiles next to each other', () => {
    for (const [index, client] of CLIENTS.entries()) {
      if (index === 0) continue
      expect(client.dark && CLIENTS[index - 1]!.dark).toBeFalsy()
    }
  })
})

describe('marquee rows', () => {
  it('splits the logos across two rows without dropping or repeating one', () => {
    expect(CLIENT_ROWS).toHaveLength(2)
    expect(CLIENT_ROWS.flat()).toEqual(CLIENTS)
  })

  it('keeps the rows within one tile of each other so neither runs visibly short', () => {
    const [first, second] = CLIENT_ROWS
    expect(Math.abs(first!.length - second!.length)).toBeLessThanOrEqual(1)
  })
})

describe('other clients', () => {
  it('transcribes the sixteen names from the deck table', () => {
    expect(OTHER_CLIENTS).toHaveLength(16)
    expect(new Set(OTHER_CLIENTS).size).toBe(OTHER_CLIENTS.length)
  })

  it('does not repeat a client that already has a logo', () => {
    const named = new Set(CLIENTS.map(client => client.name))
    for (const name of OTHER_CLIENTS) {
      expect(named.has(name)).toBe(false)
    }
  })
})
