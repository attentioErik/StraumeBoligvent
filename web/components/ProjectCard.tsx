import Link from 'next/link'
import Image from 'next/image'
import type { ReferenceProject } from '@/lib/types'
import { urlFor } from '@/lib/sanity'

interface ProjectCardProps {
  project: ReferenceProject
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/referanser/${project.slug.current}`}
      className="pcard reveal"
      style={{
        background: 'var(--white)',
        borderRadius: 6,
        overflow: 'hidden',
        border: '1px solid var(--ll)',
        transition: 'transform 0.25s, box-shadow 0.25s',
        textDecoration: 'none',
        display: 'block',
      }}
    >
      {/* Image area */}
      <div
        style={{
          height: 188,
          background: 'linear-gradient(145deg, #ddd6c8 0%, #b8ae9e 100%)',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {project.image ? (
          <Image
            src={urlFor(project.image).width(600).height(376).url()}
            alt={project.title}
            fill
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ opacity: 0.3 }}>
            <rect x="6" y="10" width="36" height="28" rx="2" stroke="#706860" strokeWidth="1.5" />
            <path d="M6 32l10-8 8 6 8-10 10 12" stroke="#706860" strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx="32" cy="20" r="4" stroke="#706860" strokeWidth="1.5" />
          </svg>
        )}

        {/* Category tag */}
        {project.category && (
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
            {project.category}
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '26px 28px 30px' }}>
        {project.serviceType && (
          <div
            style={{
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--adark)',
              marginBottom: 9,
            }}
          >
            {project.serviceType}
          </div>
        )}
        <div
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.15rem',
            fontWeight: 700,
            color: 'var(--ink)',
            marginBottom: 10,
            lineHeight: 1.2,
          }}
        >
          {project.title}
        </div>
        {project.description && (
          <p
            style={{
              fontSize: '0.845rem',
              color: 'var(--muted)',
              lineHeight: 1.65,
              marginBottom: 14,
              fontWeight: 300,
            }}
          >
            {project.description}
          </p>
        )}
        {project.detail && (
          <p
            style={{
              fontSize: '0.8rem',
              color: 'var(--sec)',
              borderTop: '1px solid var(--ll)',
              paddingTop: 14,
              lineHeight: 1.65,
            }}
          >
            {project.detail}
          </p>
        )}
      </div>

      <style>{`
        .pcard:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 48px rgba(20,16,8,0.1);
        }
      `}</style>
    </Link>
  )
}
