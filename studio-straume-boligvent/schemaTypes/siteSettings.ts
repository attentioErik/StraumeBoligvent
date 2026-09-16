import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Nettstedsinnstillinger',
  type: 'document',
  fields: [
    defineField({
      name: 'companyName',
      title: 'Firmanavn',
      type: 'string',
      initialValue: 'Straume Boligvent',
    }),
    defineField({
      name: 'phone',
      title: 'Telefon',
      type: 'string',
      initialValue: '561 26 800',
    }),
    defineField({
      name: 'email',
      title: 'E-post',
      type: 'string',
      initialValue: 'service@straumetekniske.no',
    }),
    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'string',
      initialValue: 'Idrettsveien 93, 5353 Straume',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Heltittel',
      type: 'string',
      initialValue: 'Komplett leveranse innen ventilasjon',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Heltekst',
      type: 'text',
      rows: 3,
      initialValue:
        'Vi leverer service, rens, innregulering og montasje – og tar ansvar fra start til slutt. Én leverandør, fullt ansvar.',
    }),
    defineField({
      name: 'heroPill',
      title: 'Hero pill-tekst',
      type: 'string',
      initialValue: 'Bergen og omegn · Siden 2012',
    }),
    defineField({
      name: 'orgNumber',
      title: 'Organisasjonsnummer',
      type: 'string',
    }),
    defineField({
      name: 'trustItems',
      title: 'Trust-bar (tjenestesider)',
      type: 'array',
      description: 'F.eks. "12+ års erfaring", sertifiseringer og merker. Logo er valgfri.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'tekst', title: 'Tekst', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'logo', title: 'Logo', type: 'image' }),
          ],
          preview: { select: { title: 'tekst', media: 'logo' } },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'companyName' },
  },
})
