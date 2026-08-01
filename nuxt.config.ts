// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui'
  ],

  // Public brochure site: SSR on, fully prerendered. Do NOT copy `ssr: false` from the LMS.
  ssr: true,

  devtools: {
    enabled: true
  },

  app: {
    head: {
      htmlAttrs: { lang: 'id' },
      link: [{ rel: 'icon', href: '/favicon.ico' }],
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }]
    }
  },

  css: ['~/assets/css/main.css'],

  // Corporate brochure — one canonical light theme, no dark-mode QA surface.
  colorMode: {
    preference: 'light',
    fallback: 'light'
  },

  compatibilityDate: '2026-06-30',

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
      // /artikel is reserved but unbuilt (spec §8) — nothing should emit a blank page for it.
      ignore: ['/artikel']
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  fonts: {
    families: [
      { name: 'Poppins', provider: 'google', weights: [400, 500, 600, 700] }
    ]
  },

  // Static site: inline every icon from the installed collections at build time.
  // The default CSS mode leaves an empty <span> when the Iconify API is unreachable
  // during prerender, which silently drops the WhatsApp mark from the CTAs.
  icon: {
    mode: 'svg',
    clientBundle: {
      scan: true
    }
  }
})
