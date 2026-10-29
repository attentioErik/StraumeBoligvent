export const revalidate = 60

import { client } from '@/lib/sanity'
import { enovaQuery } from '@/lib/queries'
import type { Enova } from '@/lib/types'
import type { Metadata } from 'next'
import Link from 'next/link'
import '@/styles/landing.css'
import ScrollMotion from '@/components/landing/ScrollMotion'
import { Check, ContactSection, FaqList, TrustBar } from '@/components/landing/parts'
import { absUrl } from '@/lib/site'
import { faqJsonLd, webPageJsonLd, breadcrumbJsonLd, jsonLdScript } from '@/lib/jsonld'

const PAGE_PATH = '/enova'

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch<Enova>(enovaQuery).catch(() => null)
  const title = data?.seoTittel ?? 'Enova-støtte til balansert ventilasjon – Straume Boligvent'
  const description =
    data?.seoDescription ??
    'Du kan få Enova-støtte når du installerer balansert ventilasjon med varmegjenvinning. Vi hjelper deg med et anlegg som kvalifiserer for støtte.'
  return {
    title,
    description,
    alternates: { canonical: PAGE_PATH },
    openGraph: { title, description, url: absUrl(PAGE_PATH), type: 'article' },
    twitter: { title, description },
  }
}

