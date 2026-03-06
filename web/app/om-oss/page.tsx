export const revalidate = 60

import { client, urlFor } from '@/lib/sanity'
import { omOssQuery, ansatteQuery } from '@/lib/queries'
import type { OmOss, Ansatt } from '@/lib/types'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'

export const metadata: Metadata = {
  title: 'Om oss',
  description: 'Lokal fagkunnskap og langsiktige relasjoner. Straume Boligvent er en spesialisert tjeneste fra Straume Tekniske AS.',
}

const FALLBACK_TALL = [
  { verdi: '2012', label: 'Etablert' },
  { verdi: '500+', label: 'Oppdrag gjennomført' },
  { verdi: '100%', label: 'Dokumenterte oppdrag' },
  { verdi: '1 dag', label: 'Responstid' },
]

const FALLBACK_VERDIER = [
  { tittel: 'Faglig integritet', beskrivelse: 'Vi anbefaler bare det som er nødvendig. Ingen unødige tiltak.' },
  { tittel: 'Tydelig kommunikasjon', beskrivelse: 'Du vet alltid hva vi gjør og hva det koster – ingen overraskelser.' },
  { tittel: 'Langsiktig perspektiv', beskrivelse: 'Vi bygger relasjoner, ikke engangsoppdrag. Fornøyde kunder er vår beste markedsføring.' },
  { tittel: 'Dokumentert kvalitet', beskrivelse: 'Alle oppdrag avsluttes med rapport. Borettslag og sameier får tilpasset dokumentasjon.' },
]

