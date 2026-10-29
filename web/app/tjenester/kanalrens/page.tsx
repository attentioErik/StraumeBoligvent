// Egen landingsside for kanalrens. Overstyrer den generelle /tjenester/[slug]-malen for denne ene tjenesten.
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import '@/styles/landing.css'
import BeforeAfter from '@/components/landing/BeforeAfter'
import OrderForm from '@/components/landing/OrderForm'
import ScrollMotion from '@/components/landing/ScrollMotion'
import {
  Check,
  ClockIcon,
  FaqList,
  GoogleRating,
  PhoneIcon,
  PromiseSection,
  ReviewsSection,
  TeamSection,
  TrustBar,
  iconProps,
  type Faq,
} from '@/components/landing/parts'
import { absUrl } from '@/lib/site'
import { serviceJsonLd, faqJsonLd, breadcrumbJsonLd, jsonLdScript } from '@/lib/jsonld'

const PATH = '/tjenester/kanalrens'
const TITLE = 'Kanalrens i Bergen og omegn'
const DESCRIPTION =
  'Kanalrens i Bergen og omegn til fast pris fra 4 250,–. Rens av kanaler og ventiler, kontroll av luftmengde. Tar ca. 1 time i en vanlig bolig. Bestill i dag.'
const OG_DESCRIPTION =
  'Rengjøring av ventilasjonskanaler for bedre luftkvalitet, riktig luftstrøm og et ventilasjonssystem som jobber slik det skal.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: 'Kanalrens i Bergen – fast pris fra 4 250,–',
    description: OG_DESCRIPTION,
    url: absUrl(PATH),
    type: 'website',
    images: [{ url: '/images/kanalrens/hero.webp', width: 1200, height: 899, alt: 'Montør fra Straume renser en takventil' }],
  },
  twitter: {
    title: 'Kanalrens i Bergen – fast pris fra 4 250,–',
    description: OG_DESCRIPTION,
    images: ['/images/kanalrens/hero.webp'],
  },
}

const faqs: Faq[] = [
  {
    q: 'Hvor ofte bør kanalene renses?',
    a: 'For boliger anbefales det omtrent hvert 5.–6. år. Det avhenger av bruk, støvnivå og type ventilasjonsanlegg.',
  },
  {
    q: 'Blir det støv eller rot?',
    a: 'Vi bruker spesialutstyr for ventilasjonskanaler, og arbeidet foregår hovedsakelig ved ventilene og ved aggregatet. Anlegget settes tilbake i normal drift når vi er ferdige.',
  },
  {
    q: 'Hva er forskjellen på kanalrens og service?',
    a: 'Kanalrens er rengjøring av kanalnettet og ventilene. Service er vedlikehold av selve ventilasjonsanlegget. De to kan kombineres for en komplett gjennomgang.',
    link: { href: '/tjenester/service-og-vedlikehold', label: 'Les om service' },
  },
  {
    q: 'Hva gjelder for borettslag?',
    a: 'Borettslag har egne priser.',
    link: { href: '/borettslag', label: 'Se priser for borettslag' },
  },
]

const steps = [
  { title: 'Inspeksjon', text: 'Vi sjekker ventiler og tilgjengelige kanaler for å se tilstanden og planlegge arbeidet.' },
  { title: 'Rens av kanaler', text: 'Spesialutstyr løsner og fjerner støv og avleiringer fra kanalveggene uten å skade anlegget.' },
  { title: 'Rengjøring av ventiler', text: 'Tillufts- og avtrekksventilene tas ned, rengjøres og settes tilbake på plass.' },
  { title: 'Kontroll av luftstrøm', text: 'Vi kontrollerer at luftmengdene er som forventet og at anlegget går normalt igjen.' },
]

const afterBenefits = [
  'Bedre luft og mer effektiv ventilasjon i boligen',
  'Mindre oppsamlet støv i kanalnettet og renere luft i boligen',
  'Jevnere drift og lengre levetid på ventilasjonsanlegget',
  'Faglig gjennomgang av anleggets tilstand',
]

const included = [
  'Inspeksjon av anlegget før vi starter',
  'Rens av kanaler med spesialutstyr',
  'Demontering og rens av tillufts- og avtrekksventiler',
  'Kontroll av luftmengde etter rens',
]

