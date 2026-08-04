<script setup lang="ts">
import { gsap } from 'gsap'
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

type CardNavLink = {
  label: string
  href?: string
  ariaLabel: string
}

export type CardNavItem = {
  label: string
  bgColor: string
  textColor: string
  links: CardNavLink[]
}

export interface CardNavProps {
  logo: string
  logoAlt?: string
  items: CardNavItem[]
  className?: string
  ease?: string
  baseColor?: string
  menuColor?: string
  buttonBgColor?: string
  buttonTextColor?: string
  /** CTA renders the site's WhatsApp deep-link rather than a hardcoded "Get Started". */
  ctaLabel?: string
  ctaHref?: string
}

const props = withDefaults(defineProps<CardNavProps>(), {
  logoAlt: 'Logo',
  className: '',
  ease: 'power3.out',
  baseColor: '#fff',
  ctaLabel: 'Get Started',
  ctaHref: '#'
})

const isHamburgerOpen = ref(false)
const isExpanded = ref(false)

const navRef = ref<HTMLElement | null>(null)
const tlRef = ref<gsap.core.Timeline | null>(null)

/** Below this scroll offset the bar stays docked full-bleed; past it, it becomes the floating pill. */
const DOCK_THRESHOLD = 80

/** SSR and prerender always paint the docked state — scrollY is 0 at first paint. */
const isDocked = ref(true)
let scrollFrame = 0

/** wa.me and mailto: links leave the site — match the target/rel used everywhere else. */
const isExternal = (href?: string) => !!href && !href.startsWith('/')

/**
 * Only the layout the current breakpoint renders gets staggered; the other one is
 * `display: none`, so it has no offsetParent.
 */
const revealTargets = (navEl: HTMLElement) =>
  Array.from(navEl.querySelectorAll<HTMLElement>('[data-nav-panel] > *'))
    .filter(el => el.offsetParent !== null)

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const calculateHeight = () => {
  const navEl = navRef.value
  if (!navEl) return 260

  const isMobile = window.matchMedia('(max-width: 768px)').matches
  if (isMobile) {
    const contentEl = navEl.querySelector('.card-nav-content') as HTMLElement
    if (contentEl) {
      const wasVisible = contentEl.style.visibility
      const wasPosition = contentEl.style.position
      const wasHeight = contentEl.style.height

      contentEl.style.visibility = 'visible'
      contentEl.style.position = 'static'
      contentEl.style.height = 'auto'

      const topBar = 60
      const padding = 16
      const contentHeight = contentEl.scrollHeight

      contentEl.style.visibility = wasVisible
      contentEl.style.position = wasPosition
      contentEl.style.height = wasHeight

      // Safety valve for short/landscape viewports — the content scrolls inside instead.
      return Math.min(topBar + contentHeight + padding, window.innerHeight - 32)
    }
  }
  // Desktop cards are `md:h-full`, so measuring them against the nav is circular — fixed by design.
  return 260
}

const createTimeline = () => {
  const navEl = navRef.value
  if (!navEl) return null

  const targets = revealTargets(navEl)
  // DESIGN.md §3: reduced-motion users get the open/close state instantly, not an animation.
  const duration = prefersReducedMotion() ? 0 : 0.4
  const stagger = prefersReducedMotion() ? 0 : 0.08

  gsap.set(navEl, { height: 60, overflow: 'hidden' })
  gsap.set(targets, { y: 50, opacity: 0 })

  const tl = gsap.timeline({ paused: true })

  tl.to(navEl, {
    height: calculateHeight,
    duration,
    ease: props.ease
  })

  tl.to(targets, { y: 0, opacity: 1, duration, ease: props.ease, stagger }, '-=0.1')

  return tl
}

const closeMenu = () => {
  if (!isExpanded.value) return
  const tl = tlRef.value
  if (!tl) return
  isHamburgerOpen.value = false
  tl.eventCallback('onReverseComplete', () => {
    isExpanded.value = false
    tl.eventCallback('onReverseComplete', null)
  })
  tl.reverse()
}

const toggleMenu = () => {
  const tl = tlRef.value
  if (!tl) return
  if (!isExpanded.value) {
    isHamburgerOpen.value = true
    isExpanded.value = true
    nextTick(() => {
      tl.play(0)
    })
  } else {
    closeMenu()
  }
}

