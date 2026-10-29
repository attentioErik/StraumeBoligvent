export const revalidate = 60

// Forsiden i samme stil som tjeneste-landingssidene (styles/landing.css).
// Tekstene hentes fortsatt fra Sanity (forside, siteSettings, tjenester, priser, enova), med reservetekst når felt mangler.
import { client, urlFor } from '@/lib/sanity'
import {
  siteSettingsQuery,
  servicesQuery,
  referenceProjectsQuery,
  forsideQuery,
  priserQuery,
  enovaQuery,
} from '@/lib/queries'
import type { SiteSettings, Service, ReferenceProject, Forside, Priser, Enova } from '@/lib/types'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import '@/styles/landing.css'
import OrderForm from '@/components/landing/OrderForm'
import ScrollMotion from '@/components/landing/ScrollMotion'
import {
  Check,
  GoogleRating,
  PhoneIcon,
  ReviewsSection,
  TeamSection,
  TrustBar,
  iconProps,
  PriceCards,
  EnovaBox,
} from '@/components/landing/parts'
import { FALLBACK_PRISKORT } from '@/lib/priser'
import { SITE_URL } from '@/lib/site'
import { websiteJsonLd, webPageJsonLd, jsonLdScript } from '@/lib/jsonld'

export async function generateMetadata(): Promise<Metadata> {
  const forside = await client.fetch<Forside>(forsideQuery).catch(() => null)
  const title =
    forside?.seoTittel ?? 'Straume Boligvent — Ventilasjon for bolig og næring i Bergen og omegn'
  const description =
    forside?.seoDescription ??
    'Komplett leveranse innen ventilasjon i Bergen og omegn. Service, kanalrens, innregulering og montasje for bolig, borettslag og næring.'
  const heroImage = forside?.heroBilde ? urlFor(forside.heroBilde).width(1200).height(630).url() : undefined
  return {
    title,
    description,
    alternates: { canonical: '/' },
    openGraph: {
      title,
      description,
      url: SITE_URL,
      type: 'website',
      images: heroImage ? [{ url: heroImage, width: 1200, height: 630, alt: title }] : undefined,
    },
    twitter: { title, description, images: heroImage ? [heroImage] : undefined },
  }
}

const HERO_FALLBACK = 'https://ucarecdn.com/6cc61d81-b2bf-479a-9788-bd64ef95bda3/hf_20260224_115355_7dfea640c8064601919f0871635df4e8.jpeg'
const BOLIG_FALLBACK = 'https://ucarecdn.com/dc624f56-8c72-4b43-8818-149be7a94947/hf_20260224_115140_8d1fc521c6fe470eabf2fe55099a1570.jpeg'
const OMOSS_FALLBACK = 'https://ucarecdn.com/3cebd723-9ca8-4376-b03d-c3f0df6ebad4/DSC03897.jpg'

// Brukes når tjenestene ikke kan hentes fra Sanity
const FALLBACK_SERVICES = [
  { slug: 'service-og-vedlikehold', title: 'Service og vedlikehold', description: 'Filterbytte, kontroll av luftmengder, varmegjenvinner, vifter og styresystem.' },
  { slug: 'kanalrens', title: 'Kanalrens', description: 'Rengjøring av ventilasjonskanaler for bedre luftkvalitet og riktig luftstrøm.' },
  { slug: 'innregulering', title: 'Innregulering', description: 'Riktig luftmengde i alle rom. Optimalisering av tilluft og avtrekk for lavere energibruk.' },
  { slug: 'montasje-og-utskifting', title: 'Montasje og utskifting', description: 'Montasje av aggregat, ventilasjonsanlegg og avtrekksvifter for bolig og næring.' },
  { slug: 'serviceavtale', title: 'Serviceavtale', description: 'Fast avtale med oppfølging. Anbefalt for borettslag og sameier.' },
  { slug: 'borettslag-og-naering', title: 'For borettslag og næring', description: 'Tilpassede løsninger for sameier, borettslag og mindre næringsbygg.' },
]