export default async function OmOssPage() {
  const [omOss, ansatte] = await Promise.all([
    client.fetch<OmOss>(omOssQuery).catch(() => null),
    client.fetch<Ansatt[]>(ansatteQuery).catch(() => []),
  ])

  const tall = omOss?.tallOgFakta ?? FALLBACK_TALL
  const verdier = omOss?.verdier ?? FALLBACK_VERDIER

  return (
    <>
      {/* ─── HERO ─── */}
      <section style={{ background: 'var(--off)', padding: '120px 5% 80px', borderBottom: '1px solid var(--ll)' }}>
        <div className="inner">
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
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--amber)', boxShadow: '0 0 0 3px rgba(240,165,0,0.2)' }} />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.06em', color: 'var(--adark)' }}>Om oss</span>
          </div>
          <h1
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2.4rem, 4vw, 3.6rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              color: 'var(--ink)',
              letterSpacing: '-0.02em',
              maxWidth: 760,
              marginBottom: 24,
            }}
          >
            {omOss?.heroTittel ?? 'Lokal fagkunnskap.\u00A0Langsiktige relasjoner.'}
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.78, color: 'var(--muted)', fontWeight: 300, maxWidth: 580 }}>
            {omOss?.heroTekst ?? 'Straume Boligvent er en spesialisert tjeneste fra Straume Tekniske AS, etablert i 2012 med bred erfaring innen tekniske installasjoner i Bergen og omegn.'}
          </p>
        </div>
      </section>

      {/* ─── TALL OG FAKTA ─── */}
      <section style={{ background: 'var(--amber)', padding: '60px 5%' }}>
        <div className="inner">
          <div
            className="tall-grid"
            style={{ display: 'grid', gridTemplateColumns: `repeat(${tall.length}, 1fr)`, gap: 1 }}
          >
            {tall.map((t, i) => (
              <div
                key={i}
                style={{
                  textAlign: 'center',
                  padding: '32px 24px',
                  borderRight: i < tall.length - 1 ? '1px solid rgba(20,16,8,0.15)' : undefined,
                }}
              >
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, color: 'var(--ink)', lineHeight: 1 }}>
                  {t.verdi}
                </div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--adark)', marginTop: 10, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {t.label}
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 640px) { .tall-grid { grid-template-columns: 1fr 1fr !important; } }
        `}</style>
      </section>

      {/* ─── HISTORIKK ─── */}
      <section style={{ background: 'var(--white)', padding: '80px 5%' }}>
        <div
          className="inner split"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}
        >
          <div className="reveal">
            <div className="slabel">Vår historie</div>
            <h2 className="stitle">Hvem er vi?</h2>
            {omOss?.historieBlokker && omOss.historieBlokker.length > 0 ? (
              <div className="prose" style={{ marginTop: 24 }}>
                <PortableText value={omOss.historieBlokker} />
              </div>
            ) : (
              <>
                <p style={{ fontSize: '0.925rem', color: 'var(--muted)', lineHeight: 1.8, marginBottom: 16, fontWeight: 300 }}>
                  Straume Boligvent er en spesialisert tjeneste fra Straume Tekniske AS, etablert i 2012 med bred erfaring innen tekniske installasjoner.
                </p>
                <p style={{ fontSize: '0.925rem', color: 'var(--muted)', lineHeight: 1.8, marginBottom: 16, fontWeight: 300 }}>
                  Vi samarbeider tett med Straume Tekniske, noe som gir oss tilgang til et bredt fagmiljø – bak én kontaktperson og ett ansvar.
                </p>
                <p style={{ fontSize: '0.925rem', color: 'var(--muted)', lineHeight: 1.8, fontWeight: 300 }}>
                  Vi spesialiserer oss på ventilasjon for bolig, borettslag og mindre næringsbygg. Vår tilnærming er alltid faglig, ryddig og langsiktig.
                </p>
              </>
            )}
          </div>
          <div className="reveal" style={{ position: 'relative' }}>
            <div
              style={{
                width: '100%',
                aspectRatio: '4/5',
                background: 'linear-gradient(145deg, #ddd6c8 0%, #b8ae9e 100%)',
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 16px 48px rgba(20,16,8,0.1)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ opacity: 0.3 }}>
                <circle cx="24" cy="24" r="18" stroke="#2e2820" strokeWidth="1.5" />
                <circle cx="24" cy="24" r="8" stroke="#2e2820" strokeWidth="1.5" />
                <circle cx="24" cy="24" r="2.5" fill="#2e2820" />
              </svg>
              <div style={{ position: 'absolute', bottom: 0, right: 0, background: 'var(--amber)', padding: '22px 28px', borderRadius: '6px 0 6px 0' }}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', fontWeight: 700, color: 'var(--ink)' }}>Straume</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--adark)', marginTop: 5, fontWeight: 700, letterSpacing: '0.04em' }}>Del av Straume Tekniske AS</div>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 980px) { .split { grid-template-columns: 1fr !important; gap: 48px !important; } }
        `}</style>
      </section>

      {/* ─── VERDIER ─── */}
      <section style={{ background: 'var(--off)', padding: '80px 5%' }}>
        <div className="inner">
          <div className="slabel reveal">Hva vi tror på</div>
          <h2 className="stitle reveal">Verdier</h2>
          <div
            className="verdier-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 28, marginTop: 48 }}
          >
            {verdier.map((v, i) => (
              <div
                key={i}
                className="reveal"
                style={{
                  background: 'var(--white)',
                  border: '1px solid var(--ll)',
                  borderRadius: 6,
                  padding: '36px 32px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, width: 3, height: '100%', background: 'var(--amber)' }} />
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
                  {v.tittel}
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300 }}>{v.beskrivelse}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 640px) { .verdier-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ─── TEAM ─── */}
      {ansatte.length > 0 && (
        <section style={{ background: 'var(--white)', padding: '80px 5%' }}>
          <div className="inner">
            <div className="slabel reveal">Menneskene bak</div>
            <h2 className="stitle reveal">Teamet vårt</h2>
            <div
              className="team-grid"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, marginTop: 56 }}
            >
              {ansatte.map((a) => (
                <div
                  key={a._id}
                  className="reveal"
                  style={{ textAlign: 'center' }}
                >
                  {/* Bilde */}
                  <div
                    style={{
                      width: 112,
                      height: 112,
                      borderRadius: '50%',
                      background: 'linear-gradient(145deg, #ddd6c8 0%, #b8ae9e 100%)',
                      margin: '0 auto 20px',
                      position: 'relative',
                      overflow: 'hidden',
                      border: '3px solid var(--amber)',
                    }}
                  >
                    {a.bilde ? (
                      <Image
                        src={urlFor(a.bilde).width(224).height(224).url()}
                        alt={a.navn}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ opacity: 0.4 }}>
                          <circle cx="16" cy="12" r="6" stroke="#706860" strokeWidth="1.5" />
                          <path d="M4 28c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="#706860" strokeWidth="1.5" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>
                    {a.navn}
                  </div>
                  {a.rolle && (
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--adark)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
                      {a.rolle}
                    </div>
                  )}
                  {a.bio && (
                    <p style={{ fontSize: '0.845rem', color: 'var(--muted)', lineHeight: 1.65, fontWeight: 300, marginBottom: 12 }}>
                      {a.bio}
                    </p>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
                    {a.telefon && (
                      <a href={`tel:${a.telefon.replace(/\s/g, '')}`} style={{ fontSize: '0.8rem', color: 'var(--adark)', textDecoration: 'none', fontWeight: 600 }}>
                        {a.telefon}
                      </a>
                    )}
                    {a.epost && (
                      <a href={`mailto:${a.epost}`} style={{ fontSize: '0.8rem', color: 'var(--muted)', textDecoration: 'none' }}>
                        {a.epost}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <style>{`
            @media (max-width: 980px) { .team-grid { grid-template-columns: 1fr 1fr !important; } }
            @media (max-width: 640px) { .team-grid { grid-template-columns: 1fr !important; } }
          `}</style>
        </section>
      )}

      {/* ─── SERTIFISERINGER ─── */}
      {omOss?.sertifiseringer && omOss.sertifiseringer.length > 0 && (
        <section style={{ background: 'var(--off)', padding: '60px 5%' }}>
          <div className="inner">
            <div className="slabel reveal" style={{ textAlign: 'center' }}>Kompetanse</div>
            <h2 className="stitle reveal" style={{ textAlign: 'center' }}>Sertifiseringer</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap', marginTop: 40 }}>
              {omOss.sertifiseringer.map((s, i) => (
                <div
                  key={i}
                  className="reveal"
                  style={{
                    background: 'var(--white)',
                    border: '1px solid var(--ll)',
                    borderRadius: 6,
                    padding: '20px 32px',
                    textAlign: 'center',
                    minWidth: 160,
                  }}
                >
                  <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{s.navn}</div>
                  {s.beskrivelse && <p style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.5 }}>{s.beskrivelse}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ─── */}
      <section style={{ background: 'var(--warm)', padding: '80px 5%' }}>
        <div className="inner" style={{ maxWidth: 640, textAlign: 'center', margin: '0 auto' }}>
          <div className="slabel reveal" style={{ textAlign: 'center' }}>Kom i gang</div>
          <h2 className="stitle reveal" style={{ textAlign: 'center' }}>Ta kontakt</h2>
          <p className="sdesc reveal" style={{ textAlign: 'center', marginBottom: 40 }}>
            Vi er tilgjengelige for en uforpliktende prat om ditt anlegg.
          </p>
          <div className="reveal" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/kontakt" className="btn-amber">Send forespørsel</Link>
            <Link href="/referanser" className="btn-ghost">Se referanser →</Link>
          </div>
        </div>
      </section>
    </>
  )
}
