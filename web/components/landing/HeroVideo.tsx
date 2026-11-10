'use client'

// Stående 9:16-video for hero på landingssiden for balansert ventilasjon.
// Ingen autoavspilling: videoen lastes og spilles først når brukeren trykker på play.
// Uten src vises bare plakatbildet (brukes i utkastet til reklamevideoen er lagt inn).
import Image from 'next/image'
import { useState, type ReactNode } from 'react'

export default function HeroVideo({
  src,
  poster,
  posterAlt,
  label,
  chip,
}: {
  src?: string
  poster: string
  posterAlt: string
  label: string
  chip?: ReactNode
}) {
  const [playing, setPlaying] = useState(false)

  return (
    <figure className="hero-media bv-video">
      {playing && src ? (
        <video src={src} poster={poster} aria-label={label} controls autoPlay playsInline preload="auto" />
      ) : (
        <>
          <Image
            src={poster}
            fill
            priority
            sizes="(min-width: 900px) 340px, 90vw"
            alt={posterAlt}
          />
          {src && (
            <button type="button" className="bv-play" onClick={() => setPlaying(true)} aria-label={`Spill av video: ${label}`}>
              <span className="bv-play-btn" aria-hidden="true">
                <svg width="30" height="30" viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
              </span>
              <span className="bv-play-text">Se filmen</span>
            </button>
          )}
          {chip && <figcaption className="hero-chip">{chip}</figcaption>}
        </>
      )}
    </figure>
  )
}
