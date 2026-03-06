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
    slug,
    number,
    description,
    fullDescription,
    image,
    benefits,
    process,
    highlighted
  }
`

// ─── REFERENCE PROJECTS ───
export const referenceProjectsQuery = groq`
  *[_type == "referenceProject"] | order(order asc) {
    _id,
    title,
    slug,
    category,
    serviceType,
    description,
    detail,
    image,
    "service": service->{ title, slug }
  }
`

export const referenceProjectBySlugQuery = groq`
  *[_type == "referenceProject" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    serviceType,
    description,
    detail,
    image,
    results,
    testimonial,
    "service": service->{ title, slug }
  }
`

export const projectsByServiceQuery = groq`
  *[_type == "referenceProject" && service._ref == $serviceId] | order(order asc) {
    _id,
    title,
    slug,
    category,
    serviceType,
    description,
    image
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
