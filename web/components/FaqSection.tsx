'use client'

import { useState } from 'react'
import { PortableText } from '@portabletext/react'
import type { FAQ } from '@/lib/types'
import Link from 'next/link'

interface FaqSectionProps {
  faqs: FAQ[]
}

export default function FaqSection({ faqs }: FaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?._id ?? null)

  return (
    <section id="faq" style={{ background: 'var(--off)', padding: '108px 5%' }}>
      <div className="inner">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.6fr',
            gap: 80,
            alignItems: 'start',
            marginTop: 0,
          }}
          className="faq-wrap"
        >
          {/* Left: intro */}
          <div className="faq-intro reveal" style={{ position: 'sticky', top: 100 }}>
            <div className="slabel">Spørsmål og svar</div>
            <h2 className="stitle">Vanlige spørsmål</h2>
            <p
              style={{
                fontSize: '0.925rem',
                color: 'var(--muted)',
                lineHeight: 1.78,
                marginTop: 16,
                fontWeight: 300,
              }}
            >
              Her er svarene på det vi oftest blir spurt om. Finner du ikke svaret ditt,{' '}
              <Link href="/kontakt" style={{ color: 'var(--amber)', fontWeight: 700, textDecoration: 'none' }}>
                tar vi det gjerne direkte
              </Link>
              .
            </p>
          </div>

          {/* Right: FAQ list */}
          <div className="faq-list reveal">
            {faqs.map((item) => {
              const isOpen = openId === item._id
              return (
                <div
                  key={item._id}
                  style={{ borderBottom: '1px solid var(--ll)' }}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : item._id)}
                    style={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '22px 0',
                      cursor: 'pointer',
                      fontFamily: 'Lato, sans-serif',
                      fontSize: '0.935rem',
                      fontWeight: 700,
                      color: isOpen ? 'var(--adark)' : 'var(--ink)',
                      textAlign: 'left',
                      transition: 'color 0.2s',
                      gap: 16,
                    }}
                  >
                    {item.question}
                    <div
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: '50%',
                        border: '1.5px solid var(--lm)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        fontSize: '1.1rem',
                        fontWeight: 300,
                        color: 'var(--muted)',
                        lineHeight: 1,
                        transition: 'transform 0.3s, background 0.2s, border-color 0.2s, color 0.2s',
                        transform: isOpen ? 'rotate(45deg)' : 'none',
                        background: isOpen ? 'var(--amber)' : 'transparent',
                        borderColor: isOpen ? 'var(--amber)' : 'var(--lm)',
                      }}
                    >
                      +
                    </div>
                  </button>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateRows: isOpen ? '1fr' : '0fr',
                      transition: 'grid-template-rows 0.35s cubic-bezier(0.4,0,0.2,1)',
                    }}
                  >
                    <div style={{ overflow: 'hidden', minHeight: 0 }}>
                      <div
                        style={{
                          fontSize: '0.9rem',
                          color: 'var(--muted)',
                          lineHeight: 1.8,
                          paddingBottom: 24,
                          fontWeight: 300,
                        }}
                      >
                        <PortableText value={item.answer} />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .faq-wrap { grid-template-columns: 1fr !important; }
          .faq-intro { position: static !important; }
        }
      `}</style>
    </section>
  )
}
