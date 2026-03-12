import { defineField, defineType } from 'sanity'

export const forside = defineType({
  name: 'forside',
  title: 'Forside',
  type: 'document',
  fields: [
    // ─── SEO / Metadata ───
    defineField({
      name: 'seoTittel',
      title: 'SEO-tittel',
      type: 'string',
      description: 'Tittelen som vises i Google og nettleserfanen',
      initialValue: 'Straume Boligvent — Ventilasjon for bolig og næring',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO-beskrivelse',
      type: 'text',
      rows: 2,
      description: 'Meta description for forsiden (vises i Google-søk)',
      initialValue: 'Komplett leveranse innen ventilasjon i Bergen og omegn. Service, kanalrens, innregulering og montasje.',
    }),

    // ─── Hero ───
    defineField({
      name: 'heroBilde',
      title: 'Hero-bilde',
      type: 'image',
      options: { hotspot: true },
      description: 'Hovedbildet i hero-seksjonen',
    }),
    defineField({
      name: 'heroStats',
      title: 'Hero-statistikk (bilde-overlay)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'verdi', title: 'Verdi', type: 'string', description: 'F.eks. "12+"' }),
            defineField({ name: 'label', title: 'Etikett', type: 'string', description: 'F.eks. "År i bransjen"' }),
          ],
          preview: { select: { title: 'verdi', subtitle: 'label' } },
        },
      ],
    }),
    defineField({
      name: 'trustItems',
      title: 'Tillitspunkter (under hero)',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: [
        'Tydelig pris før oppstart',
        'Langsiktig oppfølging',
        'Kun nødvendige tiltak',
        'Svar innen 24 timer',
      ],
    }),
    defineField({
      name: 'partnerLabel',
      title: 'Partner-label',
      type: 'string',
      initialValue: 'Samarbeidspartnere',
    }),
    defineField({
      name: 'partnere',
      title: 'Samarbeidspartnere',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: ['Swegon', 'Flexit', 'Ventistål', 'Systemair'],
    }),
    defineField({
      name: 'googleRating',
      title: 'Google-vurdering',
      type: 'string',
      initialValue: '4,9/5',
    }),
    defineField({
      name: 'heroCta1Tekst',
      title: 'Hero CTA knapp 1 tekst',
      type: 'string',
      initialValue: 'Ta kontakt',
    }),
    defineField({
      name: 'heroCta2Tekst',
      title: 'Hero CTA knapp 2 tekst',
      type: 'string',
      initialValue: 'Se tjenester',
    }),

    // ─── Tjenester-seksjon ───
    defineField({
      name: 'tjenesterLabel',
      title: 'Tjenester seksjon-label',
      type: 'string',
      initialValue: 'Hva vi gjør',
    }),
    defineField({
      name: 'tjenesterTittel',
      title: 'Tjenester seksjon-tittel',
      type: 'string',
      initialValue: 'Tjenester for bolig og borettslag',
    }),
    defineField({
      name: 'tjenesterBeskrivelse',
      title: 'Tjenester seksjon-beskrivelse',
      type: 'string',
      initialValue: 'Fra enkelt filterbytte til full montasje og utskifting av anlegg.',
    }),
    defineField({
      name: 'tjenesterCtaTekst',
      title: 'Tjenester CTA tekst',
      type: 'string',
      initialValue: 'Kontakt oss for tilbud',
    }),

    // ─── Prosess-seksjon ───
    defineField({
      name: 'prosessLabel',
      title: 'Prosess seksjon-label',
      type: 'string',
      initialValue: 'Arbeidsmetode',
    }),
    defineField({
      name: 'prosessTittel',
      title: 'Prosess seksjon-tittel',
      type: 'string',
      initialValue: 'Slik jobber vi',
    }),
    defineField({
      name: 'prosessBeskrivelse',
      title: 'Prosess seksjon-beskrivelse',
      type: 'string',
      initialValue: 'Alle oppdrag gjennomføres etter en fast arbeidsmetode – fra kartlegging til oppfølging.',
    }),
    defineField({
      name: 'prosessSteg',
      title: 'Prosess-steg',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'nummer', title: 'Nummer', type: 'string', description: 'F.eks. "01"' }),
            defineField({ name: 'tittel', title: 'Tittel', type: 'string' }),
            defineField({ name: 'beskrivelse', title: 'Beskrivelse', type: 'text', rows: 2 }),
          ],
          preview: { select: { title: 'tittel', subtitle: 'nummer' } },
        },
      ],
    }),
    defineField({
      name: 'prosessCtaTekst',
      title: 'Prosess CTA tekst',
      type: 'string',
      initialValue: 'Ta kontakt',
    }),

    // ─── Anmeldelser-seksjon ───
    defineField({
      name: 'anmeldelserLabel',
      title: 'Anmeldelser seksjon-label',
      type: 'string',
      initialValue: 'Erfaringer',
    }),
    defineField({
      name: 'anmeldelserTittel',
      title: 'Anmeldelser seksjon-tittel',
      type: 'string',
      initialValue: 'Hva kundene i Bergen sier',
    }),

    // ─── Boligeiere-seksjon ───
    defineField({
      name: 'boligeierLabel',
      title: 'Boligeiere seksjon-label',
      type: 'string',
      initialValue: 'Boligeiere',
    }),
    defineField({
      name: 'boligeierTittel',
      title: 'Boligeiere seksjon-tittel',
      type: 'string',
      initialValue: 'For deg som eier bolig',
    }),
    defineField({
      name: 'boligeierBeskrivelse',
      title: 'Boligeiere seksjon-beskrivelse',
      type: 'string',
      initialValue: 'Ventilasjonsanlegget går hver dag. Regelmessig service gir:',
    }),
    defineField({
      name: 'boligeierSjekkpunkter',
      title: 'Boligeiere sjekkpunkter',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: ['Bedre inneklima', 'Stabil temperatur', 'Lavere energibruk', 'Lengre levetid på anlegget'],
    }),
    defineField({
      name: 'boligeierNotat',
      title: 'Boligeiere notat-tekst',
      type: 'string',
      initialValue: 'Vi tilpasser tiltaket etter boligens behov – ikke mer enn nødvendig.',
    }),
    defineField({
      name: 'boligeierBilde',
      title: 'Boligeiere-bilde',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'boligeierBadge',
      title: 'Boligeiere bilde-badge',
      type: 'string',
      initialValue: 'For boligeiere',
    }),

    // ─── Om oss-seksjon (forside) ───
    defineField({
      name: 'omOssLabel',
      title: 'Om oss seksjon-label',
      type: 'string',
      initialValue: 'Om oss',
    }),
    defineField({
      name: 'omOssTittel',
      title: 'Om oss seksjon-tittel',
      type: 'string',
      initialValue: 'Lokal fagkunnskap. Langsiktige relasjoner.',
    }),
    defineField({
      name: 'omOssAvsnitt1',
      title: 'Om oss avsnitt 1',
      type: 'string',
      initialValue: 'Spesialisert ventilasjon siden 2012 – del av Straume Tekniske AS.',
    }),
    defineField({
      name: 'omOssAvsnitt2',
      title: 'Om oss avsnitt 2',
      type: 'string',
      initialValue: 'Én kontaktperson, fullt ansvar, bredt fagmiljø i ryggen.',
    }),
    defineField({
      name: 'omOssSjekkpunkter',
      title: 'Om oss sjekkpunkter',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: [
        'Sertifiserte teknikere med dokumentert kompetanse',
        'Erfaring med Flexit, Systemair og Ventiståhl',
        'Komplett leveranse – service til montasje',
        'Tilpasset oppfølging for borettslag og sameier',
        'Langsiktig oppfølging – ikke engangsoppdrag',
      ],
    }),
    defineField({
      name: 'omOssBilde',
      title: 'Om oss-bilde',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'omOssBadgeTittel',
      title: 'Om oss bilde-badge tittel',
      type: 'string',
      initialValue: 'Boligvent',
    }),
    defineField({
      name: 'omOssBadgeTekst',
      title: 'Om oss bilde-badge undertekst',
      type: 'string',
      initialValue: 'Del av Straume Tekniske AS',
    }),
    defineField({
      name: 'omOssCtaTekst',
      title: 'Om oss CTA tekst',
      type: 'string',
      initialValue: 'Ta kontakt',
    }),

    // ─── Galleri-seksjon ───
    defineField({
      name: 'galleriLabel',
      title: 'Galleri seksjon-label',
      type: 'string',
      initialValue: 'Galleri',
    }),
    defineField({
      name: 'galleriTittel',
      title: 'Galleri seksjon-tittel',
      type: 'string',
      initialValue: 'Bilder fra oppdrag i Bergen og omegn',
    }),
    defineField({
      name: 'galleriBeskrivelse',
      title: 'Galleri seksjon-beskrivelse',
      type: 'string',
      initialValue: 'Et utvalg bilder fra arbeid vi har utført for boligeiere og borettslag i Bergen og omegn.',
    }),
    defineField({
      name: 'galleriCtaTekst',
      title: 'Galleri CTA tekst',
      type: 'string',
      initialValue: 'Se hele galleriet →',
    }),

    // ─── Kontakt-seksjon ───
    defineField({
      name: 'kontaktLabel',
      title: 'Kontakt seksjon-label',
      type: 'string',
      initialValue: 'Kom i gang',
    }),
    defineField({
      name: 'kontaktTittel',
      title: 'Kontakt seksjon-tittel',
      type: 'text',
      rows: 2,
      initialValue: 'Ta kontakt – vi svarer innen én virkedag',
    }),
    defineField({
      name: 'kontaktBeskrivelse',
      title: 'Kontakt seksjon-beskrivelse',
      type: 'text',
      rows: 2,
      initialValue: 'Fyll ut skjemaet, eller ring oss direkte. Vi stiller gjerne spørsmål om anlegget ditt for å gi deg riktig tilbud.',
    }),
    defineField({
      name: 'kontaktApningstider',
      title: 'Åpningstider',
      type: 'string',
      initialValue: 'Man–Fre 08:00–16:00 · Lør 09:00–15:00',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Forside' }
    },
  },
})
