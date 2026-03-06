'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('up')
            }, i * 80)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
    )

    const observe = () => {
      document.querySelectorAll('.reveal:not(.up)').forEach((el) => observer.observe(el))
    }

    // Initial pass — slight delay so streamed page content is painted
    const t1 = setTimeout(observe, 60)
    // Second pass for late-hydrating client components (e.g. FaqSection)
    const t2 = setTimeout(observe, 400)

    // Watch for any new .reveal elements added after initial render
    const mutation = new MutationObserver(observe)
    mutation.observe(document.body, { childList: true, subtree: true })

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      observer.disconnect()
      mutation.disconnect()
    }
  }, [pathname])

  return null
}
