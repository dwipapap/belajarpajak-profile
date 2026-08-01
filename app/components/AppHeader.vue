<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = computed<NavigationMenuItem[]>(() =>
  NAV_LINKS.map(link => ({ label: link.label, to: link.to }))
)
</script>

<template>
  <UHeader
    mode="drawer"
    :ui="{ root: 'bg-paper/90 backdrop-blur border-b border-kbs-100' }"
  >
    <template #left>
      <NuxtLink
        to="/#beranda"
        :aria-label="COMPANY.legalName"
      >
        <BrandLogo :height="36" />
      </NuxtLink>
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
      class="justify-center"
    />

    <template #right>
      <UButton
        :to="whatsappLink()"
        target="_blank"
        rel="noopener"
        label="Konsultasi"
        icon="i-simple-icons-whatsapp"
        color="primary"
        class="hidden sm:inline-flex"
      />
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />

      <UButton
        :to="whatsappLink()"
        target="_blank"
        rel="noopener"
        label="Konsultasi"
        icon="i-simple-icons-whatsapp"
        color="primary"
        block
        class="mt-6"
      />
    </template>
  </UHeader>
</template>
