'use client'

import { useEffect, useRef } from 'react'

interface ServiceVideoProps {
  src: string
  poster?: string
  caption?: string
  format?: 'portrait' | 'landscape'
}

export default function ServiceVideo({ src, poster, caption, format = 'portrait' }: ServiceVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)

  // Spill kun når videoen er synlig, og ikke ved redusert bevegelse
  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.35 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  const portrait = format === 'portrait'

  return (
    <figure style={{ margin: 0, width: '100%', maxWidth: portrait ? 360 : '100%', marginInline: 'auto' }}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        controls
        preload="metadata"
        style={{
          display: 'block',
          width: '100%',
          aspectRatio: portrait ? '9 / 16' : '16 / 9',
          objectFit: 'cover',
          background: '#1e1a12',
          borderRadius: 8,
          boxShadow: '0 24px 64px rgba(20,16,8,0.14)',
        }}
      />
      {caption && (
        <figcaption style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: 12, textAlign: 'center' }}>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
