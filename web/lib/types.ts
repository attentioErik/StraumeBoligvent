import type { PortableTextBlock } from '@portabletext/react'

export interface SanityImage {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number; height: number; width: number }
}

export interface SiteSettings {
  companyName: string
  phone: string
  email: string
  address: string
  heroTitle: string
  heroDescription: string
  heroPill: string
  orgNumber?: string
}

export interface Service {
  _id: string
  title: string
  slug: { current: string }
  number?: string
  description: string
  fullDescription?: PortableTextBlock[]
  image?: SanityImage
  benefits?: string[]
  process?: { title: string; description: string }[]
  highlighted?: boolean
  order?: number
}

export interface ReferenceProject {
  _id: string
  title: string
  slug: { current: string }
  category?: string
  serviceType?: string
  description?: string
  detail?: string
  image?: SanityImage
  results?: PortableTextBlock[]
  testimonial?: {
    quote: string
    author: string
    role: string
  }
  service?: { title: string; slug: { current: string } }
}

export interface Article {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  content?: PortableTextBlock[]
  image?: SanityImage
  publishedAt?: string
  author?: string
  relatedService?: { title: string; slug: { current: string } }
}

export interface FAQ {
  _id: string
  question: string
  answer: PortableTextBlock[]
  service?: { title: string; slug: { current: string } }
}

export interface Referanse {
  _id: string
  title: string
  slug: { current: string }
  publisert?: boolean
  kunde?: string
  kategori?: string
  kortBeskrivelse?: string
  beskrivelse?: PortableTextBlock[]
  hovedbilde?: SanityImage & { alt?: string }
  galleri?: Array<SanityImage & { alt?: string }>
  utfortAr?: number
  tjenester?: string[]
  kundesitat?: { sitat: string; person: string }
  forrige?: { title: string; slug: { current: string } }
  neste?: { title: string; slug: { current: string } }
}

export interface Ansatt {
  _id: string
  navn: string
  rolle?: string
  bilde?: SanityImage
  bio?: string
  epost?: string
  telefon?: string
  rekkefolge?: number
}

export interface OmOss {
  heroTittel?: string
  heroTekst?: string
  historieBlokker?: PortableTextBlock[]
  verdier?: Array<{ tittel: string; beskrivelse: string; ikon?: string }>
  tallOgFakta?: Array<{ verdi: string; label: string }>
  sertifiseringer?: Array<{ navn: string; logo?: SanityImage; beskrivelse?: string }>
}

export interface BorettslagLanding {
  heroTittel?: string
  heroUnderTittel?: string
  utfordringer?: string[]
  tjenester?: Array<{ tittel: string; beskrivelse: string }>
  prosessSteg?: Array<{ tittel: string; beskrivelse: string }>
  hvordforOss?: string[]
  faq?: Array<{ sporsmal: string; svar: string }>
}
