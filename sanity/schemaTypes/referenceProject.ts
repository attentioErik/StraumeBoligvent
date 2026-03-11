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
      name: 'galleri',
      title: 'Galleri',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt-tekst',
              type: 'string',
              description: 'Beskrivelse av bildet for tilgjengelighet og SEO',
            }),
          ],
        },
      ],
      description: 'Last opp bilder med beskrivende alt-tekst',
    }),
    defineField({
      name: 'service',
      title: 'Relatert tjeneste',
      type: 'reference',
      to: [{ type: 'service' }],
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
      media: 'galleri.0',
    },
  },
})
