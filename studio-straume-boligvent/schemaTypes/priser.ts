import { defineField, defineType } from 'sanity'

export const priser = defineType({
  name: 'priser',
  title: 'Priser',
  type: 'document',
  fields: [
    // ─── SEO / Metadata ───
    defineField({
      name: 'seoTittel',
      title: 'SEO-tittel',
      type: 'string',
      description: 'Tittelen som vises i Google og nettleserfanen for /priser-siden',
      initialValue: 'Priser – Straume Boligvent',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO-beskrivelse',
      type: 'text',
      rows: 2,
      description: 'Meta description for prissiden (vises i Google-søk)',
      initialValue: 'Se priser for ventilasjonsservice, kanalrens og nytt ventilasjonsaggregat. Vi hjelper deg med ventilasjon tilpasset boligen din.',
    }),

    // ─── Seksjon-innhold ───
    defineField({
      name: 'tittel',
      title: 'Seksjons-tittel',
      type: 'string',
      initialValue: 'Tjenester for ventilasjon i bolig',
    }),
    defineField({
      name: 'beskrivelse',
      title: 'Seksjons-beskrivelse',
      type: 'text',
      rows: 2,
      initialValue: 'Vi hjelper deg med service, kanalrens og utskifting av ventilasjonsaggregat – tilpasset anlegget og behovet i boligen din.',
    }),

    // ─── Priskort ───
    defineField({
      name: 'kort',
      title: 'Priskort',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'tittel', title: 'Tittel', type: 'string' }),
            defineField({
              name: 'beskrivelse',
              title: 'Beskrivelse',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'prisLabel',
              title: 'Pris-label',
              type: 'string',
              description: 'F.eks. "Fra" (tomt = ingen label)',
            }),
            defineField({
              name: 'pris',
              title: 'Pris',
              type: 'string',
              description: 'F.eks. "2 600,–" eller "Pris etter befaring"',
            }),
            defineField({
              name: 'featured',
              title: 'Fremhevet kort',
              type: 'boolean',
              initialValue: false,
              description: 'Vis "Mest valgt"-badge og fremhevet ramme',
            }),
            defineField({
              name: 'badge',
              title: 'Badge-tekst',
              type: 'string',
              description: 'Tekst på badge (kun synlig hvis fremhevet er aktiv)',
              initialValue: 'Mest valgt',
            }),
            defineField({
              name: 'inkludertLabel',
              title: 'Inkludert-label',
              type: 'string',
              initialValue: 'Inkludert:',
            }),
            defineField({
              name: 'inkludert',
              title: 'Inkluderte punkter',
              type: 'array',
              of: [{ type: 'string' }],
            }),
            defineField({
              name: 'cta1Tekst',
              title: 'Knapp 1 tekst',
              type: 'string',
              initialValue: 'Be om vurdering',
            }),
            defineField({
              name: 'cta1Lenke',
              title: 'Knapp 1 lenke',
              type: 'string',
              initialValue: '/kontakt',
            }),
            defineField({
              name: 'cta2Tekst',
              title: 'Knapp 2 tekst',
              type: 'string',
              initialValue: 'Les mer',
            }),
            defineField({
              name: 'cta2Lenke',
              title: 'Knapp 2 lenke',
              type: 'string',
              description: 'F.eks. /tjenester/ventilasjonsservice',
            }),
          ],
          preview: {
            select: { title: 'tittel', subtitle: 'pris' },
          },
        },
      ],
    }),

    // ─── Fotnote ───
    defineField({
      name: 'fotnoteTekst',
      title: 'Fotnote-tekst',
      type: 'string',
      initialValue: 'Usikker på hva ventilasjonen trenger? Vi hjelper deg å vurdere anlegget.',
    }),
    defineField({
      name: 'fotnoteCtaTekst',
      title: 'Fotnote CTA tekst',
      type: 'string',
      initialValue: 'Ta kontakt',
    }),
    defineField({
      name: 'fotnoteCtaLenke',
      title: 'Fotnote CTA lenke',
      type: 'string',
      initialValue: '/kontakt',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Priser' }
    },
  },
})
