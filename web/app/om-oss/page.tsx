export const revalidate = 60

import { client, urlFor } from '@/lib/sanity'
import { omOssQuery, ansatteQuery } from '@/lib/queries'
import type { OmOss, Ansatt } from '@/lib/types'
import type { Metadata } from 'next'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import '@/styles/landing.css'
import ScrollMotion from '@/components/landing/ScrollMotion'
import { ContactSection, PhoneIcon, ReviewsSection, TeamSection, TrustBar } from '@/components/landing/parts'

import { absUrl } from '@/lib/site'

const PAGE_PATH = '/om-oss'
const HISTORIE_FALLBACK = 'https://ucarecdn.com/cefe0ad5-6084-4a58-ad08-658cb6256067/straumetekniskeravneberghaugen09.avif'

export async function generateMetadata(): Promise<Metadata> {
  const omOss = await client.fetch<OmOss>(omOssQuery).catch(() => null)
  const title = 'Om oss'
  const description =
    omOss?.seoDescription ??
    'Lokal fagkunnskap og langsiktige relasjoner. Straume Boligvent er en spesialisert tjeneste fra Straume Tekniske AS i Bergen og omegn.'
  return {
    title,
    description,
    alternates: { canonical: PAGE_PATH },
    openGraph: { title, description, url: absUrl(PAGE_PATH), type: 'website' },
    twitter: { title, description },
  }
}

const FALLBACK_TALL = [
  { verdi: '2012', label: 'Etablert' },
  { verdi: '500+', label: 'Oppdrag gjennomført' },
  { verdi: '100%', label: 'Dokumenterte oppdrag' },
  { verdi: '1 dag', label: 'Responstid' },
]

const FALLBACK_VERDIER = [
  { tittel: 'Faglig integritet', beskrivelse: 'Vi anbefaler bare det som er nødvendig. Ingen unødige tiltak.' },
  { tittel: 'Tydelig kommunikasjon', beskrivelse: 'Du vet alltid hva vi gjør og hva det koster – ingen overraskelser.' },
  { tittel: 'Langsiktig perspektiv', beskrivelse: 'Vi bygger relasjoner, ikke engangsoppdrag. Fornøyde kunder er vår beste markedsføring.' },
  { tittel: 'Dokumentert kvalitet', beskrivelse: 'Alle oppdrag avsluttes med rapport. Borettslag og sameier får tilpasset dokumentasjon.' },
]

