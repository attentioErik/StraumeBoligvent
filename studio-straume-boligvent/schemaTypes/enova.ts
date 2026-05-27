import { defineField, defineType } from 'sanity'

export const enova = defineType({
  name: 'enova',
  title: 'Enova-støtte',
  type: 'document',
  groups: [
    { name: 'seo', title: 'SEO' },
    { name: 'hero', title: 'Hero' },
    { name: 'innhold', title: 'Innhold' },
    { name: 'teaser', title: 'Teaser (forside/priser)' },
  ],
  fields: [
    // ─── SEO / Metadata ───
    defineField({
      name: 'seoTittel',
      title: 'SEO-tittel',
      type: 'string',
      group: 'seo',
      description: 'Tittelen som vises i Google og nettleserfanen for /enova-siden',
      initialValue: 'Enova-støtte til balansert ventilasjon – Straume Boligvent',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO-beskrivelse',
      type: 'text',
      rows: 2,
      group: 'seo',
      initialValue:
        'Du kan få Enova-støtte når du installerer balansert ventilasjon med varmegjenvinning i boligen. Vi hjelper deg med et anlegg som kvalifiserer for støtte.',
    }),

    // ─── HERO ───
    defineField({
      name: 'heroTittel',
      title: 'Hero-tittel',
      type: 'string',
      group: 'hero',
      initialValue: 'Enova-støtte til balansert ventilasjon',
    }),
    defineField({
      name: 'heroUnderTittel',
      title: 'Hero-undertittel',
      type: 'text',
      rows: 3,
      group: 'hero',
      initialValue:
        'Installerer du balansert ventilasjon med varmegjenvinning, kan du søke om økonomisk støtte fra Enova. Vi leverer anlegg som oppfyller kravene – og hjelper deg med dokumentasjonen du trenger til søknaden.',
    }),

    // ─── INTRO ───
    defineField({
      name: 'introTittel',
      title: 'Intro-tittel',
      type: 'string',
      group: 'innhold',
      initialValue: 'Hva er Enova-støtte?',
    }),
    defineField({
      name: 'introTekst',
      title: 'Intro-tekst',
      type: 'text',
      rows: 5,
      group: 'innhold',
      description: 'Kort, nøytral forklaring. Husk: bruk tekstreferansen «Enova.no», ikke Enova-logoen.',
      initialValue:
        'Enova er et statlig foretak som gir økonomisk støtte til energitiltak i norske boliger. Balansert ventilasjon med høy varmegjenvinning er ett av tiltakene som kan kvalifisere for støtte. Du søker selv via Enova.no etter at tiltaket er gjennomført – vi sørger for at anlegget og dokumentasjonen holder mål.',
    }),

    // ─── STØTTEORDNINGER ───
    defineField({
      name: 'stotteTittel',
      title: 'Tittel – støtteordninger',
      type: 'string',
      group: 'innhold',
      initialValue: 'Aktuell støtte for ventilasjon',
    }),
    defineField({
      name: 'stotteIntro',
      title: 'Intro – støtteordninger',
      type: 'text',
      rows: 2,
      group: 'innhold',
      initialValue:
        'Beløp og vilkår fastsettes av Enova og kan endres løpende. Tallene under er veiledende – sjekk alltid gjeldende satser på Enova.no.',
    }),
    defineField({
      name: 'stotteordninger',
      title: 'Støtteordninger',
      type: 'array',
      group: 'innhold',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'tittel', title: 'Tittel', type: 'string' }),
            defineField({ name: 'beskrivelse', title: 'Beskrivelse', type: 'text', rows: 3 }),
            defineField({
              name: 'belopLabel',
              title: 'Beløp-label',
              type: 'string',
              description: 'F.eks. «Inntil» (tomt = ingen label)',
              initialValue: 'Inntil',
            }),
            defineField({
              name: 'belop',
              title: 'Beløp',
              type: 'string',
              description: 'F.eks. «15 000 kr» eller «25 % av kostnaden»',
            }),
            defineField({
              name: 'kriterier',
              title: 'Krav / kriterier',
              type: 'array',
              of: [{ type: 'string' }],
            }),
          ],
          preview: { select: { title: 'tittel', subtitle: 'belop' } },
        },
      ],
    }),

    // ─── VILKÅR / HVEM KAN SØKE ───
    defineField({
      name: 'vilkarTittel',
      title: 'Tittel – hvem kan søke',
      type: 'string',
      group: 'innhold',
      initialValue: 'Hvem kan søke?',
    }),
    defineField({
      name: 'vilkar',
      title: 'Vilkår / hvem kan søke',
      type: 'array',
      group: 'innhold',
      of: [{ type: 'string' }],
    }),

    // ─── SØKNADSPROSESS ───
    defineField({
      name: 'prosessTittel',
      title: 'Tittel – søknadsprosess',
      type: 'string',
      group: 'innhold',
      initialValue: 'Slik søker du om Enova-støtte',
    }),
    defineField({
      name: 'prosessSteg',
      title: 'Søknadssteg',
      type: 'array',
      group: 'innhold',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'tittel', title: 'Tittel', type: 'string' }),
            defineField({ name: 'beskrivelse', title: 'Beskrivelse', type: 'text', rows: 3 }),
          ],
          preview: { select: { title: 'tittel' } },
        },
      ],
    }),

    // ─── SLIK HJELPER VI ───
    defineField({
      name: 'hjelpTittel',
      title: 'Tittel – slik hjelper vi',
      type: 'string',
      group: 'innhold',
      initialValue: 'Slik hjelper vi deg',
    }),
    defineField({
      name: 'hjelpTekst',
      title: 'Tekst – slik hjelper vi',
      type: 'text',
      rows: 3,
      group: 'innhold',
      initialValue:
        'Vi er ikke en del av Enova, men vi kjenner kravene godt. Vi anbefaler og monterer et anlegg som kvalifiserer for støtte, og leverer idriftsettelsesrapport og dokumentasjon du trenger når du søker.',
    }),
    defineField({
      name: 'hjelpPunkter',
      title: 'Punkter – slik hjelper vi',
      type: 'array',
      group: 'innhold',
      of: [{ type: 'string' }],
    }),

    // ─── FAQ ───
    defineField({
      name: 'faq',
      title: 'Vanlige spørsmål',
      type: 'array',
      group: 'innhold',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'sporsmal', title: 'Spørsmål', type: 'string' }),
            defineField({ name: 'svar', title: 'Svar', type: 'text', rows: 3 }),
          ],
          preview: { select: { title: 'sporsmal' } },
        },
      ],
    }),

    // ─── DISCLAIMER / ENOVA-REFERANSE ───
    defineField({
      name: 'disclaimer',
      title: 'Forbehold / Enova-referanse',
      type: 'text',
      rows: 3,
      group: 'innhold',
      description:
        'Vises som tydelig notat. Bør presisere at Straume Boligvent ikke er tilknyttet Enova, og at satser/vilkår kan endres.',
      initialValue:
        'Straume Boligvent er ikke tilknyttet eller representant for Enova. Støttebeløp, vilkår og frister fastsettes av Enova og kan endres løpende. Se Enova.no for til enhver tid gjeldende ordninger og satser.',
    }),
    defineField({
      name: 'enovaLenke',
      title: 'Lenke til Enova',
      type: 'url',
      group: 'innhold',
      initialValue: 'https://www.enova.no/privat/',
    }),
    defineField({
      name: 'enovaLenkeTekst',
      title: 'Lenketekst for Enova',
      type: 'string',
      group: 'innhold',
      description: 'Tekstreferanse til Enova (ikke logo).',
      initialValue: 'Enova.no',
    }),

    // ─── TEASER (forside/priser) ───
    defineField({
      name: 'teaserLabel',
      title: 'Teaser-label',
      type: 'string',
      group: 'teaser',
      initialValue: 'Enova-støtte',
    }),
    defineField({
      name: 'teaserTittel',
      title: 'Teaser-tittel',
      type: 'string',
      group: 'teaser',
      initialValue: 'Få støtte til nytt ventilasjonsanlegg',
    }),
    defineField({
      name: 'teaserTekst',
      title: 'Teaser-tekst',
      type: 'text',
      rows: 3,
      group: 'teaser',
      initialValue:
        'Velger du balansert ventilasjon med varmegjenvinning, kan du søke Enova om økonomisk støtte. Vi leverer anlegg som kvalifiserer – og hjelper deg med dokumentasjonen.',
    }),
    defineField({
      name: 'teaserCtaTekst',
      title: 'Teaser CTA-tekst',
      type: 'string',
      group: 'teaser',
      initialValue: 'Les om Enova-støtte',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Enova-støtte' }
    },
  },
})
