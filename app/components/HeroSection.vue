<script setup lang="ts">
/**
 * Hero — spec §4.1. Every claim here traces back to COMPANY PROFILE PT. KBS 2026.pdf:
 * the headline and subhead are drafted from the deck's Introduction page, the badges
 * from the Introduction and Data Umum blocks. Nothing is invented.
 *
 * The background is the deck's own cover collage, cropped to drop the baked-in
 * "COMPANY PROFILE" band. It is the LCP element, so it loads eagerly and the section
 * deliberately carries no `v-reveal` — fading the largest paint in delays it.
 */
const badges = [
  { icon: 'i-lucide-badge-check', label: 'Izin Praktik Konsultan Pajak Tingkat B' },
  { icon: 'i-lucide-calendar-clock', label: 'Melayani sejak 2004' },
  { icon: 'i-lucide-map-pin', label: 'Pekanbaru, Riau' }
]
</script>

<template>
  <section
    id="beranda"
    class="relative isolate overflow-hidden bg-kbs-900"
  >
    <img
      src="/hero/collage.webp"
      alt=""
      aria-hidden="true"
      width="1600"
      height="1683"
      fetchpriority="high"
      decoding="async"
      class="absolute inset-0 -z-10 size-full object-cover"
    >

    <!-- Vertical wash on mobile (text spans the full width); horizontal on desktop so
         the right half of the collage stays legible beside the copy column. -->
    <div
      aria-hidden="true"
      class="absolute inset-0 -z-10 bg-gradient-to-b from-kbs-950/92 via-kbs-900/82 to-kbs-950/92 md:bg-gradient-to-r md:from-kbs-950/95 md:via-kbs-900/85 md:to-kbs-900/60"
    />

    <div class="mx-auto max-w-6xl px-4 pt-36 pb-20 sm:px-6 md:pt-44 md:pb-28 lg:px-8 lg:pt-52 lg:pb-36">
      <div class="max-w-2xl">
        <p class="text-sm font-semibold uppercase tracking-wide text-kbs-200">
          {{ COMPANY.legalName }}
        </p>

        <h1 class="mt-3 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          Konsultan pajak dan mitra bisnis Anda
        </h1>

        <div class="mt-6 h-1 w-16 rounded-full bg-gold-400" />

        <p class="mt-6 text-lg leading-relaxed text-kbs-100 sm:text-xl">
          Sejak 2004, {{ COMPANY.legalName }} melayani Klien Perorangan maupun Badan
          dalam pengelolaan pajak yang baik.
        </p>

        <div class="mt-9 flex flex-col gap-3 sm:flex-row">
          <UButton
            :to="whatsappLink()"
            target="_blank"
            rel="noopener"
            size="xl"
            icon="i-simple-icons-whatsapp"
            label="Konsultasi via WhatsApp"
            color="neutral"
            variant="solid"
            class="justify-center bg-paper text-kbs-900 hover:bg-white"
          />

          <UButton
            to="/#layanan"
            size="xl"
            icon="i-lucide-arrow-down"
            label="Lihat Layanan"
            color="neutral"
            variant="outline"
            class="justify-center bg-transparent text-white ring-white/40 hover:bg-white/10"
          />
        </div>

        <ul class="mt-10 flex flex-wrap gap-x-3 gap-y-2">
          <li
            v-for="badge in badges"
            :key="badge.label"
            class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-kbs-100 ring-1 ring-inset ring-white/20"
          >
            <UIcon
              :name="badge.icon"
              class="size-4 shrink-0 text-gold-400"
            />
            {{ badge.label }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
