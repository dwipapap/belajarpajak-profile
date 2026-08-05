<script setup lang="ts">
/**
 * Testimoni (homepage) — spec §4.8. The six quotes from the deck, as a stack of cards that
 * pile up on each other while the section scrolls past.
 *
 * The effect is plain `position: sticky`, no library. The Vue Bits `ScrollStack` component
 * that inspired it was rejected on three counts: it pulls in `lenis`, which hijacks the
 * document scroll and would fight the sticky `CardNav` and the `scroll-margin-top` anchor
 * offset; it needs either a nested viewport-height scroller (a scroll trap on a 375px
 * column) or global smooth-scroll; and its running rAF loop would be a second piece of
 * continuous motion on a site whose budget for that is one (CLAUDE.md, DESIGN.md §3).
 * Sticky costs nothing, has no JS, and is not an animation at all — which is also why this
 * section needs no `prefers-reduced-motion` branch: nothing moves that the scroll itself
 * does not.
 *
 * Each card sticks 14px lower than the one before it, so the top edges of the cards already
 * parked stay visible as a stack of layers rather than one card hiding five. `7rem` is the
 * `scroll-margin-top` from `main.css` — the offset the floating nav needs — so the top card
 * parks exactly where a jump to `#testimoni` would land.
 *
 * Stacking is `md` and up only. A 26rem card in a 375px viewport is most of the screen; a
 * stack of them reads as the page having jammed rather than as an effect, so below `md` the
 * cards stay in normal flow as an ordinary list.
 *
 * `max-w-4xl`, narrower than the site's usual `max-w-6xl`: these are paragraphs of prose,
 * and the 6xl measure runs past a comfortable line length.
 *
 * The section keeps the `paper` the page alternation gives it; the contrast the stack needs
 * lives on the cards, which alternate paper / brand blue via `inverted`. Six paper cards on
 * a paper section were glare with no edges — but darkening the whole section to fix that
 * would have cost a page-wide background break for a problem that is only ever between two
 * adjacent cards. Alternating solves it where it happens, and every seam in the pile lands
 * on a colour change.
 */
</script>

<template>
  <section
    id="testimoni"
    v-reveal
    class="bg-paper"
  >
    <div class="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <h2 class="text-3xl font-bold tracking-tight text-ink md:text-4xl">
        Testimoni
      </h2>

      <div class="mt-4 h-1 w-16 rounded-full bg-gold-400" />

      <p class="mt-6 max-w-2xl leading-relaxed text-ink/70">
        Apa kata klien yang telah bekerja sama dengan kami.
      </p>

      <ul class="mt-12 space-y-6 md:mt-16 md:space-y-10">
        <li
          v-for="(testimonial, index) in TESTIMONIALS"
          :key="testimonial.id"
          class="md:sticky"
          :style="{ top: `calc(7rem + ${index} * 0.875rem)` }"
        >
          <TestimonialCard
            :testimonial="testimonial"
            :inverted="index % 2 === 1"
          />
        </li>
      </ul>
    </div>
  </section>
</template>
