'use client'

import Link from 'next/link'
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
  { label: 'Referanser', href: '/referanser' },
  { label: 'Artikler', href: '/blog' },
  { label: 'Kontakt', href: '/kontakt' },
]

const suppliers = ['Systemair', 'Flexit', 'Swegon', 'Ventiståhl']

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
          <div
            style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--sec)',
              marginBottom: 10,
            }}
          >
            Straume Tekniske
          </div>
          <div
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '1.2rem',
              fontWeight: 700,
              color: 'var(--ink)',
              marginBottom: 12,
            }}
          >
            Straume Boligvent
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
              { lbl: 'E', val: settings?.email || 'service@straumetekniske.no' },
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

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: 1160,
          margin: '52px auto 0',
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
        <span>{settings?.orgNumber ? `Org.nr ${settings.orgNumber}` : 'Org.nr 000 000 000'}</span>
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
