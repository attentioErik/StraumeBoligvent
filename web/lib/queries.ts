import { groq } from 'next-sanity'

// ─── SITE SETTINGS ───
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    companyName,
    phone,
    email,
    address,
    heroTitle,
    heroDescription,
    heroPill,
    orgNumber
  }
`

// ─── SERVICES ───
export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    number,
    description,
    highlighted,
    image,
    benefits,
    order
  }
`

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    heroTitle,
    slug,
    number,
    description,
    fullDescription,
    image,
    benefits,
    process,
    highlighted,
    introText,
    whyTitle,
    whyText,
    whySymptoms,
    whenTitle,
    whenNote,
    whenItems,
    includedTitle,
    includedSubtitle,
    includedSteps,
    benefitsTitle,
    benefitsText,
    benefitsList,
    practicalBlocks,
    "relatedServices": relatedServices[]->{ _id, title, slug }
  }
`

// ─── REFERENCE PROJECTS ───
export const referenceProjectsQuery = groq`
  *[_type == "referenceProject"] | order(order asc) {
    _id,
    title,
    slug,
    galleri,
    "service": service->{ title, slug }
  }
`

export const referenceProjectBySlugQuery = groq`
  *[_type == "referenceProject" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    galleri,
    "service": service->{ title, slug }
  }
`

export const projectsByServiceQuery = groq`
  *[_type == "referenceProject" && service._ref == $serviceId] | order(order asc) {
    _id,
    title,
    slug,
    galleri
  }
`

// ─── ARTICLES ───
export const articlesQuery = groq`
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    image,
    publishedAt,
    author,
    "relatedService": relatedService->{ title, slug }
  }
`

export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    image,
    publishedAt,
    author,
    "relatedService": relatedService->{ title, slug }
  }
`

// ─── FAQ ───
export const faqQuery = groq`
  *[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    "service": service->{ title, slug }
  }
`

export const faqByServiceQuery = groq`
  *[_type == "faq" && service._ref == $serviceId] | order(order asc) {
    _id,
    question,
    answer
  }
`

// ─── SLUG PATHS ───
export const servicePathsQuery = groq`
  *[_type == "service" && defined(slug.current)] { "slug": slug.current }
`

export const articlePathsQuery = groq`
  *[_type == "article" && defined(slug.current)] { "slug": slug.current }
`

export const referenceProjectPathsQuery = groq`
  *[_type == "referenceProject" && defined(slug.current)] { "slug": slug.current }
`

// ─── REFERANSER ───
export const referanserQuery = groq`
  *[_type == "referanse" && publisert == true] | order(utfortAr desc) {
    _id,
    title,
    slug,
    kunde,
    kategori,
    kortBeskrivelse,
    hovedbilde,
    utfortAr,
    tjenester
  }
`

export const referanseBySlugQuery = groq`
  *[_type == "referanse" && slug.current == $slug][0] {
    ...,
    "forrige": *[_type == "referanse" && publisert == true && utfortAr < ^.utfortAr] | order(utfortAr desc)[0] { title, slug },
    "neste": *[_type == "referanse" && publisert == true && utfortAr > ^.utfortAr] | order(utfortAr asc)[0] { title, slug }
  }
`

export const referansePathsQuery = groq`
  *[_type == "referanse" && publisert == true && defined(slug.current)] { "slug": slug.current }
`

// ─── ANSATTE ───
export const ansatteQuery = groq`
  *[_type == "ansatt"] | order(rekkefolge asc) {
    _id,
    navn,
    rolle,
    bilde,
    bio,
    epost,
    telefon
  }
`

// ─── FORSIDE (singleton) ───
export const forsideQuery = groq`
  *[_type == "forside"][0] {
    seoTittel,
    seoDescription,
    heroBilde,
    heroStats,
    trustItems,
    partnerLabel,
    partnere,
    googleRating,
    heroCta1Tekst,
    heroCta2Tekst,
    tjenesterLabel,
    tjenesterTittel,
    tjenesterBeskrivelse,
    tjenesterCtaTekst,
    prosessLabel,
    prosessTittel,
    prosessBeskrivelse,
    prosessSteg,
    prosessCtaTekst,
    anmeldelserLabel,
    anmeldelserTittel,
    boligeierLabel,
    boligeierTittel,
    boligeierBeskrivelse,
    boligeierSjekkpunkter,
    boligeierNotat,
    boligeierBilde,
    boligeierBadge,
    omOssLabel,
    omOssTittel,
    omOssAvsnitt1,
    omOssAvsnitt2,
    omOssSjekkpunkter,
    omOssBilde,
    omOssBadgeTittel,
    omOssBadgeTekst,
    omOssCtaTekst,
    galleriLabel,
    galleriTittel,
    galleriBeskrivelse,
    galleriCtaTekst,
    kontaktLabel,
    kontaktTittel,
    kontaktBeskrivelse,
    kontaktApningstider
  }
`

// ─── OM OSS (singleton) ───
export const omOssQuery = groq`
  *[_type == "omOss"][0] {
    heroTittel,
    heroTekst,
    historieBlokker,
    historieBilde,
    bildeBadgeTittel,
    bildeBadgeTekst,
    historieLabel,
    historieTittel,
    verdierLabel,
    verdierTittel,
    teamLabel,
    teamTittel,
    sertifiseringerLabel,
    sertifiseringerTittel,
    verdier,
    tallOgFakta,
    sertifiseringer,
    ctaLabel,
    ctaTittel,
    ctaTekst,
    ctaKnapp1Tekst,
    ctaKnapp1Lenke,
    ctaKnapp2Tekst,
    ctaKnapp2Lenke,
    seoDescription
  }
`

// ─── BORETTSLAG LANDING (singleton) ───
export const borettslagLandingQuery = groq`
  *[_type == "borettslagLanding"][0] {
    heroTittel,
    heroUnderTittel,
    utfordringer,
    tjenester,
    prosessSteg,
    hvordforOss,
    faq
  }
`
