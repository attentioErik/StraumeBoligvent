import { service } from './service'
import { referenceProject } from './referenceProject'
import { article } from './article'
import { faq } from './faq'
import { siteSettings } from './siteSettings'
import { referanse } from './referanse'
import { ansatt } from './ansatt'
import { omOss } from './omOss'
import { borettslagLanding } from './borettslagLanding'
import { forside } from './forside'

export const schemaTypes = [
  siteSettings,
  forside,
  service,
  referenceProject,
  article,
  faq,
  referanse,
  ansatt,
  omOss,
  borettslagLanding,
]
