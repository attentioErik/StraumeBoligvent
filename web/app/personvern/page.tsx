import type { Metadata } from 'next'
import Link from 'next/link'
import { COMPANY_LEGAL_NAME, ORG_NUMBER, SITE_NAME, absUrl } from '@/lib/site'
import { CONSENT_DECLARATION_URL } from '@/lib/tracking'

const UPDATED = '5. november 2026'

export const metadata: Metadata = {
  title: 'Personvernerklæring',
  description: `Slik behandler ${COMPANY_LEGAL_NAME} personopplysninger fra kontaktskjemaet, og hvilke informasjonskapsler nettsiden bruker.`,
  alternates: { canonical: absUrl('/personvern') },
  openGraph: {
    title: `Personvernerklæring | ${SITE_NAME}`,
    url: absUrl('/personvern'),
  },
}

const processors = [
  {
    name: 'Basin (usebasin.com)',
    role: 'Mottar og lagrer innsendinger fra kontaktskjemaet og sender dem til oss på e-post.',
    where: 'Canada, Tyskland og USA',
  },
  {
    name: 'Vercel',
    role: 'Drifter nettsiden. Registrerer tekniske logger som IP-adresse ved besøk.',
    where: 'USA og EU',
  },
  {
    name: 'Sanity',
    role: 'CMS for innhold på nettsiden.',
    where: 'EU/USA',
  },
  {
    name: 'Uploadcare',
    role: 'Leverer bildene på nettsiden.',
    where: 'Globalt CDN',
  },
  {
    name: 'Attentio Consent',
    role: 'Lagrer samtykket ditt til informasjonskapsler.',
    where: 'EU/EØS (Norge)',
  },
  {
    name: 'Google (Tag Manager, Analytics, Ads)',
    role: 'Besøksstatistikk og måling av annonser. Kun med ditt samtykke.',
    where: 'USA og EU',
  },
]

