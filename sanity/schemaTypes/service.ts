import { defineField, defineType } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Tjeneste',
  type: 'document',
  fieldsets: [
    {
      name: 'konvertering',
      title: 'Konvertering',
      description: 'Elementer for flere henvendelser. Alt er av som standard – slå på ett tiltak om gangen.',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'media',
      title: 'Video',
      options: { collapsible: true, collapsed: true },
    },
  ],
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

    // ─── KONVERTERING ───
    defineField({
      name: 'showQuickAnswer',
      title: 'Vis «Kort fortalt»-boks',
      type: 'boolean',
      fieldset: 'konvertering',
      description:
        'Kort, direkte svar øverst på siden: hva tjenesten er, hva den koster og hvem den passer for. Lett for Google og AI (ChatGPT, Perplexity) å sitere.',
      initialValue: false,
    }),
    defineField({
      name: 'quickAnswerTitle',
      title: 'Kort fortalt – overskrift',
      type: 'string',
      fieldset: 'konvertering',
      description: 'F.eks. "Hva er kanalrens?". Standard: "Kort fortalt"',
      hidden: ({ parent }) => !parent?.showQuickAnswer,
    }),
    defineField({
      name: 'quickAnswer',
      title: 'Kort fortalt – tekst',
      type: 'text',
      rows: 4,
      fieldset: 'konvertering',
      description:
        '40–60 ord. Start med svaret. Eks: "Kanalrens er rengjøring av ventilasjonskanaler, vifter og avtrekk. For en vanlig enebolig i Bergen koster det fra X kr, og det anbefales hvert 5.–10. år. Passer for …"',
      hidden: ({ parent }) => !parent?.showQuickAnswer,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { showQuickAnswer?: boolean } | undefined
          if (!parent?.showQuickAnswer) return true
          if (!value) return 'Fyll inn teksten, eller slå av boksen'
          const words = String(value).trim().split(/\s+/).length
          if (words < 40 || words > 60) return `Anbefalt 40–60 ord (nå: ${words})`
          return true
        }).warning(),
    }),
    defineField({
      name: 'quickFacts',
      title: 'Kort fortalt – nøkkeltall',
      type: 'array',
      fieldset: 'konvertering',
      description: 'Maks 4 konkrete tall, f.eks. "12+" / "års erfaring", "800+" / "utførte oppdrag"',
      hidden: ({ parent }) => !parent?.showQuickAnswer,
      validation: (Rule) => Rule.max(4),
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'verdi', title: 'Tall', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'tekst', title: 'Beskrivelse', type: 'string', validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: 'verdi', subtitle: 'tekst' } },
        },
      ],
    }),
    defineField({
      name: 'priceFrom',
      title: 'Prisindikasjon',
      type: 'string',
      fieldset: 'konvertering',
      description: 'Vises i hero, f.eks. "29 900,-". Vises som "Fra 29 900,-". La stå tom for å skjule.',
    }),
    defineField({
      name: 'priceNote',
      title: 'Pris-notat',
      type: 'string',
      fieldset: 'konvertering',
      description: 'Kort tekst under prisen, f.eks. "inkl. mva. og montering"',
      hidden: ({ parent }) => !parent?.priceFrom,
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA-tekst',
      type: 'string',
      fieldset: 'konvertering',
      description: 'Tekst på hovedknappene, f.eks. "Få gratis vurdering". Standard: "Få tilbud"',
    }),
    defineField({
      name: 'showContactForm',
      title: 'Vis kontaktskjema',
      type: 'boolean',
      fieldset: 'konvertering',
      description: 'Viser kontaktskjema direkte på tjenestesiden',
      initialValue: false,
    }),
    defineField({
      name: 'contactFormPlacement',
      title: 'Plassering av skjema',
      type: 'string',
      fieldset: 'konvertering',
      options: {
        list: [
          { title: 'Nederst på siden', value: 'bottom' },
          { title: 'I hero (erstatter bildet)', value: 'hero' },
        ],
        layout: 'radio',
      },
      initialValue: 'bottom',
      hidden: ({ parent }) => !parent?.showContactForm,
    }),
    defineField({
      name: 'contactFormTitle',
      title: 'Kontaktskjema-tittel',
      type: 'string',
      fieldset: 'konvertering',
      description: 'F.eks. "Få et uforpliktende tilbud". Standard: "Interessert i <tjeneste>?"',
      hidden: ({ parent }) => !parent?.showContactForm,
    }),
    defineField({
      name: 'contactFormText',
      title: 'Kontaktskjema-tekst',
      type: 'text',
      rows: 3,
      fieldset: 'konvertering',
      hidden: ({ parent }) => !parent?.showContactForm,
    }),
    defineField({
      name: 'allowImageUpload',
      title: 'Bildeopplasting i skjema',
      type: 'boolean',
      fieldset: 'konvertering',
      description: 'Lar kunden laste opp bilde av eksisterende aggregat/typeskilt',
      initialValue: false,
    }),
    defineField({
      name: 'showTrustBar',
      title: 'Vis trust-bar',
      type: 'boolean',
      fieldset: 'konvertering',
      description: 'Stripe under hero med erfaring og sertifiseringer (innhold redigeres i Nettstedsinnstillinger)',
      initialValue: false,
    }),
    defineField({
      name: 'showReviews',
      title: 'Vis Google-anmeldelser under hero',
      type: 'boolean',
      fieldset: 'konvertering',
      initialValue: false,
    }),
    defineField({
      name: 'showFaq',
      title: 'Vis FAQ',
      type: 'boolean',
      fieldset: 'konvertering',
      description: 'Viser FAQ-spørsmål som er koblet til denne tjenesten',
      initialValue: false,
    }),

    // ─── VIDEO ───
    defineField({
      name: 'video',
      title: 'Video',
      type: 'file',
      fieldset: 'media',
      options: { accept: 'video/mp4,video/webm,video/quicktime' },
      description:
        'Vises ved siden av "Hva som er inkludert". Komprimer før opplasting: MP4 (H.264), ca. 720x1280, under 20 MB.',
    }),
    defineField({
      name: 'videoFormat',
      title: 'Videoformat',
      type: 'string',
      fieldset: 'media',
      options: {
        list: [
          { title: 'Stående (9:16)', value: 'portrait' },
          { title: 'Liggende (16:9)', value: 'landscape' },
        ],
        layout: 'radio',
      },
      initialValue: 'portrait',
    }),
    defineField({
      name: 'videoPoster',
      title: 'Forhåndsvisningsbilde',
      type: 'image',
      fieldset: 'media',
      description: 'Vises før videoen lastes',
    }),
    defineField({
      name: 'videoCaption',
      title: 'Videotekst',
      type: 'string',
      fieldset: 'media',
      description: 'F.eks. "Timelapse: utskifting av aggregat på én dag"',
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
