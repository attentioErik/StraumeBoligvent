export const revalidate = 60

import { client } from '@/lib/sanity'
import { borettslagLandingQuery } from '@/lib/queries'
import type { BorettslagLanding } from '@/lib/types'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'For borettslag og sameier',
  description: 'Profesjonell vedlikehold og service av ventilasjonsanlegg for borettslag og sameier. Tilbud til styret.',
}

const FALLBACK: BorettslagLanding = {
  heroTittel: 'Er du styreleder i borettslag eller sameie?',
  heroUnderTittel: 'Vi hjelper styrer med profesjonell vedlikehold av ventilasjonsanlegg – tydelig dokumentasjon og fast oppfølging.',
  utfordringer: [
    'Ukjent tilstand på felles ventilasjonsanlegg',
    'Klager fra beboere på støy eller lukt',
    'Manglende dokumentasjon til styret',
    'Usikkerhet rundt vedlikeholdsintervaller',
    'Høye energikostnader fra slitte aggregater',
  ],
  tjenester: [
    { tittel: 'Serviceavtale', beskrivelse: 'Fast avtale med planlagte besøk, dokumentasjon til styret og prioritert oppfølging ved feil.' },
    { tittel: 'Tilstandsrapport', beskrivelse: 'Komplett gjennomgang av anlegget med rapport som anbefaler tiltak og prioriterer budsjett.' },
    { tittel: 'Kanalrens', beskrivelse: 'Rengjøring av kanaler og aggregat for bedre inneklima og lavere energibruk i hele bygget.' },
    { tittel: 'Utskifting', beskrivelse: 'Vurdering og gjennomføring av utskifting av eldre aggregater – med anbudsdokumentasjon.' },
  ],
  prosessSteg: [
    { tittel: 'Befaring', beskrivelse: 'Vi kartlegger anlegget og byggets behov uten forpliktelser.' },
    { tittel: 'Tilbud', beskrivelse: 'Tydelig tilbud med spesifikasjoner, tidsplan og pris.' },
    { tittel: 'Gjennomføring', beskrivelse: 'Arbeid utføres med minimal forstyrrelse for beboere.' },
    { tittel: 'Dokumentasjon', beskrivelse: 'Styret mottar komplett rapport med målinger og anbefalinger.' },
  ],
  hvordforOss: [
    'Lang erfaring med borettslag og sameier i Bergen',
    'Tydelig dokumentasjon tilpasset styret',
    'Én kontaktperson – ett ansvar',
    'Sertifiserte teknikere med kompetanse på alle merker',
    'Ingen skjulte kostnader',
  ],
  faq: [
    { sporsmal: 'Hvor ofte bør borettslag ha service på ventilasjonsanlegget?', svar: 'De fleste anlegg bør ha service én gang per år. Vi anbefaler konkret intervall etter befaring.' },
    { sporsmal: 'Hva koster en serviceavtale?', svar: 'Pris avhenger av anleggets størrelse og omfang. Vi gir alltid et tydelig tilbud uten skjulte kostnader.' },
    { sporsmal: 'Kan dere gi tilbud til styremøtet?', svar: 'Ja. Vi leverer dokumentasjon som er tilpasset styrebehandling – inkl. teknisk beskrivelse og prisbilde.' },
    { sporsmal: 'Forstyrres beboerne under service?', svar: 'Vi planlegger arbeidet for minimal forstyrrelse. Beboere varsles på forhånd ved behov for adkomst til leiligheter.' },
  ],
}

