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
  return {
    title: article.title,
    description: article.excerpt,
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

  return (
    <>
      {/* Article hero */}
      <section
        style={{
          background: 'var(--off)',
          padding: '120px 5% 0',
          borderBottom: '1px solid var(--ll)',
        }}
      >
        <div className="inner" style={{ maxWidth: 760 }}>
          <Link
            href="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: '0.82rem',
              color: 'var(--muted)',
              textDecoration: 'none',
              marginBottom: 32,
            }}
          >
            ← Tilbake til artikler
          </Link>

          {article.relatedService && (
            <div
              style={{
                display: 'inline-block',
                background: 'var(--abg)',
                border: '1px solid var(--amid)',
                borderRadius: 100,
                padding: '5px 14px',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--adark)',
                letterSpacing: '0.06em',
                marginBottom: 20,
              }}
            >
              {article.relatedService.title}
            </div>
          )}

          <h1
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              color: 'var(--ink)',
              letterSpacing: '-0.02em',
              marginBottom: 20,
            }}
          >
            {article.title}
          </h1>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              fontSize: '0.82rem',
              color: 'var(--sec)',
              marginBottom: 48,
            }}
          >
            {article.publishedAt && <span>{formatDate(article.publishedAt)}</span>}
            {article.author && (
              <>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--ll)', display: 'inline-block' }} />
                <span>{article.author}</span>
              </>
            )}
          </div>
        </div>

        {/* Cover image */}
        {article.image && (
          <div
            style={{
              maxWidth: 1160,
              margin: '0 auto',
              height: 440,
              borderRadius: '8px 8px 0 0',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <Image
              src={urlFor(article.image).width(1160).height(440).url()}
              alt={article.title}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        )}
      </section>

      {/* Article body */}
      <section style={{ background: 'var(--white)', padding: '80px 5%' }}>
        <div
          style={{
            maxWidth: 760,
            margin: '0 auto',
          }}
        >
          {article.excerpt && (
            <p
              style={{
                fontSize: '1.1rem',
                lineHeight: 1.78,
                color: 'var(--body)',
                fontWeight: 400,
                marginBottom: 40,
                paddingBottom: 40,
                borderBottom: '1px solid var(--ll)',
              }}
            >
              {article.excerpt}
            </p>
          )}

          {article.content && (
            <div className="prose">
              <PortableText value={article.content} />
            </div>
          )}

          {/* Back link */}
          <div style={{ marginTop: 64, paddingTop: 40, borderTop: '1px solid var(--ll)' }}>
            <Link href="/blog" className="btn-ghost">
              ← Alle artikler
            </Link>
          </div>
        </div>
      </section>

      {/* Related articles */}
      {related.length > 0 && (
        <section style={{ background: 'var(--off)', padding: '80px 5%' }}>
          <div className="inner">
            <div className="slabel">Mer å lese</div>
            <h2 className="stitle">Relaterte artikler</h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 24,
                marginTop: 40,
              }}
              className="articles-grid"
            >
              {related.map((a) => (
                <Link
                  key={a._id}
                  href={`/blog/${a.slug.current}`}
                  className="article-card"
                  style={{
                    textDecoration: 'none',
                    display: 'block',
                    background: 'var(--white)',
                    border: '1px solid var(--ll)',
                    borderRadius: 6,
                    overflow: 'hidden',
                    transition: 'transform 0.25s, box-shadow 0.25s',
                  }}
                >
                  <div style={{ height: 160, background: 'linear-gradient(145deg, #ddd6c8 0%, #b8ae9e 100%)', position: 'relative', overflow: 'hidden' }}>
                    {a.image && (
                      <Image
                        src={urlFor(a.image).width(400).height(240).url()}
                        alt={a.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    )}
                  </div>
                  <div style={{ padding: '20px 24px 24px' }}>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.25, marginBottom: 8 }}>
                      {a.title}
                    </h3>
                    {a.excerpt && (
                      <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6, fontWeight: 300 }}>
                        {a.excerpt.slice(0, 100)}…
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <style>{`
            .article-card:hover {
              transform: translateY(-4px);
              box-shadow: 0 12px 40px rgba(20,16,8,0.09);
            }
            @media (max-width: 980px) {
              .articles-grid { grid-template-columns: 1fr 1fr !important; }
            }
            @media (max-width: 640px) {
              .articles-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </section>
      )}
    </>
  )
}
