<script setup lang="ts">
/**
 * Tim & Manajemen (homepage) — spec §4.5. The "Meet Our Experts" showcase only: the info
 * card is the leftmost panel of a single band that also carries the interactive photo
 * accordion — one unit, no seam between them. Hovering/focusing a panel expands it in
 * colour while the rest shrink and dim; names stay hidden until a panel is active
 * (hover/focus). Below lg the band stacks: the navy info card over a static grayscale
 * portrait grid, hairline gaps, no accordion hover (mobile-first, DESIGN.md §3). Five
 * leaders in a phone-width 3-up grid leave a gap on the second row, so the trailing pair
 * is centred on a 6-column track instead of hanging left; tablets get all five in one row.
 *
 * The accordion starts at lg, not md: at 768px the five strips are ~90px wide against a
 * 420px band, which reads as slivers rather than portraits (request 2026-08-04).
 *
 * The band is full-bleed at every breakpoint and deliberately breaks the max-w-6xl column
 * every other homepage section sits in (request 2026-08-04) — capped at 1152px it left
 * ~40% of a 1920px screen as empty gutter. The info panel widens with the viewport so it
 * keeps its share of the band rather than shrinking to a sliver.
 *
 * The full roster lives on `/tim`, not here — the same summary/detail split `/layanan` and
 * `/legalitas` use. The CTA is the way in.
 *
 * Photos come from `TEAM_LEADERS` in `app/utils/team.ts` — real cut-out portraits for all
 * of them. The name rendered is the data, never the file.
 */
const activeId = ref<string | null>(null)

function setActive(id: string | null) {
  activeId.value = id
}
</script>

<template>
  <section
    id="tim"
    v-reveal
    class="bg-kbs-50 py-16 md:py-24"
  >
    <!-- One band on desktop (lg+): info card as the leftmost panel + the photo accordion,
         no seam. Below lg it stacks: the navy info card edge to edge, then the photos as a
         static grid — no accordion. -->
    <div
      class="flex flex-col overflow-hidden shadow-sm lg:h-[440px] lg:flex-row xl:h-[480px]"
      @mouseleave="setActive(null)"
    >
      <!-- Info panel — a clamped share of the viewport (~26%) rather than a fixed width, so
           the photo panels keep a portrait crop from lg all the way up to ultrawide. -->
      <aside class="relative isolate flex w-full shrink-0 flex-col justify-center bg-gradient-to-br from-kbs-600 to-kbs-900 px-8 py-8 md:px-10 lg:w-[clamp(20rem,26vw,28rem)] lg:px-12">
        <!-- Diagonal facet, same brand cue as the Legalitas tiles. -->
        <span
          aria-hidden="true"
          class="absolute inset-0 -z-10 bg-paper/8 [clip-path:polygon(0_62%,100%_18%,100%_100%,0_100%)]"
        />

        <p class="text-xs font-semibold uppercase tracking-widest text-gold-400">
          Tim &amp; Manajemen
        </p>

        <h2 class="mt-3 text-2xl font-bold leading-snug tracking-tight text-paper md:text-3xl">
          Meet Our Experts
        </h2>

        <p class="mt-4 max-w-md text-sm leading-relaxed text-paper/80">
          Jajaran konsultan pajak berizin dengan kombinasi pendidikan, sertifikasi
          profesi, dan pengalaman praktik di bidang perpajakan serta pengelolaan
          bisnis.
        </p>

        <UButton
          :to="TEAM_PATH"
          size="lg"
          label="Get to Know Our Experts"
          class="mt-6 self-start justify-center bg-gold-400 font-semibold text-kbs-950 hover:bg-gold-300 lg:self-auto"
        />
      </aside>

      <!-- Desktop (lg+): interactive accordion. Names stay hidden until hovered/focused. -->
      <div class="hidden flex-1 bg-kbs-900 lg:flex">
        <button
          v-for="leader in TEAM_LEADERS"
          :key="leader.id"
          type="button"
          class="relative block h-full overflow-hidden text-left transition-all duration-500 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
          :class="activeId === null
            ? 'flex-1 grayscale'
            : (activeId === leader.id ? 'flex-[2] grayscale-0' : 'flex-[0.7] opacity-70')"
          @mouseenter="setActive(leader.id)"
          @focus="setActive(leader.id)"
          @blur="setActive(null)"
        >
          <img
            :src="leader.photo"
            :alt="`Foto ${leader.name}`"
            loading="lazy"
            decoding="async"
            class="absolute inset-0 size-full object-cover object-top"
          >

          <!-- Caption bar: fades in only on the active panel. -->
          <span
            class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-kbs-950/90 to-transparent px-4 pb-4 pt-12 transition-opacity duration-500"
            :class="activeId === leader.id ? 'opacity-100' : 'opacity-0'"
          >
            <span class="block text-sm font-bold leading-snug text-paper">
              {{ leader.name }}
            </span>
            <span class="block text-xs text-paper/70">
              {{ leader.role }}
            </span>
            <span class="mt-1 block text-xs font-medium text-gold-400">
              {{ leader.credential }}
            </span>
          </span>
        </button>
      </div>

      <!-- Below lg: a static portrait grid, no accordion interaction — five strips squeezed
           into a tablet-width band are too narrow to read as portraits (request 2026-08-04).
           Phones get 3 per row on a 6-column track, with the 4th tile starting at column 2
           so the trailing pair sits centred; tablets widen to a 10-column track so all five
           fit one row and the centring offset is dropped. -->
      <div class="grid grid-cols-6 gap-px bg-kbs-100 md:grid-cols-10 lg:hidden">
        <div
          v-for="leader in TEAM_LEADERS"
          :key="leader.id"
          class="relative col-span-2 aspect-[4/5] overflow-hidden bg-kbs-100 [&:nth-child(4)]:col-start-2 md:[&:nth-child(4)]:col-start-auto"
        >
          <img
            :src="leader.photo"
            :alt="`Foto ${leader.name}`"
            loading="lazy"
            decoding="async"
            class="absolute inset-0 size-full object-cover object-top grayscale"
          >
        </div>
      </div>
    </div>
  </section>
</template>
