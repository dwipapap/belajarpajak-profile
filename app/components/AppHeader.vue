<script setup lang="ts">
import type { CardNavItem } from './CardNav.vue'
/**
 * Site nav — floating CardNav (Vue Bits) pinned to the viewport so it stays visible
 * while the page scrolls (decision 2026-08-04). The three expanding cards group the
 * NAV_LINKS into Tentang / Layanan / Kontak using the real route paths, and the CTA
 * deep-links to the primary WhatsApp line just like the old UHeader did.
 *
 * No raw hex here — colours come from the kbs / paper / ink ramps so the light pill
 * reads on every dark page header.
 */
const navItems: CardNavItem[] = [
  {
    label: 'Tentang',
    bgColor: 'var(--color-kbs-600)',
    textColor: 'var(--color-paper)',
    links: [
      { label: 'Tentang', href: '/#tentang', ariaLabel: 'Tentang PT KBS' },
      { label: 'Legalitas', href: LEGALITY_PATH, ariaLabel: 'Legalitas PT KBS' },
      { label: 'Tim', href: TEAM_PATH, ariaLabel: 'Tim dan manajemen PT KBS' }
    ]
  },
  {
    label: 'Layanan',
    bgColor: 'var(--color-kbs-700)',
    textColor: 'var(--color-paper)',
    links: [
      { label: 'Semua Layanan', href: SERVICES_PATH, ariaLabel: 'Katalog layanan PT KBS' },
      { label: 'Konsultasi', href: whatsappLink(), ariaLabel: 'Konsultasi via WhatsApp' }
    ]
  },
  {
    label: 'Kontak',
    bgColor: 'var(--color-kbs-900)',
    textColor: 'var(--color-paper)',
    links: [
      { label: 'Kontak & Lokasi', href: '/#kontak', ariaLabel: 'Kontak dan lokasi kantor' },
      { label: 'WhatsApp', href: whatsappLink(), ariaLabel: `WhatsApp ${PRIMARY_WHATSAPP.name}` },
      { label: 'Email', href: `mailto:${COMPANY.email}`, ariaLabel: `Email ${COMPANY.email}` }
    ]
  }
]
</script>

<template>
  <CardNav
    :logo="'/brand/logo-kbs-sm.webp'"
    :logo-alt="`Logo ${COMPANY.legalName}`"
    :items="navItems"
    base-color="var(--color-paper)"
    menu-color="var(--color-ink)"
    button-bg-color="var(--color-kbs-600)"
    button-text-color="var(--color-paper)"
    :cta-label="'Konsultasi'"
    :cta-href="whatsappLink()"
    ease="power3.out"
  />
</template>