export default async function OmOssPage() {
  const [omOss, ansatte] = await Promise.all([
    client.fetch<OmOss>(omOssQuery).catch(() => null),
    client.fetch<Ansatt[]>(ansatteQuery).catch(() => []),
  ])

  const tall = omOss?.tallOgFakta ?? FALLBACK_TALL
  const verdier = omOss?.verdier ?? FALLBACK_VERDIER
  const historieBilde = omOss?.historieBilde ? urlFor(omOss.historieBilde).width(800).height(1000).url() : HISTORIE_FALLBACK

  return (
    <div className="kr">
      <ScrollMotion />

      {/* Hero */}
      <section className="hero" aria-labelledby="h1">
        <div className="wrap hero-grid no-media">
          <div>
            <span className="hero-eyebrow">Om oss</span>
            <h1 id="h1">{omOss?.heroTittel ?? 'Lokal fagkunnskap. Langsiktige relasjoner.'}</h1>
            <p className="hero-sub">
              {omOss?.heroTekst ??
                'Straume Boligvent er en spesialisert tjeneste fra Straume Tekniske AS, etablert i 2012 med bred erfaring innen tekniske installasjoner i Bergen og omegn.'}
            </p>
            <div className="hero-ctas">
              <a className="btn btn-primary btn-block-m" id="cta-hero" href="#bestill">Ta kontakt</a>
              <a className="btn btn-secondary btn-block-m" id="cta-ring" href="tel:56126800"><PhoneIcon />Ring 56 12 68 00</a>
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Tall og fakta */}
      <section className="section stats-section" aria-label="Tall og fakta">
        <div className="wrap">
          <dl className="stats">
            {tall.map((t) => (
              <div key={t.label}>
                <dt>{t.verdi}</dt>
                <dd>{t.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Historie */}
      <section className="section" aria-labelledby="h-hist">
        <div className="wrap">
          <div className="incl-grid">
            <div className="split-text">
              <h2 id="h-hist">{omOss?.historieTittel ?? 'Hvem er vi?'}</h2>
              {omOss?.historieBlokker && omOss.historieBlokker.length > 0 ? (
                <div className="prose-kr intro-text"><PortableText value={omOss.historieBlokker} /></div>
              ) : (
                <div className="intro-text">
                  <p>Straume Boligvent er en spesialisert tjeneste fra Straume Tekniske AS, etablert i 2012 med bred erfaring innen tekniske installasjoner.</p>
                  <p>Vi samarbeider tett med Straume Tekniske, noe som gir oss tilgang til et bredt fagmiljø – bak én kontaktperson og ett ansvar.</p>
                  <p>Vi spesialiserer oss på ventilasjon for bolig, borettslag og mindre næringsbygg. Vår tilnærming er alltid faglig, ryddig og langsiktig.</p>
                </div>
              )}
            </div>
            <figure className="split-figure tall">
              <Image src={historieBilde} width={800} height={1000} sizes="(min-width: 900px) 440px, 100vw" alt="Straume Tekniske" />
              <figcaption className="split-badge bottom">
                {omOss?.bildeBadgeTittel ?? 'Straume'}
                <small>{omOss?.bildeBadgeTekst ?? 'Del av Straume Tekniske AS'}</small>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Verdier */}
      <section className="section alt" aria-labelledby="h-verdier">
        <div className="wrap">
          <h2 id="h-verdier">{omOss?.verdierTittel ?? 'Verdier'}</h2>
          <div className="svc-grid svc-grid-2">
            {verdier.map((v) => (
              <div key={v.tittel} className="svc-card static accent">
                <h3>{v.tittel}</h3>
                <p>{v.beskrivelse}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team: ansatte fra Sanity, ellers montørene */}
      {ansatte.length > 0 ? (
        <section className="section" aria-labelledby="h-team">
          <div className="wrap">
            <h2 id="h-team">{omOss?.teamTittel ?? 'Teamet vårt'}</h2>
            <div className="team">
              {ansatte.map((a) => (
                <figure key={a._id}>
                  {a.bilde && (
                    <Image src={urlFor(a.bilde).width(480).height(600).url()} width={480} height={600} sizes="(min-width: 900px) 240px, 33vw" alt={a.navn} />
                  )}
                  <figcaption>
                    {a.navn}
                    {a.rolle && <span className="role">{a.rolle}</span>}
                    {a.telefon && <a className="role" href={`tel:${a.telefon.replace(/\s/g, '')}`}>{a.telefon}</a>}
                    {a.epost && <a className="role" href={`mailto:${a.epost}`}>{a.epost}</a>}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <TeamSection />
      )}

      {/* Sertifiseringer */}
      {omOss?.sertifiseringer && omOss.sertifiseringer.length > 0 && (
        <section className="section" aria-labelledby="h-cert">
          <div className="wrap">
            <h2 id="h-cert">{omOss?.sertifiseringerTittel ?? 'Sertifiseringer'}</h2>
            <div className="svc-grid">
              {omOss.sertifiseringer.map((c) => (
                <div key={c.navn} className="svc-card static">
                  <h3>{c.navn}</h3>
                  {c.beskrivelse && <p>{c.beskrivelse}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <ReviewsSection />

      <ContactSection
        title={omOss?.ctaTittel ?? 'Ta kontakt'}
        lead={omOss?.ctaTekst ?? 'Vi er tilgjengelige for en uforpliktende prat om ditt anlegg.'}
      />
    </div>
  )
}
