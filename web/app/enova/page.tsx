export const revalidate = 60

import { client } from '@/lib/sanity'
import { enovaQuery } from '@/lib/queries'
import type { Enova } from '@/lib/types'
import type { Metadata } from 'next'
import Link from 'next/link'

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch<Enova>(enovaQuery).catch(() => null)
  return {
    title: data?.seoTittel ?? 'Enova-støtte til balansert ventilasjon – Straume Boligvent',
    description:
      data?.seoDescription ??
      'Du kan få Enova-støtte når du installerer balansert ventilasjon med varmegjenvinning. Vi hjelper deg med et anlegg som kvalifiserer for støtte.',
  }
}

const FALLBACK: Enova = {
  heroTittel: 'Enova-støtte til balansert ventilasjon',
  heroUnderTittel:
    'Installerer du balansert ventilasjon med varmegjenvinning, kan du søke om økonomisk støtte fra Enova. Vi leverer anlegg som oppfyller kravene – og hjelper deg med dokumentasjonen du trenger til søknaden.',
  introTittel: 'Hva er Enova-støtte?',
  introTekst:
    'Enova er et statlig foretak som gir økonomisk støtte til energitiltak i norske boliger. Balansert ventilasjon med høy varmegjenvinning er ett av tiltakene som kan kvalifisere for støtte. Du søker selv via Enova.no etter at tiltaket er gjennomført – vi sørger for at anlegget og dokumentasjonen holder mål.',
  stotteTittel: 'Aktuell støtte for ventilasjon',
  stotteIntro:
    'Beløp og vilkår fastsettes av Enova og kan endres løpende. Tallene under er veiledende – sjekk alltid gjeldende satser på Enova.no.',
  stotteordninger: [
    {
      tittel: 'Balansert ventilasjon',
      beskrivelse:
        'Støtte til installasjon av balansert ventilasjonsanlegg med varmegjenvinning i eksisterende bolig.',
      belopLabel: 'Inntil',
      belop: '15 000 kr',
      kriterier: [
        'Anlegg med høy varmegjenvinning',
        'Eksisterende helårsbolig',
        'Idriftsettelse og rapport',
      ],
    },
    {
      tittel: 'Luft-til-vann varmepumpe',
      beskrivelse:
        'For deg som kombinerer ventilasjon med vannbåren varme. Enova støtter også varmepumpe som knyttes til vannbårent anlegg.',
      belopLabel: 'Inntil',
      belop: '20 000 kr',
      kriterier: ['Tilknyttet vannbårent varmeanlegg', 'Ny og eksisterende bolig'],
    },
  ],
  vilkarTittel: 'Hvem kan søke?',
  vilkar: [
    'Du eier en helårsbolig i Norge',
    'Tiltaket er gjennomført i egen bolig (ikke fritidsbolig)',
    'Utstyret er nytt og kjøpt fra registrert leverandør',
    'Arbeidet er utført av kvalifisert fagperson',
    'Du har faktura og dokumentasjon som viser hva som er gjort',
  ],
  prosessTittel: 'Slik søker du om Enova-støtte',
  prosessSteg: [
    {
      tittel: 'Sett deg inn i ordningen',
      beskrivelse:
        'Sjekk gjeldende vilkår og satser på Enova.no før du bestemmer deg. Ta gjerne kontakt med oss for en vurdering av boligen.',
    },
    {
      tittel: 'Få anlegget installert',
      beskrivelse:
        'Vi monterer et anlegg som oppfyller Enovas krav, og utfører idriftsettelse med målinger.',
    },
    {
      tittel: 'Samle dokumentasjon',
      beskrivelse:
        'Du får faktura som viser kostnader, utstyr og arbeid, samt idriftsettelsesrapport for anlegget.',
    },
    {
      tittel: 'Søk via Enova.no',
      beskrivelse:
        'Du registrerer og sender søknaden selv på Enova.no etter at tiltaket er gjennomført. Støtten utbetales til din konto.',
    },
  ],
  hjelpTittel: 'Slik hjelper vi deg',
  hjelpTekst:
    'Vi er ikke en del av Enova, men vi kjenner kravene godt. Vi anbefaler og monterer et anlegg som kvalifiserer for støtte, og leverer idriftsettelsesrapport og dokumentasjon du trenger når du søker.',
  hjelpPunkter: [
    'Befaring og anbefaling av riktig anlegg',
    'Montering av anlegg med høy varmegjenvinning',
    'Idriftsettelse med måling og rapport',
    'Tydelig faktura som dokumenterer kostnadene',
    'Veiledning om hva du trenger til søknaden',
  ],
  faq: [
    {
      sporsmal: 'Er Straume Boligvent tilknyttet Enova?',
      svar: 'Nei. Vi er en uavhengig ventilasjonsentreprenør. Selve søknaden sender du til Enova, men vi hjelper deg med å levere et anlegg og en dokumentasjon som oppfyller kravene.',
    },
    {
      sporsmal: 'Hvor mye kan jeg få i støtte?',
      svar: 'Beløpet avhenger av tiltaket og fastsettes av Enova. Satsene kan endres løpende, så sjekk alltid gjeldende beløp på Enova.no.',
    },
    {
      sporsmal: 'Hvem søker – dere eller jeg?',
      svar: 'Du søker selv via Enova.no etter at arbeidet er ferdig. Vi sørger for at du har riktig dokumentasjon, slik som faktura og idriftsettelsesrapport.',
    },
    {
      sporsmal: 'Når kan jeg søke?',
      svar: 'Du søker normalt etter at tiltaket er gjennomført og betalt. Vi anbefaler at du gjør deg kjent med vilkårene på Enova.no før du setter i gang.',
    },
  ],
  disclaimer:
    'Straume Boligvent er ikke tilknyttet eller representant for Enova. Støttebeløp, vilkår og frister fastsettes av Enova og kan endres løpende. Se Enova.no for til enhver tid gjeldende ordninger og satser.',
  enovaLenke: 'https://www.enova.no/privat/',
  enovaLenkeTekst: 'Enova.no',
}

