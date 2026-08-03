<script setup lang="ts">
/**
 * Hero + Tentang (Unit 1), Kontak (Unit 2), Layanan (Unit 3), Legalitas (Unit 4) and
 * Tim (Unit 5) are built; the anchors around them stay in place until their own unit
 * replaces them — see planning/kbs-profile-site-spec.md §7.
 *
 * Sections alternate paper / kbs-50 down the page. Tentang closes on `bg-paper` and
 * Layanan is `bg-paper` too, so the placeholders carry the background that keeps the
 * alternation intact — which is also why Legalitas is `bg-paper` and Kontak opens on
 * `bg-kbs-50`.
 */
const beforeLayanan = [
  { id: 'visi-misi', title: 'Visi & Misi', unit: 'Unit 8', background: 'bg-kbs-50' }
]

const afterLegalitas = [
  { id: 'klien', title: 'Klien', unit: 'Unit 6', background: 'bg-kbs-50' },
  { id: 'testimoni', title: 'Testimoni', unit: 'Unit 7', background: 'bg-paper' }
]
</script>

<template>
  <div>
    <HeroSection />

    <AboutSection />

    <SectionPlaceholder
      v-for="section in beforeLayanan"
      :key="section.id"
      v-bind="section"
    />

    <ServicesSection />

    <TeamSection />

    <LegalitySection />

    <SectionPlaceholder
      v-for="section in afterLegalitas"
      :key="section.id"
      v-bind="section"
    />

    <ContactSection />
  </div>
</template>
