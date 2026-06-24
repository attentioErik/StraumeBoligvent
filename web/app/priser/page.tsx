export const revalidate = 60

import { client } from '@/lib/sanity'
import { priserQuery, enovaQuery } from '@/lib/queries'
import type { Priser, Enova } from '@/lib/types'
import type { Metadata } from 'next'
import PricingSection from '@/components/PricingSection'
import EnovaTeaser from '@/components/EnovaTeaser'
import { absUrl } from '@/lib/site'
import { webPageJsonLd, breadcrumbJsonLd, jsonLdScript } from '@/lib/jsonld'

const PAGE_PATH = '/priser'

export async function generateMetadata(): Promise<Metadata> {
  const priser = await client.fetch<Priser>(priserQuery).catch(() => null)
  const title = priser?.seoTittel ?? 'Priser – Straume Boligvent'
  const description =
    priser?.seoDescription ?? 'Se priser for ventilasjonsservice, kanalrens og nytt ventilasjonsaggregat.'
  return {
    title,
    description,
    alternates: { canonical: PAGE_PATH },
    openGraph: { title, description, url: absUrl(PAGE_PATH), type: 'website' },
    twitter: { title, description },
  }
}

export default async function PriserPage() {
  const [priser, enova] = await Promise.all([
    client.fetch<Priser>(priserQuery).catch(() => null),
    client.fetch<Enova>(enovaQuery).catch(() => null),
  ])

  const webPage = webPageJsonLd({
    path: PAGE_PATH,
    name: priser?.tittel || 'Priser – Straume Boligvent',
    description: priser?.beskrivelse,
  })
  const breadcrumb = breadcrumbJsonLd([
    { name: 'Forside', path: '/' },
    { name: 'Priser', path: PAGE_PATH },
  ])

  return (
    <main style={{ background: 'var(--white)', paddingTop: 40 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(webPage)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumb)} />
      <PricingSection priser={priser} />
      <EnovaTeaser enova={enova} />
    </main>
  )
}
