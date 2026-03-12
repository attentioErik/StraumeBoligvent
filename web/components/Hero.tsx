import Link from 'next/link'
import Image from 'next/image'
import type { SiteSettings, Forside } from '@/lib/types'
import { urlFor } from '@/lib/sanity'

interface HeroProps {
  settings?: SiteSettings | null
  forside?: Forside | null
}

const DEFAULT_TRUST = [
  'Tydelig pris før oppstart',
  'Langsiktig oppfølging',
  'Kun nødvendige tiltak',
  'Svar innen 24 timer',
]

export default function Hero({ settings, forside }: HeroProps) {
  const title = settings?.heroTitle || 'Ventilasjonsservice i Bergen – én leverandør, fullt ansvar'
  const desc =
    settings?.heroDescription ||
    'Service, rens, innregulering og montasje. Vi tar ansvar fra start til slutt.'
  const pill = settings?.heroPill || 'Bergen og omegn · Siden 2012'
  const trustItems = forside?.trustItems ?? DEFAULT_TRUST

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
              marginBottom: 24,
            }}
          >
            {desc}
          </p>

          {/* Google rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 36, flexWrap: 'wrap' }}>
            <svg width="20" height="20" viewBox="0 0 48 48" style={{ flexShrink: 0 }}>
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.0 24.0 0 0 0 0 21.56l7.98-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            <div style={{ display: 'flex', gap: 2 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} width="18" height="18" viewBox="0 0 20 20" fill={star <= 4 ? 'var(--amber)' : 'none'} stroke="var(--amber)" strokeWidth="1.5">
                  <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.49L10 14.27 5.06 16.7 6 11.21l-4-3.9 5.53-.8L10 1.5z" />
                  {star === 5 && (
                    <defs>
                      <linearGradient id="heroHalfStar">
                        <stop offset="80%" stopColor="var(--amber)" />
                        <stop offset="80%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                  )}
                  {star === 5 && <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.49L10 14.27 5.06 16.7 6 11.21l-4-3.9 5.53-.8L10 1.5z" fill="url(#heroHalfStar)" />}
                </svg>
              ))}
            </div>
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--ink)' }}>{forside?.googleRating ?? '4,9/5'}</span>
          </div>

          <div className="hero-cta" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            <Link href="/kontakt" className="btn-amber">
              {forside?.heroCta1Tekst ?? 'Ta kontakt'}
            </Link>
            <Link href="/#tjenester" className="btn-ghost">
              {forside?.heroCta2Tekst ?? 'Se tjenester'} <span className="arrow">→</span>
            </Link>
          </div>
        </div>

        {/* Right: image + stats card */}
        <div className="hero-img-col" style={{ position: 'relative' }}>
          <div
            style={{
              borderRadius: 8,
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 24px 64px rgba(20,16,8,0.14)',
            }}
          >
            <div style={{ width: '100%', aspectRatio: '4/3', position: 'relative' }}>
              <Image
                src={forside?.heroBilde
                  ? urlFor(forside.heroBilde).width(1200).height(900).url()
                  : 'https://ucarecdn.com/6cc61d81-b2bf-479a-9788-bd64ef95bda3/hf_20260224_115355_7dfea640c8064601919f0871635df4e8.jpeg'}
                alt="Ventilasjonsservice"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
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
              {(forside?.heroStats ?? [
                { verdi: '12+', label: 'År i bransjen' },
                { verdi: '1 dag', label: 'Responstid' },
              ]).map((s) => (
                <div key={s.label}>
                  <div
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: '1.8rem',
                      fontWeight: 700,
                      color: 'var(--ink)',
                      lineHeight: 1,
                    }}
                  >
                    {s.verdi}
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
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div
        className="trust-bar"
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
            className="trust-item"
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

      {/* Partner logos */}
      <div
        className="partner-bar"
        style={{
          maxWidth: 1160,
          margin: '0 auto',
          width: '100%',
          borderTop: '1px solid var(--ll)',
          padding: '24px 0',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          flexWrap: 'wrap',
        }}
      >
        <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--sec)', marginRight: 8 }}>
          {forside?.partnerLabel ?? 'Samarbeidspartnere'}
        </span>
        {(forside?.partnere ?? ['Swegon', 'Flexit', 'Ventistål', 'Systemair']).map((partner) => (
          <span
            key={partner}
            style={{
              fontSize: '0.82rem',
              color: 'var(--muted)',
              fontWeight: 400,
              padding: '6px 16px',
              background: 'var(--off)',
              border: '1px solid var(--ll)',
              borderRadius: 100,
            }}
          >
            {partner}
          </span>
        ))}
      </div>

      <style>{`
        @media (max-width: 980px) {
          .hero-inner { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
        @media (max-width: 640px) {
          #hero { min-height: auto !important; padding-bottom: 48px !important; }
          #hero h1 { font-size: clamp(2rem, 8vw, 3rem) !important; }
          .trust-bar { margin-top: 40px !important; padding: '16px 0' !important; }
        }
      `}</style>
    </section>
  )
}
