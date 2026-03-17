'use client'

import Link from 'next/link'
import type { Priser } from '@/lib/types'

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, stroke: 'var(--amber)', fill: 'none', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', flexShrink: 0, marginTop: 2 }}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
)

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: 12, height: 12, stroke: 'var(--amber)', fill: 'none', strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round' }}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

interface PricingSectionProps {
  priser: Priser | null
  compact?: boolean
}

export default function PricingSection({ priser, compact }: PricingSectionProps) {
  const kort = priser?.kort ?? [
    {
      _key: '1',
      tittel: 'Ventilasjonsservice',
      beskrivelse: 'Vi kontrollerer ventilasjonsanlegget og gir deg en tydelig vurdering av tilstand, drift og eventuelle tiltak for å sikre godt inneklima i boligen.',
      prisLabel: 'Fra',
      pris: '2 600,–',
      inkludertLabel: 'Inkludert:',
      inkludert: ['Kontroll av ventilasjonsaggregat', 'Gjennomgang av drift og alarmer', 'Vurdering av anleggets tilstand', 'Veiledning om drift, vedlikehold og eventuelle tiltak'],
      cta1Tekst: 'Be om vurdering',
      cta1Lenke: '/kontakt',
      cta2Tekst: 'Les mer',
      cta2Lenke: '/tjenester/ventilasjonsservice',
    },
    {
      _key: '2',
      tittel: 'Kanalrens',
      beskrivelse: 'Rens av ventilasjonskanaler og ventiler som gir bedre luftstrøm og et sunnere inneklima i boligen.',
      prisLabel: 'Fra',
      pris: '4 250,–',
      featured: true,
      badge: 'Mest valgt',
      inkludertLabel: 'Inkludert:',
      inkludert: ['Rens av ventilasjonskanaler', 'Rengjøring av ventiler', 'Kontroll av luftstrøm', 'Tilbakemelding på anleggets tilstand'],
      cta1Tekst: 'Be om vurdering',
      cta1Lenke: '/kontakt',
      cta2Tekst: 'Les mer',
      cta2Lenke: '/tjenester/kanalrens',
    },
    {
      _key: '3',
      tittel: 'Nytt ventilasjonsaggregat',
      beskrivelse: 'Utskifting av gammelt ventilasjonsaggregat eller installasjon av nytt ventilasjonsanlegg tilpasset boligen din.',
      pris: 'Pris etter befaring',
      inkludertLabel: 'Inkludert:',
      inkludert: ['Befaring og vurdering av løsning', 'Levering av nytt ventilasjonsaggregat', 'Montering og tilkobling', 'Gjennomgang av anlegget etter installasjon'],
      cta1Tekst: 'Be om vurdering',
      cta1Lenke: '/kontakt',
      cta2Tekst: 'Les mer',
      cta2Lenke: '/tjenester/nytt-aggregat',
    },
  ]

  const fotnoteTekst = priser?.fotnoteTekst ?? 'Usikker på hva ventilasjonen trenger? Vi hjelper deg å vurdere anlegget.'
  const fotnoteCtaTekst = priser?.fotnoteCtaTekst ?? 'Ta kontakt'
  const fotnoteCtaLenke = priser?.fotnoteCtaLenke ?? '/kontakt'

  return (
    <section className="pricing-section" style={{ maxWidth: 1160, margin: '0 auto', padding: compact ? '0' : '100px 48px 120px', textAlign: 'center' }}>
      {!compact && (
        <>
          <h1 className="pricing-heading reveal" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 600, color: 'var(--ink)', marginBottom: 16 }}>
            {priser?.tittel ?? 'Tjenester for ventilasjon i bolig'}
          </h1>
          <p className="reveal" style={{ fontSize: '1rem', color: 'var(--muted)', maxWidth: 500, margin: '0 auto 72px' }}>
            {priser?.beskrivelse ?? 'Vi hjelper deg med service, kanalrens og utskifting av ventilasjonsaggregat – tilpasset anlegget og behovet i boligen din.'}
          </p>
        </>
      )}

      <div className="pricing-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, textAlign: 'left' }}>
        {kort.map((card, idx) => {
          const isCustomPrice = !card.prisLabel && card.pris && card.pris.length > 10
          return (
            <div
              key={card._key || idx}
              className={`pricing-card reveal${card.featured ? ' pricing-featured' : ''}`}
              style={{
                background: 'var(--white)',
                border: card.featured ? '1.5px solid rgba(240,165,0,0.35)' : '1px solid rgba(0,0,0,0.09)',
                borderRadius: 6,
                display: 'grid',
                gridTemplateRows: '3px auto auto auto auto 1fr auto',
                position: 'relative',
                transition: 'box-shadow 0.3s, transform 0.3s',
              }}
            >
              {/* Top accent bar */}
              <div className="pricing-card-bar" style={{ height: 3, background: card.featured ? 'var(--amber)' : 'transparent', borderRadius: '5px 5px 0 0', transition: 'background 0.3s' }} />

              {/* Badge */}
              {card.featured && card.badge && (
                <div style={{
                  position: 'absolute', top: -15, left: '50%', transform: 'translateX(-50%)',
                  background: 'var(--amber)', color: '#1a1a1a', fontSize: '0.62rem', fontWeight: 700,
                  letterSpacing: '0.14em', textTransform: 'uppercase', padding: '5px 16px',
                  borderRadius: 20, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <span style={{ fontSize: '0.7rem' }}>&#9733;</span> {card.badge}
                </div>
              )}

              {/* Title */}
              <div style={{ padding: '32px 32px 0', minHeight: 72, display: 'flex', alignItems: 'flex-start' }}>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.25rem', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.25 }}>
                  {card.tittel}
                </h2>
              </div>

              {/* Description */}
              <div style={{ padding: '10px 32px 0', minHeight: 100 }}>
                <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.65 }}>
                  {card.beskrivelse}
                </p>
              </div>

              {/* Price */}
              <div style={{ padding: '20px 32px 0' }}>
                {card.prisLabel && (
                  <span style={{ fontSize: '0.72rem', color: 'var(--muted)', letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>
                    {card.prisLabel}
                  </span>
                )}
                <span style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: isCustomPrice ? '1.6rem' : '2.8rem',
                  fontWeight: 600, color: 'var(--amber)', letterSpacing: '-0.02em', lineHeight: isCustomPrice ? 1.3 : 1,
                }}>
                  {card.pris}
                </span>
                <hr style={{ border: 'none', borderTop: '1px solid rgba(0,0,0,0.09)', marginTop: 20 }} />
              </div>

              {/* Includes label */}
              <div style={{ padding: '20px 32px 0' }}>
                <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink)', letterSpacing: '0.03em', textTransform: 'uppercase' }}>
                  {card.inkludertLabel ?? 'Inkludert:'}
                </p>
              </div>

              {/* Includes list */}
              <div style={{ padding: '10px 32px 20px', alignSelf: 'start' }}>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {(card.inkludert ?? []).map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.5 }}>
                      <CheckIcon />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer */}
              <div style={{ padding: '24px 32px 32px', borderTop: '1px solid rgba(0,0,0,0.09)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <Link
                    href={card.cta1Lenke ?? '/kontakt'}
                    style={{
                      display: 'block', background: 'var(--amber)', color: '#1a1a1a',
                      fontFamily: 'Lato, sans-serif', fontSize: '0.8rem', fontWeight: 700,
                      letterSpacing: '0.05em', textDecoration: 'none', textAlign: 'center',
                      padding: '13px 12px', borderRadius: 4, border: 'none',
                      transition: 'background 0.2s, transform 0.15s', whiteSpace: 'nowrap',
                    }}
                    className="pricing-btn"
                  >
                    {card.cta1Tekst ?? 'Be om vurdering'}
                  </Link>
                  {card.cta2Lenke && (
                    <Link
                      href={card.cta2Lenke}
                      style={{
                        display: 'block', background: 'transparent', color: 'var(--ink)',
                        fontFamily: 'Lato, sans-serif', fontSize: '0.8rem', fontWeight: 700,
                        letterSpacing: '0.05em', textDecoration: 'none', textAlign: 'center',
                        padding: '13px 12px', borderRadius: 4, border: '1px solid rgba(0,0,0,0.09)',
                        transition: 'border-color 0.2s, color 0.2s', whiteSpace: 'nowrap',
                      }}
                      className="pricing-btn-outline"
                    >
                      {card.cta2Tekst ?? 'Les mer'}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footnote */}
      <div className="reveal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, flexWrap: 'wrap', marginTop: 96, fontSize: '1.05rem', color: 'var(--muted)', textAlign: 'center' }}>
        <span>{fotnoteTekst}</span>
        <Link
          href={fotnoteCtaLenke}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.04em',
            color: 'var(--amber)', textDecoration: 'none',
            borderBottom: '1px solid rgba(240,165,0,0.35)', paddingBottom: 1,
            transition: 'border-color 0.2s, gap 0.2s', whiteSpace: 'nowrap',
          }}
          className="pricing-footnote-cta"
        >
          {fotnoteCtaTekst} <ArrowIcon />
        </Link>
      </div>

      <style>{`
        .pricing-card:hover { transform: translateY(-5px); box-shadow: 0 20px 56px rgba(0,0,0,0.09); }
        .pricing-card:hover .pricing-card-bar { background: var(--amber) !important; }
        .pricing-btn:hover { background: var(--amid) !important; transform: translateY(-1px); }
        .pricing-btn-outline:hover { border-color: var(--amber) !important; color: var(--amber) !important; }
        .pricing-footnote-cta:hover { border-color: var(--amber) !important; gap: 8px !important; }
        @media (max-width: 860px) {
          .pricing-cards-grid { grid-template-columns: 1fr !important; max-width: 460px; margin: 0 auto; }
          .pricing-section { padding: 64px 24px 80px !important; }
          .pricing-featured { margin-top: 22px; }
        }
      `}</style>
    </section>
  )
}
