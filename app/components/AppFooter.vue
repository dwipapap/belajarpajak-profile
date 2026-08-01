<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-kbs-900 text-kbs-100">
    <div class="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div class="lg:col-span-2">
          <div class="inline-flex rounded-lg bg-paper px-3 py-2">
            <BrandLogo :height="40" />
          </div>

          <p class="mt-4 max-w-sm text-sm leading-relaxed text-kbs-200">
            {{ COMPANY.legalName }} — konsultan pajak dan mitra bisnis untuk klien
            perorangan maupun badan. {{ COMPANY.tagline }}
          </p>
        </div>

        <div>
          <h2 class="text-sm font-semibold uppercase tracking-wide text-white">
            Navigasi
          </h2>

          <ul class="mt-4 space-y-2 text-sm">
            <li
              v-for="link in NAV_LINKS"
              :key="link.to"
            >
              <NuxtLink
                :to="link.to"
                class="text-kbs-200 transition-colors hover:text-gold-400"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
            <li>
              <a
                :href="LMS_URL"
                target="_blank"
                rel="noopener"
                class="text-kbs-200 transition-colors hover:text-gold-400"
              >
                Belajar Pajak (LMS)
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 class="text-sm font-semibold uppercase tracking-wide text-white">
            Kontak
          </h2>

          <address class="mt-4 space-y-3 text-sm not-italic text-kbs-200">
            <p>
              <span
                v-for="line in ADDRESS_LINES"
                :key="line"
                class="block"
              >{{ line }}</span>
            </p>

            <p>
              <a
                :href="`mailto:${COMPANY.email}`"
                class="transition-colors hover:text-gold-400"
              >
                {{ COMPANY.email }}
              </a>
            </p>

            <p
              v-for="contact in CONTACTS"
              :key="contact.phone"
            >
              <a
                :href="whatsappLink(contact.phone)"
                target="_blank"
                rel="noopener"
                class="transition-colors hover:text-gold-400"
              >
                {{ contact.phone }}
                <span class="text-kbs-300">({{ contact.name }})</span>
              </a>
            </p>
          </address>
        </div>
      </div>

      <div class="mt-12 border-t border-kbs-800 pt-6 text-sm text-kbs-300">
        <p>&copy; {{ year }} {{ COMPANY.legalName }}. Seluruh hak cipta dilindungi.</p>
      </div>
    </div>
  </footer>
</template>
