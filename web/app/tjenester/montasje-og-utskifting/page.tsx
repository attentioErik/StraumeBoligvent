// Egen landingsside for montasje og utskifting. Overstyrer den generelle /tjenester/[slug]-malen for denne ene tjenesten.
// Innholdet er hentet fra Sanity-dokumentet «Montasje og utskifting» og satt opp i samme stil som kanalrens-siden.
import type { Metadata } from 'next'
import Image from 'next/image'
import '@/styles/landing.css'
import Link from 'next/link'
import OrderForm from '@/components/landing/OrderForm'
import ScrollMotion from '@/components/landing/ScrollMotion'
import LandingVideo from '@/components/landing/LandingVideo'
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

const PATH = '/tjenester/montasje-og-utskifting'
const TITLE = 'Montasje og utskifting av ventilasjonsanlegg'
const DESCRIPTION =
  'Profesjonell installasjon av nytt ventilasjonsaggregat og utskifting av eksisterende anlegg. Med riktig planlegging og utførelse sikrer vi optimal funksjon fra dag én.'
const HERO_TEXT =
  'Bråker aggregatet, fungerer det dårlig eller har det begynt å få feil? Vi hjelper deg å vurdere om det bør repareres eller byttes ut.'
const HERO_IMAGE = 'https://cdn.sanity.io/images/41btjoop/production/7356ab2390bc36d4cc816673c9f9876a500062d8-2400x1792.png'
const VIDEO = 'https://cdn.sanity.io/files/41btjoop/production/5e83c7c99107690b3aa93cec5d50ea23fca8ee3f.mp4'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absUrl(PATH),
    type: 'website',
    images: [{ url: `${HERO_IMAGE}?w=1200&h=630&fit=crop`, width: 1200, height: 630, alt: 'Montør monterer nytt ventilasjonsaggregat' }],
  },
  twitter: { title: TITLE, description: DESCRIPTION, images: [`${HERO_IMAGE}?w=1200&h=630&fit=crop`] },
}

