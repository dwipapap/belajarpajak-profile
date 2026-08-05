<script setup lang="ts">
/**
 * Hero + Tentang (Unit 1), Kontak (Unit 2), Layanan (Unit 3), Legalitas (Unit 4),
 * Tim (Unit 5), Klien (Unit 6) and Testimoni (Unit 7) are built; the anchor that is left
 * stays in place until its own unit replaces it — see planning/kbs-profile-site-spec.md §7.
 *
 * Sections alternate paper / kbs-50 down the page. Tentang closes on `bg-paper` and
 * Layanan is `bg-paper` too, so the placeholder carries the background that keeps the
 * alternation intact — which is also why Legalitas is `bg-paper` and Kontak opens on
 * `bg-kbs-50`.
 */
const beforeLayanan = [
  { id: 'visi-misi', title: 'Visi & Misi', unit: 'Unit 8', background: 'bg-kbs-50' }
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

    <ClientSection />

    <TestimonialSection />

    <ContactSection />
  </div>
</template>
