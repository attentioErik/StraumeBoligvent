import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'straume-boligvent',
  title: 'Straume Boligvent',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Innhold')
          .items([
            S.listItem()
              .title('Nettstedsinnstillinger')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            S.listItem()
              .title('Tjenester')
              .child(S.documentTypeList('service').title('Tjenester')),
            S.listItem()
              .title('Referanseprosjekter')
              .child(S.documentTypeList('referenceProject').title('Referanseprosjekter')),
            S.listItem()
              .title('Artikler')
              .child(S.documentTypeList('article').title('Artikler')),
            S.listItem()
              .title('FAQ')
              .child(S.documentTypeList('faq').title('Vanlige spørsmål')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
