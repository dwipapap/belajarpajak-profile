/**
 * `v-reveal` — fade + rise a section into view once (DESIGN.md §3).
 *
 * The hidden state is applied on mount rather than in the SSR markup, so a client
 * without JS (or with reduced motion) simply sees the content already in place.
 *
 * One shared IntersectionObserver serves every bound element instead of one per
 * element — cheap on low-end phones. Elements already inside the viewport at
 * mount skip the hidden state entirely, so there is no visible→hidden→visible
 * flash after hydration on tall screens.
 *
 * Registered universally, not `.client`-only: Vue's SSR renderer resolves every
 * directive it encounters, and a missing one crashes the render. `mounted` never
 * runs on the server, so the browser-only code below stays browser-only.
 */
let observer: IntersectionObserver | null = null

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('reveal-visible')
        observer!.unobserve(entry.target)
      }
    }, { rootMargin: '0px 0px -10% 0px' })
  }
  return observer
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    getSSRProps: () => ({}),

    mounted(el: HTMLElement) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReducedMotion) return

      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('reveal-visible')
        return
      }

      el.classList.add('reveal')
      getObserver().observe(el)
    }
  })
})
