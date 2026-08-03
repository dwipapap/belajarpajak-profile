<script setup lang="ts">
/**
 * Scaffolding for a homepage anchor whose unit has not landed yet (spec §7). Each unit
 * deletes its own entry from `index.vue`; this component disappears with the last one.
 *
 * `background` is passed in rather than derived: the sections alternate paper / kbs-50
 * down the page, and that rhythm is a property of the page, not of the placeholder.
 */
defineProps<{
  id: string
  title: string
  unit: string
  background: string
}>()
</script>

<template>
  <section
    :id="id"
    v-reveal
    :class="background"
  >
    <div class="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <p class="text-sm font-semibold uppercase tracking-wide text-kbs-600">
        {{ unit }}
      </p>

      <h2 class="mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl">
        {{ title }}
      </h2>

      <div class="mt-4 h-1 w-16 rounded-full bg-gold-400" />

      <p class="mt-6 max-w-2xl leading-relaxed text-ink/70">
        Bagian ini belum diisi. Konten diambil dari COMPANY PROFILE PT. KBS 2026.pdf
        pada {{ unit }}.
      </p>
    </div>
  </section>
</template>
