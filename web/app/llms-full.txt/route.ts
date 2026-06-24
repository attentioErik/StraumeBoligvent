import { client } from '@/lib/sanity'
import {
  siteSettingsQuery,
  servicesQuery,
  forsideQuery,
  priserQuery,
  enovaQuery,
  borettslagLandingQuery,
  omOssQuery,
  articlesQuery,
  serviceBySlugQuery,
} from '@/lib/queries'
import type {
  SiteSettings,
  Service,
  Forside,
  Priser,
  Enova,
  BorettslagLanding,
  OmOss,
  Article,
} from '@/lib/types'
import { SITE_URL } from '@/lib/site'

export const revalidate = 3600

type Block = { _type?: string; children?: { text?: string }[] }

function ptToPlain(blocks?: unknown): string {
  if (!Array.isArray(blocks)) return ''
  return (blocks as Block[])
    .map((b) => (b._type === 'block' ? (b.children || []).map((c) => c.text || '').join('') : ''))
    .filter(Boolean)
    .join('\n\n')
    .trim()
}

function section(title: string, body: string) {
  return `\n\n## ${title}\n\n${body.trim()}`
}

function bullet(items?: string[]) {
  if (!items || items.length === 0) return ''
  return items.map((i) => `- ${i}`).join('\n')
}

function renderService(s: Service) {
  const parts: string[] = []
  parts.push(`### ${s.title}`)
  parts.push(`URL: ${SITE_URL}/tjenester/${s.slug.current}`)
  if (s.description) parts.push(s.description)

  const intro = ptToPlain(s.introText) || ptToPlain(s.fullDescription)
  if (intro) parts.push(intro)

  if (s.whyTitle || (s.whySymptoms && s.whySymptoms.length)) {
    parts.push(`**${s.whyTitle || 'Hvorfor'}**`)
    const why = ptToPlain(s.whyText)
    if (why) parts.push(why)
    if (s.whySymptoms?.length) parts.push(bullet(s.whySymptoms))
  }

  if (s.whenTitle || (s.whenItems && s.whenItems.length)) {
    parts.push(`**${s.whenTitle || 'Når'}**`)
    if (s.whenItems?.length) parts.push(bullet(s.whenItems))
    if (s.whenNote) parts.push(s.whenNote)
  }

  const steps = s.includedSteps || s.process
  if (steps && steps.length) {
    parts.push(`**${s.includedTitle || 'Hva er inkludert'}**`)
    parts.push(
      steps
        .map((st, i) => `${i + 1}. ${st.title}${st.description ? ` — ${st.description}` : ''}`)
        .join('\n'),
    )
  }

  const benefits = s.benefitsList || s.benefits
  if (benefits && benefits.length) {
    parts.push(`**${s.benefitsTitle || 'Fordeler'}**`)
    if (s.benefitsText) parts.push(s.benefitsText)
    parts.push(bullet(benefits))
  }

  return parts.filter(Boolean).join('\n\n')
}

