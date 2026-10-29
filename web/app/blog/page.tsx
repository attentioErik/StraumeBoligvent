import { client } from '@/lib/sanity'
import { articlesQuery } from '@/lib/queries'
import type { Article } from '@/lib/types'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { absUrl } from '@/lib/site'
import '@/styles/landing.css'
import ScrollMotion from '@/components/landing/ScrollMotion'
import { ContactSection } from '@/components/landing/parts'

const PAGE_PATH = '/blog'
const PAGE_TITLE = 'Artikler og fagstoff om ventilasjon'
const PAGE_DESC =
  'Fagartikler om ventilasjon, inneklima og vedlikehold – fra service og kanalrens til valg av nytt aggregat og Enova-støtte.'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: { canonical: PAGE_PATH },
  openGraph: { title: PAGE_TITLE, description: PAGE_DESC, url: absUrl(PAGE_PATH), type: 'website' },
  twitter: { title: PAGE_TITLE, description: PAGE_DESC },
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('nb-NO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function BlogPage() {
  const articles = await client.fetch<Article[]>(articlesQuery).catch(() => [])

  return (
    <div className="kr">
      <ScrollMotion />
      <section className="hero" aria-labelledby="h1">
        <div className="wrap hero-grid no-media">
          <div>
            <span className="hero-eyebrow">Kunnskap</span>
            <h1 id="h1">Artikler</h1>
            <p className="hero-sub">Tips, råd og faglig innsikt om ventilasjon, inneklima og vedlikehold.</p>
          </div>
        </div>
      </section>

      <section className="section alt" aria-label="Artikler">
        <div className="wrap">
          {articles.length === 0 ? (
            <p className="lead">Ingen artikler publisert ennå.</p>
          ) : (
            <div className="article-grid">
              {articles.map((a) => (
                <Link key={a._id} href={`/blog/${a.slug.current}`} className="article-card">
                  <div className="article-media">
                    {a.image && (
                      <Image src={urlFor(a.image).width(600).height(400).url()} width={600} height={400} sizes="(min-width: 960px) 360px, (min-width: 640px) 50vw, 100vw" alt={a.title} />
                    )}
                    {a.relatedService && <span className="article-tag">{a.relatedService.title}</span>}
                  </div>
                  <div className="article-body">
                    {a.publishedAt && <time dateTime={a.publishedAt}>{formatDate(a.publishedAt)}</time>}
                    <h2>{a.title}</h2>
                    {a.excerpt && <p>{a.excerpt}</p>}
                    <span className="more">Les artikkelen <span aria-hidden="true">→</span></span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <ContactSection />
    </div>
  )
}
