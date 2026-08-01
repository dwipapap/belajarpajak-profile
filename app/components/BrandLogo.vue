<script setup lang="ts">
defineProps<{
  /** Rendered height in px; width follows the 687×292 aspect ratio. */
  height?: number
}>()
</script>

<template>
  <img
    src="/brand/logo-kbs.png"
    :alt="`Logo ${COMPANY.legalName}`"
    :height="height ?? 40"
    :width="Math.round(((height ?? 40) * 687) / 292)"
    class="h-auto w-auto"
    :style="{ height: `${height ?? 40}px` }"
  >
</template>
