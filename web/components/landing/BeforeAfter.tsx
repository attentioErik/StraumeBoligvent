'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

export default function BeforeAfter() {
  const baRef = useRef<HTMLDivElement>(null)
  const rangeRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const ba = baRef.current
    const range = rangeRef.current
    if (!ba || !range) return

    const setPos = (p: number) => {
      p = Math.max(0, Math.min(100, p))
      ba.style.setProperty('--pos', p + '%')
      range.value = String(p)
    }
    const fromX = (x: number) => {
      const r = ba.getBoundingClientRect()
      setPos(((x - r.left) / r.width) * 100)
    }

    // På touch avgjør vi retning først, så vertikal scrolling fortsatt virker
    let drag = false, sx = 0, sy = 0, decided = false
    const onDown = (e: PointerEvent) => {
      drag = true
      decided = e.pointerType === 'mouse'
      sx = e.clientX
      sy = e.clientY
      if (decided) {
        fromX(e.clientX)
        ba.setPointerCapture(e.pointerId)
      }
    }
    const onMove = (e: PointerEvent) => {
      if (!drag) return
      if (!decided) {
        const dx = Math.abs(e.clientX - sx), dy = Math.abs(e.clientY - sy)
        if (dx < 6 && dy < 6) return
        if (dy > dx) { drag = false; return }
        decided = true
        ba.setPointerCapture(e.pointerId)
      }
      fromX(e.clientX)
    }
    const onEnd = (e: PointerEvent) => {
      if (drag && !decided && e.type === 'pointerup') fromX(e.clientX)
      drag = false
    }
    const onInput = () => setPos(+range.value)

    ba.addEventListener('pointerdown', onDown)
    ba.addEventListener('pointermove', onMove)
    ba.addEventListener('pointerup', onEnd)
    ba.addEventListener('pointercancel', onEnd)
    range.addEventListener('input', onInput)

    // Ett lite hint første gang bildet vises
    let io: IntersectionObserver | undefined
    let timer: ReturnType<typeof setTimeout> | undefined
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
      io = new IntersectionObserver((en) => {
        if (!en[0].isIntersecting) return
        io!.disconnect()
        let t0: number | null = null
        const step = (t: number) => {
          if (!t0) t0 = t
          const k = (t - t0) / 1400
          if (k >= 1 || drag) { if (!drag) setPos(50); return }
          setPos(50 - 22 * Math.sin(k * Math.PI * 2) * (1 - k))
          requestAnimationFrame(step)
        }
        timer = setTimeout(() => requestAnimationFrame(step), 300)
      }, { threshold: 0.6 })
      io.observe(ba)
    }

    return () => {
      ba.removeEventListener('pointerdown', onDown)
      ba.removeEventListener('pointermove', onMove)
      ba.removeEventListener('pointerup', onEnd)
      ba.removeEventListener('pointercancel', onEnd)
      range.removeEventListener('input', onInput)
      io?.disconnect()
      if (timer) clearTimeout(timer)
    }
  }, [])

  return (
    <div>
      <div className="ba" ref={baRef}>
        <Image src="/images/kanalrens/kanal-etter.webp" width={720} height={900} sizes="(min-width: 900px) 500px, 100vw" alt="Ventilasjonskanal etter rens, blank metall" />
        <Image className="ba-before" src="/images/kanalrens/kanal-for.webp" width={720} height={900} sizes="(min-width: 900px) 500px, 100vw" alt="Ventilasjonskanal før rens, dekket av et tykt støvlag" />
        <div className="ba-line" aria-hidden="true">
          <span className="ba-knob">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M9 6l-6 6 6 6M15 6l6 6-6 6" stroke="#1E1A12" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
        </div>
        <span className="ba-tag l" aria-hidden="true">Før</span>
        <span className="ba-tag r" aria-hidden="true">Etter</span>
        <label className="sr-only" htmlFor="ba-range">Sammenlign før og etter rens</label>
        <input id="ba-range" ref={rangeRef} type="range" min={0} max={100} defaultValue={50} />
      </div>
      <p className="ba-hint">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6l-6 6 6 6M15 6l6 6-6 6" stroke="#6B6258" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        Dra i streken for å sammenligne
      </p>
    </div>
  )
}
