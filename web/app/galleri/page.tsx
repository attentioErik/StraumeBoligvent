export const revalidate = 60

import { client } from '@/lib/sanity'
import { referenceProjectsQuery } from '@/lib/queries'
import type { ReferenceProject } from '@/lib/types'
import type { Metadata } from 'next'
import GalleryGrid from './GalleryGrid'

export const metadata: Metadata = {
  title: 'Galleri',
  description: 'Se bilder fra oppdrag vi har utført for boligeiere og borettslag i Bergen og omegn.',
}

export default async function GalleriPage() {
  const projects = await client.fetch<ReferenceProject[]>(referenceProjectsQuery).catch(() => [])

  return (
    <>
      {/* ─── HERO ─── */}
      <section style={{ background: 'var(--off)', padding: '120px 5% 80px', borderBottom: '1px solid var(--ll)' }}>
        <div className="inner">
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'var(--abg)',
              border: '1px solid var(--amid)',
              borderRadius: 100,
              padding: '6px 16px 6px 10px',
              marginBottom: 24,
            }}
          >
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--amber)', boxShadow: '0 0 0 3px rgba(240,165,0,0.2)' }} />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.06em', color: 'var(--adark)' }}>Bilder fra oppdrag</span>
          </div>
          <h1
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2.4rem, 4vw, 3.6rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              color: 'var(--ink)',
              letterSpacing: '-0.02em',
              maxWidth: 720,
              marginBottom: 24,
            }}
          >
            Galleri
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.78, color: 'var(--muted)', fontWeight: 300, maxWidth: 560 }}>
            Et utvalg bilder fra oppdrag vi har utført for boligeiere, borettslag og sameier i Bergen og omegn.
          </p>
        </div>
      </section>

      {/* ─── GALLERI ─── */}
      <section style={{ background: 'var(--white)', padding: '80px 5%' }}>
        <div className="inner">
          <GalleryGrid projects={projects} />
        </div>
      </section>
    </>
  )
}
