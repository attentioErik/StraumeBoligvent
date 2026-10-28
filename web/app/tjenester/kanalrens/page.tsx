// Egen landingsside for kanalrens. Overstyrer den generelle /tjenester/[slug]-malen for denne ene tjenesten.
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import '@/styles/kanalrens.css'
import BeforeAfter from '@/components/kanalrens/BeforeAfter'
import OrderForm from '@/components/kanalrens/OrderForm'
import ScrollMotion from '@/components/kanalrens/ScrollMotion'
import { absUrl } from '@/lib/site'
import { serviceJsonLd, faqJsonLd, breadcrumbJsonLd, jsonLdScript } from '@/lib/jsonld'

const PATH = '/tjenester/kanalrens'
const TITLE = 'Kanalrens i Bergen og omegn'
const DESCRIPTION =
  'Kanalrens i Bergen og omegn til fast pris fra 4 250,–. Rens av kanaler og ventiler, kontroll av luftmengde. Tar ca. 1 time i en vanlig bolig. Bestill i dag.'
const OG_DESCRIPTION =
  'Rengjøring av ventilasjonskanaler for bedre luftkvalitet, riktig luftstrøm og et ventilasjonssystem som jobber slik det skal.'
const GOOGLE_URL = 'https://www.google.com/search?q=Straume+Boligvent'

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

const faqs = [
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

const reviews = [
  { text: 'Veldig fornøyd med service og utført jobb. Hyggelig tekniker', name: 'Gudrid Tillung' },
  { text: 'Har hatt service med bytte av vifter på ventilasjon anlegget. Jobben ble gjort av Patrick og Isak. Veldig fornøyd med servicen …', name: 'Evy Rose Thomassen' },
  { text: 'Super fornøyd med Isac Skutle so var å skiftet filter 14.feb 2026. Hyggelig, rask og veldig kunnskapsrik. Den beste som har har skiftet…', name: 'Mona Solberg' },
]

const team = [
  { name: 'Patrick Tøgard', src: '/images/kanalrens/patrick.webp' },
  { name: 'Isac Skutle', src: '/images/kanalrens/isac.webp' },
  { name: 'Daniel Tøgard', src: '/images/kanalrens/daniel.webp' },
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

function Star() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#F0A500" d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z" />
    </svg>
  )
}

function Stars({ label }: { label?: string }) {
  return (
    <span className="stars" {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}>
      {[0, 1, 2, 3, 4].map((i) => <Star key={i} />)}
    </span>
  )
}

function Check({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#F0A500" />
      <path d="M7.5 12.5l3 3 6-6.5" stroke="#1E1A12" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Badge() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2.5l2.4 1.8 3-.1.9 2.9 2.4 1.8-.9 2.9.9 2.9-2.4 1.8-.9 2.9-3-.1L12 21.5l-2.4-1.8-3 .1-.9-2.9-2.4-1.8.9-2.9-.9-2.9 2.4-1.8.9-2.9 3 .1z" fill="#FFF8E1" stroke="#B87800" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M8.5 12l2.4 2.4 4.6-4.8" stroke="#1E1A12" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PhoneIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  )
}

const iconProps = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: '#1E1A12', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

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

            <a className="rating" href={GOOGLE_URL} target="_blank" rel="noopener">
              <svg width="22" height="22" viewBox="0 0 48 48" aria-label="Google" role="img">
                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
                <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
              </svg>
              <Stars />
              <span className="rating-text"><b>4,9/5</b> basert på 22 Google-anmeldelser</span>
            </a>
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
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="#B87800" strokeWidth="2" /><path d="M12 7v5l3 2" stroke="#B87800" strokeWidth="2" strokeLinecap="round" /></svg>
              Ca. 1 time i en vanlig bolig
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 2. Tillitslinje */}
      <section className="trust" aria-label="Sertifiseringer og erfaring">
        <div className="wrap">
          <ul>
            {['Miljøsertifisert', 'EKOM Autorisasjon', 'Sentral Godkjent', '12+ års erfaring'].map((t) => (
              <li key={t}><Badge />{t}</li>
            ))}
          </ul>
        </div>
      </section>

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
      <section className="section" aria-labelledby="h-team">
        <div className="wrap">
          <h2 id="h-team">Møt montørene</h2>
          <p className="lead">Det er en av disse som kommer hjem til deg.</p>
          <div className="team">
            {team.map((m) => (
              <figure key={m.name}>
                <Image src={m.src} width={480} height={600} sizes="(min-width: 900px) 240px, 33vw" alt={`Portrett av montør ${m.name}`} />
                <figcaption>{m.name}<span className="role">Montør ventilasjon</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Kundeomtaler */}
      <section className="section alt" aria-labelledby="h-rev">
        <div className="wrap">
          <h2 id="h-rev">Hva kundene sier</h2>
          <p className="lead">4,9 av 5 på Google, basert på 22 anmeldelser.</p>
          <div className="reviews">
            {reviews.map((r) => (
              <blockquote className="review" key={r.name}>
                <Stars label="5 av 5 stjerner" />
                <p>{r.text}</p>
                <footer>{r.name}, Google</footer>
              </blockquote>
            ))}
          </div>
          <p className="reviews-more"><a className="text-link" href={GOOGLE_URL} target="_blank" rel="noopener">Les alle anmeldelsene på Google</a></p>
        </div>
      </section>

      {/* 9. Garanti */}
      <section className="section" aria-labelledby="h-promise">
        <div className="wrap">
          <div className="promise">
            <div className="promise-icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1E1A12" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></svg>
            </div>
            <div>
              <h2 id="h-promise">Dette lover vi deg</h2>
              <ul className="promise-list">
                <li><Check /><span><b>Fast pris</b> før vi starter</span></li>
                <li><Check /><span><b>Ingen skjulte kostnader</b></span></li>
                <li><Check /><span><b>Svar innen 1 virkedag</b></span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="section alt" aria-labelledby="h-faq">
        <div className="wrap">
          <h2 id="h-faq">Vanlige spørsmål</h2>
          <div className="faq">
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}<span className="plus" aria-hidden="true" /></summary>
                <div className="ans">
                  <p>{f.a}</p>
                  {f.link && <p><Link className="text-link" href={f.link.href}>{f.link.label}</Link></p>}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

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
          <OrderForm />
        </div>
      </section>
    </div>
  )
}
