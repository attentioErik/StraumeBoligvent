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

  const [projects, faqs] = await Promise.all([
    client.fetch<ReferenceProject[]>(projectsByServiceQuery, { serviceId: service._id }).catch(() => []),
    client.fetch<FAQ[]>(faqByServiceQuery, { serviceId: service._id }).catch(() => []),
  ])

  // Determine content for each section (new fields preferred, legacy fallback)
  const introContent = service.introText || service.fullDescription
  const stepsContent = service.includedSteps || service.process
  const benefitsContent = service.benefitsList || service.benefits

  const hasWhySection = service.whyTitle || (service.whySymptoms && service.whySymptoms.length > 0)
  const hasWhenSection = service.whenTitle || (service.whenItems && service.whenItems.length > 0)
  const hasIncludedSection = stepsContent && stepsContent.length > 0
  const hasBenefitsSection = benefitsContent && benefitsContent.length > 0
  const hasPracticalSection = service.practicalBlocks && service.practicalBlocks.length > 0

  const hasRelatedServices = service.relatedServices && service.relatedServices.length > 0

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
                <svg width="20" height="20" viewBox="0 0 48 48" style={{ flexShrink: 0 }}>
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.0 24.0 0 0 0 0 21.56l7.98-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
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
        </div>

        <style>{`
          @media (max-width: 980px) {
            .service-hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          }
        `}</style>
      </section>

      {/* ─── INTRO / OM TJENESTEN ─── */}
      {introContent && introContent.length > 0 && (
        <section style={{ background: 'var(--white)', padding: '80px 5%' }}>
          <div
            className="inner intro-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 340px',
              gap: 80,
              alignItems: 'start',
            }}
          >
            {/* Left: text */}
            <div>
              <div className="slabel reveal">Om tjenesten</div>
              <div className="prose reveal">
                <PortableText value={introContent} />
              </div>
            </div>

            {/* Right: CTA card */}
            <div className="intro-cta-col reveal" style={{ position: 'sticky', top: 100 }}>
              <div
                style={{
                  background: 'var(--off)',
                  border: '1px solid var(--ll)',
                  borderRadius: 8,
                  padding: 32,
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
              .intro-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
              .intro-cta-col { position: static !important; }
            }
          `}</style>
        </section>
      )}

      {/* ─── HVORFOR + NÅR ─── */}
      {(hasWhySection || hasWhenSection) && (
        <section style={{ background: '#1e1a12', padding: '80px 5%' }}>
          <div
            className="inner why-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 64,
              alignItems: 'start',
            }}
          >
            {/* Left: why */}
            {hasWhySection && (
              <div className="reveal">
                <div className="slabel" style={{ color: 'var(--amid)' }}>Hvorfor det er viktig</div>
                {service.whyTitle && (
                  <h2
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: 'clamp(1.5rem, 3vw, 2.1rem)',
                      fontWeight: 700,
                      color: '#f5f0e8',
                      marginBottom: 20,
                      lineHeight: 1.3,
                    }}
                  >
                    {service.whyTitle}
                  </h2>
                )}
                {service.whyText && (
                  <div style={{ color: '#c4b8a4', fontSize: '1rem', lineHeight: 1.7, marginBottom: 24 }}>
                    <PortableText value={service.whyText} />
                  </div>
                )}
                {service.whySymptoms && service.whySymptoms.length > 0 && (
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14, padding: 0 }}>
                    {service.whySymptoms.map((symptom) => (
                      <li
                        key={symptom}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 14,
                          color: '#c4b8a4',
                          fontSize: '0.97rem',
                        }}
                      >
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--amber)', marginTop: 8, flexShrink: 0 }} />
                        {symptom}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Right: when */}
            {hasWhenSection && (
              <div
                className="reveal"
                style={{
                  background: 'rgba(240,165,0,0.08)',
                  border: '1px solid rgba(240,165,0,0.25)',
                  borderLeft: '4px solid var(--amber)',
                  borderRadius: 4,
                  padding: 32,
                }}
              >
                {service.whenTitle && (
                  <h3
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: '1.2rem',
                      color: '#f5f0e8',
                      marginBottom: 8,
                    }}
                  >
                    {service.whenTitle}
                  </h3>
                )}
                {service.whenNote && (
                  <p style={{ fontSize: '0.88rem', color: 'rgba(212,200,180,0.7)', marginBottom: 20, fontStyle: 'italic' }}>
                    {service.whenNote}
                  </p>
                )}
                {service.whenItems && service.whenItems.length > 0 && (
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, padding: 0 }}>
                    {service.whenItems.map((item) => (
                      <li
                        key={item}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 12,
                          color: '#c4b8a4',
                          fontSize: '0.95rem',
                          lineHeight: 1.5,
                        }}
                      >
                        <span
                          style={{
                            flexShrink: 0,
                            width: 20,
                            height: 20,
                            background: 'var(--amber)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 1,
                          }}
                        >
                          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="#1e1a12" strokeWidth="2.5">
                            <polyline points="2,6 5,9 10,3" />
                          </svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
          <style>{`
            @media (max-width: 980px) { .why-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }
          `}</style>
        </section>
      )}

      {/* ─── HVA ER INKLUDERT ─── */}
      {hasIncludedSection && (
        <section style={{ background: 'var(--white)', padding: '80px 5%' }}>
          <div className="inner">
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div className="slabel reveal" style={{ justifyContent: 'center' }}>Hva som er inkludert</div>
              <h2 className="stitle reveal" style={{ textAlign: 'center' }}>
                {service.includedTitle || 'Slik gjør vi det'}
              </h2>
              {service.includedSubtitle && (
                <p className="sdesc reveal" style={{ margin: '0 auto' }}>
                  {service.includedSubtitle}
                </p>
              )}
            </div>
            <div
              className="included-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 28,
              }}
            >
              {stepsContent!.map((step, i) => (
                <div
                  key={i}
                  className="reveal"
                  style={{
                    background: 'var(--off)',
                    border: '1px solid var(--ll)',
                    borderRadius: 4,
                    padding: '32px 28px',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: '2.4rem',
                      fontWeight: 700,
                      color: 'var(--amber)',
                      opacity: 0.35,
                      lineHeight: 1,
                      marginBottom: 12,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: '1.08rem',
                      fontWeight: 700,
                      color: 'var(--ink)',
                      marginBottom: 10,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p style={{ fontSize: '0.93rem', color: 'var(--muted)', lineHeight: 1.65 }}>
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <style>{`
            .included-grid > *:hover { transform: translateY(-3px); box-shadow: 0 8px 32px rgba(0,0,0,0.07); }
            @media (max-width: 640px) { .included-grid { grid-template-columns: 1fr !important; } }
          `}</style>
        </section>
      )}

      {/* ─── FORDELER ─── */}
      {hasBenefitsSection && (
        <section style={{ background: '#1e1a12', padding: '80px 5%' }}>
          <div
            className="inner benefits-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 64,
              alignItems: 'start',
            }}
          >
            {/* Left: title + text */}
            <div className="reveal">
              <div className="slabel" style={{ color: 'var(--amid)' }}>Fordeler</div>
              <h2
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                  color: '#f5f0e8',
                  marginBottom: 20,
                  lineHeight: 1.3,
                }}
              >
                {service.benefitsTitle || 'Hva du får'}
              </h2>
              {service.benefitsText && (
                <p style={{ color: '#c4b8a4', fontSize: '0.97rem', lineHeight: 1.7 }}>
                  {service.benefitsText}
                </p>
              )}
            </div>

            {/* Right: benefit items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {benefitsContent!.map((benefit, i) => (
                <div
                  key={i}
                  className="reveal"
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 16,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 4,
                    padding: '18px 20px',
                  }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      width: 36,
                      height: 36,
                      background: 'rgba(240,165,0,0.15)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M8 12l3 3 5-5" />
                    </svg>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.92rem', margin: 0, lineHeight: 1.55 }}>
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <style>{`
            @media (max-width: 980px) { .benefits-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }
          `}</style>
        </section>
      )}

      {/* ─── PRAKTISK INFO ─── */}
      {hasPracticalSection && (
        <section style={{ background: 'var(--off)', padding: '80px 5%' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="slabel reveal" style={{ justifyContent: 'center' }}>Praktisk informasjon</div>
            <h2 className="stitle reveal" style={{ textAlign: 'center' }}>Et godt grunnlag for videre vedlikehold</h2>
          </div>
          <div
            className="inner practical-grid"
            style={{
              maxWidth: 860,
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: service.practicalBlocks!.length > 1 ? '1fr 1fr' : '1fr',
              gap: 48,
              alignItems: 'start',
            }}
          >
            {service.practicalBlocks!.map((block, i) => (
              <div key={i} className="reveal">
                <h3
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: 'var(--ink)',
                    marginBottom: 14,
                    paddingBottom: 12,
                    borderBottom: '2px solid var(--amber)',
                  }}
                >
                  {block.title}
                </h3>
                <div className="prose">
                  <PortableText value={block.content} />
                </div>
              </div>
            ))}
          </div>
          <style>{`
            @media (max-width: 640px) { .practical-grid { grid-template-columns: 1fr !important; } }
          `}</style>
        </section>
      )}

      {/* ─── ANDRE TJENESTER ─── */}
      {hasRelatedServices && (
        <section style={{ background: 'var(--white)', padding: '72px 5%', borderTop: '1px solid var(--ll)' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <div className="slabel reveal">Andre tjenester</div>
            <h2 className="stitle reveal">Helhetlig oppfølging av ventilasjonssystemet</h2>
            <p className="sdesc reveal" style={{ marginBottom: 28 }}>
              Denne tjenesten kan kombineres med øvrige ventilasjonstjenester for en komplett gjennomgang.
            </p>
            <div className="reveal" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              {service.relatedServices!.map((s) => (
                <Link
                  key={s._id}
                  href={`/services/${s.slug.current}`}
                  style={{
                    background: 'var(--off)',
                    border: '1px solid var(--ll)',
                    color: 'var(--ink)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    padding: '10px 22px',
                    borderRadius: 2,
                    textDecoration: 'none',
                    transition: 'border-color 0.2s, color 0.2s',
                  }}
                >
                  {s.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── GALLERI ─── */}
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

      {/* ─── CTA ─── */}
      <section style={{ background: 'var(--amber)', padding: '80px 5%', textAlign: 'center' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
              fontWeight: 700,
              color: 'var(--ink)',
              marginBottom: 16,
            }}
          >
            Interessert i {service.title.toLowerCase()}?
          </h2>
          <p
            style={{
              fontSize: '1.05rem',
              color: 'rgba(26,26,26,0.75)',
              marginBottom: 36,
            }}
          >
            Vi gir en anbefaling basert på ditt anlegg og behov.
          </p>
          <Link
            href="/kontakt"
            style={{
              display: 'inline-block',
              background: 'var(--ink)',
              color: '#fff',
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '15px 40px',
              borderRadius: 2,
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
          >
            Ta kontakt
          </Link>
        </div>
      </section>
    </>
  )
}
