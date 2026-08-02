<script setup lang="ts">
/**
 * Kontak — spec §4.9. Address, e-mail and the three WhatsApp lines all come from
 * `COMPANY`/`CONTACTS`; nothing here re-types a fact.
 *
 * Two flat columns, no cards: details + map on the left, message form on the right.
 * The only framed element is the map, which needs a box to hold its aspect before
 * the iframe loads.
 *
 * The form deliberately has no backend (spec §9): fields are composed into a wa.me
 * deep-link on submit and never leave the browser, which keeps the site clear of
 * UU PDP data-processing obligations. Native `required` does the validation so no
 * schema library is pulled in.
 *
 * The map is click-to-load: Google's iframe drops cookies and ~700KB on first paint,
 * so it stays behind a placeholder until the visitor asks for it.
 */
const form = reactive({
  name: '',
  company: '',
  message: ''
})

const mapLoaded = ref(false)

/** Builds the prefilled WhatsApp body from whatever the visitor filled in. */
function composeMessage() {
  const name = form.name.trim()
  const company = form.company.trim()
  const message = form.message.trim()

  const intro = company
    ? `Halo PT. KBS, saya ${name} dari ${company}.`
    : `Halo PT. KBS, saya ${name}.`

  return `${intro}\n\n${message || 'Saya ingin berkonsultasi mengenai layanan perpajakan.'}`
}

function submit() {
  window.open(whatsappLink(PRIMARY_WHATSAPP.phone, composeMessage()), '_blank', 'noopener')
}
</script>

<template>
  <section
    id="kontak"
    v-reveal
    class="bg-kbs-50"
  >
    <div class="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div class="grid gap-14 lg:grid-cols-2 lg:gap-16">
        <!-- Details + map -->
        <div>
          <h2 class="text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Hubungi Kami
          </h2>

          <div class="mt-4 h-1 w-16 rounded-full bg-gold-400" />

          <p class="mt-6 leading-relaxed text-ink/70">
            Sampaikan kebutuhan perpajakan Anda. Tim {{ COMPANY.shortName }} siap membantu
            klien perorangan maupun badan.
          </p>

          <h3 class="mt-10 text-lg font-semibold text-kbs-600">
            Kantor Pekanbaru
          </h3>

          <address class="mt-3 not-italic leading-relaxed text-ink/80">
            <span
              v-for="line in ADDRESS_LINES"
              :key="line"
              class="block"
            >{{ line }}</span>
          </address>

          <ul class="mt-6 space-y-3">
            <li class="flex items-start gap-3">
              <UIcon
                name="i-lucide-mail"
                class="mt-1 size-5 shrink-0 text-kbs-600"
              />

              <a
                :href="`mailto:${COMPANY.email}`"
                class="break-all text-ink/80 underline-offset-4 hover:text-kbs-600 hover:underline"
              >
                {{ COMPANY.email }}
              </a>
            </li>

            <li
              v-for="contact in CONTACTS"
              :key="contact.phone"
              class="flex items-start gap-3"
            >
              <UIcon
                name="i-simple-icons-whatsapp"
                class="mt-1 size-5 shrink-0 text-kbs-600"
              />

              <a
                :href="whatsappLink(contact.phone)"
                target="_blank"
                rel="noopener"
                class="text-ink/80 underline-offset-4 hover:text-kbs-600 hover:underline"
              >
                {{ contact.phone }}
                <span class="text-ink/55">({{ contact.name }})</span>
              </a>
            </li>
          </ul>

          <!-- Map: placeholder until the visitor opts in, then Google's iframe. -->
          <div class="mt-8 overflow-hidden border border-kbs-200 bg-paper">
            <iframe
              v-if="mapLoaded"
              :src="MAPS_EMBED_LINK"
              :title="`Peta lokasi ${COMPANY.legalName}`"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              class="block h-80 w-full border-0 md:h-96"
            />

            <div
              v-else
              class="flex flex-col items-center gap-4 px-6 py-14 text-center"
            >
              <UIcon
                name="i-lucide-map"
                class="size-9 text-kbs-300"
              />

              <p class="max-w-sm text-sm leading-relaxed text-ink/70">
                Peta dimuat dari Google Maps. Klik untuk menampilkannya — kami tidak
                memuat layanan pihak ketiga sebelum Anda memilihnya.
              </p>

              <div class="flex flex-col gap-3 sm:flex-row">
                <UButton
                  icon="i-lucide-map-pin"
                  label="Tampilkan peta"
                  @click="mapLoaded = true"
                />

                <UButton
                  :to="MAPS_LINK"
                  target="_blank"
                  rel="noopener"
                  color="neutral"
                  variant="outline"
                  icon="i-lucide-external-link"
                  label="Buka di Google Maps"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Message form -->
        <div>
          <h3 class="text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Tinggalkan Pesan
          </h3>

          <form
            class="mt-10"
            @submit.prevent="submit"
          >
            <div class="space-y-5">
              <UFormField
                label="Nama"
                name="nama"
                required
              >
                <UInput
                  v-model="form.name"
                  name="nama"
                  autocomplete="name"
                  placeholder="Nama lengkap Anda"
                  required
                  size="xl"
                  class="w-full"
                />
              </UFormField>

              <UFormField
                label="Perusahaan"
                name="perusahaan"
                hint="Opsional"
              >
                <UInput
                  v-model="form.company"
                  name="perusahaan"
                  autocomplete="organization"
                  placeholder="Nama badan usaha, jika ada"
                  size="xl"
                  class="w-full"
                />
              </UFormField>

              <UFormField
                label="Kebutuhan Anda"
                name="pesan"
              >
                <UTextarea
                  v-model="form.message"
                  name="pesan"
                  :rows="5"
                  placeholder="Contoh: konsultasi SPT Tahunan Badan untuk tahun pajak 2025."
                  size="xl"
                  class="w-full"
                />
              </UFormField>
            </div>

            <UButton
              type="submit"
              size="xl"
              icon="i-simple-icons-whatsapp"
              label="Kirim via WhatsApp"
              class="mt-8 w-full justify-center"
            />

            <p class="mt-4 text-sm leading-relaxed text-ink/60">
              Pesan dibuka di aplikasi WhatsApp Anda dan dikirim ke
              {{ PRIMARY_WHATSAPP.name }}. Situs ini tidak menyimpan data apa pun
              yang Anda isi.
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
