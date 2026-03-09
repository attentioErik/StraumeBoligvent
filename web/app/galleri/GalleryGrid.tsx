'use client'

import { useState } from 'react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import type { ReferenceProject } from '@/lib/types'

interface Props {
  projects: ReferenceProject[]
}

export default function GalleryGrid({ projects }: Props) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)

  // Filter to only projects with images
  const withImages = projects.filter((p) => p.image)

  if (withImages.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted)' }}>
        <p>Ingen bilder publisert ennå.</p>
      </div>
    )
  }

  return (
    <>
      {/* ─── GRID ─── */}
      <div
        className="gallery-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
        }}
      >
        {withImages.map((project, idx) => (
          <button
            key={project._id}
            onClick={() => setSelectedIdx(idx)}
            style={{
              position: 'relative',
              aspectRatio: '4/3',
              overflow: 'hidden',
              borderRadius: 6,
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              background: 'linear-gradient(145deg, #ddd6c8 0%, #b8ae9e 100%)',
            }}
            className="gallery-item"
          >
            <Image
              src={urlFor(project.image!).width(640).height(480).url()}
              alt={project.title}
              fill
              style={{ objectFit: 'cover', transition: 'transform 0.3s' }}
            />
            {/* Hover overlay */}
            <div
              className="gallery-overlay"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(20,16,8,0.7) 0%, transparent 60%)',
                opacity: 0,
                transition: 'opacity 0.3s',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '20px',
              }}
            >
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>
                {project.title}
              </span>
              {project.category && (
                <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', fontWeight: 400, marginTop: 4 }}>
                  {project.category}
                  {project.serviceType ? ` · ${project.serviceType}` : ''}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* ─── LIGHTBOX ─── */}
      {selectedIdx !== null && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(20,16,8,0.92)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px',
          }}
          onClick={() => setSelectedIdx(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedIdx(null)}
            style={{
              position: 'absolute',
              top: 20,
              right: 24,
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: '2rem',
              cursor: 'pointer',
              lineHeight: 1,
              padding: 8,
            }}
            aria-label="Lukk"
          >
            &times;
          </button>

          {/* Previous */}
          {selectedIdx > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedIdx(selectedIdx - 1) }}
              style={{
                position: 'absolute',
                left: 20,
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#fff',
                fontSize: '1.5rem',
                cursor: 'pointer',
                padding: '12px 16px',
                borderRadius: 4,
              }}
              aria-label="Forrige"
            >
              ‹
            </button>
          )}

          {/* Next */}
          {selectedIdx < withImages.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedIdx(selectedIdx + 1) }}
              style={{
                position: 'absolute',
                right: 20,
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#fff',
                fontSize: '1.5rem',
                cursor: 'pointer',
                padding: '12px 16px',
                borderRadius: 4,
              }}
              aria-label="Neste"
            >
              ›
            </button>
          )}

          {/* Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ position: 'relative', maxWidth: '90vw', maxHeight: '80vh', width: 960 }}
          >
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10' }}>
              <Image
                src={urlFor(withImages[selectedIdx].image!).width(1400).height(875).url()}
                alt={withImages[selectedIdx].title}
                fill
                style={{ objectFit: 'contain', borderRadius: 4 }}
              />
            </div>
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <span style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
                {withImages[selectedIdx].title}
              </span>
              {withImages[selectedIdx].category && (
                <span style={{ fontSize: '0.84rem', color: 'rgba(255,255,255,0.6)', marginLeft: 12 }}>
                  {withImages[selectedIdx].category}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .gallery-item:hover img { transform: scale(1.05); }
        .gallery-item:hover .gallery-overlay { opacity: 1 !important; }
        @media (max-width: 980px) { .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px) { .gallery-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  )
}
