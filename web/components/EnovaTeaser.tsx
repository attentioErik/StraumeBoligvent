import Link from 'next/link'
import type { Enova } from '@/lib/types'

interface EnovaTeaserProps {
  enova?: Enova | null
}

const FALLBACK = {
  teaserLabel: 'Enova-støtte',
  teaserTittel: 'Få støtte til nytt ventilasjonsanlegg',
  teaserTekst:
    'Velger du balansert ventilasjon med varmegjenvinning, kan du søke Enova om økonomisk støtte. Vi leverer anlegg som kvalifiserer – og hjelper deg med dokumentasjonen.',
  teaserCtaTekst: 'Les om Enova-støtte',
}

export default function EnovaTeaser({ enova }: EnovaTeaserProps) {
  const label = enova?.teaserLabel || FALLBACK.teaserLabel
  const tittel = enova?.teaserTittel || FALLBACK.teaserTittel
  const tekst = enova?.teaserTekst || FALLBACK.teaserTekst
  const cta = enova?.teaserCtaTekst || FALLBACK.teaserCtaTekst

  return (
    <section style={{ background: 'var(--warm)', padding: '64px 5%' }}>
      <div className="inner">
        <div
          className="enova-teaser reveal"
          style={{
            background: 'var(--abg)',
            border: '1px solid var(--amid)',
            borderLeft: '3px solid var(--amber)',
            borderRadius: '0 8px 8px 0',
            padding: '40px 44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 40,
          }}
        >
          <div style={{ maxWidth: 640 }}>
            <div className="slabel" style={{ marginBottom: 14 }}>{label}</div>
            <h2
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(1.5rem, 2.4vw, 2rem)',
                fontWeight: 700,
                color: 'var(--ink)',
                lineHeight: 1.15,
                marginBottom: 12,
                letterSpacing: '-0.01em',
              }}
            >
              {tittel}
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--body)', lineHeight: 1.75, fontWeight: 300 }}>
              {tekst}
            </p>
          </div>
          <div style={{ flexShrink: 0 }}>
            <Link href="/enova" className="btn-amber">{cta} →</Link>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 760px) {
          .enova-teaser {
            flex-direction: column !important;
            align-items: flex-start !important;
            padding: 32px 28px !important;
          }
        }
      `}</style>
    </section>
  )
}
