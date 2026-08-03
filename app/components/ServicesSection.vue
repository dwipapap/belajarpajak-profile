<script setup lang="ts">
/**
 * Layanan (homepage) — spec §4.4. Eight summary cards; the full bullet detail lives on
 * `/layanan`, which every card links into. Copy comes from `SERVICES`, never from
 * this file.
 *
 * Layout follows the reference the client picked: flat cells with no card chrome —
 * icon, title, blurb, then a button — and a filled brand card in the last slot. The
 * reference runs four columns because it carries seven services; eight plus the CTA
 * makes nine cells, so three columns is what tiles cleanly here.
 *
 * The cards are not link surfaces: the button is the only anchor, which keeps the CTA
 * cell (a link in its own right) from nesting interactive elements.
 */
</script>

<template>
  <section
    id="layanan"
    v-reveal
    class="bg-paper"
  >
    <div class="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <h2 class="text-3xl font-bold tracking-tight text-ink md:text-4xl">
        Layanan Kami
      </h2>

      <div class="mt-4 h-1 w-16 rounded-full bg-gold-400" />

      <p class="mt-6 max-w-2xl leading-relaxed text-ink/70">
        Delapan kelompok layanan perpajakan dan akuntansi untuk klien perorangan maupun
        badan — dari kepatuhan rutin hingga pendampingan pemeriksaan dan banding.
      </p>

      <div class="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        <UPageCard
          v-for="service in SERVICES"
          :key="service.slug"
          :icon="service.icon"
          :title="service.title"
          :description="service.summary"
          variant="naked"
          :ui="{
            container: 'gap-y-0',
            leading: 'mb-5',
            leadingIcon: 'size-10 text-kbs-600',
            title: 'text-lg font-bold text-ink',
            description: 'mt-3 leading-relaxed text-ink/70',
            footer: 'pt-6 mt-auto'
          }"
        >
          <template #footer>
            <UButton
              :to="servicePath(service.slug)"
              size="sm"
              label="Selengkapnya"
              trailing-icon="i-lucide-arrow-right"
            />
          </template>
        </UPageCard>

        <!-- Conversion cell. The badge overhangs the top edge only — a horizontal
             overhang would push past the section padding on a 375px screen.
             Eight services tile evenly at two columns, so the CTA would sit alone in a
             half-width row there; it spans instead. -->
        <div class="relative mt-5 sm:col-span-2 sm:mt-0 lg:col-span-1">
          <span
            class="absolute -top-5 left-6 z-10 flex size-12 items-center justify-center rounded-full bg-kbs-600 ring-4 ring-paper"
          >
            <UIcon
              name="i-simple-icons-whatsapp"
              class="size-6 text-paper"
            />
          </span>

          <a
            :href="whatsappLink()"
            target="_blank"
            rel="noopener"
            class="flex h-full flex-col justify-end rounded-xl bg-gradient-to-br from-kbs-600 to-kbs-900 px-6 pb-6 pt-14 transition-shadow hover:shadow-lg"
          >
            <h3 class="text-xl font-bold text-paper">
              Konsultasi Perpajakan
            </h3>

            <p class="mt-3 text-sm leading-relaxed text-kbs-100">
              Sampaikan kebutuhan pajak Anda kepada {{ PRIMARY_WHATSAPP.name }} — kami
              bantu petakan layanan yang tepat untuk Anda.
            </p>

            <span class="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold-400">
              Chat via WhatsApp
              <UIcon
                name="i-lucide-arrow-right"
                class="size-4"
              />
            </span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
