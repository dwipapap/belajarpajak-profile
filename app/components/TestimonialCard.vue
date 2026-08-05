<script setup lang="ts">
/**
 * One testimonial. Rendered six times by `TestimonialSection`, where the cards stack on top
 * of each other as the page scrolls.
 *
 * Three constraints come from that stack and shape everything here:
 *
 *  - **The surface must be opaque.** Never a translucent tint — a stacked card that lets the
 *    one underneath show through reads as a rendering bug.
 *  - **Consecutive cards must not share a surface.** Six paper cards on a paper section gave
 *    the stack no edge to read against; `inverted` alternates them paper / brand blue so
 *    every seam in the pile is a colour change. The section keeps the page's own paper
 *    background — the contrast belongs on the cards, not behind them.
 *  - **Every card is the same height.** `min-h-*` sets the floor and the two one-sentence
 *    quotes (Pekanbaru Musik, SMK Muhammadiyah) simply leave more air; `justify-between`
 *    pins their attribution to the bottom edge so the footer line lands in the same place on
 *    all six. Sizing the cards to their content instead would make the stack step unevenly.
 *
 * `kbs-600` is the sampled deck blue (DESIGN.md §1) and carries `paper` text at ~9:1, so the
 * inverted card needs no compromise on the quote's legibility. Gold stays an accent on both:
 * it is unreadable as text on paper, but the quote glyph is decoration, not copy.
 *
 * The logos are the Unit 6 files, reused as-is — `object-contain` in a fixed box, and the ink
 * tile for `dark` for the same reason as `ClientLogo`. The tile keeps its own light surface
 * on an inverted card: these logos were cut out of the deck on white, and dropping one
 * straight onto blue would show the seam this whole flag exists to hide. Whether a logo sits
 * on solid black is already a fact of `CLIENTS` (see `dark` in `app/utils/clients.ts`), so it
 * is derived here by logo path rather than re-stored on the testimonial. SMK Muhammadiyah has
 * no logo in the deck, so it falls back to an icon rather than an empty gap.
 */
const props = defineProps<{
  testimonial: Testimonial
  /** Render on the brand blue instead of paper. `TestimonialSection` alternates it. */
  inverted?: boolean
}>()

/**
 * Which logos sit on solid black is decided once, in `CLIENTS`. Deriving it here by logo path
 * keeps one source of truth — a second `dark` flag on the testimonial would need a test to
 * stay in sync with `clients.ts`, which is exactly the duplication this avoids.
 */
const isDark = computed(() => {
  if (!props.testimonial.logo) return false
  return CLIENTS.find(client => client.logo === props.testimonial.logo)?.dark ?? false
})
</script>

<template>
  <figure
    class="flex min-h-[24rem] flex-col justify-between rounded-3xl p-6 shadow-lg sm:p-8 md:min-h-[26rem]"
    :class="inverted
      ? 'bg-kbs-600 shadow-kbs-950/20'
      : 'bg-paper shadow-kbs-950/10 ring-1 ring-kbs-100'"
  >
    <div>
      <UIcon
        name="i-lucide-quote"
        class="size-8 text-gold-400"
        aria-hidden="true"
      />

      <blockquote
        class="mt-5 leading-relaxed sm:text-lg"
        :class="inverted ? 'text-paper/90' : 'text-ink/80'"
      >
        {{ testimonial.quote }}
      </blockquote>
    </div>

    <figcaption
      class="mt-8 flex items-center gap-4 border-t pt-6"
      :class="inverted ? 'border-paper/20' : 'border-kbs-100'"
    >
      <div
        v-if="testimonial.logo"
        class="flex h-12 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg px-2 ring-1 ring-ink/5"
        :class="isDark ? 'bg-ink' : 'bg-paper'"
      >
        <img
          :src="testimonial.logo"
          :alt="`Logo ${testimonial.company}`"
          loading="lazy"
          decoding="async"
          class="max-h-full max-w-full object-contain"
        >
      </div>

      <div
        v-else
        class="flex size-12 shrink-0 items-center justify-center rounded-full"
        :class="inverted ? 'bg-paper/15' : 'bg-kbs-50'"
      >
        <UIcon
          name="i-lucide-graduation-cap"
          class="size-6"
          :class="inverted ? 'text-paper' : 'text-kbs-600'"
          aria-hidden="true"
        />
      </div>

      <div class="min-w-0">
        <p
          class="font-semibold"
          :class="inverted ? 'text-paper' : 'text-ink'"
        >
          {{ testimonial.person ?? testimonial.company }}
        </p>
        <p
          v-if="testimonial.role"
          class="text-sm"
          :class="inverted ? 'text-kbs-200' : 'text-ink/60'"
        >
          {{ testimonial.role }}
        </p>
        <p
          v-if="testimonial.person"
          class="text-sm"
          :class="inverted ? 'text-kbs-200' : 'text-ink/60'"
        >
          {{ testimonial.company }}
        </p>
      </div>
    </figcaption>
  </figure>
</template>
