<script setup lang="ts">
/**
 * One client logo in its own tile. Used twice by `ClientSection`: inside the marquee rows,
 * and inside the static grid that replaces them under `prefers-reduced-motion`.
 *
 * The tile is fixed-size and the logo is `object-contain` inside it, so the eighteen source
 * files — which share a 600x300 frame but not a common amount of padding — line up on a
 * common baseline and none of them is ever stretched.
 *
 * `client.dark` swaps the tile to the ink surface. Four of the logos come off the deck on
 * solid black; on a paper tile they read as a black rectangle, on an ink tile the seam
 * disappears. See `app/utils/clients.ts`.
 */
defineProps<{
  client: ClientEntry
}>()
</script>

<template>
  <div
    class="flex h-20 w-40 shrink-0 items-center justify-center overflow-hidden rounded-lg px-4 shadow-sm ring-1 ring-ink/5 sm:h-24 sm:w-48"
    :class="client.dark ? 'bg-ink' : 'bg-paper'"
  >
    <img
      :src="client.logo"
      :alt="`Logo ${client.name}`"
      loading="lazy"
      decoding="async"
      class="max-h-full max-w-full object-contain"
    >
  </div>
</template>