export async function GET() {
  const [settings, forside, services, priser, enova, borettslag, omOss, articles] = await Promise.all([
    client.fetch<SiteSettings>(siteSettingsQuery).catch(() => null),
    client.fetch<Forside>(forsideQuery).catch(() => null),
    client.fetch<Service[]>(servicesQuery).catch(() => []),
    client.fetch<Priser>(priserQuery).catch(() => null),
    client.fetch<Enova>(enovaQuery).catch(() => null),
    client.fetch<BorettslagLanding>(borettslagLandingQuery).catch(() => null),
    client.fetch<OmOss>(omOssQuery).catch(() => null),
    client.fetch<Article[]>(articlesQuery).catch(() => []),
  ])

  // Full service details (intro/why/included/benefits) require per-slug fetch
  const detailedServices = await Promise.all(
    services
      .filter((s) => s?.slug?.current)
      .map((s) => client.fetch<Service>(serviceBySlugQuery, { slug: s.slug.current }).catch(() => null)),
  )

  const phone = settings?.phone || '561 26 800'
  const email = settings?.email || 'ordre@straumetekniske.no'
  const address = settings?.address || 'Idrettsveien 93, 5353 Straume'
  const orgNumber = settings?.orgNumber || '998 766 834'

  let out = `# Straume Boligvent — full informasjon

> Komplett leveranse innen ventilasjon for bolig, borettslag og næring i Bergen og omegn. Service, kanalrens, innregulering, montasje og utskifting av ventilasjonsanlegg.

URL: ${SITE_URL}
Tjenestenavn: Straume Boligvent
Juridisk navn: Straume Tekniske AS
Organisasjonsnummer: ${orgNumber}
Telefon: ${phone}
E-post: ${email}
Adresse: ${address}
Område: Bergen, Sotra, Øygarden og resten av Vestland
Sertifiseringer: Miljøsertifisert, EKOM-autorisasjon, Sentral Godkjenning
`

  // Forside-essens
  if (forside) {
    const body: string[] = []
    if (forside.heroBilde || forside.tjenesterTittel) {
      if (forside.tjenesterTittel) body.push(`**${forside.tjenesterTittel}**`)
      if (forside.tjenesterBeskrivelse) body.push(forside.tjenesterBeskrivelse)
    }
    if (forside.prosessTittel) body.push(`**${forside.prosessTittel}**`)
    if (forside.prosessBeskrivelse) body.push(forside.prosessBeskrivelse)
    if (forside.prosessSteg && forside.prosessSteg.length) {
      body.push(
        forside.prosessSteg
          .map((s, i) => `${s.nummer || String(i + 1).padStart(2, '0')}. ${s.tittel} — ${s.beskrivelse}`)
          .join('\n'),
      )
    }
    if (forside.boligeierTittel) body.push(`**${forside.boligeierTittel}**`)
    if (forside.boligeierBeskrivelse) body.push(forside.boligeierBeskrivelse)
    if (forside.boligeierSjekkpunkter?.length) body.push(bullet(forside.boligeierSjekkpunkter))
    if (body.length) out += section('Forside', body.join('\n\n'))
  }

  // Tjenester
  const tjenesterBody = detailedServices
    .filter(Boolean)
    .map((s) => renderService(s as Service))
    .join('\n\n---\n\n')
  if (tjenesterBody) out += section('Tjenester', tjenesterBody)

  // Priser
  if (priser) {
    const parts: string[] = []
    if (priser.tittel) parts.push(`**${priser.tittel}**`)
    if (priser.beskrivelse) parts.push(priser.beskrivelse)
    if (priser.kort && priser.kort.length) {
      parts.push(
        priser.kort
          .map((k) => {
            const lines: string[] = []
            lines.push(`### ${k.tittel}`)
            if (k.beskrivelse) lines.push(k.beskrivelse)
            const pris = [k.prisLabel, k.pris].filter(Boolean).join(' ')
            if (pris) lines.push(`Pris: ${pris}`)
            if (k.inkludert?.length) {
              lines.push(`${k.inkludertLabel || 'Inkludert'}:\n${bullet(k.inkludert)}`)
            }
            return lines.join('\n\n')
          })
          .join('\n\n---\n\n'),
      )
    }
    if (priser.fotnoteTekst) parts.push(`_${priser.fotnoteTekst}_`)
    out += section('Priser', parts.join('\n\n'))
  }

  // Enova
  if (enova) {
    const parts: string[] = []
    if (enova.heroTittel) parts.push(`**${enova.heroTittel}**`)
    if (enova.heroUnderTittel) parts.push(enova.heroUnderTittel)
    if (enova.introTekst) parts.push(enova.introTekst)
    if (enova.stotteordninger && enova.stotteordninger.length) {
      parts.push(`**${enova.stotteTittel || 'Aktuell støtte'}**`)
      if (enova.stotteIntro) parts.push(enova.stotteIntro)
      parts.push(
        enova.stotteordninger
          .map((s) => {
            const lines: string[] = [`### ${s.tittel}`]
            if (s.beskrivelse) lines.push(s.beskrivelse)
            const belop = [s.belopLabel, s.belop, s.belopNote].filter(Boolean).join(' ')
            if (belop) lines.push(`Beløp: ${belop}`)
            if (s.kriterier?.length) lines.push(`Krav:\n${bullet(s.kriterier)}`)
            return lines.join('\n\n')
          })
          .join('\n\n'),
      )
    }
    if (enova.vilkar && enova.vilkar.length) {
      parts.push(`**${enova.vilkarTittel || 'Hvem kan søke'}**\n\n${bullet(enova.vilkar)}`)
    }
    if (enova.prosessSteg && enova.prosessSteg.length) {
      parts.push(`**${enova.prosessTittel || 'Søknadsprosess'}**`)
      parts.push(
        enova.prosessSteg.map((s, i) => `${i + 1}. ${s.tittel} — ${s.beskrivelse}`).join('\n'),
      )
    }
    if (enova.hjelpTekst || enova.hjelpPunkter?.length) {
      parts.push(`**${enova.hjelpTittel || 'Slik hjelper vi'}**`)
      if (enova.hjelpTekst) parts.push(enova.hjelpTekst)
      if (enova.hjelpPunkter?.length) parts.push(bullet(enova.hjelpPunkter))
    }
    if (enova.faq && enova.faq.length) {
      parts.push(`**Vanlige spørsmål om Enova-støtte**`)
      parts.push(enova.faq.map((q) => `**Q: ${q.sporsmal}**\nA: ${q.svar}`).join('\n\n'))
    }
    if (enova.disclaimer) parts.push(`_${enova.disclaimer}_`)
    out += section('Enova-støtte', parts.join('\n\n'))
  }

  // Borettslag
  if (borettslag) {
    const parts: string[] = []
    if (borettslag.heroTittel) parts.push(`**${borettslag.heroTittel}**`)
    if (borettslag.heroUnderTittel) parts.push(borettslag.heroUnderTittel)
    if (borettslag.utfordringer?.length) {
      parts.push(`**Typiske utfordringer**\n\n${bullet(borettslag.utfordringer)}`)
    }
    if (borettslag.tjenester?.length) {
      parts.push(`**Tjenester for borettslag**`)
      parts.push(
        borettslag.tjenester.map((t) => `- **${t.tittel}** — ${t.beskrivelse}`).join('\n'),
      )
    }
    if (borettslag.prosessSteg?.length) {
      parts.push(`**Slik samarbeider vi**`)
      parts.push(
        borettslag.prosessSteg.map((s, i) => `${i + 1}. ${s.tittel} — ${s.beskrivelse}`).join('\n'),
      )
    }
    if (borettslag.hvordforOss?.length) {
      parts.push(`**Derfor velger borettslag oss**\n\n${bullet(borettslag.hvordforOss)}`)
    }
    if (borettslag.faq?.length) {
      parts.push(`**Vanlige spørsmål fra styret**`)
      parts.push(borettslag.faq.map((q) => `**Q: ${q.sporsmal}**\nA: ${q.svar}`).join('\n\n'))
    }
    out += section('For borettslag og sameier', parts.join('\n\n'))
  }

  // Om oss
  if (omOss) {
    const parts: string[] = []
    if (omOss.heroTittel) parts.push(`**${omOss.heroTittel}**`)
    if (omOss.heroTekst) parts.push(omOss.heroTekst)
    const historie = ptToPlain(omOss.historieBlokker)
    if (historie) parts.push(historie)
    if (omOss.verdier?.length) {
      parts.push(`**${omOss.verdierTittel || 'Verdier'}**`)
      parts.push(omOss.verdier.map((v) => `- **${v.tittel}** — ${v.beskrivelse}`).join('\n'))
    }
    if (omOss.tallOgFakta?.length) {
      parts.push(`**Tall og fakta**`)
      parts.push(omOss.tallOgFakta.map((t) => `- ${t.verdi} ${t.label}`).join('\n'))
    }
    if (omOss.sertifiseringer?.length) {
      parts.push(`**${omOss.sertifiseringerTittel || 'Sertifiseringer'}**`)
      parts.push(
        omOss.sertifiseringer
          .map((s) => `- ${s.navn}${s.beskrivelse ? ` — ${s.beskrivelse}` : ''}`)
          .join('\n'),
      )
    }
    out += section('Om oss', parts.join('\n\n'))
  }

  // Artikler (excerpts)
  if (articles && articles.length) {
    const body = articles
      .map((a) => {
        const lines: string[] = []
        lines.push(`### ${a.title}`)
        lines.push(`URL: ${SITE_URL}/blog/${a.slug.current}`)
        if (a.publishedAt) lines.push(`Publisert: ${a.publishedAt.slice(0, 10)}`)
        if (a.excerpt) lines.push(a.excerpt)
        return lines.join('\n')
      })
      .join('\n\n---\n\n')
    out += section('Artikler', body)
  }

  // Kontakt
  out += section(
    'Kontakt',
    [
      `Telefon: ${phone}`,
      `E-post: ${email}`,
      `Adresse: ${address}`,
      `URL: ${SITE_URL}/kontakt`,
      forside?.kontaktApningstider ? `Åpningstider: ${forside.kontaktApningstider}` : '',
    ]
      .filter(Boolean)
      .join('\n'),
  )

  out += '\n'

  return new Response(out, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
