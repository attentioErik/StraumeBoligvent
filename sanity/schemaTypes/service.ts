import { defineField, defineType } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Tjeneste',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroTitle',
      title: 'Sidetittel (H1)',
      type: 'string',
      description: 'Overskrift på tjenestesiden. Bruker "Tittel" om feltet er tomt.',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'number',
      title: 'Nummer (01, 02, ...)',
      type: 'string',
      description: 'Vises som dekorativt nummer på kortet',
    }),
    defineField({
      name: 'description',
      title: 'Kort beskrivelse',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Bilde',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'highlighted',
      title: 'Fremhevet kort?',
      type: 'boolean',
      description: 'Gir kortet en gulaktig bakgrunn',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Rekkefølge',
      type: 'number',
      description: 'Lavere tall vises først',
    }),

    // ─── OM TJENESTEN (intro) ───
    defineField({
      name: 'introText',
      title: 'Om tjenesten',
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
      description: 'Sentrert introduksjonstekst om tjenesten',
    }),

    // ─── HVORFOR DET ER VIKTIG ───
    defineField({
      name: 'whyTitle',
      title: 'Hvorfor-tittel',
      type: 'string',
      description: 'F.eks. "Konsekvenser av manglende filterbytte"',
    }),
    defineField({
      name: 'whyText',
      title: 'Hvorfor-tekst',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
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
      name: 'whySymptoms',
      title: 'Symptomer/konsekvenser',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Punktliste med konsekvenser (f.eks. "Redusert luftgjennomstrømning")',
    }),

    // ─── NÅR ER DET AKTUELT ───
    defineField({
      name: 'whenTitle',
      title: 'Når-tittel',
      type: 'string',
      description: 'F.eks. "Når er serviceavtale aktuelt?"',
    }),
    defineField({
      name: 'whenNote',
      title: 'Når-notat',
      type: 'string',
      description: 'Kort kursiv notat under tittelen',
    }),
    defineField({
      name: 'whenItems',
      title: 'Når-punkter',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Sjekkliste over hvem/når det passer',
    }),

    // ─── HVA SOM ER INKLUDERT ───
    defineField({
      name: 'includedTitle',
      title: 'Inkludert-tittel',
      type: 'string',
      description: 'F.eks. "Hva serviceavtalen omfatter"',
    }),
    defineField({
      name: 'includedSubtitle',
      title: 'Inkludert-undertekst',
      type: 'string',
    }),
    defineField({
      name: 'includedSteps',
      title: 'Inkluderte steg',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Steg-tittel', type: 'string' }),
            defineField({ name: 'description', title: 'Steg-beskrivelse', type: 'text', rows: 3 }),
          ],
          preview: { select: { title: 'title' } },
        },
      ],
      description: 'Steg som vises i 2x2 kort-grid',
    }),

    // ─── FORDELER ───
    defineField({
      name: 'benefitsTitle',
      title: 'Fordeler-tittel',
      type: 'string',
    }),
    defineField({
      name: 'benefitsText',
      title: 'Fordeler-introduksjon',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'benefitsList',
      title: 'Fordeler-liste',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Liste med fordeler som vises med ikon',
    }),

    // ─── PRAKTISK INFO ───
    defineField({
      name: 'practicalBlocks',
      title: 'Praktisk informasjon',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Tittel', type: 'string' }),
            defineField({
              name: 'content',
              title: 'Innhold',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [{ title: 'Normal', value: 'normal' }],
                  marks: {
                    decorators: [
                      { title: 'Strong', value: 'strong' },
                      { title: 'Em', value: 'em' },
                    ],
                  },
                },
              ],
            }),
          ],
          preview: { select: { title: 'title' } },
        },
      ],
      description: 'Fleksible innholdsblokker for praktisk informasjon',
    }),

    // ─── RELATERTE TJENESTER ───
    defineField({
      name: 'relatedServices',
      title: 'Relaterte tjenester',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
      description: 'Lenker til andre relevante tjenester',
    }),

    // ─── LEGACY FIELDS (backward compat) ───
    defineField({
      name: 'fullDescription',
      title: 'Full beskrivelse (legacy)',
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
      hidden: true,
    }),
    defineField({
      name: 'benefits',
      title: 'Fordeler (legacy)',
      type: 'array',
      of: [{ type: 'string' }],
      hidden: true,
    }),
    defineField({
      name: 'process',
      title: 'Prosess/steg (legacy)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Steg-tittel', type: 'string' }),
            defineField({ name: 'description', title: 'Steg-beskrivelse', type: 'text', rows: 2 }),
          ],
          preview: { select: { title: 'title' } },
        },
      ],
      hidden: true,
    }),
  ],
  orderings: [
    {
      title: 'Rekkefølge',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'description', media: 'image' },
  },
})
