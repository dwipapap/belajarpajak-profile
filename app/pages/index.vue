<script setup lang="ts">
/**
 * Every homepage section of Phase 1 is built (spec §7, Units 1–8) — no placeholders left.
 *
 * Sections alternate paper / kbs-50 down the page: Tentang closes on `bg-paper`, so Visi
 * & Misi carries `bg-kbs-50` and Layanan returns to `bg-paper`, which is also why
 * Legalitas is `bg-paper` and Kontak opens on `bg-kbs-50`.
 */
</script>

<template>
  <div>
    <HeroSection />

    <AboutSection />

    <VisionSection />

    <ServicesSection />

    <TeamSection />

    <LegalitySection />

    <ClientSection />

    <TestimonialSection />

    <ContactSection />
  </div>
</template>
