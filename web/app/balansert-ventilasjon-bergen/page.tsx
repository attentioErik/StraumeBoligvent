// Landingsside for balansert ventilasjon i Bergen – fortsettelse av reklamevideoen.
// UTKAST: siden er ikke i menyen eller sitemap, og har noindex til den er godkjent (se UTKAST under).
// Gjenbruker de felles landingskomponentene (montører, anmeldelser, FAQ, skjema, Enova-blokk) uten å endre dem.
// Egne stiler for denne siden ligger i styles/balansert.css, scopet under .kr.bv.
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import '@/styles/landing.css'
import '@/styles/balansert.css'
import OrderForm from '@/components/landing/OrderForm'
import ScrollMotion from '@/components/landing/ScrollMotion'
import HeroVideo from '@/components/landing/HeroVideo'
import {
  Check,
  FaqList,
  GoogleRating,
  PhoneIcon,
  ReviewsSection,
  TeamSection,
  TrustBar,
  iconProps,
  type Faq,
} from '@/components/landing/parts'
import { absUrl } from '@/lib/site'
import { webPageJsonLd, faqJsonLd, breadcrumbJsonLd, jsonLdScript } from '@/lib/jsonld'

/** Sett til false når siden er godkjent for publisering (fjerner noindex). */
const UTKAST = true

const PATH = '/balansert-ventilasjon-bergen'
const TITLE = 'Balansert ventilasjon i Bergen og omegn'
const DESCRIPTION =
  'Dårlig luft, fukt eller manglende tilluft i en eldre bolig? Balansert ventilasjon med varmegjenvinning gir friskere luft og mindre varmetap. Få et uforpliktende prisforslag.'

/** Plakatbilde i hero (stående 1792×2400). */
const HERO_IMAGE = 'https://ucarecdn.com/7e76e387-8ee9-4b53-9f14-55c6c650d24a/-/preview/1792x2400/'
/** Liggende versjon for deling i sosiale medier. */
const OG_IMAGE = 'https://ucarecdn.com/8268e909-9424-4674-9961-e844e57e3d62/-/preview/2752x1536/'
/** Reklamevideoen (9:16). Lim inn URL til mp4-filen her. Uten verdi vises hero-bildet. */
const VIDEO: string | undefined = undefined
const INSTALL_IMAGE = 'https://cdn.sanity.io/images/41btjoop/production/7356ab2390bc36d4cc816673c9f9876a500062d8-2400x1792.png'
// Stående bilder (1080×1920) på Uploadcare
const FUKT_IMAGE = 'https://ucarecdn.com/0963e148-bd63-4cf6-9442-7fd941618d8a/-/preview/1080x1920/'
const STUE_IMAGE = 'https://ucarecdn.com/b50c12c1-f2bb-468e-968a-fc7a623280fc/-/preview/1080x1920/'
const ROR_IMAGE = 'https://ucarecdn.com/fefa3e54-35c8-4d75-8ec0-842b3b8f1dd6/-/preview/1080x1920/'
const ENOVA_URL ='https://enova.no/nb/privat/bolig/stotte/balansert-ventilasjonsanlegg'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  robots: UTKAST ? { index: false, follow: false, googleBot: { index: false, follow: false } } : undefined,
  openGraph: {
    title: 'Dårlig luft eller fukt i en eldre bolig?',
    description: DESCRIPTION,
    url: absUrl(PATH),
    type: 'website',
    images: [{ url: OG_IMAGE, width: 2752, height: 1536, alt: 'Ventilasjonsaggregat med varmegjenvinning på et loft' }],
  },
  twitter: { title: 'Dårlig luft eller fukt i en eldre bolig?', description: DESCRIPTION, images: [OG_IMAGE] },
}

