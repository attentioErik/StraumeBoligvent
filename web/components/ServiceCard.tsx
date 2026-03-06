import Link from 'next/link'
import type { Service } from '@/lib/types'

interface ServiceCardProps {
  service: Service
  index: number
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const num = service.number || String(index + 1).padStart(2, '0')

  return (
    <Link
      href={`/services/${service.slug.current}`}
      style={{
        padding: '40px 36px',
        borderRight: '1px solid var(--ll)',
        borderBottom: '1px solid var(--ll)',
        background: service.highlighted ? 'var(--abg)' : 'var(--white)',
        position: 'relative',
        overflow: 'hidden',
        textDecoration: 'none',
        display: 'block',
        transition: 'background 0.25s',
      }}
      className={`scard reveal${service.highlighted ? ' hl' : ''}`}
    >
      <div
        className="scard-bar"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 3,
          height: 0,
          background: 'var(--amber)',
          transition: 'height 0.3s ease',
        }}
      />
      <div
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: 'var(--amid)',
          marginBottom: 20,
          letterSpacing: '0.1em',
        }}
      >
        {num}
      </div>
      <div
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '1.05rem',
          fontWeight: 700,
          color: 'var(--ink)',
          marginBottom: 12,
          lineHeight: 1.2,
        }}
      >
        {service.title}
      </div>
      <p
        style={{
          fontSize: '0.855rem',
          color: 'var(--muted)',
          lineHeight: 1.7,
          fontWeight: 300,
        }}
      >
        {service.description}
      </p>

      <style>{`
        .scard:hover { background: var(--alight) !important; }
        .scard.hl:hover { background: #fff3c0 !important; }
        .scard:hover .scard-bar { height: 100% !important; }
      `}</style>
    </Link>
  )
}
