export const revalidate = 60

import { client } from '@/lib/sanity'
import { priserQuery, enovaQuery, servicesQuery } from '@/lib/queries'
import type { Priser, Enova, Service } from '@/lib/types'
import type { Metadata } from 'next'
import '@/styles/landing.css'
import ScrollMotion from '@/components/landing/ScrollMotion'
import {
  ContactSection,
  EnovaBox,
  PhoneIcon,
  PriceCards,
  PromiseSection,
  ReviewsSection,
  TrustBar,
} from '@/components/landing/parts'
import { FALLBACK_PRISKORT } from '@/lib/priser'
import { absUrl } from '@/lib/site'
import { webPageJsonLd, breadcrumbJsonLd, jsonLdScript } from '@/lib/jsonld'

const PAGE_PATH = '/priser'

export async function generateMetadata(): Promise<Metadata> {
  const priser = await client.fetch<Priser>(priserQuery).catch(() => null)
  const title = priser?.seoTittel ?? 'Priser – Straume Boligvent'
  const description =
    priser?.seoDescription ?? 'Se priser for ventilasjonsservice, kanalrens og nytt ventilasjonsaggregat.'
  return {
    title,
    description,
    alternates: { canonical: PAGE_PATH },
    openGraph: { title, description, url: absUrl(PAGE_PATH), type: 'website' },
    twitter: { title, description },
  }
}

export default async function PriserPage() {
  const [priser, enova, services] = await Promise.all([
    client.fetch<Priser>(priserQuery).catch(() => null),
    client.fetch<Enova>(enovaQuery).catch(() => null),
    client.fetch<Service[]>(servicesQuery).catch(() => []),
  ])

  const schemas = [
    webPageJsonLd({ path: PAGE_PATH, name: priser?.tittel || 'Priser – Straume Boligvent', description: priser?.beskrivelse }),
    breadcrumbJsonLd([
      { name: 'Forside', path: '/' },
      { name: 'Priser', path: PAGE_PATH },
    ]),
  ]

  return (
    <div className="kr">
      <ScrollMotion />
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(s)} />
      ))}

      <section className="hero" aria-labelledby="h1">
        <div className="wrap hero-grid no-media">
          <div>
            <h1 id="h1">{priser?.tittel ?? 'Tjenester for ventilasjon i bolig'}</h1>
            <p className="hero-sub">
              {priser?.beskrivelse ??
                'Vi hjelper deg med service, kanalrens og utskifting av ventilasjonsaggregat – tilpasset anlegget og behovet i boligen din.'}
            </p>
            <div className="hero-ctas">
              <a className="btn btn-primary btn-block-m" id="cta-hero" href="#bestill">Be om vurdering</a>
              <a className="btn btn-secondary btn-block-m" id="cta-ring" href="tel:56126800"><PhoneIcon />Ring 56 12 68 00</a>
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      <section className="section alt" aria-label="Priser">
        <div className="wrap">
          <PriceCards kort={priser?.kort ?? FALLBACK_PRISKORT} />
          <p className="price-foot">
            {priser?.fotnoteTekst ?? 'Usikker på hva ventilasjonen trenger? Vi hjelper deg å vurdere anlegget.'}{' '}
            <a className="text-link" href="#bestill">{priser?.fotnoteCtaTekst ?? 'Ta kontakt'}</a>
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="h-enova">
        <div className="wrap"><EnovaBox enova={enova} /></div>
      </section>

      <ReviewsSection />
      <PromiseSection items={[<><b>Tydelig pris</b> før vi starter</>, <b key="s">Ingen skjulte kostnader</b>, <b key="v">Svar innen 1 virkedag</b>]} />
      <ContactSection title="Usikker på hva du trenger?" lead="Fortell oss litt om anlegget, så gir vi deg en anbefaling og en tydelig pris." services={services} />
    </div>
  )
}