const problems = [
  {
    title: 'Dårlig luft',
    text: 'Luften føles tung eller innestengt.',
    icon: (<svg {...iconProps}><path d="M3 9h11a3 3 0 1 0-3-3" /><path d="M3 15h15a3 3 0 1 1-3 3" /><path d="M3 12h6" /></svg>),
  },
  {
    title: 'Fuktighet',
    text: 'Kondens på vinduer eller høy luftfuktighet.',
    icon: (<svg {...iconProps}><path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" /><path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5" /></svg>),
  },
  {
    title: 'Manglende tilluft',
    text: 'Luft trekkes ut, men det kommer ikke inn nok frisk luft.',
    icon: (<svg {...iconProps}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="1.5" /><path d="M12 10.5c-.5-2.5.5-4 2-4M13.3 12.8c2.2.9 2.9 2.5 2 3.8M10.7 12.8c-2 1.4-3.8 1.2-4.3-.3" /></svg>),
  },
  {
    title: 'Trekk og varmetap',
    text: 'Kald luft og unødvendig varmetap.',
    icon: (<svg {...iconProps}><path d="M14 14.8V5a2 2 0 1 0-4 0v9.8a4 4 0 1 0 4 0z" /><path d="M12 9v7" /><path d="M18 6h3M18 10h2" /></svg>),
  },
]

const benefits = [
  {
    title: 'Frisk, filtrert luft',
    text: 'Uteluften filtreres før den kommer inn, slik at støv og pollen holdes ute.',
    icon: (<svg {...iconProps}><path d="M4 5h16l-6 7v6l-4 2v-8z" /></svg>),
  },
  {
    title: 'Mindre trekk og kald tilluft',
    text: 'Luften varmes opp av avtrekksluften før den blåses inn. Du slipper kald trekk fra ventiler i veggen.',
    icon: (<svg {...iconProps}><path d="M3 8h10a3 3 0 1 0-3-3" /><path d="M3 16h7" /><path d="M17 13v7M14 16.5l3 3.5 3-3.5" /></svg>),
  },
  {
    title: 'Varmegjenvinning',
    text: 'Varmen i luften som trekkes ut, brukes til å varme opp luften som kommer inn. Mindre varme går tapt.',
    icon: (<svg {...iconProps}><path d="M20 11a8 8 0 0 0-14.3-4.9L4 8" /><path d="M4 4v4h4" /><path d="M4 13a8 8 0 0 0 14.3 4.9L20 16" /><path d="M20 20v-4h-4" /></svg>),
  },
  {
    title: 'Bedre luftutskifting og mindre lukt',
    text: 'Luften skiftes jevnt i hele boligen, også når vinduene er lukket.',
    icon: (<svg {...iconProps}><path d="M12 3v18M3 12h18" /><path d="M8 7l4-4 4 4M8 17l4 4 4-4" /></svg>),
  },
  {
    title: 'Effektivt avtrekk fra våtrom',
    text: 'Fuktig og brukt luft trekkes ut fra bad, kjøkken og vaskerom.',
    icon: (<svg {...iconProps}><path d="M4 12h16v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z" /><path d="M6 12V6a2 2 0 0 1 4 0" /><path d="M8 19l-1 2M16 19l1 2" /></svg>),
  },
  {
    title: 'Mindre fukt og bedre komfort',
    text: 'Jevn utlufting reduserer fuktbelastningen og gir et mer stabilt inneklima.',
    icon: (<svg {...iconProps}><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /><path d="M12 11.5s2.5 2.7 2.5 4.5a2.5 2.5 0 0 1-5 0c0-1.8 2.5-4.5 2.5-4.5z" /></svg>),
  },
]

const steps = [
  { title: 'Frisk uteluft tas inn', text: 'Uteluft hentes inn og filtreres i aggregatet.' },
  { title: 'Varmen gjenvinnes', text: 'Varmen fra avtrekksluften overføres til den friske luften – uten at luftstrømmene blandes. Den brukte luften slippes så ut.' },
  { title: 'Frisk luft til rommene', text: 'Frisk, temperert luft fordeles til stue og soverom.' },
  { title: 'Brukt luft trekkes ut', text: 'Fuktig og brukt luft trekkes ut fra kjøkken, bad og våtrom.' },
]

const delivery = [
  'Gjennomgang av plantegning og behovsvurdering',
  'Prosjektering og dimensjonering',
  'Valg av ventilasjonsaggregat og filtre',
  'Montering av aggregat og kanaler',
  'Tilluft og avtrekk',
  'Kondens- og frostsikring',
  'Innregulering av ventilasjonen',
  'Funksjonskontroll og dokumentasjon',
  'Skriftlig innreguleringsrapport',
  'Brukeropplæring',
  'Mulighet for service og filterskift',
]

const enovaKrav = [
  'Boligen har godkjent byggesøknad fra før 1. juli 2010',
  'Varmegjenvinner med minst 80 % temperaturvirkningsgrad',
  'Innregulering og innreguleringsrapport',
  'Søknaden er godkjent før arbeidet starter',
  'Faktura som viser kostnader og leverandør',
]

