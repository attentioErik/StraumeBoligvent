import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'straume-boligvent',
  title: 'Straume Boligvent',

  projectId: '41btjoop',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Innhold')
          .items([
            S.listItem()
              .title('Nettstedsinnstillinger')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem()
              .title('Om oss')
              .id('omOss')
              .child(S.document().schemaType('omOss').documentId('omOss')),
            S.listItem()
              .title('Borettslag-landingsside')
              .id('borettslagLanding')
              .child(S.document().schemaType('borettslagLanding').documentId('borettslagLanding')),
            S.divider(),
            S.listItem()
              .title('Tjenester')
              .child(S.documentTypeList('service').title('Tjenester')),
            S.listItem()
              .title('Referanser')
              .child(S.documentTypeList('referanse').title('Referanser')),
            S.listItem()
              .title('Referanseprosjekter (eldre)')
              .child(S.documentTypeList('referenceProject').title('Referanseprosjekter')),
            S.listItem()
              .title('Artikler')
              .child(S.documentTypeList('article').title('Artikler')),
            S.listItem()
              .title('FAQ')
              .child(S.documentTypeList('faq').title('Vanlige spørsmål')),
            S.listItem()
              .title('Ansatte')
              .child(S.documentTypeList('ansatt').title('Ansatte')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
