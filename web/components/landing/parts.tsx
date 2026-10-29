// Felles byggeklosser for tjeneste-landingssidene (kanalrens, montasje). Stilene ligger i styles/landing.css.
import Image from 'next/image'
import Link from 'next/link'
import OrderForm from './OrderForm'
import type { ReactNode } from 'react'
import type { Enova, PrisKort } from '@/lib/types'

export const GOOGLE_URL = 'https://www.google.com/search?q=Straume+Boligvent'

function Star() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#F0A500" d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z" />
    </svg>
  )
}

export function Stars({ label }: { label?: string }) {
  return (
    <span className="stars" {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}>
      {[0, 1, 2, 3, 4].map((i) => <Star key={i} />)}
    </span>
  )
}

export function Check({ size = 22 }: { size?: number }) {
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

export function PhoneIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  )
}

export function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="#B87800" strokeWidth="2" />
      <path d="M12 7v5l3 2" stroke="#B87800" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export const iconProps = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: '#1E1A12',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function GoogleRating() {
  return (
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
  )
}

export function TrustBar() {
  return (
    <section className="trust" aria-label="Sertifiseringer og erfaring">
      <div className="wrap">
        <ul>
          {['Miljøsertifisert', 'EKOM Autorisasjon', 'Sentral Godkjent', '12+ års erfaring'].map((t) => (
            <li key={t}><Badge />{t}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

const team = [
  { name: 'Patrick Tøgard', src: '/images/team/patrick.webp' },
  { name: 'Isac Skutle', src: '/images/team/isac.webp' },
  { name: 'Daniel Tøgard', src: '/images/team/daniel.webp' },
]

export function TeamSection() {
  return (
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
  )
}

const reviews = [
  { text: 'Veldig fornøyd med service og utført jobb. Hyggelig tekniker', name: 'Gudrid Tillung' },
  { text: 'Har hatt service med bytte av vifter på ventilasjon anlegget. Jobben ble gjort av Patrick og Isak. Veldig fornøyd med servicen …', name: 'Evy Rose Thomassen' },
  { text: 'Super fornøyd med Isac Skutle so var å skiftet filter 14.feb 2026. Hyggelig, rask og veldig kunnskapsrik. Den beste som har har skiftet…', name: 'Mona Solberg' },
]

export function ReviewsSection({ title = 'Hva kundene sier' }: { title?: string }) {
  return (
    <section className="section alt" aria-labelledby="h-rev">
      <div className="wrap">
        <h2 id="h-rev">{title}</h2>
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
  )
}

export function PromiseSection({ items }: { items: ReactNode[] }) {
  return (
    <section className="section" aria-labelledby="h-promise">
      <div className="wrap">
        <div className="promise">
          <div className="promise-icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1E1A12" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></svg>
          </div>
          <div>
            <h2 id="h-promise">Dette lover vi deg</h2>
            <ul className="promise-list">
              {items.map((it, i) => (<li key={i}><Check /><span>{it}</span></li>))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export type Faq = { q: string; a: string; body?: ReactNode; link?: { href: string; label: string } }

export function FaqList({ faqs, alt = true }: { faqs: Faq[]; alt?: boolean }) {
  return (
    <section className={`section${alt ? ' alt' : ''}`} aria-labelledby="h-faq">
      <div className="wrap">
        <h2 id="h-faq">Vanlige spørsmål</h2>
        <div className="faq">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}<span className="plus" aria-hidden="true" /></summary>
              <div className="ans">
                {f.body ?? <p>{f.a}</p>}
                {f.link && <p><Link className="text-link" href={f.link.href}>{f.link.label}</Link></p>}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export function PriceCards({ kort, ctaHref = '#bestill' }: { kort: PrisKort[]; ctaHref?: string }) {
  return (
    <div className="price-grid">
      {kort.map((k) => (
        <div key={k._key} className={`price-card${k.featured ? ' featured' : ''}`}>
          {k.badge && <span className="badge">{k.badge}</span>}
          <div className="price-card-head">
            <div><p>{k.tittel}</p><strong>{k.prisLabel ? `${k.prisLabel} ${k.pris}` : k.pris}</strong></div>
          </div>
          {k.beskrivelse && <p className="desc">{k.beskrivelse}</p>}
          {k.inkludert && k.inkludert.length > 0 && (
            <ul className="checks">{k.inkludert.map((t) => (<li key={t}><Check />{t}</li>))}</ul>
          )}
          <div className="price-ctas">
            <a className="btn btn-primary" href={ctaHref}>{k.cta1Tekst ?? 'Be om vurdering'}</a>
            {k.cta2Lenke && <Link className="text-link" href={k.cta2Lenke}>{k.cta2Tekst ?? 'Les mer'}</Link>}
          </div>
        </div>
      ))}
    </div>
  )
}

export function EnovaBox({ enova }: { enova?: Enova | null }) {
  return (
    <div className="enova-box">
      <div>
        <h2 id="h-enova">{enova?.teaserTittel ?? 'Få opptil 15 000 kr i Enova-støtte'}</h2>
        <p className="lead">
          {enova?.teaserTekst ??
            'Velger du balansert ventilasjon med varmegjenvinning, kan du søke Enova om økonomisk støtte. Vi leverer anlegg som kvalifiserer – og hjelper deg med dokumentasjonen.'}
        </p>
      </div>
      <Link className="btn btn-primary btn-block-m" href="/enova">{enova?.teaserCtaTekst ?? 'Les om Enova-støtte'}</Link>
    </div>
  )
}

// Kontaktseksjon med tjenestevalg (forsiden og de generelle sidene)
const FALLBACK_SERVICE_OPTIONS = [
  { value: 'service-og-vedlikehold', label: 'Service og vedlikehold' },
  { value: 'kanalrens', label: 'Kanalrens' },
  { value: 'innregulering', label: 'Innregulering' },
  { value: 'montasje-og-utskifting', label: 'Montasje og utskifting' },
  { value: 'serviceavtale', label: 'Serviceavtale' },
  { value: 'borettslag-og-naering', label: 'For borettslag og næring' },
]

export function ContactSection({
  title = 'Ta kontakt – vi svarer innen én virkedag',
  lead = 'Fyll ut skjemaet, eller ring oss direkte. Vi stiller gjerne spørsmål om anlegget ditt for å gi deg riktig tilbud.',
  services,
  defaultService,
  aside,
}: {
  title?: string
  lead?: string
  services?: { slug: { current: string }; title: string }[]
  defaultService?: string
  aside?: ReactNode
}) {
  const options = [
    ...(services && services.length > 0
      ? services.map((s) => ({ value: s.slug.current, label: s.title }))
      : FALLBACK_SERVICE_OPTIONS),
    { value: 'annet', label: 'Annet / vet ikke' },
  ]
  // Valgt tjeneste først i listen
  if (defaultService) options.sort((a, b) => (a.value === defaultService ? -1 : b.value === defaultService ? 1 : 0))
  return (
    <section className="order" id="bestill" aria-labelledby="h-order">
      <div className="wrap order-grid">
        <div className="order-aside">
          <h2 id="h-order">{title}</h2>
          <p className="lead">{lead}</p>
          {aside ?? (
            <ul className="contact-rows">
              <li><span>Telefon</span><a href="tel:56126800">56 12 68 00</a></li>
              <li><span>E-post</span><a href="mailto:ordre@straumetekniske.no">ordre@straumetekniske.no</a></li>
              <li><span>Adresse</span><span>Idrettsveien 93, 5353 Straume</span></li>
            </ul>
          )}
        </div>
        <OrderForm
          service="generell"
          serviceOptions={options}
          submitLabel="Send forespørsel"
          note="Vi svarer innen 1 virkedag."
          successTitle="Takk, vi har fått forespørselen!"
          successText="Vi tar kontakt innen 1 virkedag."
          allowImages
          imagesLabel="Bilde av anlegget"
        />
      </div>
    </section>
  )
}