const tek = [
  <>Boliger skal normalt ha minst <b>1,2&nbsp;m³ friskluft per time per m²</b> gulvareal når de er i bruk.</>,
  <>Soverom skal ha minst <b>26&nbsp;m³ friskluft per time per sengeplass</b> når rommet er i bruk.</>,
  <>Kjøkken, toalett og våtrom skal ha <b>effektivt avtrekk</b>.</>,
  <>Luftmengdene tilpasses hvordan boligen brukes og hvilke behov dere har.</>,
  <>Luftstrømmene planlegges slik at luftkvaliteten blir god i alle rom.</>,
  <><b>Innregulering og dokumentasjon</b> er en fast del av leveransen.</>,
]

const faqs: Faq[] = [
  {
    q: 'Hva er balansert ventilasjon?',
    a: 'Balansert ventilasjon er et anlegg som både tilfører frisk luft og trekker ut brukt luft gjennom kanaler, styrt av et aggregat. Like mye luft kommer inn som går ut, og luften skiftes jevnt i hele boligen.',
  },
  {
    q: 'Hva er varmegjenvinning?',
    a: 'I aggregatet sitter en varmeveksler. Den overfører varmen fra den brukte luften som trekkes ut, til den friske luften som kommer inn – uten at luftstrømmene blandes. Da blir tilluften temperert, og mindre varme går tapt.',
  },
  {
    q: 'Kan det installeres i eldre boliger?',
    a: 'Ja, i mange eksisterende boliger kan balansert ventilasjon ettermonteres. Løsningen må tilpasses planløsning, konstruksjon og plass til kanaler og aggregat. Derfor ber vi om plantegningen av boligen før vi gir deg et tilbud.',
  },
  {
    q: 'Gir balansert ventilasjon mye støy?',
    a: 'Et riktig dimensjonert og innregulert anlegg skal gå stille. Plassering av aggregat, riktige kanaldimensjoner og lyddempere er viktig, og dette tar vi hensyn til når vi planlegger anlegget.',
  },
  {
    q: 'Hvor ofte må filtrene skiftes?',
    a: 'Som regel én til to ganger i året, avhengig av aggregat og hvor du bor. Vi viser deg hvordan det gjøres, og kan også ta filterskift og service for deg.',
    link: { href: '/tjenester/service-og-vedlikehold', label: 'Les om service og filterskift' },
  },
  {
    q: 'Kan jeg få Enova-støtte?',
    a: 'Mange kan det. Enova gir inntil 25 % av godkjente kostnader, maks 15 000 kr, til boliger med godkjent byggesøknad fra før 1. juli 2010. Anlegget må ha minst 80 % temperaturvirkningsgrad, og leveransen må inkludere innregulering og innreguleringsrapport. Du må søke og få godkjenning før arbeidet starter. Støtten er ikke garantert, og vilkårene fastsettes av Enova.',
    link: { href: '/enova', label: 'Les mer om Enova-støtte' },
  },
  {
    q: 'Hva koster installasjon?',
    a: 'Det avhenger av boligens størrelse, planløsning, hvor aggregatet kan stå og hvordan kanalene kan føres. Send oss plantegningen og litt informasjon om boligen, så får du et skriftlig prisforslag basert på det. Da vet du hva det koster før du bestemmer deg.',
  },
]

