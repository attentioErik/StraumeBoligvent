export const revalidate = 60

import { client } from '@/lib/sanity'
import { priserQuery } from '@/lib/queries'
import type { Priser } from '@/lib/types'
import type { Metadata } from 'next'
import PricingSection from '@/components/PricingSection'

export async function generateMetadata(): Promise<Metadata> {
  const priser = await client.fetch<Priser>(priserQuery).catch(() => null)
  return {
    title: priser?.seoTittel ?? 'Priser – Straume Boligvent',
    description: priser?.seoDescription ?? 'Se priser for ventilasjonsservice, kanalrens og nytt ventilasjonsaggregat.',
  }
}

export default async function PriserPage() {
  const priser = await client.fetch<Priser>(priserQuery).catch(() => null)

  return (
    <main style={{ background: 'var(--white)', paddingTop: 40 }}>
      <PricingSection priser={priser} />
    </main>
  )
}
