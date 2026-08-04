<script setup lang="ts">
/**
 * Klien (homepage) — spec §4.7. A logo wall over the "Klien Lainnya" names. No detail route:
 * spec §3 reserves none, and there is nothing per-client to say beyond the logo.
 *
 * The wall is a `UMarquee`, two rows scrolling in opposite directions. That is the one piece
 * of running motion on the site (CLAUDE.md), and it earns the exception: eighteen logos in a
 * static grid on a 375px column is six rows of thumbnails that push everything below it off
 * the fold, whereas a marquee reads as one band and carries the same list. It stays full
 * bleed — the rows should run off both edges, not stop inside the container.
 *
 * Three renderings of the same list, each with one job:
 *  - the marquee, `aria-hidden` because `repeat` duplicates its contents three times over;
 *  - a static grid, hidden until `prefers-reduced-motion` (Nuxt UI gates the animation behind
 *    `motion-safe`, so without this the stopped marquee would show only its first copy with
 *    the rest clipped);
 *  - an `sr-only` list of names, the single accessible source for both.
 *
 * Nuxt UI's marquee overlay is overridden twice: its gradient fades to `--ui-bg`, which is
 * `paper` while this section is `kbs-50`, and its default width is a third of the viewport
 * per side — wide enough that the outer logos are washed out while still fully on screen.
 * A fixed, narrow fade keeps it reading as a soft edge rather than a vignette.
 */
</script>

<template>
  <section
    id="klien"
    v-reveal
    class="bg-kbs-50"
  >
    <div class="mx-auto max-w-6xl px-4 pt-16 sm:px-6 md:pt-24 lg:px-8">
      <h2 class="text-3xl font-bold tracking-tight text-ink md:text-4xl">
        Klien
      </h2>

      <div class="mt-4 h-1 w-16 rounded-full bg-gold-400" />

      <p class="mt-6 max-w-2xl leading-relaxed text-ink/70">
        Perusahaan, koperasi, dan lembaga pendidikan di Riau yang mempercayakan urusan
        perpajakannya kepada kami.
      </p>
    </div>

    <div
      aria-hidden="true"
      class="mt-12 flex flex-col gap-4 motion-reduce:hidden"
    >
      <UMarquee
        v-for="(row, index) in CLIENT_ROWS"
        :key="index"
        :reverse="index === 1"
        :repeat="3"
        pause-on-hover
        :ui="{ root: 'before:w-16 before:from-kbs-50 after:w-16 after:from-kbs-50 sm:before:w-32 sm:after:w-32' }"
        class="[--duration:45s] [--gap:--spacing(4)]"
      >
        <ClientLogo
          v-for="client in row"
          :key="client.id"
          :client="client"
        />
      </UMarquee>
    </div>

    <!-- The reduced-motion stand-in for the marquee. -->
    <div
      aria-hidden="true"
      class="mx-auto mt-12 hidden max-w-6xl grid-cols-2 justify-items-center gap-4 px-4 motion-reduce:grid sm:grid-cols-3 sm:px-6 lg:grid-cols-4 lg:px-8"
    >
      <ClientLogo
        v-for="client in CLIENTS"
        :key="client.id"
        :client="client"
      />
    </div>

    <div class="mx-auto max-w-6xl px-4 pb-16 sm:px-6 md:pb-24 lg:px-8">
      <ul class="sr-only">
        <li
          v-for="client in CLIENTS"
          :key="client.id"
        >
          {{ client.name }}
        </li>
      </ul>

      <h3 class="mt-16 text-lg font-bold text-ink">
        Klien Lainnya
      </h3>

      <ul class="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <li
          v-for="name in OTHER_CLIENTS"
          :key="name"
          class="flex items-center justify-center rounded-full bg-paper px-4 py-2 text-center text-sm text-ink/80 ring-1 ring-ink/10"
        >
          {{ name }}
        </li>
      </ul>
    </div>
  </section>
</template>