export default async function EnovaPage() {
  const data = await client.fetch<Enova>(enovaQuery).catch(() => null)
  const p = { ...FALLBACK, ...(data ?? {}) }
  const enovaUrl = p.enovaLenke || 'https://www.enova.no/privat/'
  const enovaTekst = p.enovaLenkeTekst || 'Enova.no'

  return (
    <>
      {/* ─── HERO ─── */}
      <section style={{ background: '#1e1a12', padding: '120px 5% 100px', position: 'relative', overflow: 'hidden' }}>
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
            <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.06em', color: 'var(--amber)' }}>Enova-støtte</span>
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
          <p style={{ fontSize: '1.05rem', lineHeight: 1.78, color: '#a89e90', fontWeight: 300, maxWidth: 600, marginBottom: 48 }}>
            {p.heroUnderTittel}
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Link href="/kontakt" className="btn-amber">Be om vurdering</Link>
            <a href={enovaUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ color: '#a09280' }}>
              Les mer hos {enovaTekst} →
            </a>
          </div>
        </div>
      </section>

      {/* ─── INTRO ─── */}
      {(p.introTittel || p.introTekst) && (
        <section style={{ background: 'var(--white)', padding: '80px 5%' }}>
          <div className="inner" style={{ maxWidth: 760 }}>
            <div className="slabel reveal">Om ordningen</div>
            {p.introTittel && <h2 className="stitle reveal">{p.introTittel}</h2>}
            {p.introTekst && (
              <p className="reveal" style={{ fontSize: '1.02rem', color: 'var(--body)', lineHeight: 1.85, fontWeight: 300, marginTop: 8 }}>
                {p.introTekst}
              </p>
            )}
            <p className="reveal" style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.7, marginTop: 20 }}>
              Du finner oppdatert informasjon og søknadsskjema på{' '}
              <a href={enovaUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--adark)', textDecoration: 'underline', fontWeight: 600 }}>
                {enovaTekst}
              </a>
              .
            </p>
          </div>
        </section>
      )}

      {/* ─── STØTTEORDNINGER ─── */}
      {p.stotteordninger && p.stotteordninger.length > 0 && (
        <section style={{ background: 'var(--off)', padding: '80px 5%' }}>
          <div className="inner">
            <div className="slabel reveal">Støtteordninger</div>
            {p.stotteTittel && <h2 className="stitle reveal">{p.stotteTittel}</h2>}
            {p.stotteIntro && <p className="sdesc reveal" style={{ maxWidth: 620 }}>{p.stotteIntro}</p>}
            <div
              className="enova-grid"
              style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(p.stotteordninger.length, 2)}, 1fr)`, gap: 24, marginTop: 48 }}
            >
              {p.stotteordninger.map((s, i) => (
                <div
                  key={i}
                  className="reveal"
                  style={{
                    background: 'var(--white)',
                    border: '1px solid var(--ll)',
                    borderTop: '3px solid var(--amber)',
                    borderRadius: '0 0 8px 8px',
                    padding: '36px 32px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.25rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
                    {s.tittel}
                  </div>
                  {s.beskrivelse && (
                    <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300, marginBottom: 24 }}>{s.beskrivelse}</p>
                  )}
                  {s.belop && (
                    <div style={{ marginBottom: 24 }}>
                      {s.belopLabel && (
                        <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sec)', marginBottom: 4 }}>
                          {s.belopLabel}
                        </div>
                      )}
                      <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', fontWeight: 800, color: 'var(--amber)', lineHeight: 1 }}>
                        {s.belop}
                      </div>
                    </div>
                  )}
                  {s.kriterier && s.kriterier.length > 0 && (
                    <div className="checklist" style={{ margin: 'auto 0 0', borderTop: '1px solid var(--ll)', paddingTop: 8 }}>
                      {s.kriterier.map((k, ki) => (
                        <div key={ki} className="citem" style={{ fontSize: '0.875rem' }}>
                          <div className="cicon">✓</div>
                          {k}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <style>{`
            @media (max-width: 760px) { .enova-grid { grid-template-columns: 1fr !important; } }
          `}</style>
        </section>
      )}

      {/* ─── VILKÅR ─── */}
      {p.vilkar && p.vilkar.length > 0 && (
        <section style={{ background: 'var(--white)', padding: '80px 5%' }}>
          <div className="inner" style={{ maxWidth: 760 }}>
            <div className="slabel reveal">Vilkår</div>
            {p.vilkarTittel && <h2 className="stitle reveal">{p.vilkarTittel}</h2>}
            <div className="checklist reveal" style={{ marginTop: 32 }}>
              {p.vilkar.map((v, i) => (
                <div key={i} className="citem">
                  <div className="cicon">✓</div>
                  {v}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── SØKNADSPROSESS ─── */}
      {p.prosessSteg && p.prosessSteg.length > 0 && (
        <section style={{ background: '#1e1a12', padding: '80px 5%' }}>
          <div className="inner">
            <div className="slabel reveal" style={{ color: 'var(--amid)' }}>Søknadsprosess</div>
            {p.prosessTittel && <h2 className="stitle reveal" style={{ color: '#f5f0e8' }}>{p.prosessTittel}</h2>}
            <div
              className="enova-prosess"
              style={{ display: 'grid', gridTemplateColumns: `repeat(${p.prosessSteg.length}, 1fr)`, gap: 1, marginTop: 56, background: '#302a1e', borderRadius: 6, overflow: 'hidden' }}
            >
              {p.prosessSteg.map((steg, i) => (
                <div key={i} className="reveal" style={{ background: '#272114', padding: '40px 32px' }}>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', fontWeight: 700, color: 'var(--amber)', lineHeight: 1, marginBottom: 24 }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '0.95rem', fontWeight: 700, color: '#f0e8d8', marginBottom: 12 }}>
                    {steg.tittel}
                  </div>
                  <p style={{ fontSize: '0.845rem', color: '#a89e90', lineHeight: 1.65, fontWeight: 300 }}>{steg.beskrivelse}</p>
                </div>
              ))}
            </div>
          </div>
          <style>{`
            @media (max-width: 980px) { .enova-prosess { grid-template-columns: 1fr 1fr !important; } }
            @media (max-width: 640px) { .enova-prosess { grid-template-columns: 1fr !important; } }
          `}</style>
        </section>
      )}

      {/* ─── SLIK HJELPER VI ─── */}
      {p.hjelpPunkter && p.hjelpPunkter.length > 0 && (
        <section style={{ background: 'var(--off)', padding: '80px 5%' }}>
          <div className="inner">
            <div className="split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
              <div className="reveal">
                <div className="slabel">Vår rolle</div>
                {p.hjelpTittel && <h2 className="stitle">{p.hjelpTittel}</h2>}
                {p.hjelpTekst && <p className="sdesc" style={{ marginTop: 8 }}>{p.hjelpTekst}</p>}
                <div style={{ display: 'flex', gap: 16, marginTop: 36, flexWrap: 'wrap' }}>
                  <Link href="/kontakt" className="btn-amber">Be om befaring</Link>
                  <Link href="/priser" className="btn-ghost">Se priser →</Link>
                </div>
              </div>
              <div className="reveal">
                <div className="checklist" style={{ margin: 0 }}>
                  {p.hjelpPunkter.map((punkt, i) => (
                    <div key={i} className="citem">
                      <div className="cicon">✓</div>
                      {punkt}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <style>{`
            @media (max-width: 980px) { .split { grid-template-columns: 1fr !important; gap: 40px !important; } }
          `}</style>
        </section>
      )}

      {/* ─── FAQ ─── */}
      {p.faq && p.faq.length > 0 && (
        <section style={{ background: 'var(--white)', padding: '80px 5%' }}>
          <div className="inner" style={{ maxWidth: 800 }}>
            <div className="slabel reveal">Spørsmål og svar</div>
            <h2 className="stitle reveal">Vanlige spørsmål om Enova-støtte</h2>
            <div style={{ marginTop: 48 }}>
              {p.faq.map((item, i) => (
                <div key={i} className="reveal" style={{ borderBottom: '1px solid var(--ll)', padding: '28px 0' }}>
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

      {/* ─── DISCLAIMER / ENOVA-REFERANSE ─── */}
      {p.disclaimer && (
        <section style={{ background: 'var(--off)', padding: '0 5% 64px' }}>
          <div className="inner" style={{ maxWidth: 800 }}>
            <div className="note reveal" style={{ fontStyle: 'normal' }}>
              {p.disclaimer}{' '}
              <a href={enovaUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--adark)', textDecoration: 'underline', fontWeight: 600 }}>
                {enovaTekst}
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ─── */}
      <section style={{ background: 'var(--warm)', padding: '80px 5%' }}>
        <div className="inner" style={{ maxWidth: 640, textAlign: 'center', margin: '0 auto' }}>
          <div className="slabel reveal" style={{ justifyContent: 'center' }}>Kom i gang</div>
          <h2 className="stitle reveal" style={{ textAlign: 'center' }}>Vurderer du nytt ventilasjonsanlegg?</h2>
          <p className="sdesc reveal" style={{ textAlign: 'center', marginBottom: 40, margin: '0 auto 40px' }}>
            Vi hjelper deg å finne et anlegg som passer boligen – og som kan kvalifisere for Enova-støtte.
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
