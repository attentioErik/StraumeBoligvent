export const dynamic = 'force-dynamic'

// Felles mal for tjenestesidene som ikke har egen landingsside (innregulering, service, serviceavtale, borettslag og næring).
// Samme stil som kanalrens/montasje (styles/landing.css), men innholdet hentes fra Sanity.
import { client, urlFor } from '@/lib/sanity'
import {
  serviceBySlugQuery,
  servicePathsQuery,
  projectsByServiceQuery,
  faqByServiceQuery,
} from '@/lib/queries'
import type { Service, ReferenceProject, FAQ } from '@/lib/types'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import '@/styles/landing.css'
import OrderForm from '@/components/landing/OrderForm'
import ScrollMotion from '@/components/landing/ScrollMotion'
import LandingVideo from '@/components/landing/LandingVideo'
import {
  Check,
  FaqList,
  GoogleRating,
  PhoneIcon,
  PromiseSection,
  ReviewsSection,
  TeamSection,
  TrustBar,
  iconProps,
} from '@/components/landing/parts'
import { absUrl } from '@/lib/site'
import { serviceJsonLd, faqJsonLd, breadcrumbJsonLd, videoJsonLd, jsonLdScript } from '@/lib/jsonld'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const paths = await client.fetch<{ slug: string }[]>(servicePathsQuery).catch(() => [])
  return paths.map((p) => ({ slug: p.slug }))
}

function portableTextToPlain(blocks?: unknown): string {
  if (!Array.isArray(blocks)) return ''
  return blocks
    .map((b: { _type?: string; children?: { text?: string }[] }) =>
      b._type === 'block' ? (b.children || []).map((c) => c.text || '').join('') : '',
    )
    .join(' ')
    .trim()
}

// "29 900,-" / "kr 29.900" → 29900
function parsePrice(value?: string): number | undefined {
  if (!value) return undefined
  const digits = value.split(',')[0].replace(/\D/g, '')
  return digits ? Number(digits) : undefined
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = await client.fetch<Service>(serviceBySlugQuery, { slug })
  if (!service) return {}
  const title = service.title
  const description = service.description
  const imageUrl = service.image ? urlFor(service.image).width(1200).height(630).url() : undefined
  const path = `/tjenester/${slug}`
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: absUrl(path),
      type: 'article',
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: title }] : undefined,
    },
    twitter: { title, description, images: imageUrl ? [imageUrl] : undefined },
  }
}

