<script setup lang="ts">
/**
 * Floating WhatsApp entry point (spec §6). Deep-links to the primary line
 * (Pringgo) with a prefilled Bahasa Indonesia greeting.
 */
</script>

<template>
  <a
    :href="whatsappLink()"
    target="_blank"
    rel="noopener"
    :aria-label="`Chat WhatsApp ${PRIMARY_WHATSAPP.name} — ${PRIMARY_WHATSAPP.phone}`"
    class="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-kbs-900/25 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kbs-600 motion-reduce:transition-none motion-reduce:hover:scale-100"
  >
    <UIcon
      name="i-simple-icons-whatsapp"
      class="size-7"
    />
  </a>
</template>
