import { defineField, defineType } from 'sanity'

export const omOss = defineType({
  name: 'omOss',
  title: 'Om oss',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTittel',
      title: 'Hero-tittel',
      type: 'string',
      initialValue: 'Om Straume Boligvent',
    }),
    defineField({
      name: 'heroTekst',
      title: 'Hero-tekst',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'historieBlokker',
      title: 'Vår historie',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'verdier',
      title: 'Verdier',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'tittel', title: 'Tittel', type: 'string' }),
            defineField({ name: 'beskrivelse', title: 'Beskrivelse', type: 'text', rows: 2 }),
            defineField({
              name: 'ikon',
              title: 'Ikon (emoji eller kode)',
              type: 'string',
              description: 'F.eks. ✓ eller ★',
            }),
          ],
          preview: { select: { title: 'tittel', subtitle: 'beskrivelse' } },
        },
      ],
    }),
    defineField({
      name: 'tallOgFakta',
      title: 'Tall og fakta',
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
      name: 'sertifiseringer',
      title: 'Sertifiseringer og godkjenninger',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'navn', title: 'Navn', type: 'string' }),
            defineField({ name: 'beskrivelse', title: 'Beskrivelse', type: 'text', rows: 2 }),
            defineField({ name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true } }),
          ],
          preview: { select: { title: 'navn', media: 'logo' } },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'heroTittel' },
  },
})
