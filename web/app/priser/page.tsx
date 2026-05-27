export const revalidate = 60

import { client } from '@/lib/sanity'
import { priserQuery, enovaQuery } from '@/lib/queries'
import type { Priser, Enova } from '@/lib/types'
import type { Metadata } from 'next'
import PricingSection from '@/components/PricingSection'
import EnovaTeaser from '@/components/EnovaTeaser'

export async function generateMetadata(): Promise<Metadata> {
  const priser = await client.fetch<Priser>(priserQuery).catch(() => null)
  return {
    title: priser?.seoTittel ?? 'Priser – Straume Boligvent',
    description: priser?.seoDescription ?? 'Se priser for ventilasjonsservice, kanalrens og nytt ventilasjonsaggregat.',
  }
}

export default async function PriserPage() {
  const [priser, enova] = await Promise.all([
    client.fetch<Priser>(priserQuery).catch(() => null),
    client.fetch<Enova>(enovaQuery).catch(() => null),
  ])

  return (
    <main style={{ background: 'var(--white)', paddingTop: 40 }}>
      <PricingSection priser={priser} />
      <EnovaTeaser enova={enova} />
    </main>
  )
}
