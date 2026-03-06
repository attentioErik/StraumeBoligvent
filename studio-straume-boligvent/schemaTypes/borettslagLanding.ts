import { defineField, defineType } from 'sanity'

export const borettslagLanding = defineType({
  name: 'borettslagLanding',
  title: 'Borettslag-landingsside',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTittel',
      title: 'Hero-tittel',
      type: 'string',
      initialValue: 'Er du styreleder i borettslag eller sameie?',
    }),
    defineField({
      name: 'heroUnderTittel',
      title: 'Hero-undertittel',
      type: 'text',
      rows: 2,
      initialValue: 'Vi hjelper styrer med profesjonell vedlikehold av ventilasjonsanlegg',
    }),
    defineField({
      name: 'utfordringer',
      title: 'Typiske utfordringer',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Liste over problemer styreledere møter',
    }),
    defineField({
      name: 'tjenester',
      title: 'Tjenester for borettslag',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'tittel', title: 'Tittel', type: 'string' }),
            defineField({ name: 'beskrivelse', title: 'Beskrivelse', type: 'text', rows: 2 }),
          ],
          preview: { select: { title: 'tittel' } },
        },
      ],
    }),
    defineField({
      name: 'prosessSteg',
      title: 'Prosess-steg',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'tittel', title: 'Tittel', type: 'string' }),
            defineField({ name: 'beskrivelse', title: 'Beskrivelse', type: 'text', rows: 2 }),
          ],
          preview: { select: { title: 'tittel' } },
        },
      ],
    }),
    defineField({
      name: 'hvordforOss',
      title: 'Hvorfor velge oss',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'faq',
      title: 'FAQ for styreledere',
      type: 'array',
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
  ],
  preview: {
    select: { title: 'heroTittel' },
  },
})
