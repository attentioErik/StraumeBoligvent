import { client } from '@/lib/sanity'
import { articlesQuery } from '@/lib/queries'
import type { Article } from '@/lib/types'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Artikler',
  description: 'Les våre artikler om ventilasjon, inneklima og vedlikehold.',
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
    <>
      {/* Hero */}
      <section
        style={{
          background: 'var(--off)',
          padding: '120px 5% 80px',
          borderBottom: '1px solid var(--ll)',
        }}
      >
        <div className="inner">
          <div className="slabel">Kunnskap</div>
          <h1
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2.4rem, 4vw, 3.6rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              color: 'var(--ink)',
              letterSpacing: '-0.02em',
              marginBottom: 20,
            }}
          >
            Artikler
          </h1>
          <p
            style={{
              fontSize: '1.05rem',
              lineHeight: 1.78,
              color: 'var(--muted)',
              fontWeight: 300,
              maxWidth: 520,
            }}
          >
            Tips, råd og faglig innsikt om ventilasjon, inneklima og vedlikehold.
          </p>
        </div>
      </section>

      {/* Articles list */}
      <section style={{ background: 'var(--white)', padding: '80px 5%' }}>
        <div className="inner">
          {articles.length === 0 ? (
            <div
              style={{
                padding: '80px 0',
                textAlign: 'center',
                color: 'var(--muted)',
                fontSize: '0.95rem',
              }}
            >
              <p>Ingen artikler publisert ennå.</p>
              <p style={{ marginTop: 8, fontSize: '0.85rem' }}>
                Legg til artikler i Sanity Studio.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 32,
              }}
              className="articles-grid"
            >
              {articles.map((article) => (
                <Link
                  key={article._id}
                  href={`/blog/${article.slug.current}`}
                  className="article-card reveal"
                  style={{
                    textDecoration: 'none',
                    display: 'block',
                    background: 'var(--off)',
                    border: '1px solid var(--ll)',
                    borderRadius: 6,
                    overflow: 'hidden',
                    transition: 'transform 0.25s, box-shadow 0.25s',
                  }}
                >
                  {/* Image */}
                  <div
                    style={{
                      height: 200,
                      background: 'linear-gradient(145deg, #ddd6c8 0%, #b8ae9e 100%)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {article.image && (
                      <Image
                        src={urlFor(article.image).width(600).height(400).url()}
                        alt={article.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    )}
                    {article.relatedService && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 14,
                          left: 14,
                          background: 'var(--amber)',
                          color: 'var(--ink)',
                          fontSize: '0.63rem',
                          fontWeight: 700,
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          padding: '5px 10px',
                          borderRadius: 2,
                        }}
                      >
                        {article.relatedService.title}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ padding: '24px 28px 28px' }}>
                    {article.publishedAt && (
                      <div
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          letterSpacing: '0.1em',
                          color: 'var(--sec)',
                          textTransform: 'uppercase',
                          marginBottom: 10,
                        }}
                      >
                        {formatDate(article.publishedAt)}
                      </div>
                    )}
                    <h2
                      style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: 'var(--ink)',
                        lineHeight: 1.25,
                        marginBottom: 10,
                      }}
                    >
                      {article.title}
                    </h2>
                    {article.excerpt && (
                      <p
                        style={{
                          fontSize: '0.855rem',
                          color: 'var(--muted)',
                          lineHeight: 1.65,
                          fontWeight: 300,
                        }}
                      >
                        {article.excerpt}
                      </p>
                    )}
                    <div
                      style={{
                        marginTop: 20,
                        fontSize: '0.82rem',
                        color: 'var(--adark)',
                        fontWeight: 700,
                      }}
                    >
                      Les mer →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <style>{`
          .article-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 16px 48px rgba(20,16,8,0.09);
          }
          @media (max-width: 980px) {
            .articles-grid { grid-template-columns: 1fr 1fr !important; }
          }
          @media (max-width: 640px) {
            .articles-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </>
  )
}
