import Link from 'next/link'
import type { SiteSettings } from '@/lib/types'

interface HeroProps {
  settings?: SiteSettings | null
}

const trustItems = [
  'Tydelig pris før oppstart',
  'Dokumentasjon etter hvert besøk',
  'Kun nødvendige tiltak',
  'Svar innen 24 timer',
]

export default function Hero({ settings }: HeroProps) {
  const title = settings?.heroTitle || 'Komplett leveranse innen ventilasjon'
  const desc =
    settings?.heroDescription ||
    'Vi leverer service, rens, innregulering og montasje – og tar ansvar fra start til slutt. Én leverandør, fullt ansvar.'
  const pill = settings?.heroPill || 'Bergen og omegn · Siden 2012'

  return (
    <section
      id="hero"
      style={{
        background: 'var(--white)',
        minHeight: '100vh',
        padding: '68px 5% 0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div
        className="hero-inner"
        style={{
          maxWidth: 1160,
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1.05fr',
          gap: 80,
          alignItems: 'center',
          paddingTop: 56,
        }}
      >
        {/* Left: text */}
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'var(--abg)',
              border: '1px solid var(--amid)',
              borderRadius: 100,
              padding: '6px 16px 6px 10px',
              marginBottom: 28,
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: 'var(--amber)',
                flexShrink: 0,
                boxShadow: '0 0 0 3px rgba(240,165,0,0.2)',
              }}
            />
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                color: 'var(--adark)',
              }}
            >
              {pill}
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(3rem, 5vw, 4.6rem)',
              fontWeight: 800,
              lineHeight: 1.04,
              color: 'var(--ink)',
              letterSpacing: '-0.02em',
              marginBottom: 24,
            }}
          >
            {title.includes('ventilasjon') ? (
              <>
                {title.split('ventilasjon')[0]}
                <em
                  style={{
                    fontStyle: 'italic',
                    fontWeight: 700,
                    color: 'var(--ink)',
                  }}
                >
                  ventilasjon
                </em>
                {title.split('ventilasjon')[1]}
              </>
            ) : (
              title
            )}
          </h1>

          <p
            style={{
              fontSize: '1.05rem',
              lineHeight: 1.78,
              color: 'var(--muted)',
              fontWeight: 300,
              maxWidth: 440,
              marginBottom: 40,
            }}
          >
            {desc}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            <Link href="/kontakt" className="btn-amber">
              Ta kontakt
            </Link>
            <Link href="/#tjenester" className="btn-ghost">
              Se tjenester <span className="arrow">→</span>
            </Link>
          </div>
        </div>

        {/* Right: image + stats card */}
        <div style={{ position: 'relative' }}>
          <div
            style={{
              borderRadius: 8,
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 24px 64px rgba(20,16,8,0.14)',
            }}
          >
            {/* Placeholder image – replace with next/image + Sanity when image is added */}
            <div
              style={{
                width: '100%',
                aspectRatio: '4/3',
                background: 'linear-gradient(145deg, #ddd6c8 0%, #b8ae9e 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                style={{ opacity: 0.3 }}
              >
                <circle cx="32" cy="32" r="28" stroke="#2e2820" strokeWidth="2" />
                <circle cx="32" cy="32" r="14" stroke="#2e2820" strokeWidth="2" />
                <circle cx="32" cy="32" r="4" fill="#2e2820" />
                <line x1="32" y1="4" x2="32" y2="18" stroke="#2e2820" strokeWidth="2" />
                <line x1="32" y1="46" x2="32" y2="60" stroke="#2e2820" strokeWidth="2" />
                <line x1="4" y1="32" x2="18" y2="32" stroke="#2e2820" strokeWidth="2" />
                <line x1="46" y1="32" x2="60" y2="32" stroke="#2e2820" strokeWidth="2" />
              </svg>
            </div>

            {/* Stats card overlay */}
            <div
              style={{
                position: 'absolute',
                bottom: -1,
                left: -1,
                background: 'white',
                borderRadius: '0 8px 0 8px',
                padding: '18px 28px',
                display: 'flex',
                gap: 32,
                boxShadow: '0 8px 32px rgba(20,16,8,0.1)',
                borderTop: '1px solid var(--ll)',
                borderRight: '1px solid var(--ll)',
              }}
            >
              {[
                { num: '12+', lbl: 'År i bransjen' },
                { num: '1 dag', lbl: 'Responstid' },
              ].map((s) => (
                <div key={s.lbl}>
                  <div
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: '1.8rem',
                      fontWeight: 700,
                      color: 'var(--ink)',
                      lineHeight: 1,
                    }}
                  >
                    {s.num}
                  </div>
                  <div
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 400,
                      color: 'var(--sec)',
                      marginTop: 5,
                      letterSpacing: '0.04em',
                    }}
                  >
                    {s.lbl}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div
        style={{
          maxWidth: 1160,
          margin: '0 auto',
          width: '100%',
          borderTop: '1px solid var(--ll)',
          marginTop: 64,
          padding: '24px 0',
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 0,
        }}
      >
        {trustItems.map((item) => (
          <div
            key={item}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontSize: '0.84rem',
              color: 'var(--muted)',
              fontWeight: 400,
              paddingRight: 40,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: 'var(--abg)',
                border: '1.5px solid var(--amid)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                color: 'var(--adark)',
                fontSize: '0.65rem',
                fontWeight: 700,
              }}
            >
              ✓
            </div>
            {item}
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 980px) {
          .hero-inner { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  )
}
