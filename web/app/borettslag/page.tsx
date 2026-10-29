export const revalidate = 60

import { client } from '@/lib/sanity'
import { borettslagLandingQuery } from '@/lib/queries'
import type { BorettslagLanding } from '@/lib/types'
import type { Metadata } from 'next'
import '@/styles/landing.css'
import ScrollMotion from '@/components/landing/ScrollMotion'
import {
  Check,
  ContactSection,
  FaqList,
  PhoneIcon,
  ReviewsSection,
  TeamSection,
  TrustBar,
  iconProps,
} from '@/components/landing/parts'
import { absUrl } from '@/lib/site'
import { webPageJsonLd, breadcrumbJsonLd, faqJsonLd, jsonLdScript } from '@/lib/jsonld'

const PAGE_PATH = '/borettslag'
const PAGE_TITLE = 'For borettslag og sameier'
const PAGE_DESC =
  'Profesjonell vedlikehold og service av ventilasjonsanlegg for borettslag og sameier. Tilbud og dokumentasjon til styret.'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: { canonical: PAGE_PATH },
  openGraph: { title: PAGE_TITLE, description: PAGE_DESC, url: absUrl(PAGE_PATH), type: 'website' },
  twitter: { title: PAGE_TITLE, description: PAGE_DESC },
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

// Ikon i listen over typiske utfordringer
const alertIcon = (
  <svg {...iconProps}>
    <path d="M12 3l9.5 16.5h-19z" />
    <path d="M12 10v4M12 17h.01" />
  </svg>
)

export default async function BorettslagPage() {
  const data = await client.fetch<BorettslagLanding>(borettslagLandingQuery).catch(() => null)
  const p = data ?? FALLBACK

  const schemas: object[] = [
    webPageJsonLd({ path: PAGE_PATH, name: p.heroTittel || PAGE_TITLE, description: p.heroUnderTittel || PAGE_DESC }),
    breadcrumbJsonLd([
      { name: 'Forside', path: '/' },
      { name: 'Borettslag', path: PAGE_PATH },
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
            <span className="hero-eyebrow">For borettslag og sameier</span>
            <h1 id="h1">{p.heroTittel}</h1>
            <p className="hero-sub">{p.heroUnderTittel}</p>
            <div className="hero-ctas">
              <a className="btn btn-primary btn-block-m" id="cta-hero" href="#bestill">Få et tilbud</a>
              <a className="btn btn-secondary btn-block-m" id="cta-ring" href="tel:56126800"><PhoneIcon />Ring 56 12 68 00</a>
            </div>
            <p className="hero-note">Tydelig dokumentasjon til styret og fast oppfølging.</p>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Typiske utfordringer */}
      {p.utfordringer && p.utfordringer.length > 0 && (
        <section className="section" aria-labelledby="h-sym">
          <div className="wrap">
            <h2 id="h-sym">Kjenner du deg igjen?</h2>
            <p className="lead">Dette er utfordringer mange styrer møter med felles ventilasjonsanlegg:</p>
            <div className="sym-grid">
              <ul className="sym-list">
                {p.utfordringer.map((u) => (
                  <li key={u}><span className="icon" aria-hidden="true">{alertIcon}</span>{u}</li>
                ))}
              </ul>
              {p.hvordforOss && p.hvordforOss.length > 0 && (
                <div className="price-card">
                  <div className="price-card-head">
                    <div><strong className="card-title">Derfor velger borettslag oss</strong></div>
                  </div>
                  <ul className="checks">
                    {p.hvordforOss.map((t) => (<li key={t}><Check />{t}</li>))}
                  </ul>
                  <div className="price-card-foot">
                    <a className="text-link" href="#bestill">Be om befaring</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Tjenester */}
      {p.tjenester && p.tjenester.length > 0 && (
        <section className="section alt" aria-labelledby="h-svc">
          <div className="wrap">
            <h2 id="h-svc">Tjenester for borettslag</h2>
            <div className="svc-grid svc-grid-2">
              {p.tjenester.map((t) => (
                <div key={t.tittel} className="svc-card static">
                  <h3>{t.tittel}</h3>
                  <p>{t.beskrivelse}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Slik samarbeider vi */}
      {p.prosessSteg && p.prosessSteg.length > 0 && (
        <section className="section after" aria-labelledby="h-steps">
          <div className="wrap">
            <div className="after-inner">
              <h2 id="h-steps">Slik samarbeider vi</h2>
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

      <TeamSection />
      <ReviewsSection />

      {p.faq && p.faq.length > 0 && (
        <FaqList faqs={p.faq.map((f) => ({ q: f.sporsmal, a: f.svar }))} />
      )}

      <ContactSection
        title="Klar for en uforpliktende prat?"
        lead="Fortell oss om bygget og anlegget, så kommer vi tilbake med forslag til befaring og et tydelig tilbud."
        defaultService="borettslag-og-naering"
      />
    </div>
  )
}
