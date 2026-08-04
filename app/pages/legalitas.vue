<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'

/**
 * Legalitas — spec §4.6. The full record the homepage key points link into: every
 * registration with its issuer and everything printed on it, then the profession
 * certifications.
 *
 * Content comes from `LEGAL_DOCUMENTS` / `CERTIFIED_PEOPLE`; this file only lays it out.
 * Structure mirrors `/layanan` so the two detail routes read as one site. The site-wide
 * meta lives in `app.vue` — the per-page pass is Phase 2, but a standalone route needs
 * its own title now or it inherits the homepage's.
 *
 * No jump-link strip here: four documents is a short scroll, unlike the eight services.
 */
const title = `Legalitas — ${COMPANY.legalName}`
const description = `Dokumen legalitas ${COMPANY.legalName}: Izin Praktik Konsultan Pajak `
  + 'Tingkat B, sertifikat pendaftaran perseroan, NIB, dan NPWP, beserta sertifikasi '
  + 'profesi jajaran kami.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})

const breadcrumb: BreadcrumbItem[] = [
  { label: 'Beranda', to: '/' },
  { label: 'Legalitas', to: LEGALITY_PATH }
]
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
          Legalitas
        </h1>

        <div class="mt-5 h-1 w-16 rounded-full bg-gold-400" />

        <p class="mt-6 max-w-2xl leading-relaxed text-kbs-100 sm:text-lg">
          {{ COMPANY.legalName }} berpraktik di bawah izin dan badan hukum yang terdaftar
          resmi. Berikut dokumen legalitas perusahaan beserta sertifikasi profesi yang
          dimiliki jajaran kami.
        </p>
      </div>
    </section>

    <section
      v-for="(document, index) in LEGAL_DOCUMENTS"
      :id="document.id"
      :key="document.id"
      v-reveal
      :class="index % 2 === 0 ? 'bg-paper' : 'bg-kbs-50'"
    >
      <div class="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div class="grid gap-8 lg:grid-cols-3 lg:gap-14">
          <div>
            <div class="flex items-center gap-4">
              <div class="flex size-12 shrink-0 items-center justify-center rounded-lg bg-kbs-600">
                <UIcon
                  :name="document.icon"
                  class="size-6 text-paper"
                />
              </div>

              <span class="text-sm font-semibold tracking-wide text-kbs-400">
                {{ String(index + 1).padStart(2, '0') }}
              </span>
            </div>

            <h2 class="mt-5 text-2xl font-bold tracking-tight text-ink md:text-3xl">
              {{ document.title }}
            </h2>

            <p class="mt-3 leading-relaxed text-ink/60">
              {{ document.issuer }}
            </p>
          </div>

          <div class="lg:col-span-2">
            <p
              v-if="document.number"
              class="text-2xl font-bold tracking-wide text-kbs-600 tabular-nums"
            >
              {{ document.number }}
            </p>

            <dl :class="document.number ? 'mt-6 space-y-4' : 'space-y-4'">
              <div
                v-for="detail in document.details"
                :key="detail.label"
                class="sm:flex sm:gap-6"
              >
                <dt class="shrink-0 text-sm text-ink/55 sm:w-48 sm:pt-0.5">
                  {{ detail.label }}
                </dt>

                <dd class="mt-1 leading-relaxed text-ink/80 tabular-nums sm:mt-0">
                  {{ detail.value }}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>

    <section
      id="sertifikasi"
      v-reveal
      class="bg-paper"
    >
      <div class="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <h2 class="text-2xl font-bold tracking-tight text-ink md:text-3xl">
          Sertifikasi Profesi
        </h2>

        <div class="mt-4 h-1 w-16 rounded-full bg-gold-400" />

        <div class="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="person in CERTIFIED_PEOPLE"
            :key="person.name"
          >
            <p class="font-semibold leading-snug text-ink">
              {{ person.name }}
            </p>

            <p class="mt-1 text-sm text-kbs-600">
              {{ person.role }}
            </p>

            <ul class="mt-5 space-y-3">
              <li
                v-for="certification in person.certifications"
                :key="certification"
                class="flex gap-3"
              >
                <UIcon
                  name="i-lucide-check"
                  class="mt-1 size-4 shrink-0 text-kbs-600"
                />

                <span class="leading-relaxed text-ink/80">
                  {{ certification }}
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
          Ada dokumen yang perlu Anda verifikasi?
        </h2>

        <p class="mt-4 max-w-2xl leading-relaxed text-kbs-100">
          Sampaikan kebutuhan Anda kepada {{ PRIMARY_WHATSAPP.name }}, dan kami bantu
          siapkan salinan dokumen yang diperlukan.
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
