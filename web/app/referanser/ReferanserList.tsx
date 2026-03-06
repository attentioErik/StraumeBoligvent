'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Referanse } from '@/lib/types'
import { urlFor } from '@/lib/sanity'

interface Props {
  referanser: Referanse[]
}

export default function ReferanserList({ referanser }: Props) {
  const kategorier = ['Alle', ...Array.from(new Set(referanser.map((r) => r.kategori).filter(Boolean) as string[]))]
  const [aktiv, setAktiv] = useState('Alle')

  const filtrert = aktiv === 'Alle' ? referanser : referanser.filter((r) => r.kategori === aktiv)

  if (referanser.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted)' }}>
        <p>Ingen referanser publisert ennå.</p>
      </div>
    )
  }

  return (
    <>
      {/* ─── FILTER ─── */}
      {kategorier.length > 1 && (
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 56 }}>
          {kategorier.map((k) => (
            <button
              key={k}
              onClick={() => setAktiv(k)}
              style={{
                padding: '8px 18px',
                borderRadius: 100,
                border: `1px solid ${aktiv === k ? 'var(--amber)' : 'var(--ll)'}`,
                background: aktiv === k ? 'var(--amber)' : 'transparent',
                color: aktiv === k ? 'var(--ink)' : 'var(--muted)',
                fontSize: '0.8rem',
                fontWeight: aktiv === k ? 700 : 400,
                cursor: 'pointer',
                transition: 'all 0.2s',
                letterSpacing: '0.04em',
              }}
            >
              {k}
            </button>
          ))}
        </div>
      )}

      {/* ─── GRID ─── */}
      <div
        className="ref-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 28,
        }}
      >
        {filtrert.map((ref) => (
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
              {ref.hovedbilde ? (
                <Image
                  src={urlFor(ref.hovedbilde).width(640).height(400).url()}
                  alt={ref.hovedbilde.alt || ref.title}
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
              {ref.kategori && (
                <div
                  style={{
                    position: 'absolute',
                    top: 14,
                    left: 14,
                    background: 'var(--amber)',
                    color: 'var(--ink)',
                    fontSize: '0.63rem',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    padding: '5px 10px',
                    borderRadius: 2,
                  }}
                >
                  {ref.kategori}
                </div>
              )}
              {ref.utfortAr && (
                <div
                  style={{
                    position: 'absolute',
                    top: 14,
                    right: 14,
                    background: 'rgba(20,16,8,0.6)',
                    color: '#e8dfc8',
                    fontSize: '0.63rem',
                    fontWeight: 700,
                    padding: '5px 10px',
                    borderRadius: 2,
                  }}
                >
                  {ref.utfortAr}
                </div>
              )}
            </div>

            {/* Content */}
            <div style={{ padding: '26px 28px 30px' }}>
              {ref.kunde && (
                <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--adark)', marginBottom: 8 }}>
                  {ref.kunde}
                </div>
              )}
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 10, lineHeight: 1.25 }}>
                {ref.title}
              </div>
              {ref.kortBeskrivelse && (
                <p style={{ fontSize: '0.845rem', color: 'var(--muted)', lineHeight: 1.65, fontWeight: 300, marginBottom: 12 }}>
                  {ref.kortBeskrivelse}
                </p>
              )}
              {ref.tjenester && ref.tjenester.length > 0 && (
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', borderTop: '1px solid var(--ll)', paddingTop: 14 }}>
                  {ref.tjenester.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: '0.68rem',
                        color: 'var(--adark)',
                        background: 'var(--abg)',
                        border: '1px solid var(--amid)',
                        borderRadius: 100,
                        padding: '3px 10px',
                        fontWeight: 600,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        .rcard:hover { transform: translateY(-5px); box-shadow: 0 16px 48px rgba(20,16,8,0.1); }
        @media (max-width: 980px) { .ref-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 640px) { .ref-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  )
}