export default function PersonvernPage() {
  return (
    <article
      style={{
        maxWidth: 760,
        margin: '0 auto',
        padding: '96px 5% 80px',
        color: 'var(--body)',
        lineHeight: 1.75,
      }}
    >
      <p
        style={{
          fontSize: '0.65rem',
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--amber)',
          marginBottom: 12,
        }}
      >
        Personvern
      </p>
      <h1
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(2rem, 4vw, 2.75rem)',
          color: 'var(--ink)',
          lineHeight: 1.15,
          marginBottom: 16,
        }}
      >
        Personvernerklæring
      </h1>
      <p style={{ color: 'var(--muted)', marginBottom: 40 }}>
        Her forklarer vi hvilke personopplysninger vi samler inn når du bruker nettsiden vår, hvorfor vi gjør
        det, og hvilke rettigheter du har. Sist oppdatert {UPDATED}.
      </p>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: '1.35rem', color: 'var(--ink)', marginBottom: 12 }}>Behandlingsansvarlig</h2>
        <p>
          <strong>{COMPANY_LEGAL_NAME}</strong> (drifter {SITE_NAME})
          <br />
          Org.nr. {ORG_NUMBER}
          <br />
          Idrettsveien 93, 5353 Straume
          <br />
          E-post:{' '}
          <a href="mailto:ordre@straumetekniske.no" style={{ color: 'var(--ink)' }}>
            ordre@straumetekniske.no
          </a>
          <br />
          Telefon:{' '}
          <a href="tel:56126800" style={{ color: 'var(--ink)' }}>
            561 26 800
          </a>
        </p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: '1.35rem', color: 'var(--ink)', marginBottom: 12 }}>Kontaktskjemaet</h2>
        <p>
          Når du sender en henvendelse, behandler vi <strong>navn, telefonnummer, e-postadresse</strong> (hvis du
          oppgir det), <strong>tjeneste/adresse</strong> og <strong>meldingen din</strong>, samt eventuelle bilder
          du laster opp.
        </p>
        <p>
          <strong>Formål:</strong> å svare på henvendelsen, avtale service/befaring og gi deg et tilbud.
        </p>
        <p>
          <strong>Rettslig grunnlag:</strong> at du har bedt om kontakt eller tilbud før en eventuell avtale
          (personvernforordningen artikkel 6 nr. 1 bokstav b), og vår berettigede interesse i å følge opp
          henvendelser (artikkel 6 nr. 1 bokstav f).
        </p>
        <p>
          <strong>Lagring:</strong> vi sletter henvendelser som ikke fører til oppdrag senest 12 måneder etter
          siste kontakt. Blir du kunde, oppbevarer vi opplysningene så lenge det er nødvendig for oppdraget og
          det bokføringsloven krever. Hos skjemaleverandøren Basin slettes innsendinger automatisk etter senest
          48 måneder.
        </p>
        <p>Vi selger aldri opplysningene dine, og deler dem ikke med andre enn leverandørene som er nevnt nedenfor.</p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: '1.35rem', color: 'var(--ink)', marginBottom: 12 }}>
          Informasjonskapsler og sporing
        </h2>
        <p>
          Nettsiden bruker informasjonskapsler (cookies) til besøksstatistikk og til å måle effekten av
          annonser hos Google. Disse brukes <strong>bare hvis du samtykker</strong>. Uten samtykke lagres kun
          det som er nødvendig for at siden og samtykkevalget ditt skal fungere.
        </p>
        <p>
          Du kan når som helst endre eller trekke tilbake samtykket.{' '}
          <a href="#att-consent" style={{ color: 'var(--ink)', fontWeight: 600 }}>
            Endre cookie-innstillinger
          </a>
          .
        </p>
        <p>
          Den fullstendige oversikten over informasjonskapslene vi bruker, hva de gjør og hvor lenge de lagres,
          finner du i{' '}
          <a
            href={CONSENT_DECLARATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--ink)', fontWeight: 600 }}
          >
            cookie-erklæringen vår
          </a>{' '}
          (åpnes i ny fane).
        </p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: '1.35rem', color: 'var(--ink)', marginBottom: 12 }}>
          Leverandører som behandler data for oss
        </h2>
        <p style={{ marginBottom: 16 }}>
          Vi bruker disse leverandørene (databehandlere). De kan bare bruke opplysningene på våre vegne, og vi
          har avtaler med dem som regulerer dette.
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              minWidth: 540,
              borderCollapse: 'collapse',
              fontSize: '0.92rem',
              textAlign: 'left',
            }}
          >
            <thead>
              <tr style={{ borderBottom: '1px solid var(--ll)' }}>
                <th style={{ padding: '10px 12px 10px 0', color: 'var(--ink)' }}>Leverandør</th>
                <th style={{ padding: '10px 12px 10px 0', color: 'var(--ink)' }}>Hva de gjør</th>
                <th style={{ padding: '10px 0', color: 'var(--ink)' }}>Hvor data lagres</th>
              </tr>
            </thead>
            <tbody>
              {processors.map((p) => (
                <tr key={p.name} style={{ borderBottom: '1px solid var(--ll)', verticalAlign: 'top' }}>
                  <td style={{ padding: '10px 12px 10px 0', fontWeight: 600, color: 'var(--ink)' }}>{p.name}</td>
                  <td style={{ padding: '10px 12px 10px 0' }}>{p.role}</td>
                  <td style={{ padding: '10px 0' }}>{p.where}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: 16 }}>
          Når opplysninger overføres til land utenfor EU/EØS, som USA, skjer det på grunnlag av EUs rammeverk
          for personvern (EU-U.S. Data Privacy Framework) eller EUs standard personvernbestemmelser.
        </p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: '1.35rem', color: 'var(--ink)', marginBottom: 12 }}>Dine rettigheter</h2>
        <p>Du har rett til å:</p>
        <ul style={{ paddingLeft: 22, margin: '8px 0 16px' }}>
          <li>få innsyn i hvilke opplysninger vi har om deg</li>
          <li>få rettet feil eller ufullstendige opplysninger</li>
          <li>få opplysningene slettet</li>
          <li>begrense eller protestere mot behandlingen</li>
          <li>få utlevert opplysningene i et vanlig maskinlesbart format (dataportabilitet)</li>
          <li>klage til Datatilsynet hvis du mener vi behandler opplysningene feil</li>
        </ul>
        <p>
          Kontakt oss på{' '}
          <a href="mailto:ordre@straumetekniske.no" style={{ color: 'var(--ink)' }}>
            ordre@straumetekniske.no
          </a>{' '}
          for å bruke rettighetene dine. Du kan også lese mer hos{' '}
          <a href="https://www.datatilsynet.no/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink)' }}>
            Datatilsynet
          </a>
          .
        </p>
      </section>

      <p style={{ color: 'var(--sec)', fontSize: '0.9rem' }}>
        <Link href="/" style={{ color: 'var(--ink)' }}>
          ← Til forsiden
        </Link>
      </p>
    </article>
  )
}
