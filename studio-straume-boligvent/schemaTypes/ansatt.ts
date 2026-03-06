import { defineField, defineType } from 'sanity'

export const ansatt = defineType({
  name: 'ansatt',
  title: 'Ansatt',
  type: 'document',
  fields: [
    defineField({
      name: 'navn',
      title: 'Navn',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rolle',
      title: 'Rolle/stilling',
      type: 'string',
    }),
    defineField({
      name: 'bilde',
      title: 'Bilde',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'epost',
      title: 'E-post',
      type: 'string',
    }),
    defineField({
      name: 'telefon',
      title: 'Telefon',
      type: 'string',
    }),
    defineField({
      name: 'rekkefolge',
      title: 'Rekkefølge',
      type: 'number',
      description: 'Lavere tall vises først',
    }),
  ],
  orderings: [
    {
      title: 'Rekkefølge',
      name: 'rekkefolgeAsc',
      by: [{ field: 'rekkefolge', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'navn', subtitle: 'rolle', media: 'bilde' },
  },
})
