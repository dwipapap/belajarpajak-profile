<script setup lang="ts">
/**
 * Unit 0 delivers the shell only: every homepage anchor exists and the sticky nav
 * resolves to it. Each placeholder below is replaced wholesale by its own unit —
 * see planning/kbs-profile-site-spec.md §7.
 */
const sections = [
  { id: 'beranda', title: 'Hero', unit: 'Unit 1' },
  { id: 'tentang', title: 'Tentang Kami', unit: 'Unit 1' },
  { id: 'visi-misi', title: 'Visi & Misi', unit: 'Unit 8' },
  { id: 'layanan', title: 'Layanan', unit: 'Unit 3' },
  { id: 'tim', title: 'Tim & Manajemen', unit: 'Unit 5' },
  { id: 'legalitas', title: 'Legalitas', unit: 'Unit 4' },
  { id: 'klien', title: 'Klien', unit: 'Unit 6' },
  { id: 'testimoni', title: 'Testimoni', unit: 'Unit 7' },
  { id: 'kontak', title: 'Kontak', unit: 'Unit 2' }
]
</script>

<template>
  <div>
    <section
      v-for="(section, index) in sections"
      :id="section.id"
      :key="section.id"
      v-reveal
      :class="index % 2 === 1 ? 'bg-kbs-50' : 'bg-paper'"
    >
      <div class="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <p class="text-sm font-semibold uppercase tracking-wide text-kbs-600">
          {{ section.unit }}
        </p>

        <h2 class="mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl">
          {{ section.title }}
        </h2>

        <div class="mt-4 h-1 w-16 rounded-full bg-gold-400" />

        <p class="mt-6 max-w-2xl leading-relaxed text-ink/70">
          Bagian ini belum diisi. Konten diambil dari COMPANY PROFILE PT. KBS 2026.pdf
          pada {{ section.unit }}.
        </p>
      </div>
    </section>
  </div>
</template>