const symptoms = [
  {
    text: 'Aggregatet er gammelt og nærmer seg slutten av levetiden',
    icon: (<svg {...iconProps}><path d="M7 3h10M7 21h10M8 3c0 5 8 5 8 9s-8 4-8 9M16 3c0 5-8 5-8 9" /></svg>),
  },
  {
    text: 'Vifter eller motorer er slitt eller defekte',
    icon: (<svg {...iconProps}><circle cx="12" cy="12" r="1.8" /><path d="M12 10.2C11 6 12.5 3.5 15 4.2c2.2.6 1.5 4-3 6M13.6 12.9c3.6 2.3 4.3 5.1 2.4 6.6-1.8 1.4-4.2-1.2-2.4-6.6M10.4 12.9c-4.2 1-6.7-.3-6.4-2.8.3-2.3 3.8-2 6.4 2.8" /></svg>),
  },
  {
    text: 'Styringssystem eller elektronikk har fått feil',
    icon: (<svg {...iconProps}><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" /><path d="M13 9l-2 3h2l-2 3" /></svg>),
  },
  {
    text: 'Reservedeler er kostbare eller vanskelig å skaffe',
    icon: (<svg {...iconProps}><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z" /></svg>),
  },
  {
    text: 'Aggregatet støyer mer enn tidligere',
    icon: (<svg {...iconProps}><path d="M4 9h3l5-4v14l-5-4H4z" /><path d="M16 9.5a3.5 3.5 0 0 1 0 5M18.5 7a7 7 0 0 1 0 10" /></svg>),
  },
  {
    text: 'Energieffektiviteten er lav sammenlignet med nyere aggregater',
    icon: (<svg {...iconProps}><path d="M13 2L4 14h7l-1 8 9-12h-7z" /></svg>),
  },
]

const whenItems = [
  'Vurdering av aggregatets alder og tilstand',
  'Kartlegging av feil og slitasje på komponenter',
  'Vurdering av tilgjengelighet på reservedeler',
  'Sammenligning av kostnader ved reparasjon vs. utskifting',
  'Anbefaling av egnet nytt aggregat for boligen',
]

const steps = [
  { title: 'Demontering av eksisterende aggregat', text: 'Det gamle aggregatet kobles fra og fjernes på en ryddig og kontrollert måte, klar for den nye enheten.' },
  { title: 'Montering av nytt aggregat', text: 'Det nye aggregatet installeres og kobles til ventilasjonssystemet i henhold til produsentens spesifikasjoner.' },
  { title: 'Tilpasning av tilkoblinger', text: 'Kanaler, kondensavløp, strøm og styring kontrolleres og tilpasses ved behov for å sikre korrekt tilkobling.' },
  { title: 'Oppstart og funksjonstest', text: 'Anlegget startes opp og kontrolleres grundig for å sikre stabil drift og riktig funksjon fra første dag.' },
]

const benefits = [
  'Mer energieffektiv varmegjenvinning',
  'Mer stillegående drift',
  'Mer stabil ventilasjon i boligen',
  'Moderne styring og regulering av anlegget',
  'Bedre grunnlag for videre service og vedlikehold',
]

const enovaKrav = [
  'Anlegg med høy varmegjenvinning',
  'Søknad godkjent før arbeidet starter',
  'Utført av godkjent leverandør',
  'Idriftsettelse og rapport',
]

const faqs: Faq[] = [
  {
    q: 'Hvor lang tid tar en utskifting?',
    a: 'Utskifting av ventilasjonsaggregat utføres vanligvis i løpet av én arbeidsdag, avhengig av installasjon og tilgjengelighet. Aggregatet er ofte plassert på loft, i bod eller teknisk rom.',
  },
  {
    q: 'Hvordan foregår arbeidet?',
    a: 'Arbeidet innebærer demontering av eksisterende enhet og installasjon av nytt aggregat. Ventilasjonsanlegget settes i drift igjen etter at installasjonen er ferdig og kontrollert.',
  },
  {
    q: 'Bør aggregatet repareres eller skiftes ut?',
    a: 'I mange tilfeller kan enkeltkomponenter repareres eller byttes. Er aggregatet gammelt eller flere deler slitt, vil utskifting ofte være en mer hensiktsmessig løsning. Vi vurderer tilstanden og gir en faglig anbefaling.',
    link: { href: '/tjenester/service-og-vedlikehold', label: 'Les om service og reparasjon' },
  },
  {
    q: 'Leverer dere til borettslag og næring?',
    a: 'Ja, vi leverer løsninger for både bolig og næring, tilpasset behovet.',
    link: { href: '/borettslag', label: 'Les om borettslag' },
  },
]

export default function MontasjePage() {
  const schemas = [
    serviceJsonLd({ name: 'Montasje og utskifting', description: DESCRIPTION, slug: 'montasje-og-utskifting', image: `${HERO_IMAGE}?w=1200&h=630&fit=crop` }),
    breadcrumbJsonLd([
      { name: 'Forside', path: '/' },
      { name: 'Tjenester', path: '/#tjenester' },
      { name: 'Montasje og utskifting', path: PATH },
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
            <h1 id="h1">Montasje og utskifting av ventilasjonsanlegg</h1>
            <p className="hero-sub">{HERO_TEXT}</p>
            <div className="hero-ctas">
              <a className="btn btn-primary btn-block-m" id="cta-hero" href="#bestill">Få et uforpliktende tilbud</a>
              <a className="btn btn-secondary btn-block-m" id="cta-ring" href="tel:56126800">
                <PhoneIcon />
                Ring 56 12 68 00
              </a>
            </div>
            <p className="hero-note">Uforpliktende tilbud og faglig anbefaling. Vi svarer innen 1 virkedag.</p>
            <GoogleRating />
          </div>

          <figure className="hero-media">
            <Image
              src={HERO_IMAGE}
              width={2400}
              height={1792}
              priority
              sizes="(min-width: 900px) 540px, 100vw"
              alt="Montør fra Straume monterer nytt ventilasjonsaggregat i et teknisk rom"
            />
            <figcaption className="hero-chip">
              <ClockIcon />
              Vanligvis ferdig på én arbeidsdag
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 2. Tillitslinje */}
      <TrustBar />

      {/* 3. Tegn på at aggregatet bør skiftes ut */}
      <section className="section" aria-labelledby="h-sym">
        <div className="wrap">
          <h2 id="h-sym">Tegn på at aggregatet bør skiftes ut</h2>
          <p className="lead">Over tid slites vifter, motorer og styringskomponenter. Kjenner du igjen ett eller flere av disse tegnene, er utskifting ofte en mer langsiktig og stabil løsning enn å reparere enkeltkomponenter:</p>
          <div className="sym-grid">
            <div>
              <ul className="sym-list">
                {symptoms.map((s) => (
                  <li key={s.text}><span className="icon" aria-hidden="true">{s.icon}</span>{s.text}</li>
                ))}
              </ul>
              <div className="sym-cta">
                <a className="btn btn-primary btn-block-m" id="cta-symptomer" href="#bestill">Kjenner du deg igjen? Få et tilbud</a>
              </div>
            </div>
            <figure className="figure sym-figure video-figure">
              <LandingVideo src={VIDEO} poster={`${HERO_IMAGE}?w=720&fm=webp`} label="Video av montering av ventilasjonsaggregat" />
            </figure>
          </div>
        </div>
      </section>

      {/* 4. Reparasjon eller utskifting */}
      <section className="section alt" aria-labelledby="h-when">
        <div className="wrap">
          <h2 id="h-when">Når er utskifting riktig løsning?</h2>
          <div className="incl-grid">
            <div className="intro-text">
              <p>Ventilasjonsaggregatet er selve kjernen i ventilasjonssystemet i boligen. Det sørger for at frisk luft tilføres oppholdsrom samtidig som brukt luft trekkes ut.</p>
              <p>I mange tilfeller kan enkeltkomponenter repareres eller byttes. Men dersom aggregatet er gammelt eller flere deler er slitt, vil utskifting ofte være en mer hensiktsmessig løsning.</p>
              <p>Vi monterer nye ventilasjonsaggregater og erstatter eldre enheter med moderne og mer energieffektive løsninger, tilpasset boligens ventilasjonssystem.</p>
            </div>
            <div className="price-card">
              <div className="price-card-head">
                <div><p>Reparasjon eller utskifting?</p><strong className="card-title">Vi vurderer det for deg</strong></div>
              </div>
              <ul className="checks">
                {whenItems.map((t) => (<li key={t}><Check />{t}</li>))}
              </ul>
              <div className="price-card-foot">
                <a className="text-link" href="#bestill">Be om en vurdering</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Slik foregår det */}
      <section className="section" aria-labelledby="h-steps">
        <div className="wrap">
          <h2 id="h-steps">Montering av nytt ventilasjonsaggregat</h2>
          <p className="lead">Løsningen tilpasses eksisterende ventilasjonskanaler og boligens behov.</p>
          <ol className="steps">
            {steps.map((s, i) => (
              <li key={s.title}>
                <span className="step-no" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="done"><Check />Vanligvis ferdig på én arbeidsdag</p>
        </div>
      </section>

      {/* 6. Etter utskifting */}
      <section className="section after" aria-labelledby="h-after">
        <div className="wrap">
          <div className="after-inner">
            <h2 id="h-after"><Check size={32} />Hva du sitter igjen med etter utskifting</h2>
            <p className="lead">Et nytt ventilasjonsaggregat kan gi merkbare forbedringer – og med riktig installasjon og oppfølging gir det stabil ventilasjon i mange år fremover.</p>
            <ul className="after-list">
              {benefits.map((t) => (<li key={t}><Check />{t}</li>))}
            </ul>
          </div>
        </div>
      </section>

      {/* Enova-støtte */}
      <section className="section alt" id="enova" aria-labelledby="h-enova">
        <div className="wrap">
          <h2 id="h-enova">Få opptil 15&nbsp;000 kr i Enova-støtte</h2>
          <p className="lead">Velger du balansert ventilasjon med varmegjenvinning, kan du søke Enova om økonomisk støtte til nytt aggregat.</p>
          <div className="incl-grid">
            <div className="intro-text">
              <p>Støtten dekker inntil 25&nbsp;% av godkjente kostnader, maks ca. 15&nbsp;000 kr. Du søker selv via Enova.no <b>før</b> arbeidet starter.</p>
              <p>Vi anbefaler et aggregat som kvalifiserer, og hjelper deg med dokumentasjonen du trenger til søknaden.</p>
              <p className="fine">Beløp og vilkår fastsettes av Enova og kan endres. Sjekk alltid gjeldende satser på Enova.no.</p>
              <div className="enova-cta">
                <a className="btn btn-primary btn-block-m" id="cta-enova" href="#bestill">Få tilbud med Enova-støtte</a>
                <Link className="text-link" href="/enova">Les mer om Enova-støtte</Link>
              </div>
            </div>
            <div className="price-card">
              <div className="price-card-head">
                <div><p>Enova-støtte</p><strong>Opptil 15&nbsp;000 kr</strong></div>
                <p>25&nbsp;% av godkjente kostnader</p>
              </div>
              <ul className="checks">
                {enovaKrav.map((t) => (<li key={t}><Check />{t}</li>))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Montører */}
      <TeamSection />

      {/* 8. Kundeomtaler */}
      <ReviewsSection />

      {/* 9. Løfte */}
      <PromiseSection items={[<><b>Uforpliktende</b> tilbud</>, <b key="s">Ingen skjulte kostnader</b>, <b key="v">Svar innen 1 virkedag</b>]} />

      {/* 10. FAQ */}
      <FaqList faqs={faqs} />

      {/* 11. Tilbudsskjema */}
      <section className="order" id="bestill" aria-labelledby="h-order">
        <div className="wrap order-grid">
          <div className="order-aside">
            <h2 id="h-order">Få et uforpliktende tilbud</h2>
            <p className="lead">Vi gir en anbefaling basert på ditt anlegg og behov.</p>
            <ul>
              <li><Check /><span><b>Uforpliktende</b> tilbud</span></li>
              <li><Check /><span><b>Faglig anbefaling</b> for ditt anlegg</span></li>
              <li><Check /><span><b>Vanligvis ferdig</b> på én arbeidsdag</span></li>
            </ul>
          </div>
          <OrderForm
            service="montasje-og-utskifting"
            submitLabel="Få tilbud"
            note="Uforpliktende. Vi svarer innen 1 virkedag."
            successTitle="Takk, vi har fått forespørselen!"
            successText="Vi tar kontakt innen 1 virkedag."
            messagePlaceholder="F.eks. type aggregat, alder, eller hva som ikke fungerer"
            allowImages
            imagesLabel="Bilde av eksisterende aggregat"
          />
        </div>
      </section>
    </div>
  )
}
