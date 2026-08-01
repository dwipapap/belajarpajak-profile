/**
 * `v-reveal` — fade + rise a section into view once (DESIGN.md §3).
 *
 * The hidden state is applied on mount rather than in the SSR markup, so a client
 * without JS (or with reduced motion) simply sees the content already in place.
 *
 * Registered universally, not `.client`-only: Vue's SSR renderer resolves every
 * directive it encounters, and a missing one crashes the render. `mounted` never
 * runs on the server, so the browser-only code below stays browser-only.
 */
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    getSSRProps: () => ({}),

    mounted(el: HTMLElement) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReducedMotion) return

      el.classList.add('reveal')

      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          el.classList.add('reveal-visible')
          observer.disconnect()
        }
      }, { rootMargin: '0px 0px -10% 0px' })

      observer.observe(el)
    }
  })
})
