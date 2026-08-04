<script setup lang="ts">
/**
 * One person in a `/tim` grid: portrait tile, name, role. Not a link — the deck carries no
 * per-person profile and spec §3 reserves no route for one.
 *
 * The portrait stays in full colour at rest. Hovering lifts the tile and slowly zooms the
 * photo — the movement is gated behind `motion-safe`, so `prefers-reduced-motion` users get
 * the lift and the shadow but not the zoom.
 *
 * The zoom runs long (1.2s) on an ease-out-quint curve: it should read as the photo slowly
 * settling forward, not as a snap. Everything else is tuned under it so nothing finishes
 * conspicuously ahead of the zoom.
 *
 * Every portrait is a real cut-out (see `app/utils/team.ts`); the alt text names the
 * person the row is about, never the file.
 */
defineProps<{
  name: string
  title: string
  photo: string
}>()
</script>

<template>
  <div class="group">
    <div class="relative aspect-[4/5] overflow-hidden rounded-xl bg-kbs-100 transition-shadow duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:shadow-lg group-hover:shadow-kbs-900/15 motion-safe:transition-[box-shadow,transform] motion-safe:group-hover:-translate-y-1">
      <img
        :src="photo"
        :alt="`Foto ${name}`"
        loading="lazy"
        decoding="async"
        class="absolute inset-0 size-full object-cover object-top transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-110"
      >

      <!-- Wash toward the page surface, echoing the cut-out portraits of the reference.
           It clears on hover so the colour photo reads unmuted. -->
      <span
        aria-hidden="true"
        class="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-kbs-50/70 to-transparent transition-opacity duration-[900ms] ease-out group-hover:opacity-0"
      />

      <!-- Gold rule wiping in from the left — the same accent the page headers use. -->
      <span
        aria-hidden="true"
        class="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gold-400 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
      />
    </div>

    <p class="mt-3 text-sm font-bold leading-snug text-ink transition-colors duration-500 ease-out group-hover:text-kbs-600">
      {{ name }}
    </p>
    <p class="mt-1 text-sm text-ink/60">
      {{ title }}
    </p>
  </div>
</template>
