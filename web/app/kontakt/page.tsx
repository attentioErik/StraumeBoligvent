import { client } from '@/lib/sanity'
import { servicesQuery, siteSettingsQuery } from '@/lib/queries'
import type { Service, SiteSettings } from '@/lib/types'
import ContactForm from '@/components/ContactForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Ta kontakt med Straume Boligvent. Vi svarer innen én virkedag.',
}

export default async function KontaktPage() {
  const [settings, services] = await Promise.all([
    client.fetch<SiteSettings>(siteSettingsQuery).catch(() => null),
    client.fetch<Service[]>(servicesQuery).catch(() => []),
  ])

  const phone = settings?.phone || '561 26 800'
  const email = settings?.email || 'service@straumetekniske.no'
  const address = settings?.address || 'Idrettsveien 93, 5353 Straume'

  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: 'var(--off)',
          padding: '120px 5% 80px',
          borderBottom: '1px solid var(--ll)',
        }}
      >
        <div className="inner">
          <div className="slabel">Kom i gang</div>
          <h1
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2.4rem, 4vw, 3.6rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              color: 'var(--ink)',
              letterSpacing: '-0.02em',
              marginBottom: 20,
            }}
          >
            Ta kontakt
          </h1>
          <p
            style={{
              fontSize: '1.05rem',
              lineHeight: 1.78,
              color: 'var(--muted)',
              fontWeight: 300,
              maxWidth: 520,
            }}
          >
            Vi svarer innen én virkedag. Ring oss gjerne direkte for rask hjelp.
          </p>
        </div>
      </section>

      {/* Main grid */}
      <section style={{ background: 'var(--warm)', padding: '80px 5%' }}>
        <div
          className="inner"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.4fr',
            gap: 80,
            alignItems: 'start',
          }}
        >
          {/* Info */}
          <div>
            <h2
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                fontWeight: 700,
                color: 'var(--ink)',
                lineHeight: 1.15,
                marginBottom: 20,
              }}
            >
              Vi er tilgjengelige<br />for deg
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.8, marginBottom: 40, fontWeight: 300 }}>
              Fyll ut skjemaet, eller ta direkte kontakt. Vi stiller gjerne spørsmål om anlegget ditt for å gi deg riktig tilbud.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                {
                  lbl: 'Telefon',
                  val: phone,
                  href: `tel:${phone.replace(/\s/g, '')}`,
                },
                {
                  lbl: 'E-post',
                  val: email,
                  href: `mailto:${email}`,
                },
                {
                  lbl: 'Adresse',
                  val: address,
                  href: undefined,
                },
              ].map((row) => (
                <div
                  key={row.lbl}
                  style={{
                    display: 'flex',
                    gap: 18,
                    alignItems: 'flex-start',
                    paddingBottom: 20,
                    borderBottom: '1px solid var(--ll)',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--sec)',
                      width: 72,
                      flexShrink: 0,
                      paddingTop: 3,
                    }}
                  >
                    {row.lbl}
                  </span>
                  {row.href ? (
                    <a
                      href={row.href}
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--adark)',
                        fontWeight: 700,
                        textDecoration: 'none',
                        lineHeight: 1.6,
                      }}
                    >
                      {row.val}
                    </a>
                  ) : (
                    <span style={{ fontSize: '0.875rem', color: 'var(--body)', lineHeight: 1.6 }}>
                      {row.val}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Trust items */}
            <div style={{ marginTop: 40 }}>
              {[
                'Tydelig pris før oppstart',
                'Dokumentasjon etter hvert besøk',
                'Kun nødvendige tiltak',
                'Svar innen 24 timer',
              ].map((item) => (
                <div key={item} className="citem">
                  <div className="cicon">✓</div>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div
            style={{
              background: 'var(--white)',
              border: '1px solid var(--ll)',
              borderRadius: 8,
              padding: '40px',
            }}
          >
            <h3
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.3rem',
                fontWeight: 700,
                color: 'var(--ink)',
                marginBottom: 24,
              }}
            >
              Send forespørsel
            </h3>
            <ContactForm services={services} />
          </div>
        </div>

        <style>{`
          @media (max-width: 980px) {
            .inner { grid-template-columns: 1fr !important; gap: 48px !important; }
          }
        `}</style>
      </section>
    </>
  )
}
