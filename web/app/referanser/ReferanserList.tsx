'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { ReferenceProject } from '@/lib/types'
import { urlFor } from '@/lib/sanity'

interface Props {
  referanser: ReferenceProject[]
}

export default function ReferanserList({ referanser }: Props) {
  if (referanser.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted)' }}>
        <p>Ingen referanser publisert ennå.</p>
      </div>
    )
  }

  return (
    <>
      {/* ─── GRID ─── */}
      <div
        className="ref-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 28,
        }}
      >
        {referanser.map((ref) => {
          const firstImage = ref.galleri?.[0]
          return (
            <Link
              key={ref._id}
              href={`/referanser/${ref.slug.current}`}
              className="rcard"
              style={{
                background: 'var(--white)',
                border: '1px solid var(--ll)',
                borderRadius: 6,
                overflow: 'hidden',
                textDecoration: 'none',
                display: 'block',
                transition: 'transform 0.25s, box-shadow 0.25s',
              }}
            >
              {/* Image */}
              <div
                style={{
                  height: 200,
                  background: 'linear-gradient(145deg, #ddd6c8 0%, #b8ae9e 100%)',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                {firstImage ? (
                  <Image
                    src={urlFor(firstImage).width(640).height(400).url()}
                    alt={firstImage.alt || ref.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <svg width="44" height="44" viewBox="0 0 48 48" fill="none" style={{ opacity: 0.3 }}>
                    <rect x="6" y="10" width="36" height="28" rx="2" stroke="#706860" strokeWidth="1.5" />
                    <path d="M6 32l10-8 8 6 8-10 10 12" stroke="#706860" strokeWidth="1.5" strokeLinejoin="round" />
                    <circle cx="32" cy="20" r="4" stroke="#706860" strokeWidth="1.5" />
                  </svg>
                )}
              </div>

              {/* Content */}
              <div style={{ padding: '26px 28px 30px' }}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.25 }}>
                  {ref.title}
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      <style>{`
        .rcard:hover { transform: translateY(-5px); box-shadow: 0 16px 48px rgba(20,16,8,0.1); }
        @media (max-width: 980px) { .ref-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 640px) { .ref-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  )
}
