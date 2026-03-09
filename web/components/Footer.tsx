'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { SiteSettings } from '@/lib/types'

interface FooterProps {
  settings?: SiteSettings | null
}

const services = [
  { label: 'Service og vedlikehold', href: '/#tjenester' },
  { label: 'Kanalrens', href: '/#tjenester' },
  { label: 'Innregulering', href: '/#tjenester' },
  { label: 'Montasje og utskifting', href: '/#tjenester' },
  { label: 'Serviceavtale', href: '/#tjenester' },
]

const company = [
  { label: 'Om oss', href: '/om-oss' },
  { label: 'Borettslag', href: '/borettslag' },
  { label: 'Galleri', href: '/galleri' },
  { label: 'Artikler', href: '/blog' },
  { label: 'Kontakt', href: '/kontakt' },
]

const suppliers = ['Systemair', 'Flexit', 'Swegon', 'Ventiståhl']

const certifications = ['Miljøsertifisert', 'EKOM Autorisasjon', 'Sentral Godkjent']

export default function Footer({ settings }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        background: 'var(--off)',
        borderTop: '1px solid var(--ll)',
        padding: '72px 5% 40px',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: 56,
          maxWidth: 1160,
          margin: '0 auto',
        }}
        className="footer-grid"
      >
        {/* Brand column */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.15rem',
                fontWeight: 700,
                color: 'var(--ink)',
                whiteSpace: 'nowrap',
              }}
            >
              Straume <span style={{ color: 'var(--amber)' }}>Boligvent</span>
            </div>
            <span style={{ color: 'var(--lm)', fontSize: '1rem', fontWeight: 300, lineHeight: 1 }}>|</span>
            <Image
              src="https://ucarecdn.com/09cfc539-0376-4f05-a8a6-113d3739a405/Straume_Tekniske_AS_Lys.png"
              alt="Straume Tekniske AS"
              height={14}
              width={88}
              style={{ objectFit: 'contain', objectPosition: 'left', opacity: 1, flexShrink: 0 }}
              unoptimized
            />
          </div>
          <div
            style={{
              fontSize: '0.82rem',
              color: 'var(--muted)',
              marginBottom: 28,
              fontWeight: 300,
              lineHeight: 1.6,
            }}
          >
            Service og vedlikehold av ventilasjonsanlegg i Bergen og omegn.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { lbl: 'TLF', val: settings?.phone || '561 26 800' },
              { lbl: 'E', val: settings?.email || 'ordre@straumetekniske.no' },
              { lbl: 'ADR', val: settings?.address || 'Idrettsveien 93, 5353 Straume' },
            ].map((row) => (
              <div key={row.lbl} style={{ display: 'flex', gap: 12 }}>
                <span
                  style={{
                    fontSize: '0.62rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--sec)',
                    width: 36,
                    paddingTop: 2,
                  }}
                >
                  {row.lbl}
                </span>
                <span style={{ fontSize: '0.82rem', color: 'var(--muted)', fontWeight: 300 }}>
                  {row.val}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Services column */}
        <div>
          <div
            style={{
              fontSize: '0.62rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--sec)',
              marginBottom: 20,
            }}
          >
            Tjenester
          </div>
          {services.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              style={{
                display: 'block',
                fontSize: '0.84rem',
                color: 'var(--muted)',
                textDecoration: 'none',
                marginBottom: 12,
                fontWeight: 300,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
            >
              {s.label}
            </Link>
          ))}
        </div>

        {/* Company column */}
        <div>
          <div
            style={{
              fontSize: '0.62rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--sec)',
              marginBottom: 20,
            }}
          >
            Selskapet
          </div>
          {company.map((c) => (
            <Link
              key={c.label}
              href={c.href}
              style={{
                display: 'block',
                fontSize: '0.84rem',
                color: 'var(--muted)',
                textDecoration: 'none',
                marginBottom: 12,
                fontWeight: 300,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
            >
              {c.label}
            </Link>
          ))}
        </div>

        {/* Suppliers column */}
        <div>
          <div
            style={{
              fontSize: '0.62rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--sec)',
              marginBottom: 20,
            }}
          >
            Leverandører
          </div>
          {suppliers.map((s) => (
            <span
              key={s}
              style={{
                display: 'block',
                fontSize: '0.84rem',
                color: 'var(--muted)',
                marginBottom: 12,
                fontWeight: 300,
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div
        style={{
          maxWidth: 1160,
          margin: '48px auto 0',
          paddingTop: 28,
          borderTop: '1px solid var(--ll)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          flexWrap: 'wrap',
        }}
      >
        <span style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--sec)', marginRight: 4 }}>
          Sertifiseringer
        </span>
        {certifications.map((cert) => (
          <span
            key={cert}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: '0.78rem',
              color: 'var(--muted)',
              fontWeight: 400,
              padding: '5px 14px',
              background: 'var(--white)',
              border: '1px solid var(--ll)',
              borderRadius: 100,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="var(--amber)" strokeWidth="2">
              <path d="M16.67 5L7.5 14.17 3.33 10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {cert}
          </span>
        ))}
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: 1160,
          margin: '24px auto 0',
          paddingTop: 24,
          borderTop: '1px solid var(--ll)',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.75rem',
          color: 'var(--sec)',
          fontWeight: 300,
        }}
        className="footer-bottom"
      >
        <span>© {year} Straume Tekniske AS</span>
        <span>{settings?.orgNumber ? `Org.nr ${settings.orgNumber}` : 'Org.nr 998 766 834'}</span>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr !important; }
          .footer-bottom { flex-direction: column; gap: 8px; }
        }
      `}</style>
    </footer>
  )
}