/**
 * Clicking anywhere outside the nav collapses it back to the pill
 * (request 2026-08-04). Clicks on the cards themselves are ignored.
 */
const handleDocumentClick = (event: MouseEvent) => {
  const navEl = navRef.value
  if (!navEl || !isExpanded.value) return
  if (navEl.contains(event.target as Node)) return
  closeMenu()
}

/** Esc gives keyboard users the same escape hatch as clicking outside. */
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') closeMenu()
}

const syncDockState = () => {
  scrollFrame = 0
  const docked = window.scrollY <= DOCK_THRESHOLD
  if (docked === isDocked.value) return
  isDocked.value = docked
  // The bar's geometry changes here — collapse the menu rather than morph both at once.
  closeMenu()
}

const handleScroll = () => {
  if (scrollFrame) return
  scrollFrame = requestAnimationFrame(syncDockState)
}

const handleResize = () => {
  if (!tlRef.value) return

  if (isExpanded.value) {
    const newHeight = calculateHeight()
    gsap.set(navRef.value, { height: newHeight })

    tlRef.value.kill()
    const newTl = createTimeline()
    if (newTl) {
      newTl.progress(1)
      tlRef.value = newTl
    }
  } else {
    tlRef.value.kill()
    tlRef.value = createTimeline()
  }
}

onMounted(() => {
  tlRef.value = createTimeline()
  // A refresh or a /#kontak deep-link can land already scrolled — settle the state before listening.
  syncDockState()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleResize)
  document.addEventListener('click', handleDocumentClick)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  tlRef.value?.kill()
  tlRef.value = null
  if (scrollFrame) cancelAnimationFrame(scrollFrame)
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
  document.removeEventListener('click', handleDocumentClick)
  document.removeEventListener('keydown', handleKeydown)
})

watch(
  () => [props.ease, props.items],
  () => {
    nextTick(() => {
      if (tlRef.value) tlRef.value.kill()
      tlRef.value = createTimeline()
    })
  }
)
</script>