const symptoms = [
  {
    text: 'Du vet ikke når kanalene sist ble renset',
    icon: (<svg {...iconProps}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /><path d="M10.5 14a1.6 1.6 0 1 1 2.2 1.5c-.5.2-.7.6-.7 1.1M12 19h.01" /></svg>),
  },
  {
    text: 'Lukt fra matlaging eller bad blir hengende',
    icon: (<svg {...iconProps}><path d="M4 14h16l-1.5 6h-13z" /><path d="M8 10c0-1.5 1.5-1.5 1.5-3S8 5.5 8 4M12 10c0-1.5 1.5-1.5 1.5-3S12 5.5 12 4M16 10c0-1.5 1.5-1.5 1.5-3S16 5.5 16 4" /></svg>),
  },
  {
    text: 'Synlig støv rundt ventiler',
    icon: (<svg {...iconProps} strokeLinejoin={undefined}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3.5" /><path d="M6 19.5h.01M9 21h.01M15 21h.01M18 19.5h.01M12 22h.01" /></svg>),
  },
  {
    text: 'Mer støv i boligen enn normalt',
    icon: (<svg {...iconProps}><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" /><path d="M8 15h.01M11 17h.01M14 14h.01M16 17h.01M10 13h.01" /></svg>),
  },
  {
    text: 'Lite luft fra ventilene',
    icon: (<svg {...iconProps} strokeLinejoin={undefined}><path d="M3 8h10a2.5 2.5 0 1 0-2.5-2.5" /><path d="M3 12h6" strokeDasharray="2 3" /><path d="M3 16h4" strokeDasharray="2 3" /></svg>),
  },
]

export default function KanalrensPage() {
  const schemas = [
    serviceJsonLd({ name: 'Kanalrens', description: DESCRIPTION, slug: 'kanalrens', image: absUrl('/images/kanalrens/hero.webp'), priceFrom: 4250 }),
    breadcrumbJsonLd([
      { name: 'Forside', path: '/' },
      { name: 'Tjenester', path: '/#tjenester' },
      { name: 'Kanalrens', path: PATH },
    ]),
    faqJsonLd(faqs.map((f) => ({ question: f.q, answer: f.a }))),
  ]

  return (
    <div className="kr">
      <ScrollMotion />
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(s)} />
      ))}

      {/* 1. Hero */}
      <section className="hero" aria-labelledby="h1">
        <div className="wrap hero-grid">
          <div>
            <h1 id="h1">Kanalrens i Bergen og omegn</h1>
            <p className="hero-sub">{OG_DESCRIPTION}</p>
            <p className="price"><strong>Fra 4&nbsp;250,– inkl. mva.</strong></p>
            <div className="hero-ctas">
              <a className="btn btn-primary btn-block-m" id="cta-hero" href="#bestill">Bestill kanalrens</a>
              <a className="btn btn-secondary btn-block-m" id="cta-ring" href="tel:56126800">
                <PhoneIcon />
                Ring 56 12 68 00
              </a>
            </div>
            <p className="hero-note">Fast pris før vi starter – ingen overraskelser. Vi svarer innen 1 virkedag.</p>

            <GoogleRating />
          </div>

          <figure className="hero-media">
            <Image
              src="/images/kanalrens/hero.webp"
              width={1200}
              height={899}
              priority
              sizes="(min-width: 900px) 540px, 100vw"
              alt="Montør fra Straume renser en takventil på et bad med en lang børste"
            />
            <figcaption className="hero-chip">
              <ClockIcon />
              Ca. 1 time i en vanlig bolig
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 2. Tillitslinje */}
      <TrustBar />

      {/* 3. Symptomer */}
      <section className="section" aria-labelledby="h-sym">
        <div className="wrap">
          <h2 id="h-sym">Når bør kanalrens vurderes?</h2>
          <p className="lead">For boliger anbefales kanalrens omtrent hvert 5.–6. år, avhengig av bruk, støvnivå og type anlegg. Disse tegnene tyder på at det er på tide:</p>
          <div className="sym-grid">
            <div>
              <ul className="sym-list">
                {symptoms.map((s) => (
                  <li key={s.text}><span className="icon" aria-hidden="true">{s.icon}</span>{s.text}</li>
                ))}
              </ul>
              <div className="sym-cta">
                <a className="btn btn-primary btn-block-m" id="cta-symptomer" href="#bestill">Kjenner du deg igjen? Bestill kanalrens</a>
              </div>
            </div>
            <figure className="figure sym-figure">
              <Image src="/images/kanalrens/ventil-stov.webp" width={640} height={800} sizes="(min-width: 900px) 440px, 100vw" alt="Avtrekksventil holdt opp etter demontering, full av grått støv" />
              <figcaption>Ventil demontert under kanalrens, fra en av våre jobber. Slik kan det se ut etter noen år uten rens.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 4. Inkludert */}
      <section className="section alt" aria-labelledby="h-incl">
        <div className="wrap">
          <h2 id="h-incl">Dette er inkludert i prisen</h2>
          <div className="incl-grid">
            <div className="price-card">
              <div className="price-card-head">
                <div><p>Kanalrens, fast pris</p><strong>Fra 4&nbsp;250,–</strong></div>
                <p>inkl. mva.</p>
              </div>
              <ul className="checks">
                {included.map((t) => (<li key={t}><Check />{t}</li>))}
              </ul>
              <div className="price-card-foot">
                <Link className="text-link" href="/borettslag">Borettslag? Se egne priser</Link>
              </div>
            </div>
            <figure className="figure incl-figure">
              <Image src="/images/kanalrens/stovhaug.webp" width={700} height={700} sizes="(min-width: 900px) 420px, 100vw" alt="En stor haug med grått støv på en filtermatte på gulvet" />
              <figcaption>Støv fjernet under en av våre jobber.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 5. Slik foregår det */}
      <section className="section" aria-labelledby="h-steps">
        <div className="wrap">
          <h2 id="h-steps">Slik foregår det</h2>
          <ol className="steps">
            {steps.map((s, i) => (
              <li key={s.title}>
                <span className="step-no" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="done"><Check />Ferdig på ca. 1 time</p>
        </div>
      </section>

      {/* 6. Før/etter */}
      <section className="section alt" aria-labelledby="h-ba">
        <div className="wrap">
          <h2 id="h-ba">Før og etter kanalrens</h2>
          <p className="lead">Bilder fra ekte jobber i Bergen-området.</p>
          <div className="ba-grid">
            <BeforeAfter />
          </div>
        </div>
      </section>

      {/* Etter fullført kanalrens (kun informasjon) */}
      <section className="section after" aria-labelledby="h-after">
        <div className="wrap">
          <div className="after-inner">
            <h2 id="h-after"><Check size={32} />Etter fullført kanalrens</h2>
            <p className="lead">Et rengjort ventilasjonssystem gir bedre forutsetninger for god luftkvalitet og stabil drift – og en faglig gjennomgang som kan avdekke forhold som bør følges opp videre.</p>
            <ul className="after-list">
              {afterBenefits.map((t) => (<li key={t}><Check />{t}</li>))}
            </ul>
          </div>
        </div>
      </section>

      {/* 7. Montører */}
      <TeamSection />

      {/* 8. Kundeomtaler */}
      <ReviewsSection />

      {/* 9. Garanti */}
      <PromiseSection items={[<><b>Fast pris</b> før vi starter</>, <b key="s">Ingen skjulte kostnader</b>, <b key="v">Svar innen 1 virkedag</b>]} />

      {/* 10. FAQ */}
      <FaqList faqs={faqs} />

      {/* 11. Bestillingsskjema */}
      <section className="order" id="bestill" aria-labelledby="h-order">
        <div className="wrap order-grid">
          <div className="order-aside">
            <h2 id="h-order">Bestill kanalrens</h2>
            <p className="lead">Fyll inn, så ringer vi deg for å avtale tidspunkt.</p>
            <ul>
              <li><Check /><span><b>Fra 4&nbsp;250,– inkl. mva.</b></span></li>
              <li><Check /><span><b>Fast pris</b> før vi starter</span></li>
              <li><Check /><span><b>Ca. 1 time</b> i en vanlig bolig</span></li>
            </ul>
          </div>
          <OrderForm
            service="kanalrens"
            showWeek
            submitLabel="Bestill kanalrens"
            note="Fast pris før vi starter. Vi ringer deg innen 1 virkedag for å avtale tidspunkt."
            successTitle="Takk, vi har fått bestillingen!"
            successText="Vi ringer deg innen 1 virkedag for å avtale tidspunkt."
          />
        </div>
      </section>
    </div>
  )
}