const FALLBACK: Enova = {
  heroTittel: 'Enova-støtte til balansert ventilasjon',
  heroUnderTittel:
    'Installerer du balansert ventilasjon med varmegjenvinning, kan du søke om økonomisk støtte fra Enova. Vi leverer anlegg som oppfyller kravene – og hjelper deg med dokumentasjonen du trenger til søknaden.',
  introTittel: 'Hva er Enova-støtte?',
  introTekst:
    'Enova er et statlig foretak som gir økonomisk støtte til energitiltak i norske boliger. Balansert ventilasjon med høy varmegjenvinning er ett av tiltakene som kan kvalifisere for støtte. Du søker selv via Enova.no før arbeidet starter – og når søknaden er godkjent, setter vi i gang. Vi sørger for at anlegget og dokumentasjonen holder mål.',
  stotteTittel: 'Aktuell støtte for ventilasjon',
  stotteIntro:
    'Beløp og vilkår fastsettes av Enova og kan endres løpende. Tallene under er veiledende – sjekk alltid gjeldende satser på Enova.no.',
  stotteordninger: [
    {
      tittel: 'Balansert ventilasjon',
      beskrivelse:
        'Støtte til installasjon av balansert ventilasjonsanlegg med varmegjenvinning i eksisterende bolig.',
      belopLabel: 'Inntil',
      belop: '25 %',
      belopNote: 'av godkjente kostnader · maks ca. 15 000 kr',
      kriterier: [
        'Anlegg med høy varmegjenvinning',
        'Søknad godkjent før oppstart',
        'Idriftsettelse og rapport',
      ],
    },
  ],
  vilkarTittel: 'Hvem kan søke?',
  vilkar: [
    'Du eier en helårsbolig i Norge (ikke fritidsbolig)',
    'Søknaden er sendt inn og godkjent før arbeidet starter',
    'Arbeidet utføres av godkjent leverandør med sentral godkjenning',
    'Utstyret er nytt og kjøpt fra registrert leverandør',
    'Du har faktura og dokumentasjon som viser hva som er gjort',
  ],
  prosessTittel: 'Slik søker du om Enova-støtte',
  prosessSteg: [
    {
      tittel: 'Søk før du starter arbeidet',
      beskrivelse: 'Søknad må sendes inn og godkjennes av Enova før installasjonen starter.',
    },
    {
      tittel: 'Velg godkjent leverandør',
      beskrivelse:
        'Arbeidet må utføres av en bedrift med sentral godkjenning, registrert i Mesterregisteret eller Elvirksomhetsregisteret.',
    },
    {
      tittel: 'Gjennomfør tiltaket',
      beskrivelse: 'Tiltaket må være ferdig innen 6 måneder etter tilsagn.',
    },
    {
      tittel: 'Sluttrapportering',
      beskrivelse: 'Når arbeidet er ferdig, laster du opp faktura og nødvendig dokumentasjon på enova.no.',
    },
  ],
  hjelpTittel: 'Slik hjelper vi deg',
  hjelpTekst:
    'Vi er ikke en del av Enova, men vi kjenner kravene godt. Vi anbefaler og monterer et anlegg som kvalifiserer for støtte, og leverer idriftsettelsesrapport og dokumentasjonen du trenger til sluttrapporteringen.',
  hjelpPunkter: [
    'Befaring og anbefaling av riktig anlegg',
    'Montering av anlegg med høy varmegjenvinning',
    'Idriftsettelse med måling og rapport',
    'Tydelig faktura som dokumenterer kostnadene',
    'Veiledning om søknad før oppstart og sluttrapportering',
  ],
  faq: [
    {
      sporsmal: 'Er Straume Boligvent tilknyttet Enova?',
      svar: 'Nei. Vi er en uavhengig ventilasjonsentreprenør. Selve søknaden sender du til Enova, men vi hjelper deg med å levere et anlegg og en dokumentasjon som oppfyller kravene.',
    },
    {
      sporsmal: 'Når kan jeg søke?',
      svar: 'Du må søke før du starter arbeidet – søknaden må være sendt inn og godkjent av Enova før installasjonen begynner. Når arbeidet er ferdig, laster du opp faktura og dokumentasjon på enova.no.',
    },
    {
      sporsmal: 'Hvem søker – dere eller jeg?',
      svar: 'Du søker selv via Enova.no før arbeidet starter. Vi sørger for at du har riktig dokumentasjon til sluttrapporteringen, slik som faktura og idriftsettelsesrapport.',
    },
    {
      sporsmal: 'Hvor mye kan jeg få i støtte?',
      svar: 'For balansert ventilasjon kan du få inntil 25 % av godkjente kostnader, maks ca. 15 000 kr. Beløp og vilkår fastsettes av Enova og kan endres, så sjekk alltid gjeldende satser på Enova.no.',
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

  const schemas: object[] = [
    webPageJsonLd({ path: PAGE_PATH, name: p.heroTittel || 'Enova-støtte', description: p.heroUnderTittel }),
    breadcrumbJsonLd([
      { name: 'Forside', path: '/' },
      { name: 'Enova-støtte', path: PAGE_PATH },
    ]),
  ]
  if (p.faq && p.faq.length > 0) schemas.push(faqJsonLd(p.faq.map((f) => ({ question: f.sporsmal, answer: f.svar }))))

  return (
    <div className="kr">
      <ScrollMotion />
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(s)} />
      ))}

      {/* Hero */}
      <section className="hero" aria-labelledby="h1">
        <div className="wrap hero-grid no-media">
          <div>
            <span className="hero-eyebrow">Enova-støtte</span>
            <h1 id="h1">{p.heroTittel}</h1>
            <p className="hero-sub">{p.heroUnderTittel}</p>
            <div className="hero-ctas">
              <a className="btn btn-primary btn-block-m" id="cta-hero" href="#bestill">Be om vurdering</a>
              <a className="btn btn-secondary btn-block-m" href={enovaUrl} target="_blank" rel="noopener noreferrer">Les mer på {enovaTekst}</a>
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Hva er Enova-støtte + støtteordninger */}
      <section className="section" aria-labelledby="h-intro">
        <div className="wrap">
          {p.introTittel && <h2 id="h-intro">{p.introTittel}</h2>}
          <div className="incl-grid">
            <div className="intro-text">
              {p.introTekst && <p>{p.introTekst}</p>}
              <p>
                Les mer om ordningen på{' '}
                <a className="text-link" href={enovaUrl} target="_blank" rel="noopener noreferrer">{enovaTekst}</a>.
              </p>
            </div>
            {p.stotteordninger?.map((s) => (
              <div key={s.tittel} className="price-card">
                <div className="price-card-head">
                  <div>
                    <p>{s.tittel}</p>
                    <strong>{[s.belopLabel, s.belop].filter(Boolean).join(' ')}</strong>
                  </div>
                  {s.belopNote && <p>{s.belopNote}</p>}
                </div>
                {s.beskrivelse && <p className="desc">{s.beskrivelse}</p>}
                {s.kriterier && s.kriterier.length > 0 && (
                  <ul className="checks">{s.kriterier.map((k) => (<li key={k}><Check />{k}</li>))}</ul>
                )}
              </div>
            ))}
          </div>
          {p.stotteIntro && <p className="fine-note">{p.stotteIntro}</p>}
        </div>
      </section>

      {/* Hvem kan søke */}
      {p.vilkar && p.vilkar.length > 0 && (
        <section className="section alt" aria-labelledby="h-vilkar">
          <div className="wrap">
            <h2 id="h-vilkar">{p.vilkarTittel || 'Hvem kan søke?'}</h2>
            <ul className="sym-list vilkar">
              {p.vilkar.map((v) => (<li key={v}><span className="icon" aria-hidden="true"><Check /></span>{v}</li>))}
            </ul>
          </div>
        </section>
      )}

      {/* Slik søker du */}
      {p.prosessSteg && p.prosessSteg.length > 0 && (
        <section className="section after" aria-labelledby="h-steps">
          <div className="wrap">
            <div className="after-inner">
              <h2 id="h-steps">{p.prosessTittel || 'Slik søker du'}</h2>
            </div>
            <ol className="steps steps-dark">
              {p.prosessSteg.map((s, i) => (
                <li key={s.tittel}>
                  <span className="step-no" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{s.tittel}</h3>
                  <p>{s.beskrivelse}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Slik hjelper vi deg */}
      {p.hjelpPunkter && p.hjelpPunkter.length > 0 && (
        <section className="section" aria-labelledby="h-help">
          <div className="wrap">
            <div className="incl-grid">
              <div className="split-text">
                <h2 id="h-help">{p.hjelpTittel || 'Slik hjelper vi deg'}</h2>
                {p.hjelpTekst && <p className="lead">{p.hjelpTekst}</p>}
                <div className="enova-cta">
                  <a className="btn btn-primary btn-block-m" href="#bestill">Be om befaring</a>
                  <Link className="text-link" href="/priser">Se priser</Link>
                </div>
              </div>
              <div className="price-card">
                <ul className="checks">{p.hjelpPunkter.map((t) => (<li key={t}><Check />{t}</li>))}</ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {p.faq && p.faq.length > 0 && <FaqList faqs={p.faq.map((f) => ({ q: f.sporsmal, a: f.svar }))} />}

      {p.disclaimer && (
        <p className="wrap updated">
          {p.disclaimer}{' '}
          <a className="text-link" href={enovaUrl} target="_blank" rel="noopener noreferrer">{enovaTekst}</a>
        </p>
      )}

      <ContactSection
        title="Vurderer du nytt ventilasjonsanlegg?"
        lead="Vi anbefaler et anlegg som kvalifiserer for støtte, og gir deg et tydelig tilbud."
        defaultService="montasje-og-utskifting"
      />
    </div>
  )
}
