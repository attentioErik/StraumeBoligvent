export const dynamic = 'force-dynamic'

import { client, urlFor } from '@/lib/sanity'
import { referenceProjectBySlugQuery, referenceProjectPathsQuery } from '@/lib/queries'
import type { ReferenceProject } from '@/lib/types'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const paths = await client.fetch<{ slug: string }[]>(referenceProjectPathsQuery).catch(() => [])
  return paths.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const ref = await client.fetch<ReferenceProject>(referenceProjectBySlugQuery, { slug }).catch(() => null)
  if (!ref) return {}
  return { title: ref.title, description: ref.description }
}

export default async function ReferansePage({ params }: Props) {
  const { slug } = await params
  const ref = await client.fetch<ReferenceProject>(referenceProjectBySlugQuery, { slug }).catch(() => null)

  if (!ref) notFound()

  return (
    <>
      {/* ─── HERO ─── */}
      <section style={{ background: 'var(--off)', padding: '120px 5% 80px', borderBottom: '1px solid var(--ll)' }}>
        <div className="inner">
          <Link
            href="/referanser"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', color: 'var(--muted)', textDecoration: 'none', marginBottom: 32 }}
          >
            ← Alle referanser
          </Link>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
            {ref.category && (
              <span
                style={{
                  display: 'inline-block',
                  background: 'var(--amber)',
                  color: 'var(--ink)',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  padding: '5px 12px',
                  borderRadius: 2,
                }}
              >
                {ref.category}
              </span>
            )}
            {ref.serviceType && (
              <span style={{ display: 'inline-flex', alignItems: 'center', fontSize: '0.78rem', color: 'var(--muted)', fontWeight: 400 }}>
                {ref.serviceType}
              </span>
            )}
          </div>

          <h1
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              color: 'var(--ink)',
              letterSpacing: '-0.02em',
              maxWidth: 760,
              marginBottom: 16,
            }}
          >
            {ref.title}
          </h1>
          {ref.description && (
            <p style={{ fontSize: '1.05rem', lineHeight: 1.78, color: 'var(--muted)', fontWeight: 300, maxWidth: 600 }}>
              {ref.description}
            </p>
          )}

          {ref.service && (
            <div style={{ marginTop: 24 }}>
              <Link
                href={`/services/${ref.service.slug.current}`}
                style={{
                  fontSize: '0.72rem',
                  color: 'var(--adark)',
                  background: 'var(--abg)',
                  border: '1px solid var(--amid)',
                  borderRadius: 100,
                  padding: '4px 12px',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                {ref.service.title}
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ─── HOVEDBILDE ─── */}
      {ref.image && (
        <section style={{ background: 'var(--dark)', padding: 0 }}>
          <div style={{ position: 'relative', width: '100%', height: 480, maxHeight: '55vw' }}>
            <Image
              src={urlFor(ref.image).width(1600).height(900).url()}
              alt={ref.title}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </section>
      )}

      {/* ─── INNHOLD ─── */}
      <section style={{ background: 'var(--white)', padding: '80px 5%' }}>
        <div
          className="ref-content-grid inner"
          style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 80, alignItems: 'start' }}
        >
          {/* Venstre: beskrivelse */}
          <div>
            {ref.detail && (
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--body)', marginBottom: 40, fontWeight: 300 }}>
                {ref.detail}
              </p>
            )}

            {ref.results && ref.results.length > 0 && (
              <div className="prose" style={{ marginBottom: 48 }}>
                <PortableText value={ref.results} />
              </div>
            )}

            {/* Testimonial */}
            {ref.testimonial && (
              <div
                style={{
                  borderLeft: '3px solid var(--amber)',
                  background: 'var(--abg)',
                  padding: '28px 28px 28px 32px',
                  borderRadius: '0 6px 6px 0',
                  marginTop: 40,
                }}
              >
                <p
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '1.15rem',
                    fontStyle: 'italic',
                    color: 'var(--ink)',
                    lineHeight: 1.65,
                    marginBottom: 16,
                  }}
                >
                  &ldquo;{ref.testimonial.quote}&rdquo;
                </p>
                <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--adark)', letterSpacing: '0.06em' }}>
                  — {ref.testimonial.author}
                  {ref.testimonial.role && <span style={{ fontWeight: 400, color: 'var(--muted)' }}>, {ref.testimonial.role}</span>}
                </p>
              </div>
            )}
          </div>

          {/* Høyre: CTA-kort */}
          <div style={{ position: 'sticky', top: 100 }}>
            <div
              style={{
                background: 'var(--off)',
                border: '1px solid var(--ll)',
                borderRadius: 8,
                padding: 32,
              }}
            >
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.15rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
                Lignende behov?
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: 24, fontWeight: 300 }}>
                Ta kontakt for en uforpliktende prat om din situasjon.
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
              <div style={{ borderTop: '1px solid var(--ll)', marginTop: 24, paddingTop: 24, fontSize: '0.8rem', color: 'var(--sec)', lineHeight: 1.6 }}>
                Vi svarer innen én virkedag.
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 980px) {
            .ref-content-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ─── TILBAKE ─── */}
      <section style={{ background: 'var(--off)', borderTop: '1px solid var(--ll)', padding: '32px 5%' }}>
        <div className="inner">
          <Link href="/referanser" style={{ fontSize: '0.84rem', color: 'var(--muted)', textDecoration: 'none' }}>
            ← Tilbake til alle referanser
          </Link>
        </div>
      </section>
    </>
  )
}
