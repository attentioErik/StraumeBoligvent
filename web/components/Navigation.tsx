'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/#tjenester', label: 'Tjenester' },
  { href: '/borettslag', label: 'Borettslag' },
  { href: '/referanser', label: 'Referanser' },
  { href: '/blog', label: 'Artikler' },
  { href: '/om-oss', label: 'Om oss' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const showStickyBar = pathname !== '/kontakt' && pathname !== '/inngang'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        height: 68,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 5%',
        background: 'rgba(253,252,249,0.97)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--ll)',
        boxShadow: scrolled ? '0 2px 24px rgba(20,16,8,0.07)' : 'none',
        transition: 'box-shadow 0.3s',
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <span style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.01em', color: 'var(--ink)', whiteSpace: 'nowrap' }}>
          Straume <span style={{ color: 'var(--amber)' }}>Boligvent</span>
        </span>
        <span style={{ color: 'var(--lm)', fontSize: '1rem', fontWeight: 300, lineHeight: 1, flexShrink: 0 }}>|</span>
        <Image
          src="https://ucarecdn.com/09cfc539-0376-4f05-a8a6-113d3739a405/Straume_Tekniske_AS_Lys.png"
          alt="Straume Tekniske AS"
          height={16}
          width={100}
          style={{ objectFit: 'contain', objectPosition: 'left', flexShrink: 0 }}
          unoptimized
        />
      </Link>

      {/* Desktop nav links */}
      <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              fontSize: '0.84rem',
              fontWeight: 400,
              color: 'var(--muted)',
              textDecoration: 'none',
              letterSpacing: '0.01em',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
          >
            {link.label}
          </Link>
        ))}
        <Link href="/kontakt" className="btn-amber" style={{ marginLeft: 8 }}>
          Ta kontakt
        </Link>
      </div>

      {/* Mobile hamburger */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Meny"
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 8,
          color: 'var(--ink)',
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {menuOpen ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <>
              <path d="M3 12h18M3 6h18M3 18h18" />
            </>
          )}
        </svg>
      </button>

      {/* Mobile dropdown */}
      <div
        style={{
          position: 'absolute',
          top: 68,
          left: 0,
          right: 0,
          background: 'rgba(253,252,249,0.98)',
          borderBottom: menuOpen ? '1px solid var(--ll)' : 'none',
          backdropFilter: 'blur(16px)',
          padding: '16px 5%',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          opacity: menuOpen ? 1 : 0,
          visibility: menuOpen ? 'visible' : 'hidden',
          transform: menuOpen ? 'translateY(0)' : 'translateY(-8px)',
          transition: 'opacity 0.22s ease, transform 0.22s ease, visibility 0.22s',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            style={{
              fontSize: '0.95rem',
              fontWeight: 400,
              color: 'var(--body)',
              textDecoration: 'none',
              padding: '12px 0',
              borderBottom: '1px solid var(--ll)',
            }}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/kontakt"
          onClick={() => setMenuOpen(false)}
          className="btn-amber"
          style={{ marginTop: 12, justifyContent: 'center' }}
        >
          Ta kontakt
        </Link>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .nav-links { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>

    </>
  )
}
