import { client } from '@/lib/sanity'
import { servicesQuery, siteSettingsQuery, forsideQuery } from '@/lib/queries'
import type { Service, SiteSettings, Forside } from '@/lib/types'
import type { Metadata } from 'next'
import '@/styles/landing.css'
import ScrollMotion from '@/components/landing/ScrollMotion'
import { Check, ContactSection, GoogleRating, PhoneIcon, TrustBar } from '@/components/landing/parts'
import { absUrl } from '@/lib/site'
import { contactPageJsonLd, breadcrumbJsonLd, jsonLdScript } from '@/lib/jsonld'

const PAGE_PATH = '/kontakt'
const PAGE_TITLE = 'Kontakt'
const PAGE_DESC =
  'Kontakt Straume Boligvent for service, kanalrens, innregulering eller utskifting av ventilasjonsanlegg i Bergen og omegn. Vi svarer innen én virkedag.'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: { canonical: PAGE_PATH },
  openGraph: { title: PAGE_TITLE, description: PAGE_DESC, url: absUrl(PAGE_PATH), type: 'website' },
  twitter: { title: PAGE_TITLE, description: PAGE_DESC },
}

export default async function KontaktPage() {
  const [settings, services, forside] = await Promise.all([
    client.fetch<SiteSettings>(siteSettingsQuery).catch(() => null),
    client.fetch<Service[]>(servicesQuery).catch(() => []),
    client.fetch<Forside>(forsideQuery).catch(() => null),
  ])

  const phone = settings?.phone || '56 12 68 00'
  const email = settings?.email || 'ordre@straumetekniske.no'
  const address = settings?.address || 'Idrettsveien 93, 5353 Straume'
  const hours = forside?.kontaktApningstider || 'Man–Fre 08:00–16:00 · Lør 09:00–15:00'

  const schemas = [
    contactPageJsonLd({ phone, email, address }),
    breadcrumbJsonLd([
      { name: 'Forside', path: '/' },
      { name: 'Kontakt', path: PAGE_PATH },
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
            <span className="hero-eyebrow">Kom i gang</span>
            <h1 id="h1">Ta kontakt</h1>
            <p className="hero-sub">Vi svarer innen én virkedag. Ring oss gjerne direkte for rask hjelp.</p>
            <div className="hero-ctas">
              <a className="btn btn-primary btn-block-m" id="cta-hero" href="#bestill">Send forespørsel</a>
              <a className="btn btn-secondary btn-block-m" id="cta-ring" href={`tel:${phone.replace(/\s/g, '')}`}><PhoneIcon />Ring {phone}</a>
            </div>
            <ul className="hero-points">
              {(forside?.trustItems ?? ['Tydelig pris før oppstart', 'Langsiktig oppfølging', 'Kun nødvendige tiltak', 'Svar innen 24 timer']).map((t) => (
                <li key={t}><Check size={18} />{t}</li>
              ))}
            </ul>
            <GoogleRating />
          </div>
        </div>
      </section>

      <TrustBar />

      <ContactSection
        title="Vi er tilgjengelige for deg"
        lead="Fyll ut skjemaet, eller ta direkte kontakt. Vi stiller gjerne spørsmål om anlegget ditt for å gi deg riktig tilbud."
        services={services}
        aside={
          <ul className="contact-rows">
            <li><span>Telefon</span><a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a></li>
            <li><span>E-post</span><a href={`mailto:${email}`}>{email}</a></li>
            <li><span>Adresse</span><span>{address}</span></li>
            <li><span>Åpent</span><span>{hours}</span></li>
          </ul>
        }
      />
    </div>
  )
}
