export const dynamic = 'force-dynamic'

import { client } from '@/lib/sanity'
import { articleBySlugQuery, articlePathsQuery, articlesQuery } from '@/lib/queries'
import type { Article } from '@/lib/types'
import { urlFor } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { absUrl } from '@/lib/site'
import { articleJsonLd, breadcrumbJsonLd, jsonLdScript } from '@/lib/jsonld'
import '@/styles/landing.css'
import ScrollMotion from '@/components/landing/ScrollMotion'
import { ContactSection } from '@/components/landing/parts'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const paths = await client.fetch<{ slug: string }[]>(articlePathsQuery).catch(() => [])
  return paths.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await client.fetch<Article>(articleBySlugQuery, { slug })
  if (!article) return {}
  const title = article.title
  const description = article.excerpt
  const imageUrl = article.image ? urlFor(article.image).width(1200).height(630).url() : undefined
  const path = `/blog/${slug}`
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: absUrl(path),
      type: 'article',
      publishedTime: article.publishedAt,
      authors: article.author ? [article.author] : undefined,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: title }] : undefined,
    },
    twitter: {
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('nb-NO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const [article, allArticles] = await Promise.all([
    client.fetch<Article>(articleBySlugQuery, { slug }),
    client.fetch<Article[]>(articlesQuery).catch(() => []),
  ])

  if (!article) notFound()

  const related = allArticles.filter((a) => a._id !== article._id).slice(0, 3)

  const articleImage = article.image ? urlFor(article.image).width(1200).height(630).url() : undefined
  const articleSchema = articleJsonLd({
    title: article.title,
    description: article.excerpt,
    slug,
    image: articleImage,
    publishedAt: article.publishedAt,
    updatedAt: article._updatedAt,
    author: article.author,
  })
  const breadcrumb = breadcrumbJsonLd([
    { name: 'Forside', path: '/' },
    { name: 'Artikler', path: '/blog' },
    { name: article.title, path: `/blog/${slug}` },
  ])

  return (
    <div className="kr">
      <ScrollMotion />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(articleSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumb)} />

      <article>
        <header className="hero article-hero">
          <div className="wrap article-wrap">
            <Link className="back-link" href="/blog">← Alle artikler</Link>
            {article.relatedService && (
              <Link className="hero-eyebrow" href={`/tjenester/${article.relatedService.slug.current}`}>{article.relatedService.title}</Link>
            )}
            <h1 id="h1">{article.title}</h1>
            <p className="article-meta">
              {article.publishedAt && <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>}
              {article.publishedAt && article.author && <span aria-hidden="true"> · </span>}
              {article.author && <span>{article.author}</span>}
            </p>
          </div>
          {article.image && (
            <div className="wrap">
              <figure className="article-cover">
                <Image src={urlFor(article.image).width(1600).height(700).url()} width={1600} height={700} priority sizes="(min-width: 1120px) 1080px, 100vw" alt={article.title} />
              </figure>
            </div>
          )}
        </header>

        <div className="section article-section">
          <div className="wrap article-wrap">
            {article.excerpt && <p className="article-lead">{article.excerpt}</p>}
            {article.content && (
              <div className="prose-kr article-prose">
                <PortableText value={article.content} />
              </div>
            )}
            <p className="article-back"><Link className="text-link" href="/blog">Tilbake til alle artikler</Link></p>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section alt" aria-labelledby="h-rel">
          <div className="wrap">
            <h2 id="h-rel">Relaterte artikler</h2>
            <div className="article-grid" style={{ marginTop: 24 }}>
              {related.map((a) => (
                <Link key={a._id} href={`/blog/${a.slug.current}`} className="article-card">
                  <div className="article-media">
                    {a.image && (
                      <Image src={urlFor(a.image).width(600).height(400).url()} width={600} height={400} sizes="(min-width: 960px) 360px, (min-width: 640px) 50vw, 100vw" alt={a.title} />
                    )}
                  </div>
                  <div className="article-body">
                    {a.publishedAt && <time dateTime={a.publishedAt}>{formatDate(a.publishedAt)}</time>}
                    <h3>{a.title}</h3>
                    <span className="more">Les artikkelen <span aria-hidden="true">→</span></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactSection
        defaultService={article.relatedService?.slug.current}
        title="Spørsmål om anlegget ditt?"
        lead="Fyll ut skjemaet, eller ring oss direkte. Vi gir deg en faglig anbefaling og et tydelig tilbud."
      />
    </div>
  )
}
