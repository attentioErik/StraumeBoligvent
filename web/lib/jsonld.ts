import { SITE_URL, SITE_NAME, COMPANY_LEGAL_NAME, ORG_NUMBER, DEFAULT_OG_IMAGE, absUrl } from './site'

export const ORG_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`

export function organizationJsonLd(opts?: { phone?: string; email?: string; address?: string }) {
  const phone = opts?.phone || '+47 561 26 800'
  const email = opts?.email || 'ordre@straumetekniske.no'
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HVACBusiness'],
    '@id': ORG_ID,
    name: SITE_NAME,
    legalName: COMPANY_LEGAL_NAME,
    alternateName: COMPANY_LEGAL_NAME,
    url: SITE_URL,
    logo: DEFAULT_OG_IMAGE,
    image: DEFAULT_OG_IMAGE,
    description:
      'Komplett leveranse innen ventilasjon for bolig, borettslag og næring i Bergen og omegn – service, kanalrens, innregulering, montasje og utskifting av ventilasjonsanlegg.',
    telephone: phone.replace(/\s+/g, ''),
    email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Idrettsveien 93',
      postalCode: '5353',
      addressLocality: 'Straume',
      addressRegion: 'Vestland',
      addressCountry: 'NO',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 60.3585,
      longitude: 5.1303,
    },
    areaServed: [
      { '@type': 'City', name: 'Bergen' },
      { '@type': 'AdministrativeArea', name: 'Vestland' },
      { '@type': 'Place', name: 'Bergen og omegn' },
    ],
    vatID: ORG_NUMBER,
    taxID: ORG_NUMBER,
    knowsLanguage: ['nb-NO', 'en'],
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: 'nb-NO',
    publisher: { '@id': ORG_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/blog?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

export function webPageJsonLd(opts: { path: string; name: string; description?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${absUrl(opts.path)}#webpage`,
    url: absUrl(opts.path),
    name: opts.name,
    description: opts.description,
    inLanguage: 'nb-NO',
    isPartOf: { '@id': WEBSITE_ID },
    publisher: { '@id': ORG_ID },
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absUrl(it.path),
    })),
  }
}

export function serviceJsonLd(opts: {
  name: string
  description: string
  slug: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: absUrl(`/tjenester/${opts.slug}`),
    image: opts.image,
    serviceType: opts.name,
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Place', name: 'Bergen og omegn' },
    inLanguage: 'nb-NO',
  }
}

export function articleJsonLd(opts: {
  title: string
  description?: string
  slug: string
  image?: string
  publishedAt?: string
  author?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    url: absUrl(`/blog/${opts.slug}`),
    image: opts.image,
    datePublished: opts.publishedAt,
    dateModified: opts.publishedAt,
    inLanguage: 'nb-NO',
    author: opts.author ? { '@type': 'Person', name: opts.author } : { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: { '@id': `${absUrl(`/blog/${opts.slug}`)}#webpage` },
  }
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.answer },
    })),
  }
}

export function contactPageJsonLd(opts: { phone: string; email: string; address: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${absUrl('/kontakt')}#webpage`,
    url: absUrl('/kontakt'),
    name: 'Kontakt – Straume Boligvent',
    inLanguage: 'nb-NO',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    mainEntity: {
      '@id': ORG_ID,
      telephone: opts.phone.replace(/\s+/g, ''),
      email: opts.email,
    },
  }
}

export function jsonLdScript(data: unknown) {
  return { __html: JSON.stringify(data) }
}
