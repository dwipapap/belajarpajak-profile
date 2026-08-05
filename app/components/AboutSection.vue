<script setup lang="ts">
/**
 * Tentang Kami — spec §4.2. Reproduces the deck's Introduction page: the three
 * paragraphs as prose with the founder card alongside, mirroring its own layout.
 *
 * The copy is the PDF's first person ("Kami memulai perjalanan ini…"), not the
 * de-personalised third person in planning/company-profile.md. The transcript
 * rewrote it; the deck is the source of truth.
 */
const paragraphs = [
  `${COMPANY.legalName} adalah konsultan pajak dan mitra bisnis yang melayani Klien `
  + 'Perorangan maupun Badan dalam pengelolaan pajak yang baik.',

  'Kami memulai perjalanan ini pada tahun 2004 dengan nama KKP Sudarno & Rekan yang '
  + 'berfokus pada jasa konsultasi dan kepatuhan pajak. Dedikasi kami diperkuat dengan '
  + 'terbitnya Izin Praktik Konsultan Pajak Tingkat B dari Direktorat Jenderal Pajak '
  + 'pada 1 Juli 2015.',

  'Untuk menjawab kebutuhan klien yang semakin beragam, pada 16 Agustus 2024 kami resmi '
  + `bertransformasi menjadi ${COMPANY.legalName}. Melalui perubahan ini, kami tidak hanya `
  + 'menangani pajak, tetapi juga siap membantu pengembangan bisnis Anda secara lebih luas.'
]

/**
 * The founder card reuses the roster entry rather than restating it — Unit 5 already
 * staged the 800×1000 cut-out every `/tim` tile uses, so there is exactly one name,
 * one role and one portrait path for this person in the codebase.
 */
const founder = TEAM_LEADERS.find(leader => leader.id === 'founder')!
</script>

<template>
  <section
    id="tentang"
    v-reveal
    class="bg-paper"
  >
    <div class="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <h2 class="text-3xl font-bold tracking-tight text-ink md:text-4xl">
        Tentang Kami
      </h2>

      <div class="mt-4 h-1 w-16 rounded-full bg-gold-400" />

      <div class="mt-10 grid gap-10 lg:grid-cols-5 lg:gap-14">
        <div class="space-y-5 lg:col-span-3">
          <p
            v-for="paragraph in paragraphs"
            :key="paragraph"
            class="leading-relaxed text-ink/80 sm:text-lg"
          >
            {{ paragraph }}
          </p>
        </div>

        <div class="lg:col-span-2">
          <!-- Portrait tile: one panel, no frame — the caption sits on the photo rather
               than under it. -->
          <figure class="group relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl bg-gradient-to-b from-paper to-kbs-100 shadow-lg shadow-kbs-900/10">
            <img
              :src="founder.photo"
              :alt="`Foto ${founder.name}`"
              width="800"
              height="1000"
              loading="lazy"
              decoding="async"
              class="absolute inset-0 size-full object-cover object-top transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-105"
            >

            <!-- Scrim: the cut-out fades into a light panel, so the caption needs its own
                 dark ground to stay legible. -->
            <span
              aria-hidden="true"
              class="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-kbs-900/85 via-kbs-900/45 to-transparent"
            />

            <figcaption class="absolute inset-x-0 bottom-0 flex items-center gap-3 px-6 pb-6">
              <UIcon
                name="i-lucide-camera"
                class="size-5 shrink-0 text-paper/80"
              />

              <span class="min-w-0">
                <span class="block text-sm font-semibold italic leading-snug text-paper">
                  {{ founder.name }}
                </span>

                <span class="mt-0.5 block text-xs italic text-paper/75">
                  {{ founder.role }} {{ COMPANY.legalName }}
                </span>
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  </section>
</template>
