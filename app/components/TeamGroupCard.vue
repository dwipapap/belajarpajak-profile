<script setup lang="ts">
/**
 * The brand tile that labels a `/tim` grid — it stands in for a section heading, so the
 * page keeps a real (screen-reader-only) `<h2>` alongside it.
 *
 * Same diagonal facet as `TeamSection` and the Legalitas tiles; no new brand cue. The facet
 * drifts on hover — the card is not interactive, so the cue stays subtle rather than
 * lifting like the person cards do.
 */
defineProps<{
  eyebrow: string
  label: string
}>()
</script>

<template>
  <div class="group relative isolate flex flex-col overflow-hidden rounded-xl bg-gradient-to-br from-kbs-600 to-kbs-900 p-6">
    <span
      aria-hidden="true"
      class="absolute inset-0 -z-10 bg-paper/8 transition-[clip-path] duration-700 ease-out [clip-path:polygon(0_62%,100%_18%,100%_100%,0_100%)] group-hover:[clip-path:polygon(0_45%,100%_8%,100%_100%,0_100%)]"
    />

    <p class="text-lg font-light leading-tight text-paper/80">
      {{ eyebrow }}
    </p>
    <p class="mt-1 text-2xl font-bold leading-tight tracking-tight text-paper">
      {{ label }}
    </p>
  </div>
</template>
