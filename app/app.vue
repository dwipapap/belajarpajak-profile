<script setup lang="ts">
const title = `${COMPANY.legalName} — Konsultan Pajak Pekanbaru`
const description = `${COMPANY.legalName} (${COMPANY.formerName}) melayani konsultasi, kepatuhan, dan perencanaan pajak untuk klien perorangan maupun badan di Pekanbaru. ${COMPANY.tagline}`

// Per-page meta lands in Phase 2; this is the site-wide fallback.
useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogLocale: 'id_ID',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
