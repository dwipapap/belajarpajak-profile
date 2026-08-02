<template>
  <div class="flex min-h-screen flex-col">
    <a
      href="#konten"
      class="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[60] focus:rounded-lg focus:bg-paper focus:px-4 focus:py-2 focus:text-ink focus:ring-2 focus:ring-kbs-600"
    >
      Lewati ke konten
    </a>

    <AppHeader />

    <UMain
      id="konten"
      class="flex-1"
    >
      <slot />
    </UMain>

    <AppFooter />

    <WhatsAppFab />
  </div>
</template>
