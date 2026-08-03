<script setup lang="ts">
/**
 * Tim & Manajemen (homepage) — spec §4.5. The "Meet Our Experts" showcase only: the info
 * card is the leftmost panel of a single band (md+) that also carries the interactive photo
 * accordion — one rounded unit, no seam between them. Hovering/focusing a panel expands it
 * in colour while the rest shrink and dim; names stay hidden until a panel is active
 * (hover/focus). Below md the band goes full-bleed and stacks: the navy info card edge to
 * edge over a static grayscale portrait grid, hairline gaps, no accordion hover
 * (mobile-first, DESIGN.md §3). Five leaders in a 3-up grid leave a gap on the second row,
 * so the trailing pair is centred on a 6-column track instead of hanging left.
 *
 * The full roster lives on `/tim`, not here — the same summary/detail split `/layanan` and
 * `/legalitas` use. The CTA is the way in.
 *
 * Photos come from `TEAM_LEADERS` in `app/utils/team.ts`; only the founder's is real, the
 * rest are placeholders until high-res originals arrive (CLAUDE.md asset gap). The name
 * rendered is the data, never the placeholder file.
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
    class="bg-kbs-50"
  >
    <div class="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <!-- One band on desktop (md+): info card as the leftmost panel + the photo
           accordion, no seam. On mobile it breaks out of the page gutter and stacks: the
           navy info card edge to edge, then the photos as a static grid — no accordion. -->
      <div
        class="-mx-4 flex flex-col overflow-hidden shadow-sm sm:-mx-6 md:mx-0 md:h-[400px] md:flex-row md:rounded-2xl"
        @mouseleave="setActive(null)"
      >
        <!-- Info panel — fixed width on desktop, full width on mobile. -->
        <aside class="relative isolate flex w-full shrink-0 flex-col justify-center bg-gradient-to-br from-kbs-600 to-kbs-900 px-8 py-8 md:w-80 md:px-9">
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
            class="mt-6 self-start justify-center bg-gold-400 font-semibold text-kbs-950 hover:bg-gold-300 md:self-auto"
          />
        </aside>

        <!-- Desktop (md+): interactive accordion. Names stay hidden until hovered/focused. -->
        <div class="hidden flex-1 bg-kbs-900 md:flex">
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
              class="absolute inset-0 size-full object-cover"
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

        <!-- Mobile (< md): a static portrait grid, no accordion interaction. Each tile
             spans 2 of 6 columns (3 per row); the 4th tile starts at column 2 so the
             trailing pair sits centred under the first row. -->
        <div class="grid grid-cols-6 gap-px bg-kbs-100 md:hidden">
          <div
            v-for="leader in TEAM_LEADERS"
            :key="leader.id"
            class="relative col-span-2 aspect-[4/5] overflow-hidden bg-kbs-100 [&:nth-child(4)]:col-start-2"
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
    </div>
  </section>
</template>
