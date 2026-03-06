export const dynamic = 'force-dynamic'

import { client, urlFor } from '@/lib/sanity'
import { referanseBySlugQuery, referansePathsQuery } from '@/lib/queries'
import type { Referanse } from '@/lib/types'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const paths = await client.fetch<{ slug: string }[]>(referansePathsQuery).catch(() => [])
  return paths.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const ref = await client.fetch<Referanse>(referanseBySlugQuery, { slug }).catch(() => null)
  if (!ref) return {}
  return { title: ref.title, description: ref.kortBeskrivelse }
}

export default async function ReferansePage({ params }: Props) {
  const { slug } = await params
  const ref = await client.fetch<Referanse>(referanseBySlugQuery, { slug }).catch(() => null)

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
            {ref.kategori && (
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
                {ref.kategori}
              </span>
            )}
            {ref.utfortAr && (
              <span style={{ display: 'inline-flex', alignItems: 'center', fontSize: '0.78rem', color: 'var(--muted)', fontWeight: 400 }}>
                {ref.utfortAr}
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

          {ref.kunde && (
            <p style={{ fontSize: '0.9rem', color: 'var(--adark)', fontWeight: 600, marginBottom: 16, letterSpacing: '0.04em' }}>
              {ref.kunde}
            </p>
          )}
          {ref.kortBeskrivelse && (
            <p style={{ fontSize: '1.05rem', lineHeight: 1.78, color: 'var(--muted)', fontWeight: 300, maxWidth: 600 }}>
              {ref.kortBeskrivelse}
            </p>
          )}

          {ref.tjenester && ref.tjenester.length > 0 && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 24 }}>
              {ref.tjenester.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: '0.72rem',
                    color: 'var(--adark)',
                    background: 'var(--abg)',
                    border: '1px solid var(--amid)',
                    borderRadius: 100,
                    padding: '4px 12px',
                    fontWeight: 600,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── HOVEDBILDE ─── */}
      {ref.hovedbilde && (
        <section style={{ background: 'var(--dark)', padding: '0' }}>
          <div style={{ position: 'relative', width: '100%', height: 480, maxHeight: '55vw' }}>
            <Image
              src={urlFor(ref.hovedbilde).width(1600).height(900).url()}
              alt={ref.hovedbilde.alt || ref.title}
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
            {ref.beskrivelse && ref.beskrivelse.length > 0 && (
              <div className="prose" style={{ marginBottom: 56 }}>
                <PortableText value={ref.beskrivelse} />
              </div>
            )}

            {/* Galleri */}
            {ref.galleri && ref.galleri.length > 0 && (
              <div>
                <div className="slabel">Bilder</div>
                <div
                  className="galleri-grid"
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginTop: 24 }}
                >
                  {ref.galleri.map((bilde, i) => (
                    <div
                      key={i}
                      style={{
                        position: 'relative',
                        aspectRatio: '4/3',
                        borderRadius: 4,
                        overflow: 'hidden',
                        background: 'var(--ll)',
                      }}
                    >
                      <Image
                        src={urlFor(bilde).width(800).height(600).url()}
                        alt={bilde.alt || `Bilde ${i + 1}`}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Kundesitat */}
            {ref.kundesitat && (
              <div
                style={{
                  borderLeft: '3px solid var(--amber)',
                  paddingLeft: 28,
                  marginTop: 56,
                  background: 'var(--abg)',
                  padding: '28px 28px 28px 32px',
                  borderRadius: '0 6px 6px 0',
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
                  &ldquo;{ref.kundesitat.sitat}&rdquo;
                </p>
                <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--adark)', letterSpacing: '0.06em' }}>
                  — {ref.kundesitat.person}
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
            .galleri-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ─── FORRIGE / NESTE ─── */}
      {(ref.forrige || ref.neste) && (
        <section style={{ background: 'var(--off)', borderTop: '1px solid var(--ll)', padding: '48px 5%' }}>
          <div className="inner" style={{ display: 'flex', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            {ref.forrige ? (
              <Link
                href={`/referanser/${ref.forrige.slug.current}`}
                style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}
              >
                <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>← Forrige</span>
                <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, color: 'var(--ink)', fontSize: '0.95rem' }}>{ref.forrige.title}</span>
              </Link>
            ) : (
              <div />
            )}
            {ref.neste && (
              <Link
                href={`/referanser/${ref.neste.slug.current}`}
                style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 6, textAlign: 'right' }}
              >
                <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>Neste →</span>
                <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, color: 'var(--ink)', fontSize: '0.95rem' }}>{ref.neste.title}</span>
              </Link>
            )}
          </div>
        </section>
      )}
    </>
  )
}