const SERVICE_ICONS: Record<string, ReactNode> = {
  'service-og-vedlikehold': (<svg {...iconProps}><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z" /></svg>),
  kanalrens: (<svg {...iconProps}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3.5" /><path d="M12 4v4.5M12 15.5V20M4 12h4.5M15.5 12H20" /></svg>),
  innregulering: (<svg {...iconProps}><path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0" /><circle cx="16" cy="6" r="2" /><circle cx="10" cy="12" r="2" /><circle cx="18" cy="18" r="2" /></svg>),
  'montasje-og-utskifting': (<svg {...iconProps}><rect x="3" y="6" width="18" height="12" rx="2" /><circle cx="9" cy="12" r="3" /><path d="M15 10h3M15 14h3" /></svg>),
  serviceavtale: (<svg {...iconProps}><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h4" /><path d="M14 17l1.5 1.5L19 15" /></svg>),
  'borettslag-og-naering': (<svg {...iconProps}><path d="M4 21V8l8-5 8 5v13" /><path d="M9 21v-6h6v6M9 10h.01M15 10h.01" /></svg>),
}

const FALLBACK_STEPS = [
  { nummer: '01', tittel: 'Kartlegging', beskrivelse: 'Vi går gjennom anlegget og kartlegger behovet før vi starter arbeidet.' },
  { nummer: '02', tittel: 'Utførelse', beskrivelse: 'Service, kanalrens eller montasje utføres etter avtalt arbeid.' },
  { nummer: '03', tittel: 'Kontroll', beskrivelse: 'Vi kontrollerer resultatet av arbeidet og gir tilbakemelding på anleggets tilstand og eventuelle tiltak.' },
  { nummer: '04', tittel: 'Oppfølging', beskrivelse: 'Vi følger opp kundene over tid og gir anbefalinger for videre vedlikehold.' },
]

export default async function Home() {
  const [settings, services, projects, forside, priser, enova] = await Promise.all([
    client.fetch<SiteSettings>(siteSettingsQuery).catch(() => null),
    client.fetch<Service[]>(servicesQuery).catch(() => []),
    client.fetch<ReferenceProject[]>(referenceProjectsQuery).catch(() => []),
    client.fetch<Forside>(forsideQuery).catch(() => null),
    client.fetch<Priser>(priserQuery).catch(() => null),
    client.fetch<Enova>(enovaQuery).catch(() => null),
  ])

  const serviceList =
    services.length > 0
      ? services.map((s) => ({ slug: s.slug.current, title: s.title, description: s.description }))
      : FALLBACK_SERVICES
  const prisKort = priser?.kort ?? FALLBACK_PRISKORT
  const steps = forside?.prosessSteg ?? FALLBACK_STEPS
  const gallery = projects
    .flatMap((p) => (p.galleri || []).map((img) => ({ img, title: p.title })))
    .slice(0, 6)

  const phone = settings?.phone || '56 12 68 00'
  const email = settings?.email || 'ordre@straumetekniske.no'
  const heroImage = forside?.heroBilde ? urlFor(forside.heroBilde).width(1200).height(900).url() : HERO_FALLBACK
  const boligImage = forside?.boligeierBilde ? urlFor(forside.boligeierBilde).width(1000).height(750).url() : BOLIG_FALLBACK
  const omOssImage = forside?.omOssBilde ? urlFor(forside.omOssBilde).width(800).height(1000).url() : OMOSS_FALLBACK

  const schemas = [
    websiteJsonLd(),
    webPageJsonLd({ path: '/', name: forside?.seoTittel || 'Straume Boligvent', description: forside?.seoDescription }),
  ]

  return (
    <div className="kr home">
      <ScrollMotion />
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(s)} />
      ))}

      {/* 1. Hero */}
      <section className="hero" aria-labelledby="h1">
        <div className="wrap hero-grid">
          <div>
            <span className="hero-eyebrow">{settings?.heroPill || 'Bergen og omegn · Siden 2012'}</span>
            <h1 id="h1">{settings?.heroTitle || 'Ventilasjonsservice for bolig i Bergen'}</h1>
            <p className="hero-sub">
              {settings?.heroDescription ||
                'Vi hjelper deg med service, vedlikehold, rens, innregulering og montering med tydelig oppfølging fra befaring til ferdig utført arbeid.'}
            </p>
            <div className="hero-ctas">
              <a className="btn btn-primary btn-block-m" id="cta-hero" href="#bestill">{forside?.heroCta1Tekst ?? 'Ta kontakt'}</a>
              <a className="btn btn-secondary btn-block-m" id="cta-ring" href={`tel:${phone.replace(/\s/g, '')}`}>
                <PhoneIcon />
                Ring {phone}
              </a>
            </div>
            <ul className="hero-points">
              {(forside?.trustItems ?? ['Tydelig pris før oppstart', 'Langsiktig oppfølging', 'Kun nødvendige tiltak', 'Svar innen 24 timer']).map((t) => (
                <li key={t}><Check size={18} />{t}</li>
              ))}
            </ul>
            <GoogleRating />
          </div>

          <figure className="hero-media">
            <Image src={heroImage} width={1200} height={900} priority sizes="(min-width: 900px) 540px, 100vw" alt="Montør fra Straume Boligvent ved et ventilasjonsanlegg" />
            <figcaption className="hero-stats">
              {(forside?.heroStats ?? [{ verdi: '12+', label: 'År i bransjen' }, { verdi: '1 dag', label: 'Responstid' }]).map((s) => (
                <div key={s.label}><strong>{s.verdi}</strong><span>{s.label}</span></div>
              ))}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 2. Tillitslinje og leverandører */}
      <TrustBar />
      <div className="partners" aria-label={forside?.partnerLabel ?? 'Samarbeidspartnere'}>
        <div className="wrap">
          <span>{forside?.partnerLabel ?? 'Samarbeidspartnere'}:</span>
          {(forside?.partnere ?? ['Swegon', 'Flexit', 'Ventistål', 'Systemair']).map((p) => (<b key={p}>{p}</b>))}
        </div>
      </div>

      {/* 3. Tjenester */}
      <section className="section" id="tjenester" aria-labelledby="h-svc">
        <div className="wrap">
          <h2 id="h-svc">{forside?.tjenesterTittel ?? 'Tjenester for bolig og borettslag'}</h2>
          <p className="lead">{forside?.tjenesterBeskrivelse ?? 'Fra enkelt filterbytte til full montasje og utskifting av anlegg.'}</p>
          <div className="svc-grid">
            {serviceList.map((s) => (
              <Link key={s.slug} className="svc-card" href={`/tjenester/${s.slug}`}>
                <span className="icon" aria-hidden="true">{SERVICE_ICONS[s.slug] ?? SERVICE_ICONS['service-og-vedlikehold']}</span>
                <h3>{s.title}</h3>
                {s.description && <p>{s.description}</p>}
                <span className="more">Les mer <span aria-hidden="true">→</span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Priser */}
      <section className="section alt" id="priser" aria-labelledby="h-pris">
        <div className="wrap">
          <h2 id="h-pris">{priser?.tittel ?? 'Priser for ventilasjon i bolig'}</h2>
          <p className="lead">{priser?.beskrivelse ?? 'Vi hjelper deg med service, kanalrens og utskifting av ventilasjonsaggregat – tilpasset anlegget og behovet i boligen din.'}</p>
          <PriceCards kort={prisKort} />
          <p className="price-foot">
            {priser?.fotnoteTekst ?? 'Usikker på hva ventilasjonen trenger? Vi hjelper deg å vurdere anlegget.'}{' '}
            <a className="text-link" href="#bestill">{priser?.fotnoteCtaTekst ?? 'Ta kontakt'}</a>
          </p>
        </div>
      </section>

      {/* 5. Enova-støtte */}
      <section className="section" aria-labelledby="h-enova">
        <div className="wrap">
          <EnovaBox enova={enova} />
        </div>
      </section>

      {/* 6. Slik jobber vi */}
      <section className="section after" id="prosess" aria-labelledby="h-steps">
        <div className="wrap">
          <div className="after-inner">
            <h2 id="h-steps">{forside?.prosessTittel ?? 'Slik jobber vi'}</h2>
            <p className="lead">{forside?.prosessBeskrivelse ?? 'Alle oppdrag gjennomføres etter en fast arbeidsmetode – fra kartlegging til oppfølging.'}</p>
          </div>
          <ol className="steps steps-dark">
            {steps.map((s) => (
              <li key={s.nummer}>
                <span className="step-no" aria-hidden="true">{s.nummer}</span>
                <h3>{s.tittel}</h3>
                <p>{s.beskrivelse}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7. For boligeiere */}
      <section className="section" id="boligeiere" aria-labelledby="h-bolig">
        <div className="wrap">
          <div className="incl-grid">
            <div className="split-text">
              <h2 id="h-bolig">{forside?.boligeierTittel ?? 'For deg som eier bolig'}</h2>
              <p className="lead">{forside?.boligeierBeskrivelse ?? 'Ventilasjonsanlegget går hver dag. Regelmessig service gir:'}</p>
              <ul className="checks flush">
                {(forside?.boligeierSjekkpunkter ?? ['Bedre inneklima', 'Stabil temperatur', 'Lavere energibruk', 'Lengre levetid på anlegget']).map((t) => (
                  <li key={t}><Check />{t}</li>
                ))}
              </ul>
              <p className="note">{forside?.boligeierNotat ?? 'Vi tilpasser tiltaket etter boligens behov – ikke mer enn nødvendig.'}</p>
            </div>
            <figure className="split-figure">
              <Image src={boligImage} width={1000} height={750} sizes="(min-width: 900px) 460px, 100vw" alt="Ventilasjonsanlegg i en bolig" />
              <figcaption className="split-badge">{forside?.boligeierBadge ?? 'For boligeiere'}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 8. Montører */}
      <TeamSection />

      {/* 9. Kundeomtaler */}
      <ReviewsSection title={forside?.anmeldelserTittel ?? 'Hva kundene i Bergen sier'} />

      {/* 10. Om oss */}
      <section className="section" id="om-oss" aria-labelledby="h-om">
        <div className="wrap">
          <div className="incl-grid om-grid">
            <figure className="split-figure tall">
              <Image src={omOssImage} width={800} height={1000} sizes="(min-width: 900px) 440px, 100vw" alt="Straume Boligvent" />
              <figcaption className="split-badge bottom">
                {forside?.omOssBadgeTittel ?? 'Boligvent'}
                <small>{forside?.omOssBadgeTekst ?? 'Del av Straume Tekniske AS'}</small>
              </figcaption>
            </figure>
            <div className="split-text">
              <h2 id="h-om">{forside?.omOssTittel ?? 'Lokal fagkunnskap. Langsiktige relasjoner.'}</h2>
              <p className="lead">{forside?.omOssAvsnitt1 ?? 'Spesialisert ventilasjon siden 2012 – del av Straume Tekniske AS.'}</p>
              <p className="lead">{forside?.omOssAvsnitt2 ?? 'Én kontaktperson, fullt ansvar, bredt fagmiljø i ryggen.'}</p>
              <ul className="checks flush">
                {(forside?.omOssSjekkpunkter ?? [
                  'Sertifiserte teknikere med dokumentert kompetanse',
                  'Erfaring med Flexit, Systemair og Ventiståhl',
                  'Komplett leveranse – service til montasje',
                  'Tilpasset oppfølging for borettslag og sameier',
                  'Langsiktig oppfølging – ikke engangsoppdrag',
                ]).map((t) => (<li key={t}><Check />{t}</li>))}
              </ul>
              <Link className="text-link" href="/om-oss">Les mer om oss</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Galleri */}
      {gallery.length > 0 && (
        <section className="section alt" id="galleri" aria-labelledby="h-gal">
          <div className="wrap">
            <h2 id="h-gal">{forside?.galleriTittel ?? 'Bilder fra oppdrag i Bergen og omegn'}</h2>
            <p className="lead">{forside?.galleriBeskrivelse ?? 'Et utvalg bilder fra arbeid vi har utført for boligeiere og borettslag i Bergen og omegn.'}</p>
            <div className="gallery-grid">
              {gallery.map((g, i) => (
                <Link key={i} href="/galleri">
                  <Image src={urlFor(g.img).width(640).height(480).url()} width={640} height={480} sizes="(min-width: 900px) 360px, 50vw" alt={g.img.alt || g.title} />
                </Link>
              ))}
            </div>
            <p className="reviews-more"><Link className="text-link" href="/galleri">{(forside?.galleriCtaTekst ?? 'Se hele galleriet').replace(/\s*→$/, '')}</Link></p>
          </div>
        </section>
      )}

      {/* 12. Kontakt */}
      <section className="order" id="bestill" aria-labelledby="h-order">
        <div className="wrap order-grid">
          <div className="order-aside">
            <h2 id="h-order">{forside?.kontaktTittel ?? 'Ta kontakt – vi svarer innen én virkedag'}</h2>
            <p className="lead">{forside?.kontaktBeskrivelse ?? 'Fyll ut skjemaet, eller ring oss direkte. Vi stiller gjerne spørsmål om anlegget ditt for å gi deg riktig tilbud.'}</p>
            <ul className="contact-rows">
              <li><span>Telefon</span><a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a></li>
              <li><span>E-post</span><a href={`mailto:${email}`}>{email}</a></li>
              <li><span>Adresse</span><span>{settings?.address || 'Idrettsveien 93, 5353 Straume'}</span></li>
              <li><span>Åpent</span><span>{forside?.kontaktApningstider || 'Man–Fre 08:00–16:00 · Lør 09:00–15:00'}</span></li>
            </ul>
          </div>
          <OrderForm
            service="generell"
            serviceOptions={[
              ...serviceList.map((s) => ({ value: s.slug, label: s.title })),
              { value: 'annet', label: 'Annet / vet ikke' },
            ]}
            submitLabel="Send forespørsel"
            note="Vi svarer innen 1 virkedag."
            successTitle="Takk, vi har fått forespørselen!"
            successText="Vi tar kontakt innen 1 virkedag."
            allowImages
            imagesLabel="Bilde av anlegget"
          />
        </div>
      </section>
    </div>
  )
}
