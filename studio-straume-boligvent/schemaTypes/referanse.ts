import { defineField, defineType } from 'sanity'

export const referanse = defineType({
  name: 'referanse',
  title: 'Referanse',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Prosjektnavn',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publisert',
      title: 'Publisert',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'kunde',
      title: 'Kundenavn',
      type: 'string',
    }),
    defineField({
      name: 'kategori',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Enebolig', value: 'Enebolig' },
          { title: 'Borettslag', value: 'Borettslag' },
          { title: 'Sameie', value: 'Sameie' },
          { title: 'Næring', value: 'Næring' },
          { title: 'Leilighet', value: 'Leilighet' },
        ],
      },
    }),
    defineField({
      name: 'kortBeskrivelse',
      title: 'Kort beskrivelse (maks 200 tegn)',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'beskrivelse',
      title: 'Full beskrivelse',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Em', value: 'em' },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'hovedbilde',
      title: 'Hovedbilde',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt-tekst',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'galleri',
      title: 'Bildegalleri',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt-tekst', type: 'string' }),
            defineField({ name: 'caption', title: 'Bildetekst', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'utfortAr',
      title: 'År utført',
      type: 'number',
    }),
    defineField({
      name: 'tjenester',
      title: 'Tjenester utført',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'kundesitat',
      title: 'Kundeuttalelse',
      type: 'object',
      fields: [
        defineField({ name: 'sitat', title: 'Sitat', type: 'text', rows: 3 }),
        defineField({ name: 'person', title: 'Navn/rolle', type: 'string' }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Nyeste først',
      name: 'utfortArDesc',
      by: [{ field: 'utfortAr', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'kunde',
      media: 'hovedbilde',
    },
  },
})
