'use client'

import { useEffect, useRef } from 'react'

// Stående video som spilles av når den er synlig (pauses ellers, og ved redusert bevegelse)
export default function LandingVideo({ src, poster, label }: { src: string; poster?: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.35 },
    )
    io.observe(video)
    return () => io.disconnect()
  }, [])

  return (
    <video ref={ref} src={src} poster={poster} aria-label={label} muted loop playsInline controls preload="metadata" />
  )
}