/** Enkelt flytdiagram over luftstrømmen. Ren HTML/CSS, så det fungerer like godt på mobil. */
function AirflowDiagram() {
  return (
    <figure className="bv-flow" aria-labelledby="bv-flow-cap">
      <figcaption id="bv-flow-cap" className="sr-only">
        Flytdiagram: Utenfor boligen tas frisk uteluft inn, og brukt luft slippes ut. Aggregatet med varmegjenvinner står mellom utsiden og innsiden.
        Inne i boligen fordeles frisk, temperert luft til stue og soverom, og brukt luft trekkes ut fra kjøkken, bad og våtrom.
      </figcaption>
      <div className="bv-flow-grid" aria-hidden="true">
        <div className="bv-zone out">
          <span className="bv-zone-label">Utsiden</span>
          <div className="bv-node cool"><span className="bv-no">1</span><b>Uteluft inn</b><small>Filtreres i aggregatet</small></div>
          <div className="bv-node muted"><b>Avkast ut</b><small>Varmen er tatt vare på</small></div>
        </div>
        <span className="bv-arrow cool" />
        <span className="bv-arrow muted up" />
        <div className="bv-unit">
          <span className="bv-no">2</span>
          <b>Aggregat med varmegjenvinner</b>
          <small>Varmen fra avtrekket overføres til den friske luften</small>
          <svg className="bv-hx" width="56" height="56" viewBox="0 0 56 56" fill="none">
            <rect x="8" y="8" width="40" height="40" rx="3" transform="rotate(45 28 28)" stroke="currentColor" strokeWidth="2" />
            <path d="M8 28h40M28 8v40" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
          </svg>
        </div>
        <span className="bv-arrow cool" />
        <span className="bv-arrow warm up" />
        <div className="bv-zone in">
          <div className="bv-node cool"><span className="bv-no">3</span><b>Frisk, temperert luft</b><small>Til stue og soverom</small></div>
          <div className="bv-node warm"><span className="bv-no">4</span><b>Brukt luft trekkes ut</b><small>Fra kjøkken, bad og våtrom</small></div>
          <span className="bv-zone-label">Innsiden av boligen</span>
        </div>
      </div>
      <div className="bv-legend" aria-hidden="true">
        <span><i className="cool" />Frisk luft</span>
        <span><i className="warm" />Brukt luft</span>
      </div>
    </figure>
  )
}