<template>
  <!--
    fixed (not absolute) so the nav stays pinned while the page scrolls (decision 2026-08-04).
    At scroll 0 it is docked full-bleed with a hairline; past DOCK_THRESHOLD it morphs into the
    floating pill (decision 2026-08-04). Only padding / max-width / radius / shadow / border-color
    transition, so nothing reflows the page.
  -->
  <div
    :class="[
      'card-nav-container fixed inset-x-0 top-0 z-[99]',
      'motion-safe:transition-[padding] motion-safe:duration-300 motion-safe:ease-out',
      isDocked ? 'px-0 pt-0' : 'px-[2.5%] pt-5 md:pt-8',
      props.className
    ]"
  >
    <nav
      ref="navRef"
      :class="[
        'card-nav relative mx-auto block h-[60px] w-full overflow-hidden border-b p-0 will-change-[height]',
        'motion-safe:transition-[max-width,border-radius,box-shadow,border-color]',
        'motion-safe:duration-300 motion-safe:ease-out',
        isDocked
          ? 'max-w-[100vw] rounded-none border-kbs-100 shadow-none'
          : 'max-w-6xl rounded-xl border-transparent shadow-md',
        { open: isExpanded }
      ]"
      :style="{ backgroundColor: props.baseColor }"
    >
      <div
        class="card-nav-top top-0 z-[2] absolute inset-x-0 flex justify-between items-center p-2 px-[1.1rem] h-[60px]"
      >
        <button
          type="button"
          :class="[
            'hamburger-menu group h-full flex items-center justify-center cursor-pointer gap-2 order-2 md:order-none',
            { open: isHamburgerOpen }
          ]"
          :aria-label="isExpanded ? 'Tutup menu' : 'Buka menu'"
          :aria-expanded="isExpanded"
          aria-controls="card-nav-content"
          :style="{ color: props.menuColor || '#000' }"
          @click="toggleMenu"
        >
          <span class="flex flex-col items-center justify-center gap-[6px]">
            <span
              :class="[
                'hamburger-line block w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] group-hover:opacity-75',
                { 'translate-y-[4px] rotate-45': isHamburgerOpen }
              ]"
            />
            <span
              :class="[
                'hamburger-line block w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] group-hover:opacity-75',
                { '-translate-y-[4px] -rotate-45': isHamburgerOpen }
              ]"
            />
          </span>
          <span
            class="text-[14px] md:text-[15px] font-medium tracking-[0.01em] whitespace-nowrap"
            aria-hidden="true"
          >
            Menu
          </span>
        </button>

        <NuxtLink
          to="/#beranda"
          class="md:top-1/2 md:left-1/2 md:absolute flex items-center order-1 md:order-none md:-translate-x-1/2 md:-translate-y-1/2 logo-container"
          :aria-label="props.logoAlt"
        >
          <img
            :src="props.logo"
            :alt="props.logoAlt"
            width="240"
            height="102"
            class="h-[28px] w-auto logo"
          >
        </NuxtLink>

        <a
          :href="props.ctaHref"
          target="_blank"
          rel="noopener"
          class="hidden md:inline-flex items-center px-4 border-0 rounded-[calc(0.75rem-0.2rem)] h-full font-medium no-underline transition-colors duration-300 cursor-pointer card-nav-cta-button"
          :style="{
            backgroundColor: props.buttonBgColor,
            color: props.buttonTextColor
          }"
        >
          {{ props.ctaLabel }}
        </a>
      </div>

      <div
        id="card-nav-content"
        :class="[
          'card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-2 flex flex-col justify-start z-[1] overflow-y-auto overscroll-contain md:overflow-visible',
          isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
        ]"
        :aria-hidden="!isExpanded"
      >
        <!--
          Mobile gets a flat list of every destination at 48px a row. The desktop card grid
          below packs its links into ~22px rows, which is under the WCAG 2.5.8 minimum and
          impossible to hit reliably with a thumb (request 2026-08-04).
        -->
        <div
          data-nav-panel
          class="flex flex-col gap-2 md:hidden"
        >
          <div class="flex flex-col divide-y divide-paper/15 rounded-[calc(0.75rem-0.2rem)] bg-kbs-700 px-2">
            <NuxtLink
              v-for="link in NAV_LINKS"
              :key="link.to"
              :to="link.to"
              class="flex min-h-12 items-center justify-between gap-3 px-2 text-[15px] font-medium text-paper no-underline transition-colors duration-200 active:bg-kbs-600"
              exact-active-class=""
              @click="closeMenu"
            >
              {{ link.label }}
              <UIcon
                name="i-lucide-arrow-up-right"
                class="size-4 shrink-0 opacity-70"
                aria-hidden="true"
              />
            </NuxtLink>
          </div>

          <a
            :href="props.ctaHref"
            target="_blank"
            rel="noopener"
            class="flex min-h-12 items-center justify-center rounded-[calc(0.75rem-0.2rem)] font-medium no-underline"
            :style="{
              backgroundColor: props.buttonBgColor,
              color: props.buttonTextColor
            }"
            @click="closeMenu"
          >
            {{ props.ctaLabel }}
          </a>
        </div>

        <div
          data-nav-panel
          class="hidden md:flex md:flex-1 md:flex-row md:items-end md:gap-[12px]"
        >
          <div
            v-for="(item, idx) in (props.items || []).slice(0, 3)"
            :key="`${item.label}-${idx}`"
            class="relative flex flex-col flex-[1_1_0%] gap-2 p-[12px_16px] rounded-[calc(0.75rem-0.2rem)] min-w-0 h-full select-none nav-card"
            :style="{ backgroundColor: item.bgColor, color: item.textColor }"
          >
            <div class="font-normal text-[22px] tracking-[-0.5px] nav-card-label">
              {{ item.label }}
            </div>
            <div class="flex flex-col gap-[2px] mt-auto nav-card-links">
              <NuxtLink
                v-for="(lnk, i) in item.links"
                :key="`${lnk.label}-${i}`"
                class="inline-flex items-center gap-[6px] hover:opacity-75 text-[16px] no-underline transition-opacity duration-300 cursor-pointer nav-card-link"
                :to="lnk.href"
                :aria-label="lnk.ariaLabel"
                :target="isExternal(lnk.href) ? '_blank' : undefined"
                :rel="isExternal(lnk.href) ? 'noopener' : undefined"
                exact-active-class=""
                @click="closeMenu"
              >
                <UIcon
                  name="i-lucide-arrow-up-right"
                  class="nav-card-link-icon shrink-0"
                  aria-hidden="true"
                />
                {{ lnk.label }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
