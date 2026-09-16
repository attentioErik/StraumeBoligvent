import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import type { SiteSettings } from '@/lib/types'

const DEFAULT_ITEMS: NonNullable<SiteSettings['trustItems']> = [
  { tekst: '12+ års erfaring' },
  { tekst: 'Miljøsertifisert' },
  { tekst: 'EKOM Autorisasjon' },
  { tekst: 'Sentral Godkjent' },
]

export default function TrustBar({ items }: { items?: SiteSettings['trustItems'] }) {
  const list = items && items.length > 0 ? items : DEFAULT_ITEMS

  return (
    <section style={{ background: 'var(--white)', borderBottom: '1px solid var(--ll)', padding: '22px 5%' }}>
      <ul
        className="inner"
        style={{
          listStyle: 'none',
          padding: 0,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '14px 40px',
        }}
      >
        {list.map((item) => (
          <li
            key={item.tekst}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              color: 'var(--ink)',
            }}
          >
            {item.logo ? (
              <Image
                src={urlFor(item.logo).height(64).url()}
                alt=""
                width={64}
                height={32}
                style={{ height: 32, width: 'auto', objectFit: 'contain' }}
              />
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" />
                <path d="M8.5 12l2.5 2.5 4.5-5" />
              </svg>
            )}
            {item.tekst}
          </li>
        ))}
      </ul>
    </section>
  )
}
