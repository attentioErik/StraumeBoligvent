import Link from 'next/link'
import type { Service } from '@/lib/types'

interface ServiceCardProps {
  service: Service
  index: number
}

const ICONS = [
  <svg key="i0" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  <svg key="i1" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/><circle cx="12" cy="12" r="3"/></svg>,
  <svg key="i2" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10m0 0l-3 3m3-3l3 3"/><path d="M12 4V2"/><path d="M4 14h16"/><rect x="2" y="6" width="20" height="12" rx="2"/></svg>,
  <svg key="i3" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 6v12"/><path d="M2 12h20"/><path d="M6 2v4m12-4v4"/></svg>,
  <svg key="i4" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4"/><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="M12 6v1m0 10v1"/></svg>,
  <svg key="i5" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
]

export default function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <Link
      href={`/tjenester/${service.slug.current}`}
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
      <div style={{ marginBottom: 20 }}>
        {ICONS[index % ICONS.length]}
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
