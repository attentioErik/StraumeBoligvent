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
    // ─── Historikk-bilde ───
    defineField({
      name: 'historieBilde',
      title: 'Historikk-bilde',
      type: 'image',
      options: { hotspot: true },
      description: 'Bildet som vises ved siden av "Vår historie"-seksjonen',
    }),
    defineField({
      name: 'bildeBadgeTittel',
      title: 'Bilde-badge tittel',
      type: 'string',
      initialValue: 'Straume',
      description: 'Stor tekst på badge over historikk-bildet',
    }),
    defineField({
      name: 'bildeBadgeTekst',
      title: 'Bilde-badge undertekst',
      type: 'string',
      initialValue: 'Del av Straume Tekniske AS',
      description: 'Liten tekst på badge over historikk-bildet',
    }),
    // ─── Seksjon-titler ───
    defineField({
      name: 'historieLabel',
      title: 'Historikk seksjon-label',
      type: 'string',
      initialValue: 'Vår historie',
    }),
    defineField({
      name: 'historieTittel',
      title: 'Historikk seksjon-tittel',
      type: 'string',
      initialValue: 'Hvem er vi?',
    }),
    defineField({
      name: 'verdierLabel',
      title: 'Verdier seksjon-label',
      type: 'string',
      initialValue: 'Hva vi tror på',
    }),
    defineField({
      name: 'verdierTittel',
      title: 'Verdier seksjon-tittel',
      type: 'string',
      initialValue: 'Verdier',
    }),
    defineField({
      name: 'teamLabel',
      title: 'Team seksjon-label',
      type: 'string',
      initialValue: 'Menneskene bak',
    }),
    defineField({
      name: 'teamTittel',
      title: 'Team seksjon-tittel',
      type: 'string',
      initialValue: 'Teamet vårt',
    }),
    defineField({
      name: 'sertifiseringerLabel',
      title: 'Sertifiseringer seksjon-label',
      type: 'string',
      initialValue: 'Kompetanse',
    }),
    defineField({
      name: 'sertifiseringerTittel',
      title: 'Sertifiseringer seksjon-tittel',
      type: 'string',
      initialValue: 'Sertifiseringer',
    }),
    // ─── CTA-seksjon ───
    defineField({
      name: 'ctaLabel',
      title: 'CTA seksjon-label',
      type: 'string',
      initialValue: 'Kom i gang',
    }),
    defineField({
      name: 'ctaTittel',
      title: 'CTA tittel',
      type: 'string',
      initialValue: 'Ta kontakt',
    }),
    defineField({
      name: 'ctaTekst',
      title: 'CTA beskrivelse',
      type: 'text',
      rows: 2,
      initialValue: 'Vi er tilgjengelige for en uforpliktende prat om ditt anlegg.',
    }),
    defineField({
      name: 'ctaKnapp1Tekst',
      title: 'CTA knapp 1 tekst',
      type: 'string',
      initialValue: 'Send forespørsel',
    }),
    defineField({
      name: 'ctaKnapp1Lenke',
      title: 'CTA knapp 1 lenke',
      type: 'string',
      initialValue: '/kontakt',
    }),
    defineField({
      name: 'ctaKnapp2Tekst',
      title: 'CTA knapp 2 tekst',
      type: 'string',
      initialValue: 'Se referanser →',
    }),
    defineField({
      name: 'ctaKnapp2Lenke',
      title: 'CTA knapp 2 lenke',
      type: 'string',
      initialValue: '/referanser',
    }),
    // ─── SEO ───
    defineField({
      name: 'seoDescription',
      title: 'SEO-beskrivelse',
      type: 'text',
      rows: 2,
      description: 'Meta description for siden (vises i Google-søk)',
      initialValue: 'Lokal fagkunnskap og langsiktige relasjoner. Straume Boligvent er en spesialisert tjeneste fra Straume Tekniske AS.',
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
