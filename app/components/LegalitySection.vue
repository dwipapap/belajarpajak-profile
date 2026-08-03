<script setup lang="ts">
/**
 * Legalitas (homepage) — spec §4.6. Key points only: the four registrations with their
 * numbers. Issuers, dates, registered address and the profession certifications live on
 * `/legalitas`, which every tile links into. Copy comes from `LEGAL_DOCUMENTS`, never
 * from this file.
 *
 * Layout follows the reference the client picked: filled navy tiles, centred icon and
 * title over a diagonal facet. The facet is a clipped overlay rather than an image so it
 * costs nothing and scales to any tile height.
 *
 * The tiles are not links. Four "Selengkapnya" links all resolving to the same page is
 * four times the same decision; one button under the grid carries it instead, which also
 * lets the tiles keep their centred, poster-like balance.
 *
 * Numbers are set in `tabular-nums` and carried in gold: they are checked digit by digit
 * against a certificate, so they need to line up and to stand out from the title.
 */
</script>

<template>
  <section
    id="legalitas"
    v-reveal
    class="bg-paper"
  >
    <div class="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <h2 class="text-3xl font-bold tracking-tight text-ink md:text-4xl">
        Legalitas
      </h2>

      <div class="mt-4 h-1 w-16 rounded-full bg-gold-400" />

      <p class="mt-6 max-w-2xl leading-relaxed text-ink/70">
        {{ COMPANY.legalName }} berpraktik di bawah izin dan badan hukum yang terdaftar
        resmi.
      </p>

      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="document in LEGAL_DOCUMENTS"
          :key="document.id"
          class="relative isolate flex flex-col items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-kbs-600 to-kbs-900 px-6 py-10 text-center"
        >
          <!-- Diagonal facet: a light wedge across the lower half, as in the reference. -->
          <span
            aria-hidden="true"
            class="absolute inset-0 -z-10 bg-paper/8 [clip-path:polygon(0_62%,100%_18%,100%_100%,0_100%)]"
          />

          <UIcon
            :name="document.icon"
            class="size-12 text-paper"
          />

          <h3 class="mt-6 text-lg font-bold leading-snug text-paper">
            {{ document.title }}
          </h3>

          <!-- `break-words` so the AHU number, the one string with no break opportunity,
               cannot push past the tile on a narrow column. -->
          <p class="mt-3 break-words font-semibold tracking-wide text-gold-400 tabular-nums">
            {{ documentHeadline(document) }}
          </p>
        </div>
      </div>

      <p class="mt-10 max-w-2xl leading-relaxed text-ink/70">
        Rincian penerbit dan tanggal terbit setiap dokumen, beserta sertifikasi profesi
        yang dimiliki jajaran kami, tersedia di halaman legalitas.
      </p>

      <UButton
        :to="LEGALITY_PATH"
        size="lg"
        label="Lihat legalitas lengkap"
        trailing-icon="i-lucide-arrow-right"
        class="mt-6"
      />
    </div>
  </section>
</template>
