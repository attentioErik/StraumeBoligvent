import type { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'
import {
  servicePathsQuery,
  articlePathsQuery,
} from '@/lib/queries'
import { SITE_URL } from '@/lib/site'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/priser`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/enova`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/borettslag`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/om-oss`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/galleri`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/kontakt`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
  ]

  const [services, articles] = await Promise.all([
    client.fetch<{ slug: string; _updatedAt?: string }[]>(servicePathsQuery).catch(() => []),
    client.fetch<{ slug: string; _updatedAt?: string }[]>(articlePathsQuery).catch(() => []),
  ])

  const dynamicRoutes: MetadataRoute.Sitemap = [
    ...services
      .filter((s) => s?.slug)
      .map((s) => ({
        url: `${SITE_URL}/tjenester/${s.slug}`,
        lastModified: s._updatedAt ? new Date(s._updatedAt) : now,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      })),
    ...articles
      .filter((a) => a?.slug)
      .map((a) => ({
        url: `${SITE_URL}/blog/${a.slug}`,
        lastModified: a._updatedAt ? new Date(a._updatedAt) : now,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
  ]

  return [...staticRoutes, ...dynamicRoutes]
}
