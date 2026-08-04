<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'

/**
 * Layanan — spec §3/§4.4. The full catalog the homepage cards deep-link into: every
 * group with the deck's own bullets or paragraph, one anchor per group.
 *
 * Content comes from `SERVICES`; this file only lays it out. The site-wide meta lives
 * in `app.vue` — the per-page pass is Phase 2, but a standalone route needs its own
 * title now or it inherits the homepage's.
 */
const title = `Layanan — ${COMPANY.legalName}`
const description = 'Delapan kelompok layanan perpajakan dan akuntansi: kepatuhan e-SPT Masa '
  + 'dan Tahunan, konsultasi, analisa, pendampingan pemeriksaan hingga banding, perencanaan, '
  + 'administrasi, pelatihan pajak, dan accounting.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})

const breadcrumb: BreadcrumbItem[] = [
  { label: 'Beranda', to: '/' },
  { label: 'Layanan', to: SERVICES_PATH }
]

/** The deck labels only the Pendampingan sub-services; unlabelled lists set two columns. */
function hasLabels(points: readonly ServicePoint[]) {
  return points.some(point => point.label)
}
</script>

<template>
  <div>
    <!-- Page header. Dark band so the route reads as its own page under the light nav. -->
    <section class="bg-kbs-900">
      <div class="mx-auto max-w-6xl px-4 pt-36 pb-14 sm:px-6 md:pt-44 md:pb-20 lg:px-8">
        <UBreadcrumb
          :items="breadcrumb"
          :ui="{
            link: 'text-kbs-200 hover:text-paper',
            separatorIcon: 'text-kbs-400'
          }"
        />

        <h1 class="mt-6 text-3xl font-bold tracking-tight text-paper md:text-5xl">
          Layanan
        </h1>

        <div class="mt-5 h-1 w-16 rounded-full bg-gold-400" />

        <p class="mt-6 max-w-2xl leading-relaxed text-kbs-100 sm:text-lg">
          {{ COMPANY.legalName }} melayani kebutuhan perpajakan klien perorangan maupun
          badan — mulai dari kepatuhan pelaporan rutin, konsultasi dan perencanaan, hingga
          pendampingan pemeriksaan, keberatan, dan banding.
        </p>

        <UButton
          :to="whatsappLink()"
          target="_blank"
          rel="noopener"
          size="lg"
          icon="i-simple-icons-whatsapp"
          label="Konsultasi sekarang"
          class="mt-8"
        />
      </div>
    </section>

    <!-- Jump links: eight anchors is a long scroll on a phone. -->
    <nav
      aria-label="Daftar layanan"
      class="border-b border-kbs-100 bg-kbs-50"
    >
      <div class="mx-auto flex max-w-6xl flex-wrap gap-2 px-4 py-5 sm:px-6 lg:px-8">
        <NuxtLink
          v-for="service in SERVICES"
          :key="service.slug"
          :to="servicePath(service.slug)"
          class="rounded-full border border-kbs-200 bg-paper px-3 py-1.5 text-sm text-ink/75 transition-colors hover:border-kbs-400 hover:text-kbs-600"
        >
          {{ service.title }}
        </NuxtLink>
      </div>
    </nav>

    <section
      v-for="(service, index) in SERVICES"
      :id="service.slug"
      :key="service.slug"
      v-reveal
      :class="index % 2 === 0 ? 'bg-paper' : 'bg-kbs-50'"
    >
      <div class="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div class="grid gap-8 lg:grid-cols-3 lg:gap-14">
          <div>
            <div class="flex items-center gap-4">
              <div class="flex size-12 shrink-0 items-center justify-center rounded-lg bg-kbs-600">
                <UIcon
                  :name="service.icon"
                  class="size-6 text-paper"
                />
              </div>

              <span class="text-sm font-semibold tracking-wide text-kbs-400">
                {{ String(index + 1).padStart(2, '0') }}
              </span>
            </div>

            <h2 class="mt-5 text-2xl font-bold tracking-tight text-ink md:text-3xl">
              {{ service.title }}
            </h2>

            <p class="mt-3 leading-relaxed text-ink/60">
              {{ service.summary }}
            </p>
          </div>

          <div class="lg:col-span-2">
            <p
              v-if="service.body"
              class="leading-relaxed text-ink/80 sm:text-lg"
            >
              {{ service.body }}
            </p>

            <ul
              v-else-if="service.points"
              :class="hasLabels(service.points) ? 'space-y-5' : 'grid gap-3 sm:grid-cols-2'"
            >
              <li
                v-for="point in service.points"
                :key="point.text"
                class="flex gap-3"
              >
                <UIcon
                  name="i-lucide-check"
                  class="mt-1 size-4 shrink-0 text-kbs-600"
                />

                <span class="leading-relaxed text-ink/80">
                  <strong
                    v-if="point.label"
                    class="font-semibold text-ink"
                  >{{ point.label }} — </strong>{{ point.text }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-kbs-900">
      <div class="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <h2 class="text-2xl font-bold tracking-tight text-paper md:text-3xl">
          Belum yakin layanan mana yang Anda butuhkan?
        </h2>

        <p class="mt-4 max-w-2xl leading-relaxed text-kbs-100">
          Sampaikan kondisi perpajakan Anda kepada {{ PRIMARY_WHATSAPP.name }}, dan kami
          bantu petakan langkah yang tepat.
        </p>

        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <UButton
            :to="whatsappLink()"
            target="_blank"
            rel="noopener"
            size="lg"
            icon="i-simple-icons-whatsapp"
            label="Chat via WhatsApp"
          />

          <!-- Neutral outline assumes a light surface; this band is kbs-900. -->
          <UButton
            to="/#kontak"
            size="lg"
            color="neutral"
            variant="outline"
            trailing-icon="i-lucide-arrow-right"
            label="Kontak & lokasi kantor"
            :ui="{ base: 'bg-transparent text-kbs-100 ring-kbs-400 hover:bg-kbs-800 hover:text-paper' }"
          />
        </div>
      </div>
    </section>
  </div>
</template>
