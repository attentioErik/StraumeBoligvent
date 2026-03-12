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
  heroTitle?: string
  slug: { current: string }
  number?: string
  description: string
  fullDescription?: PortableTextBlock[]
  image?: SanityImage
  benefits?: string[]
  process?: { title: string; description: string }[]
  highlighted?: boolean
  order?: number
  // New section fields
  introText?: PortableTextBlock[]
  whyTitle?: string
  whyText?: PortableTextBlock[]
  whySymptoms?: string[]
  whenTitle?: string
  whenNote?: string
  whenItems?: string[]
  includedTitle?: string
  includedSubtitle?: string
  includedSteps?: { title: string; description: string }[]
  benefitsTitle?: string
  benefitsText?: string
  benefitsList?: string[]
  practicalBlocks?: { title: string; content: PortableTextBlock[] }[]
  relatedServices?: { _id: string; title: string; slug: { current: string } }[]
}

export interface ReferenceProject {
  _id: string
  title: string
  slug: { current: string }
  galleri?: Array<SanityImage & { alt?: string }>
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
  historieBilde?: SanityImage
  bildeBadgeTittel?: string
  bildeBadgeTekst?: string
  historieLabel?: string
  historieTittel?: string
  verdierLabel?: string
  verdierTittel?: string
  teamLabel?: string
  teamTittel?: string
  sertifiseringerLabel?: string
  sertifiseringerTittel?: string
  verdier?: Array<{ tittel: string; beskrivelse: string; ikon?: string }>
  tallOgFakta?: Array<{ verdi: string; label: string }>
  sertifiseringer?: Array<{ navn: string; logo?: SanityImage; beskrivelse?: string }>
  ctaLabel?: string
  ctaTittel?: string
  ctaTekst?: string
  ctaKnapp1Tekst?: string
  ctaKnapp1Lenke?: string
  ctaKnapp2Tekst?: string
  ctaKnapp2Lenke?: string
  seoDescription?: string
}

export interface Forside {
  seoTittel?: string
  seoDescription?: string
  heroBilde?: SanityImage
  heroStats?: Array<{ verdi: string; label: string }>
  trustItems?: string[]
  partnerLabel?: string
  partnere?: string[]
  googleRating?: string
  heroCta1Tekst?: string
  heroCta2Tekst?: string
  tjenesterLabel?: string
  tjenesterTittel?: string
  tjenesterBeskrivelse?: string
  tjenesterCtaTekst?: string
  prosessLabel?: string
  prosessTittel?: string
  prosessBeskrivelse?: string
  prosessSteg?: Array<{ nummer: string; tittel: string; beskrivelse: string }>
  prosessCtaTekst?: string
  anmeldelserLabel?: string
  anmeldelserTittel?: string
  boligeierLabel?: string
  boligeierTittel?: string
  boligeierBeskrivelse?: string
  boligeierSjekkpunkter?: string[]
  boligeierNotat?: string
  boligeierBilde?: SanityImage
  boligeierBadge?: string
  omOssLabel?: string
  omOssTittel?: string
  omOssAvsnitt1?: string
  omOssAvsnitt2?: string
  omOssSjekkpunkter?: string[]
  omOssBilde?: SanityImage
  omOssBadgeTittel?: string
  omOssBadgeTekst?: string
  omOssCtaTekst?: string
  galleriLabel?: string
  galleriTittel?: string
  galleriBeskrivelse?: string
  galleriCtaTekst?: string
  kontaktLabel?: string
  kontaktTittel?: string
  kontaktBeskrivelse?: string
  kontaktApningstider?: string
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
