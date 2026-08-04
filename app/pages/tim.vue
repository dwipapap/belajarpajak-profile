<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'

/**
 * Tim — spec §3/§4.5. The full roster the homepage showcase links into: all three groups
 * as portrait grids, then the deck's complete credentials for the leadership tier.
 *
 * Content comes from `TEAM_SECTIONS` / `TEAM_LEADERS`; this file only lays it out.
 * Structure mirrors `/layanan` and `/legalitas` so the three detail routes read as one
 * site. The site-wide meta lives in `app.vue` — the per-page pass is Phase 2, but a
 * standalone route needs its own title now or it inherits the homepage's.
 */
const title = `Tim & Manajemen — ${COMPANY.legalName}`
const description = 'Jajaran pimpinan, manajemen, dan tim PT. Konsultan Bisnis Sudarno '
  + 'beserta pendidikan, sertifikasi profesi, dan keahlian yang dimiliki.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})

const breadcrumb: BreadcrumbItem[] = [
  { label: 'Beranda', to: '/' },
  { label: 'Tim', to: TEAM_PATH }
]

type TeamCell
  = { kind: 'member', member: TeamMember }
    | { kind: 'label' }

/**
 * Places the brand label card in the cell right after the first three members — or right
 * after the last one when a group is shorter than that. Every group here has at least
 * three, so on a 4-column grid the card always closes the first row.
 */
function cells(section: TeamSection): TeamCell[] {
  const list: TeamCell[] = section.members.map(member => ({ kind: 'member', member }))
  list.splice(Math.min(section.members.length, 3), 0, { kind: 'label' })
  return list
}

/**
 * Staggers the `v-reveal` entrance across a row so a grid cascades left to right instead of
 * snapping in as one block. Keyed on the position within the row (4 columns at `md`), not
 * the position in the group, or the last card of a long group would lag a full second.
 * `.reveal` already carries the transition — this only offsets it.
 */
function revealDelay(cellIndex: number) {
  return { transitionDelay: `${(cellIndex % 4) * 70}ms` }
}

/** The dossier renders whichever of the deck's four credential lists a leader has. */
function dossier(leader: TeamLeader) {
  return [
    { heading: 'Pendidikan', items: leader.education },
    { heading: 'Sertifikasi', items: leader.certifications },
    { heading: 'Keahlian', items: leader.expertise },
    { heading: 'Pengalaman Profesional', items: leader.experience }
  ].filter(block => block.items?.length)
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

        <!-- Heading left, group jump-links right — one row from md up, stacked below. -->
        <div class="mt-6 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 class="text-3xl font-bold tracking-tight text-paper md:text-5xl">
              Meet Our Experts
            </h1>

            <div class="mt-5 h-1 w-16 rounded-full bg-gold-400" />

            <p class="mt-6 max-w-2xl leading-relaxed text-kbs-100 sm:text-lg">
              Konsultan pajak berizin dengan kombinasi pendidikan, sertifikasi profesi, dan
              pengalaman praktik di bidang perpajakan serta pengelolaan bisnis.
            </p>
          </div>

          <nav
            aria-label="Kelompok tim"
            class="flex flex-wrap gap-2"
          >
            <NuxtLink
              v-for="section in TEAM_SECTIONS"
              :key="section.id"
              :to="{ hash: `#${section.id}` }"
              class="rounded-full border border-kbs-400/60 px-3 py-1.5 text-sm text-kbs-100 transition-colors duration-300 hover:border-gold-400 hover:text-gold-400 motion-safe:transition-[color,border-color,transform] motion-safe:hover:-translate-y-0.5"
            >
              {{ section.heading }}
            </NuxtLink>
          </nav>
        </div>
      </div>
    </section>

    <!-- One grid per group, separated by a dotted rule. -->
    <section class="bg-paper">
      <div class="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div
          v-for="(section, index) in TEAM_SECTIONS"
          :id="section.id"
          :key="section.id"
          :class="index > 0 ? 'mt-14 md:mt-20' : ''"
        >
          <!-- The label card carries the visible heading; this keeps the outline intact. -->
          <h2 class="sr-only">
            {{ section.heading }}
          </h2>

          <!-- Rule + centre dot, as the reference separates its groups. -->
          <div
            v-if="index > 0"
            v-reveal
            aria-hidden="true"
            class="relative mb-14 h-px bg-kbs-200 md:mb-20"
          >
            <span class="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-kbs-300" />
          </div>

          <div class="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-6">
            <template
              v-for="(cell, cellIndex) in cells(section)"
              :key="cell.kind === 'member' ? cell.member.name : 'label'"
            >
              <!-- Below md the grid is two columns, so the label card has no 4th cell to
                   sit in: it becomes a full-width banner above its group instead. -->
              <TeamGroupCard
                v-if="cell.kind === 'label'"
                v-reveal
                :eyebrow="section.eyebrow"
                :label="section.label"
                :style="revealDelay(cellIndex)"
                class="order-first col-span-2 md:order-none md:col-span-1"
              />

              <TeamCard
                v-else
                v-reveal
                :name="cell.member.name"
                :title="cell.member.title"
                :photo="cell.member.photo"
                :style="revealDelay(cellIndex)"
              />
            </template>
          </div>
        </div>
      </div>
    </section>

    <!-- The reason this route exists: the deck's full credentials, which the homepage
         showcase compresses to a single caption line. -->
    <section
      id="kredensial"
      v-reveal
      class="bg-kbs-50"
    >
      <div class="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <h2 class="text-2xl font-bold tracking-tight text-ink md:text-3xl">
          Kredensial Pimpinan
        </h2>

        <div class="mt-5 h-1 w-16 rounded-full bg-gold-400" />

        <div class="mt-10 grid gap-6">
          <article
            v-for="leader in TEAM_LEADERS"
            :key="leader.id"
            v-reveal
            class="rounded-xl border border-kbs-100 bg-paper p-6 transition-colors duration-300 hover:border-kbs-300 md:p-8"
          >
            <p class="text-xs font-semibold uppercase tracking-widest text-kbs-600">
              {{ leader.role }}
            </p>

            <h3 class="mt-2 text-lg font-bold leading-snug text-ink md:text-xl">
              {{ leader.name }}
            </h3>

            <div class="mt-6 grid gap-6 sm:grid-cols-2">
              <div
                v-for="block in dossier(leader)"
                :key="block.heading"
              >
                <p class="text-sm font-semibold text-ink">
                  {{ block.heading }}
                </p>

                <ul class="mt-2 grid gap-1.5">
                  <li
                    v-for="item in block.items"
                    :key="item"
                    class="flex gap-2 text-sm leading-relaxed text-ink/70"
                  >
                    <span
                      aria-hidden="true"
                      class="mt-2 size-1.5 shrink-0 rounded-full bg-kbs-300"
                    />
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>
