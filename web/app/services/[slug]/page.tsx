export const dynamic = 'force-dynamic'

import { client } from '@/lib/sanity'
import {
  serviceBySlugQuery,
  servicePathsQuery,
  projectsByServiceQuery,
  faqByServiceQuery,
} from '@/lib/queries'
import type { Service, ReferenceProject, FAQ } from '@/lib/types'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ContactForm from '@/components/ContactForm'
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

  return (
    <>
      {/* ─── HERO ─── */}
      <section
        style={{
          background: 'var(--off)',
          padding: '120px 5% 80px',
          borderBottom: '1px solid var(--ll)',
        }}
      >
        <div className="inner">
          <Link
            href="/#tjenester"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: '0.82rem',
              color: 'var(--muted)',
              textDecoration: 'none',
              marginBottom: 32,
              transition: 'color 0.2s',
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
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: 'var(--amber)',
                boxShadow: '0 0 0 3px rgba(240,165,0,0.2)',
              }}
            />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.06em', color: 'var(--adark)' }}>
              Tjeneste
            </span>
          </div>
          <h1
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2.4rem, 4vw, 3.6rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              color: 'var(--ink)',
              letterSpacing: '-0.02em',
              maxWidth: 720,
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
              maxWidth: 560,
              marginBottom: 40,
            }}
          >
            {service.description}
          </p>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <Link href="/kontakt" className="btn-amber">
              Få tilbud
            </Link>
            <a href="tel:56126800" className="btn-ghost">
              Ring 561 26 800 →
            </a>
          </div>
        </div>
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <section style={{ background: 'var(--white)', padding: '80px 5%' }}>
        <div
          className="inner"
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
          <div style={{ position: 'sticky', top: 100 }}>
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
            .inner > div { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ─── RELATED PROJECTS ─── */}
      {projects.length > 0 && (
        <section style={{ background: 'var(--warm)', padding: '80px 5%' }}>
          <div className="inner">
            <div className="slabel">Referanser</div>
            <h2 className="stitle">Relaterte prosjekter</h2>
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
          <ContactForm />
        </div>
      </section>
    </>
  )
}
