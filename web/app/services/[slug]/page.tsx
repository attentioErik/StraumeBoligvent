export const dynamic = 'force-dynamic'

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
import ContactForm from '@/components/ContactForm'
import { servicesQuery } from '@/lib/queries'
import ProjectCard from '@/components/ProjectCard'
import FaqSection from '@/components/FaqSection'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const paths = await client.fetch<{ slug: string }[]>(servicePathsQuery).catch(() => [])
  return paths.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = await client.fetch<Service>(serviceBySlugQuery, { slug })
  if (!service) return {}
  return {
    title: service.title,
    description: service.description,
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = await client.fetch<Service>(serviceBySlugQuery, { slug })

  if (!service) notFound()

  const [projects, faqs, allServices] = await Promise.all([
    client.fetch<ReferenceProject[]>(projectsByServiceQuery, { serviceId: service._id }).catch(() => []),
    client.fetch<FAQ[]>(faqByServiceQuery, { serviceId: service._id }).catch(() => []),
    client.fetch<Service[]>(servicesQuery).catch(() => []),
  ])

  return (
    <>
      {/* ─── HERO ─── */}
      <section
        style={{
          background: 'var(--off)',
          padding: '120px 5% 0',
          borderBottom: '1px solid var(--ll)',
        }}
      >
        <div className="inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28, flexWrap: 'wrap' }}>
            <Link
              href="/#tjenester"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontSize: '0.82rem',
                color: 'var(--muted)',
                textDecoration: 'none',
                transition: 'color 0.2s',
                flexShrink: 0,
              }}
            >
              ← Tilbake til tjenester
            </Link>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'var(--abg)',
                border: '1px solid var(--amid)',
                borderRadius: 100,
                padding: '6px 16px 6px 10px',
              }}
            >
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--amber)', boxShadow: '0 0 0 3px rgba(240,165,0,0.2)' }} />
              <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.06em', color: 'var(--adark)' }}>
                Tjeneste
              </span>
            </div>
          </div>

          <div className="service-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center', paddingBottom: 64 }}>
            {/* Left: text */}
            <div>
              <h1
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(2.4rem, 4vw, 3.6rem)',
                  fontWeight: 800,
                  lineHeight: 1.08,
                  color: 'var(--ink)',
                  letterSpacing: '-0.02em',
                  marginBottom: 24,
                }}
              >
                {service.title}
              </h1>
              <p
                style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.78,
                  color: 'var(--muted)',
                  fontWeight: 300,
                  maxWidth: 480,
                  marginBottom: 32,
                }}
              >
                {service.description}
              </p>

              {/* Google rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 36 }}>
                <div style={{ display: 'flex', gap: 2 }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} width="18" height="18" viewBox="0 0 20 20" fill={star <= 4 ? 'var(--amber)' : 'none'} stroke="var(--amber)" strokeWidth="1.5">
                      <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.49L10 14.27 5.06 16.7 6 11.21l-4-3.9 5.53-.8L10 1.5z" />
                      {star === 5 && (
                        <defs>
                          <linearGradient id="halfStar">
                            <stop offset="80%" stopColor="var(--amber)" />
                            <stop offset="80%" stopColor="transparent" />
                          </linearGradient>
                        </defs>
                      )}
                      {star === 5 && <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.49L10 14.27 5.06 16.7 6 11.21l-4-3.9 5.53-.8L10 1.5z" fill="url(#halfStar)" />}
                    </svg>
                  ))}
                </div>
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--ink)' }}>4,9/5</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 300 }}>
                  — Betrodd av over 300 kunder i Bergensregionen
                </span>
              </div>

              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                <Link href="/kontakt" className="btn-amber">
                  Få tilbud
                </Link>
                <a href="tel:56126800" className="btn-ghost">
                  Ring 561 26 800 →
                </a>
              </div>
            </div>

            {/* Right: hero image */}
            {service.image && (
              <div style={{ borderRadius: 8, overflow: 'hidden', boxShadow: '0 24px 64px rgba(20,16,8,0.14)' }}>
                <div style={{ width: '100%', aspectRatio: '4/3', position: 'relative' }}>
                  <Image
                    src={urlFor(service.image).width(800).height(600).url()}
                    alt={service.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </div>
              </div>
            )}
          </div>

          {/* Partner logos */}
          <div
            style={{
              borderTop: '1px solid var(--ll)',
              padding: '24px 0',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              flexWrap: 'wrap',
            }}
          >
            <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--sec)', marginRight: 8 }}>
              Samarbeidspartnere
            </span>
            {['Swegon', 'Flexit', 'Ventistål', 'Systemair'].map((partner) => (
              <span
                key={partner}
                style={{
                  fontSize: '0.82rem',
                  color: 'var(--muted)',
                  fontWeight: 400,
                  padding: '6px 16px',
                  background: 'var(--white)',
                  border: '1px solid var(--ll)',
                  borderRadius: 100,
                }}
              >
                {partner}
              </span>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 980px) {
            .service-hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          }
        `}</style>
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <section style={{ background: 'var(--white)', padding: '80px 5%' }}>
        <div
          className="inner service-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 340px',
            gap: 80,
            alignItems: 'start',
          }}
        >
          {/* Left: full description + process + benefits */}
          <div>
            {service.fullDescription && service.fullDescription.length > 0 && (
              <div className="prose" style={{ marginBottom: 56 }}>
                <PortableText value={service.fullDescription} />
              </div>
            )}

            {/* Process steps */}
            {service.process && service.process.length > 0 && (
              <div style={{ marginBottom: 56 }}>
                <div className="slabel">Fremgangsmåte</div>
                <h2 className="stitle">Slik gjør vi det</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 1, marginTop: 32 }}>
                  {service.process.map((step, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        gap: 28,
                        padding: '24px 0',
                        borderBottom: '1px solid var(--ll)',
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'Playfair Display, serif',
                          fontSize: '1.4rem',
                          fontWeight: 700,
                          color: 'var(--amber)',
                          lineHeight: 1,
                          flexShrink: 0,
                          width: 48,
                        }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <div>
                        <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>
                          {step.title}
                        </div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300 }}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Benefits */}
            {service.benefits && service.benefits.length > 0 && (
              <div>
                <div className="slabel">Fordeler</div>
                <h2 className="stitle">Hva du får</h2>
                <div className="checklist" style={{ marginTop: 24 }}>
                  {service.benefits.map((b) => (
                    <div key={b} className="citem">
                      <div className="cicon">✓</div>
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: CTA card */}
          <div className="service-cta-col" style={{ position: 'sticky', top: 100 }}>
            <div
              style={{
                background: 'var(--off)',
                border: '1px solid var(--ll)',
                borderRadius: 8,
                padding: '32px',
              }}
            >
              <h3
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: 'var(--ink)',
                  marginBottom: 12,
                }}
              >
                Interessert?
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: 24, fontWeight: 300 }}>
                Kontakt oss for en uforpliktende prat om din situasjon.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Link href="/kontakt" className="btn-amber" style={{ justifyContent: 'center' }}>
                  Send forespørsel
                </Link>
                <a
                  href="tel:56126800"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    padding: '11px 24px',
                    border: '1px solid var(--ll)',
                    borderRadius: 2,
                    fontSize: '0.84rem',
                    color: 'var(--muted)',
                    textDecoration: 'none',
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                >
                  561 26 800
                </a>
              </div>
              <div
                style={{
                  borderTop: '1px solid var(--ll)',
                  marginTop: 24,
                  paddingTop: 24,
                  fontSize: '0.8rem',
                  color: 'var(--sec)',
                  lineHeight: 1.6,
                }}
              >
                Vi svarer innen én virkedag. Ingen skjulte kostnader.
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 980px) {
            .service-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
            .service-cta-col { position: static !important; }
          }
        `}</style>
      </section>

      {/* ─── RELATED PROJECTS ─── */}
      {projects.length > 0 && (
        <section style={{ background: 'var(--warm)', padding: '80px 5%' }}>
          <div className="inner">
            <div className="slabel">Galleri</div>
            <h2 className="stitle">Bilder fra lignende oppdrag</h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 24,
                marginTop: 40,
              }}
              className="proj-grid"
            >
              {projects.map((p) => (
                <ProjectCard key={p._id} project={p} />
              ))}
            </div>
          </div>
          <style>{`
            @media (max-width: 980px) { .proj-grid { grid-template-columns: 1fr 1fr !important; } }
            @media (max-width: 640px) { .proj-grid { grid-template-columns: 1fr !important; } }
          `}</style>
        </section>
      )}

      {/* ─── FAQ ─── */}
      {faqs.length > 0 && <FaqSection faqs={faqs} />}

      {/* ─── CTA KONTAKT ─── */}
      <section style={{ background: 'var(--off)', padding: '80px 5%' }}>
        <div className="inner" style={{ maxWidth: 760 }}>
          <div className="slabel">Kom i gang</div>
          <h2 className="stitle">Send oss en forespørsel</h2>
          <p className="sdesc" style={{ marginBottom: 40 }}>
            Fyll ut skjemaet så tar vi kontakt innen én virkedag.
          </p>
          <ContactForm services={allServices} defaultService={service.slug.current} />
        </div>
      </section>
    </>
  )
}
