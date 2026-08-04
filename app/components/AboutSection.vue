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
 * Cropped from the founder portrait on page 3 of the PDF. The usable face region is
 * only ~240px square in the source, so 320 is a mild upscale — do not render it
 * larger than the 160px box below. A high-res original is still worth requesting
 * for Unit 5 (Tim).
 */
const founder = {
  name: 'Dr. Sudarno, S.Pd., M.M., BKP',
  role: `Founder ${COMPANY.legalName}`,
  photo: '/team/founder-sudarno.webp'
}
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
          <figure class="overflow-hidden rounded-xl border border-kbs-100 bg-kbs-50 shadow-sm">
            <div class="h-3 bg-kbs-600" />

            <div class="px-6 py-8 text-center">
              <img
                :src="founder.photo"
                :alt="`Foto ${founder.name}`"
                width="800"
                height="1000"
                loading="lazy"
                decoding="async"
                class="mx-auto size-40 rounded-full bg-kbs-100 object-cover object-top ring-4 ring-paper"
              >

              <div class="mt-5">
                <p class="text-lg font-semibold text-kbs-600">
                  {{ founder.name }}
                </p>

                <p class="mt-1 text-sm text-ink/60">
                  {{ founder.role }}
                </p>
              </div>
            </div>
          </figure>
        </div>
      </div>
    </div>
  </section>
</template>
