import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

// Only create a real client when a valid projectId is present
const isConfigured = Boolean(projectId && /^[a-z0-9-]+$/.test(projectId))

export const client = createClient({
  projectId: isConfigured ? projectId! : 'placeholder',
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  // When not configured, disable actual network requests
  token: undefined,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

/** Wraps a Sanity fetch and returns null when Sanity is not configured */
export async function sanityFetch<T>(
  query: string,
  params?: Record<string, string>
): Promise<T | null> {
  if (!isConfigured) return null
  return params ? client.fetch<T>(query, params) : client.fetch<T>(query)
}