export default async function BorettslagPage() {
  const data = await client.fetch<BorettslagLanding>(borettslagLandingQuery).catch(() => null)
  const p = data ?? FALLBACK

  return (
    <>
      {/* ─── HERO ─── */}
      <section
        style={{
          background: 'var(--dark)',
          padding: '120px 5% 100px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="inner" style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(240,165,0,0.12)',
              border: '1px solid rgba(240,165,0,0.35)',
              borderRadius: 100,
              padding: '6px 16px 6px 10px',
              marginBottom: 28,
            }}
          >
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--amber)', boxShadow: '0 0 0 3px rgba(240,165,0,0.2)' }} />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.06em', color: 'var(--amber)' }}>For borettslag og sameier</span>
          </div>
          <h1
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2.4rem, 4.5vw, 4rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              color: '#f5f0e8',
              letterSpacing: '-0.02em',
              maxWidth: 760,
              marginBottom: 24,
            }}
          >
            {p.heroTittel}
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.78, color: '#7a6e5e', fontWeight: 300, maxWidth: 580, marginBottom: 48 }}>
            {p.heroUnderTittel}
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Link href="/kontakt" className="btn-amber">Få et tilbud</Link>
            <a href="tel:56126800" className="btn-ghost" style={{ color: '#a09280', borderColor: '#3a3228' }}>Ring 561 26 800 →</a>
          </div>
        </div>
      </section>

      {/* ─── UTFORDRINGER ─── */}
      {p.utfordringer && p.utfordringer.length > 0 && (
        <section style={{ background: 'var(--warm)', padding: '80px 5%' }}>
          <div className="inner">
            <div className="slabel reveal">Typiske utfordringer</div>
            <h2 className="stitle reveal">Kjenner du deg igjen?</h2>
            <div
              className="uf-grid"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 48 }}
            >
              {p.utfordringer.map((u, i) => (
                <div
                  key={i}
                  className="reveal"
                  style={{
                    background: 'var(--white)',
                    border: '1px solid var(--ll)',
                    borderLeft: '3px solid var(--amber)',
                    borderRadius: '0 6px 6px 0',
                    padding: '20px 24px',
                    fontSize: '0.9rem',
                    color: 'var(--body)',
                    lineHeight: 1.6,
                  }}
                >
                  {u}
                </div>
              ))}
            </div>
          </div>
          <style>{`
            @media (max-width: 980px) { .uf-grid { grid-template-columns: 1fr 1fr !important; } }
            @media (max-width: 640px) { .uf-grid { grid-template-columns: 1fr !important; } }
          `}</style>
        </section>
      )}

      {/* ─── TJENESTER ─── */}
      {p.tjenester && p.tjenester.length > 0 && (
        <section style={{ background: 'var(--off)', padding: '80px 5%' }}>
          <div className="inner">
            <div className="slabel reveal">Hva vi tilbyr</div>
            <h2 className="stitle reveal">Tjenester for borettslag</h2>
            <div
              className="brl-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 1,
                marginTop: 48,
                border: '1px solid var(--ll)',
                borderRadius: 4,
                overflow: 'hidden',
              }}
            >
              {p.tjenester.map((t, i) => (
                <div
                  key={i}
                  className="reveal"
                  style={{
                    background: 'var(--white)',
                    padding: '40px 36px',
                    borderRight: i % 2 === 0 ? '1px solid var(--ll)' : undefined,
                    borderBottom: i < (p.tjenester!.length - 2) ? '1px solid var(--ll)' : undefined,
                  }}
                >
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
                    {t.tittel}
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300 }}>{t.beskrivelse}</p>
                </div>
              ))}
            </div>
          </div>
          <style>{`
            @media (max-width: 640px) { .brl-grid { grid-template-columns: 1fr !important; } }
          `}</style>
        </section>
      )}

      {/* ─── PROSESS ─── */}
      {p.prosessSteg && p.prosessSteg.length > 0 && (
        <section style={{ background: 'var(--dark)', padding: '80px 5%' }}>
          <div className="inner">
            <div className="slabel reveal" style={{ color: 'var(--amid)' }}>Arbeidsmetode</div>
            <h2 className="stitle reveal" style={{ color: '#f5f0e8' }}>Slik samarbeider vi</h2>
            <div
              className="brl-prosess"
              style={{ display: 'grid', gridTemplateColumns: `repeat(${p.prosessSteg.length}, 1fr)`, gap: 1, marginTop: 56, background: 'var(--dark3)', borderRadius: 6, overflow: 'hidden' }}
            >
              {p.prosessSteg.map((steg, i) => (
                <div
                  key={i}
                  className="reveal"
                  style={{ background: 'var(--dark2)', padding: '40px 32px' }}
                >
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', fontWeight: 700, color: 'var(--amber)', lineHeight: 1, marginBottom: 24 }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '0.95rem', fontWeight: 700, color: '#e8dfc8', marginBottom: 12 }}>
                    {steg.tittel}
                  </div>
                  <p style={{ fontSize: '0.845rem', color: '#7a6e5e', lineHeight: 1.65, fontWeight: 300 }}>{steg.beskrivelse}</p>
                </div>
              ))}
            </div>
          </div>
          <style>{`
            @media (max-width: 980px) { .brl-prosess { grid-template-columns: 1fr 1fr !important; } }
            @media (max-width: 640px) { .brl-prosess { grid-template-columns: 1fr !important; } }
          `}</style>
        </section>
      )}

      {/* ─── HVORFOR OSS ─── */}
      {p.hvordforOss && p.hvordforOss.length > 0 && (
        <section style={{ background: 'var(--white)', padding: '80px 5%' }}>
          <div className="inner">
            <div
              className="split"
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}
            >
              <div className="reveal">
                <div className="slabel">Vår fordel</div>
                <h2 className="stitle">Derfor velger borettslag oss</h2>
                <div className="checklist" style={{ marginTop: 32 }}>
                  {p.hvordforOss.map((punkt, i) => (
                    <div key={i} className="citem">
                      <div className="cicon">✓</div>
                      {punkt}
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 16, marginTop: 40, flexWrap: 'wrap' }}>
                  <Link href="/kontakt" className="btn-amber">Be om befaring</Link>
                  <Link href="/referanser" className="btn-ghost">Se referanser →</Link>
                </div>
              </div>
              <div className="reveal">
                <div
                  style={{
                    background: 'var(--abg)',
                    border: '1px solid var(--amid)',
                    borderRadius: 8,
                    padding: '40px',
                  }}
                >
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.8rem', fontWeight: 800, color: 'var(--amber)', lineHeight: 1, marginBottom: 8 }}>100%</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--adark)', fontWeight: 600, marginBottom: 28 }}>Dokumenterte oppdrag</div>
                  <div style={{ borderTop: '1px solid var(--amid)', paddingTop: 24 }}>
                    <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 800, color: 'var(--ink)', lineHeight: 1, marginBottom: 8 }}>1 dag</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 300 }}>Responstid på henvendelser</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <style>{`
            @media (max-width: 980px) { .split { grid-template-columns: 1fr !important; gap: 48px !important; } }
          `}</style>
        </section>
      )}

      {/* ─── FAQ ─── */}
      {p.faq && p.faq.length > 0 && (
        <section style={{ background: 'var(--off)', padding: '80px 5%' }}>
          <div className="inner" style={{ maxWidth: 800 }}>
            <div className="slabel reveal">Spørsmål og svar</div>
            <h2 className="stitle reveal">Vanlige spørsmål fra styret</h2>
            <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 0 }}>
              {p.faq.map((item, i) => (
                <div
                  key={i}
                  className="reveal"
                  style={{ borderBottom: '1px solid var(--ll)', padding: '28px 0' }}
                >
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
                    {item.sporsmal}
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300 }}>{item.svar}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ─── */}
      <section style={{ background: 'var(--warm)', padding: '80px 5%' }}>
        <div className="inner" style={{ maxWidth: 640, textAlign: 'center', margin: '0 auto' }}>
          <div className="slabel reveal" style={{ justifyContent: 'center' }}>Kom i gang</div>
          <h2 className="stitle reveal" style={{ textAlign: 'center' }}>Klar for en uforpliktende prat?</h2>
          <p className="sdesc reveal" style={{ textAlign: 'center', marginBottom: 40 }}>
            Ring oss eller send en forespørsel – vi hjelper styret med å finne riktig løsning.
          </p>
          <div className="reveal" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/kontakt" className="btn-amber">Send forespørsel</Link>
            <a href="tel:56126800" className="btn-ghost">Ring 561 26 800 →</a>
          </div>
        </div>
      </section>
    </>
  )
}
