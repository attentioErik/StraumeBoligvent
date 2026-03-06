import { defineField, defineType } from 'sanity'

export const referenceProject = defineType({
  name: 'referenceProject',
  title: 'Referanseprosjekt',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
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
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Enebolig', value: 'Enebolig' },
          { title: 'Borettslag', value: 'Borettslag' },
          { title: 'Kanalrens', value: 'Kanalrens' },
          { title: 'Næring', value: 'Næring' },
          { title: 'Sameie', value: 'Sameie' },
        ],
      },
    }),
    defineField({
      name: 'serviceType',
      title: 'Type arbeid',
      type: 'string',
      description: 'F.eks "Utskifting av aggregat"',
    }),
    defineField({
      name: 'description',
      title: 'Kort beskrivelse',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'detail',
      title: 'Detaljer',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'image',
      title: 'Prosjektbilde',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'service',
      title: 'Relatert tjeneste',
      type: 'reference',
      to: [{ type: 'service' }],
    }),
    defineField({
      name: 'results',
      title: 'Resultater',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'testimonial',
      title: 'Kundeuttalelse',
      type: 'object',
      fields: [
        defineField({ name: 'quote', title: 'Sitat', type: 'text', rows: 3 }),
        defineField({ name: 'author', title: 'Navn', type: 'string' }),
        defineField({ name: 'role', title: 'Rolle/tittel', type: 'string' }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Rekkefølge',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
  },
})
