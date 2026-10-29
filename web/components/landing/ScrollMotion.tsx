'use client'

import { useEffect } from 'react'

// Elementer som fader inn med forsinkelse etter hverandre (stagger) inni en seksjon
const STAGGER = [
  '.sym-list li',
  '.trust li',
  '.checks li',
  '.after-list li',
  '.steps li',
  '.team figure',
  '.reviews .review',
  '.promise-list li',
  '.faq details',
  '.order-aside li',
  '.form > .field, .form > .row2, .form > .form-note',
]

// Seksjonsblokker som fader inn som én enhet
const BLOCKS = [
  '.section .wrap > h2',
  '.section .wrap > .lead',
  '.after-inner > h2',
  '.after-inner > .lead',
  '.sym-cta',
  '.sym-figure',
  '.price-card',
  '.intro-text',
  '.incl-figure',
  '.done',
  '.ba-grid > *',
  '.reviews-more',
  '.promise',
  '.order-aside > h2',
  '.order-aside > .lead',
]

export default function ScrollMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.kr')
    if (!root || matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const targets: HTMLElement[] = []
    const tag = (el: HTMLElement, delay = 0) => {
      if (el.classList.contains('kr-rv') || el.closest('.hero')) return
      el.classList.add('kr-rv')
      el.style.setProperty('--kr-d', `${delay}ms`)
      targets.push(el)
    }

    BLOCKS.forEach((sel) => root.querySelectorAll<HTMLElement>(sel).forEach((el, i) => tag(el, sel.includes('ba-grid') ? i * 120 : 0)))
    STAGGER.forEach((sel) => {
      // Stagger regnes per forelder, så hver liste starter på 0
      const counts = new Map<Element, number>()
      root.querySelectorAll<HTMLElement>(sel).forEach((el) => {
        const parent = el.parentElement!
        const n = counts.get(parent) ?? 0
        counts.set(parent, n + 1)
        tag(el, Math.min(n, 6) * 70)
      })
    })

    root.classList.add('kr-motion')

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          e.target.classList.add('kr-in')
          io.unobserve(e.target)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    targets.forEach((el) => io.observe(el))

    // Myk fremdriftslinje øverst, oppdatert med rAF
    const bar = root.querySelector<HTMLElement>('.kr-progress')
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - innerHeight
      bar?.style.setProperty('--p', String(max > 0 ? Math.min(1, scrollY / max) : 0))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    addEventListener('scroll', onScroll, { passive: true })
    update()

    return () => {
      io.disconnect()
      removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
      root.classList.remove('kr-motion')
      targets.forEach((el) => el.classList.remove('kr-rv', 'kr-in'))
    }
  }, [])

  return <div className="kr-progress" aria-hidden="true" />
}