// Ikon i symptomlisten (samme for alle punktene, siden punktene kommer fra Sanity)
const alertIcon = (
  <svg {...iconProps}>
    <path d="M12 3l9.5 16.5h-19z" />
    <path d="M12 10v4M12 17h.01" />
  </svg>
)

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = await client.fetch<Service>(serviceBySlugQuery, { slug })
  if (!service) notFound()

  const [projects, faqs] = await Promise.all([
    client.fetch<ReferenceProject[]>(projectsByServiceQuery, { serviceId: service._id }).catch(() => []),
    client.fetch<FAQ[]>(faqByServiceQuery, { serviceId: service._id }).catch(() => []),
  ])

  // Nye felt foretrekkes, med de gamle som reserve
  const introContent = service.introText || service.fullDescription
  const stepsContent = service.includedSteps || service.process
  const benefitsContent = service.benefitsList || service.benefits
  const symptoms = service.whySymptoms ?? []
  const whenItems = service.whenItems ?? []
  const gallery = projects.flatMap((p) => (p.galleri || []).map((img) => ({ img, title: p.title }))).slice(0, 6)

  const ctaLabel = service.ctaLabel || 'Få tilbud'
  const heroImage = service.image ? urlFor(service.image).width(1200).height(900).url() : undefined
  const videoPoster = service.videoPoster ? urlFor(service.videoPoster).width(720).url() : undefined
  const portraitVideo = service.videoFormat !== 'landscape'

  const schemas: object[] = [
    serviceJsonLd({
      name: service.title,
      description: service.description,
      slug,
      image: service.image ? urlFor(service.image).width(1200).height(630).url() : undefined,
      dateModified: service._updatedAt,
      priceFrom: parsePrice(service.priceFrom),
    }),
    breadcrumbJsonLd([
      { name: 'Forside', path: '/' },
      { name: 'Tjenester', path: '/#tjenester' },
      { name: service.title, path: `/tjenester/${slug}` },
    ]),
  ]
  if (faqs.length > 0) {
    schemas.push(faqJsonLd(faqs.map((f) => ({ question: f.question, answer: portableTextToPlain(f.answer) }))))
  }
  if (service.videoUrl) {
    schemas.push(
      videoJsonLd({
        name: service.videoCaption || service.title,
        description: service.videoCaption || service.description,
        contentUrl: service.videoUrl,
        thumbnailUrl: videoPoster,
        uploadDate: service.videoUploadedAt,
      }),
    )
  }

  return (
    <div className="kr">
      <ScrollMotion />
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(s)} />
      ))}

      {/* Hero */}
      <section className="hero" aria-labelledby="h1">
        <div className={`wrap hero-grid${heroImage ? '' : ' no-media'}`}>
          <div>
            <h1 id="h1">{service.heroTitle || service.title}</h1>
            <p className="hero-sub">{service.description}</p>
            {service.priceFrom && (
              <p className="price">
                <strong>Fra {service.priceFrom}</strong>
                {service.priceNote && <small>{service.priceNote}</small>}
              </p>
            )}
            <div className="hero-ctas">
              <a className="btn btn-primary btn-block-m" id="cta-hero" href="#bestill">{ctaLabel}</a>
              <a className="btn btn-secondary btn-block-m" id="cta-ring" href="tel:56126800">
                <PhoneIcon />
                Ring 56 12 68 00
              </a>
            </div>
            <p className="hero-note">Uforpliktende og tydelig pris før vi starter. Vi svarer innen 1 virkedag.</p>
            <GoogleRating />
          </div>
          {heroImage && (
            <figure className="hero-media">
              <Image src={heroImage} width={1200} height={900} priority sizes="(min-width: 900px) 540px, 100vw" alt={service.title} />
            </figure>
          )}
        </div>
      </section>

      <TrustBar />

      {/* Kort fortalt */}
      {service.quickAnswer && (
        <section className="section" aria-labelledby="h-quick">
          <div className="wrap">
            <div className="quick">
              <h2 id="h-quick">{service.quickAnswerTitle || 'Kort fortalt'}</h2>
              <p>{service.quickAnswer}</p>
              {service.quickFacts && service.quickFacts.length > 0 && (
                <dl>
                  {service.quickFacts.map((f) => (
                    <div key={f.tekst}>
                      <dt>{f.verdi}</dt>
                      <dd>{f.tekst}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Om tjenesten (+ video) */}
      {introContent && introContent.length > 0 && (
        <section className="section" aria-label="Om tjenesten">
          <div className="wrap">
            <div className={service.videoUrl && portraitVideo ? 'sym-grid' : undefined}>
              <div className="prose-kr intro-text">
                <PortableText value={introContent} />
              </div>
              {service.videoUrl && (
                <figure className={`figure sym-figure video-figure${portraitVideo ? '' : ' landscape'}`}>
                  <LandingVideo src={service.videoUrl} poster={videoPoster} label={service.videoCaption || service.title} />
                  {service.videoCaption && <figcaption>{service.videoCaption}</figcaption>}
                </figure>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Hvorfor + når */}
      {(service.whyTitle || symptoms.length > 0 || service.whenTitle || whenItems.length > 0) && (
        <section className="section alt" aria-labelledby="h-why">
          <div className="wrap">
            <h2 id="h-why">{service.whyTitle || 'Hvorfor det er viktig'}</h2>
            {service.whyText && (
              <div className="lead prose-kr">
                <PortableText value={service.whyText} />
              </div>
            )}
            <div className="sym-grid">
              {symptoms.length > 0 && (
                <ul className="sym-list">
                  {symptoms.map((t) => (
                    <li key={t}><span className="icon" aria-hidden="true">{alertIcon}</span>{t}</li>
                  ))}
                </ul>
              )}
              {(service.whenTitle || whenItems.length > 0) && (
                <div className="price-card">
                  <div className="price-card-head">
                    <div>
                      <strong className="card-title">{service.whenTitle || 'Når er det aktuelt?'}</strong>
                      {service.whenNote && <p className="card-note">{service.whenNote}</p>}
                    </div>
                  </div>
                  <ul className="checks">
                    {whenItems.map((t) => (<li key={t}><Check />{t}</li>))}
                  </ul>
                  <div className="price-card-foot">
                    <a className="text-link" href="#bestill">{ctaLabel}</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Slik gjør vi det */}
      {stepsContent && stepsContent.length > 0 && (
        <section className="section" aria-labelledby="h-steps">
          <div className="wrap">
            <h2 id="h-steps">{service.includedTitle || 'Slik gjør vi det'}</h2>
            {service.includedSubtitle && <p className="lead">{service.includedSubtitle}</p>}
            <ol className={`steps${stepsContent.length === 4 ? '' : ' steps-auto'}`}>
              {stepsContent.map((s, i) => (
                <li key={i}>
                  <span className="step-no" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{s.title}</h3>
                  {s.description && <p>{s.description}</p>}
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Fordeler */}
      {benefitsContent && benefitsContent.length > 0 && (
        <section className="section after" aria-labelledby="h-after">
          <div className="wrap">
            <div className="after-inner">
              <h2 id="h-after"><Check size={32} />{service.benefitsTitle || 'Hva du får'}</h2>
              {service.benefitsText && <p className="lead">{service.benefitsText}</p>}
              <ul className="after-list">
                {benefitsContent.map((t) => (<li key={t}><Check />{t}</li>))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Praktisk informasjon */}
      {service.practicalBlocks && service.practicalBlocks.length > 0 && (
        <section className="section" aria-labelledby="h-prac">
          <div className="wrap">
            <h2 id="h-prac">Praktisk informasjon</h2>
            <div className="practical">
              {service.practicalBlocks.map((b, i) => (
                <div key={i} className="practical-card">
                  <h3>{b.title}</h3>
                  <div className="prose-kr"><PortableText value={b.content} /></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <TeamSection />
      <ReviewsSection />

      {/* Bilder fra oppdrag */}
      {gallery.length > 0 && (
        <section className="section" aria-labelledby="h-gal">
          <div className="wrap">
            <h2 id="h-gal">Bilder fra lignende oppdrag</h2>
            <div className="gallery-grid">
              {gallery.map((g, i) => (
                <Link key={i} href="/galleri">
                  <Image src={urlFor(g.img).width(640).height(480).url()} width={640} height={480} sizes="(min-width: 900px) 360px, 50vw" alt={g.img.alt || g.title} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <PromiseSection items={[<><b>Uforpliktende</b> tilbud</>, <b key="s">Ingen skjulte kostnader</b>, <b key="v">Svar innen 1 virkedag</b>]} />

      {/* Andre tjenester */}
      {service.relatedServices && service.relatedServices.length > 0 && (
        <section className="section alt" aria-labelledby="h-rel">
          <div className="wrap">
            <h2 id="h-rel">Andre tjenester</h2>
            <p className="lead">Kan kombineres med øvrige ventilasjonstjenester for en komplett gjennomgang.</p>
            <div className="related">
              {service.relatedServices.map((s) => (
                <Link key={s._id} href={`/tjenester/${s.slug.current}`}>{s.title} <span aria-hidden="true">→</span></Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {faqs.length > 0 && (
        <FaqList
          alt={!(service.relatedServices && service.relatedServices.length > 0)}
          faqs={faqs.map((f) => ({
            q: f.question,
            a: portableTextToPlain(f.answer),
            body: <div className="prose-kr"><PortableText value={f.answer} /></div>,
          }))}
        />
      )}

      {/* Kontakt / tilbud */}
      <section className="order" id="bestill" aria-labelledby="h-order">
        <div className="wrap order-grid">
          <div className="order-aside">
            <h2 id="h-order">{service.contactFormTitle || `Interessert i ${service.title.toLowerCase()}?`}</h2>
            <p className="lead">{service.contactFormText || 'Vi gir en anbefaling basert på ditt anlegg og behov.'}</p>
            <ul>
              <li><Check /><span><b>Uforpliktende</b> tilbud</span></li>
              <li><Check /><span><b>Tydelig pris</b> før vi starter</span></li>
              <li><Check /><span><b>Svar</b> innen 1 virkedag</span></li>
            </ul>
          </div>
          <OrderForm
            service={slug}
            submitLabel={ctaLabel}
            note="Uforpliktende. Vi svarer innen 1 virkedag."
            successTitle="Takk, vi har fått forespørselen!"
            successText="Vi tar kontakt innen 1 virkedag."
            allowImages={!!service.allowImageUpload}
          />
        </div>
      </section>

      {service._updatedAt && (
        <p className="wrap updated">
          Sist oppdatert{' '}
          <time dateTime={service._updatedAt}>
            {new Date(service._updatedAt).toLocaleDateString('nb-NO', { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
        </p>
      )}
    </div>
  )
}