export default function BalansertVentilasjonPage() {
  const schemas = [
    webPageJsonLd({ path: PATH, name: TITLE, description: DESCRIPTION }),
    breadcrumbJsonLd([
      { name: 'Forside', path: '/' },
      { name: 'Balansert ventilasjon i Bergen', path: PATH },
    ]),
    faqJsonLd(faqs.map((f) => ({ question: f.q, answer: f.a }))),
  ]

  return (
    <div className="kr bv">
      <ScrollMotion />
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(s)} />
      ))}

      {/* 1. Hero med video */}
      <section className="hero" aria-labelledby="h1">
        <div className="wrap hero-grid">
          <div>
            <span className="hero-eyebrow">Balansert ventilasjon i Bergen og omegn</span>
            <h1 id="h1">Dårlig luft eller fukt i en <span className="bv-hl">eldre bolig?</span></h1>
            <p className="hero-sub">
              Balansert ventilasjon med varmegjenvinning kan gi friskere luft,
              bedre inneklima og mindre varmetap. Vi hjelper deg med å finne en løsning som passer din bolig.
            </p>
            <div className="hero-ctas">
              <a className="btn btn-primary btn-block-m" id="cta-hero" href="#bestill">Få en uforpliktende vurdering</a>
              <a className="btn btn-secondary btn-block-m" id="cta-ring" href="tel:56126800" aria-label="Ring oss på 56 12 68 00">
                <PhoneIcon />
                Ring oss
              </a>
            </div>
            <p className="hero-note">Uforpliktende prisforslag basert på plantegningen. Ring <a href="tel:56126800">56 12 68 00</a> – vi svarer innen 1 virkedag.</p>
            <GoogleRating />
          </div>

          <HeroVideo
            src={VIDEO}
            poster={HERO_IMAGE}
            posterAlt="Ventilasjonsaggregat med varmegjenvinning montert på et loft"
            label="Straume Boligvent om balansert ventilasjon"
            chip={<>Inntil 15&nbsp;000&nbsp;kr i Enova-støtte</>}
          />
        </div>
      </section>

      <TrustBar />

      {/* 2. Problemer */}
      <section className="section" aria-labelledby="h-prob">
        <div className="wrap">
          <h2 id="h-prob">Kjenner du igjen noen av disse problemene?</h2>
          <div className="bv-split">
            <div className="svc-grid bv-two">
              {problems.map((p) => (
                <div key={p.title} className="svc-card static">
                  <span className="icon" aria-hidden="true">{p.icon}</span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              ))}
            </div>
            <figure className="split-figure bv-photo">
              <Image src={FUKT_IMAGE} fill sizes="(min-width: 900px) 420px, 100vw" alt="Kondens og vanndråper på innsiden av et vindu" style={{ objectPosition: '50% 38%' }} />
              <figcaption className="split-badge">Kondens på vinduene?</figcaption>
            </figure>
          </div>
          <div className="bv-answer">
            <p>Da kan <b>balansert ventilasjon</b> være en god løsning.</p>
            <a className="btn btn-primary btn-block-m" id="cta-problemer" href="#bestill">Finn ut hva som passer din bolig</a>
          </div>
        </div>
      </section>

      {/* 3. Fordeler */}
      <section className="section alt" aria-labelledby="h-ben">
        <div className="wrap">
          <h2 id="h-ben">Frisk luft og bedre inneklima</h2>
          <p className="lead">Balansert ventilasjon gir kontroll på luften som kommer inn og luften som går ut. Det gir et bedre inneklima – og med varmegjenvinning går mindre varme ut gjennom ventilasjonen, noe som kan gi lavere strømregning.</p>
          <div className="bv-split reverse">
            <figure className="split-figure bv-photo">
              <Image src={STUE_IMAGE} fill sizes="(min-width: 900px) 420px, 100vw" alt="Lys og luftig stue med sofa, planter og vindu" style={{ objectPosition: '50% 50%' }} />
              <figcaption className="split-badge">Frisk luft hele året</figcaption>
            </figure>
            <div className="svc-grid bv-two">
              {benefits.map((b) => (
                <div key={b.title} className="svc-card static">
                  <span className="icon" aria-hidden="true">{b.icon}</span>
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Slik fungerer det */}
      <section className="section" aria-labelledby="h-how">
        <div className="wrap">
          <h2 id="h-how">Hvordan fungerer balansert ventilasjon?</h2>
          <p className="lead">Et aggregat med varmegjenvinner styrer både luften som kommer inn og luften som går ut.</p>
          <div className="bv-how">
            <ol className="steps bv-steps">
              {steps.map((s, i) => (
                <li key={s.title}>
                  <span className="step-no" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
            <AirflowDiagram />
          </div>
        </div>
      </section>

      {/* 5. Dette får du hos oss */}
      <section className="section alt" aria-labelledby="h-deliv">
        <div className="wrap">
          <h2 id="h-deliv">Vi hjelper deg hele veien</h2>
          <p className="lead">Fra plantegning og prisforslag til et ferdig innregulert anlegg – med én kontaktperson gjennom hele prosjektet.</p>
          <div className="incl-grid bv-deliv">
            <figure className="split-figure">
              <Image src={INSTALL_IMAGE} width={2400} height={1792} sizes="(min-width: 900px) 460px, 100vw" alt="Montør fra Straume Boligvent monterer et ventilasjonsaggregat" />
              <figcaption className="split-badge">Montert av egne montører</figcaption>
            </figure>
            <div className="price-card">
              <div className="price-card-head">
                <div><p>Dette kan leveransen inneholde</p><strong className="card-title">Fra plantegning til ferdig anlegg</strong></div>
              </div>
              <ul className="checks bv-cols">
                {delivery.map((t) => (<li key={t}><Check />{t}</li>))}
              </ul>
              <div className="price-card-foot">
                <p className="card-note">Innholdet tilpasses boligen og avtales i prisforslaget.</p>
                <a className="btn btn-primary" id="cta-leveranse" href="#bestill">Få et prisforslag</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kundeanmeldelser */}
      <ReviewsSection alt={false} />

      {/* 6. Eldre boliger */}
      <section className="section alt" aria-labelledby="h-old">
        <div className="wrap">
          <div className="incl-grid">
            <div className="split-text">
              <h2 id="h-old">Kan du få balansert ventilasjon i en eldre bolig?</h2>
              <p className="lead">Ja, i mange eksisterende boliger kan balansert ventilasjon ettermonteres. Men ingen hus er like.</p>
              <p className="lead">Løsningen må tilpasses planløsning, konstruksjon og plass til kanaler og aggregat – for eksempel på loft, i bod eller i et teknisk rom. Kanaler kan ofte føres i himling, skap eller innkassinger.</p>
              <p className="note">Vi begynner med å bli kjent med boligen din, og gir deg et tilbud basert på plantegningen og planløsningen. Har du plantegning, blir vurderingen både raskere og mer treffsikker.</p>
              <div className="enova-cta">
                <a className="btn btn-primary btn-block-m" id="cta-eldre" href="#bestill">Få vurdert din bolig</a>
              </div>
            </div>
            <figure className="split-figure tall bv-ror">
              <Image src={ROR_IMAGE} width={1080} height={1920} sizes="(min-width: 900px) 440px, 100vw" alt="Montør kapper ventilasjonskanal under ettermontering på et loft" />
              <figcaption className="split-badge">Ettermontering på loft</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 7. Enova-støtte (samme oppsett som Enova-seksjonen på montasje-siden) */}
      <section className="section" id="enova" aria-labelledby="h-enova">
        <div className="wrap">
          <h2 id="h-enova">Du kan få opptil 15&nbsp;000&nbsp;kr i Enova-støtte</h2>
          <p className="lead">Velger du balansert ventilasjon med varmegjenvinning, kan du søke Enova om støtte.</p>
          <div className="incl-grid">
            <div className="intro-text">
              <p>Støtten er inntil 25&nbsp;% av godkjente kostnader, maks 15&nbsp;000&nbsp;kr. Du søker selv via Enova.no, og søknaden må være <b>godkjent før</b> arbeidet starter.</p>
              <p>Vi anbefaler et aggregat som oppfyller kravene, og leverer innreguleringsrapporten og dokumentasjonen du trenger til sluttrapporteringen.</p>
              <p className="fine">Straume Boligvent er ikke tilknyttet Enova. Støtten er ikke garantert – beløp og vilkår fastsettes av Enova og kan endres. Sjekk alltid gjeldende vilkår på <a className="text-link" href={ENOVA_URL} target="_blank" rel="noopener noreferrer">Enova.no</a>.</p>
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

      {/* 8. Montører */}
      <TeamSection alt />

      {/* 10. Norske krav */}
      <section className="section" aria-labelledby="h-tek">
        <div className="wrap">
          <h2 id="h-tek">Riktig ventilasjon – riktig utført</h2>
          <p className="lead">Vi planlegger og kontrollerer anlegget med hensyn til relevante norske krav i byggteknisk forskrift (TEK17).</p>
          <ul className="sym-list vilkar bv-tek">
            {tek.map((t, i) => (<li key={i}><span className="icon" aria-hidden="true"><Check /></span><span>{t}</span></li>))}
          </ul>
          <p className="fine-note">Ved rehabilitering må kravene vurderes ut fra det aktuelle tiltaket. Det avklarer vi når vi går gjennom boligen og plantegningen.</p>
        </div>
      </section>

      {/* 11. FAQ */}
      <FaqList faqs={faqs} />

      {/* 12. Kontakt og CTA */}
      <section className="order" id="bestill" aria-labelledby="h-order">
        <div className="wrap order-grid">
          <div className="order-aside">
            <h2 id="h-order">Få en uforpliktende vurdering av din bolig</h2>
            <p className="lead">Fortell oss litt om boligen og legg gjerne ved plantegningen, så sender vi deg et prisforslag.</p>
            <ul>
              <li><Check /><span><b>Uforpliktende</b> prisforslag basert på plantegning</span></li>
              <li><Check /><span><b>Løsning tilpasset</b> din bolig</span></li>
              <li><Check /><span><b>Hjelp med dokumentasjon</b> til Enova</span></li>
            </ul>
            <p className="bv-plan">
              <b>Har du plantegning?</b> Den er det viktigste vi trenger for å vurdere balansert ventilasjon – mer enn bilder av boligen.
              Last den opp i skjemaet som PDF eller bilde.
            </p>
            <ul className="contact-rows">
              <li><span>Telefon</span><a href="tel:56126800">56 12 68 00</a></li>
              <li><span>E-post</span><a href="mailto:ordre@straumetekniske.no">ordre@straumetekniske.no</a></li>
            </ul>
          </div>
          <OrderForm
            service="balansert-ventilasjon"
            submitLabel="Få en uforpliktende vurdering"
            note="Uforpliktende. Vi svarer innen 1 virkedag."
            successTitle="Takk, vi har fått forespørselen!"
            successText="Vi går gjennom informasjonen og tar kontakt innen 1 virkedag."
            messagePlaceholder="F.eks. boligtype, byggeår, ca. areal, antall soverom og hva slags ventilasjon du har i dag. Har du plantegning, last den gjerne opp under."
            allowImages
            imagesLabel="Plantegning (anbefalt) og bilder av boligen"
            filesAccept="image/*,application/pdf,.pdf"
            filesHint="PDF eller bilder. Maks 10 MB totalt."
          />
        </div>
      </section>
    </div>
  )
}
