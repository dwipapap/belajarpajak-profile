<script setup lang="ts">
/**
 * Visi & Misi — spec §4.3. Verbatim from page 4 of the deck; the transcript at
 * planning/company-profile.md carries the same wording, verified against the PDF
 * before this component was written.
 *
 * The deck titles the page "Visi dan Misi"; the site uses the spec's "Visi & Misi"
 * for the heading. Only the visi and misi statements themselves are quoted copy —
 * a heading is ours to set.
 *
 * Layout follows the reference the client picked: white cards on the tinted section
 * background, a narrow Visi card beside a wider list card whose items hang off a dashed
 * vertical connector. The reference carries three blocks (Visi / Misi / Nilai-nilai);
 * the deck has no company values, so this is two — Visi left, Misi right. A values block
 * would slot in as a third card if the client ever supplies one; nothing is invented to
 * fill the space.
 *
 * The misi points are long and uneven, which is why they run down one wide column rather
 * than across three narrow ones. The connector is static: it marks sequence, it does not
 * animate (CLAUDE.md — the logo marquee is the site's only running motion).
 */
const VISI = 'Menjadi Mitra Terbaik Wajib Pajak dan Direktorat Jenderal Pajak.'

const MISI = [
  'Memberikan layanan konsultasi yang profesional dan berintegritas, dengan menjunjung '
  + 'tinggi etika profesi serta kepatuhan terhadap peraturan perpajakan yang berlaku.',

  'Melayani kebutuhan klien dengan penuh dedikasi dan tanggung jawab, dengan '
  + 'mengutamakan kualitas, ketepatan, dan transparansi dalam setiap proses kerja.',

  'Menjalin hubungan kemitraan yang harmonis dengan Wajib Pajak maupun Direktorat '
  + 'Jenderal Pajak, guna menciptakan sinergi yang mendukung sistem perpajakan yang '
  + 'sehat dan berkeadilan.'
]
</script>

<template>
  <section
    id="visi-misi"
    v-reveal
    class="bg-kbs-50"
  >
    <div class="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <h2 class="text-3xl font-bold tracking-tight text-ink md:text-4xl">
        Visi &amp; Misi
      </h2>

      <div class="mt-4 h-1 w-16 rounded-full bg-gold-400" />

      <div class="mt-10 grid gap-6 lg:grid-cols-5">
        <div class="rounded-xl border border-kbs-100 bg-paper p-6 shadow-sm sm:p-8 lg:col-span-2">
          <h3 class="text-xl font-bold text-ink">
            Visi
          </h3>

          <div class="mt-3 h-1 w-10 rounded-full bg-gold-400" />

          <p class="mt-6 text-lg leading-relaxed text-ink/80">
            {{ VISI }}
          </p>
        </div>

        <div class="rounded-xl border border-kbs-100 bg-paper p-6 shadow-sm sm:p-8 lg:col-span-3">
          <h3 class="text-xl font-bold text-ink">
            Misi
          </h3>

          <div class="mt-3 h-1 w-10 rounded-full bg-gold-400" />

          <ol class="mt-8 space-y-8">
            <li
              v-for="misi in MISI"
              :key="misi"
              class="relative border-l border-dashed border-kbs-200 pb-1 pl-8 last:border-transparent"
            >
              <!-- Ring sits on the connector, so it is offset by half its own width. -->
              <span
                aria-hidden="true"
                class="absolute -left-[7px] top-1.5 size-3.5 rounded-full border-2 border-kbs-600 bg-paper"
              />

              <p class="leading-relaxed text-ink/80">
                {{ misi }}
              </p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>
