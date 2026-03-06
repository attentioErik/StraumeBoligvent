'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function InngangsPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    setLoading(false)

    if (res.ok) {
      router.push('/')
      router.refresh()
    } else {
      setError('Feil passord. Prøv igjen.')
      setPassword('')
    }
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'var(--off)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 5%',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 32,
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span
            style={{
              fontFamily: 'Lato, sans-serif',
              fontWeight: 700,
              fontSize: '1rem',
              letterSpacing: '0.01em',
              color: 'var(--ink)',
              whiteSpace: 'nowrap',
            }}
          >
            Straume <span style={{ color: 'var(--amber)' }}>Boligvent</span>
          </span>
          <span style={{ color: 'var(--lm)', fontSize: '1rem', fontWeight: 300 }}>|</span>
          <Image
            src="https://ucarecdn.com/09cfc539-0376-4f05-a8a6-113d3739a405/Straume_Tekniske_AS_Lys.png"
            alt="Straume Tekniske AS"
            height={16}
            width={100}
            style={{ objectFit: 'contain', objectPosition: 'left' }}
            unoptimized
          />
        </div>

        {/* Card */}
        <div
          style={{
            width: '100%',
            background: 'var(--white)',
            border: '1px solid var(--ll)',
            borderRadius: 8,
            padding: '40px',
          }}
        >
          <div
            style={{
              width: 40,
              height: 3,
              background: 'var(--amber)',
              borderRadius: 2,
              marginBottom: 24,
            }}
          />
          <h1
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '1.6rem',
              fontWeight: 700,
              color: 'var(--ink)',
              marginBottom: 8,
              lineHeight: 1.15,
            }}
          >
            Under arbeid
          </h1>
          <p
            style={{
              fontSize: '0.875rem',
              color: 'var(--muted)',
              lineHeight: 1.7,
              fontWeight: 300,
              marginBottom: 28,
            }}
          >
            Nettstedet er under utvikling. Skriv inn passordet for å få tilgang.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label
                htmlFor="password"
                style={{
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                }}
              >
                Passord
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                required
                autoFocus
                style={{
                  background: 'var(--white)',
                  border: `1px solid ${error ? '#c0392b' : 'var(--lm)'}`,
                  color: 'var(--body)',
                  fontFamily: 'Lato, sans-serif',
                  fontSize: '0.875rem',
                  padding: '14px 16px',
                  outline: 'none',
                  borderRadius: 3,
                  width: '100%',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--amber)'
                  e.target.style.boxShadow = '0 0 0 3px rgba(240,165,0,0.12)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = error ? '#c0392b' : 'var(--lm)'
                  e.target.style.boxShadow = 'none'
                }}
              />
              {error && (
                <p style={{ fontSize: '0.8rem', color: '#c0392b', marginTop: 2 }}>{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-amber"
              style={{
                width: '100%',
                padding: 15,
                fontSize: '0.9rem',
                justifyContent: 'center',
                borderRadius: 3,
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? 'Sjekker…' : 'Gå inn'}
            </button>
          </form>
        </div>

        <p style={{ fontSize: '0.75rem', color: 'var(--sec)', textAlign: 'center' }}>
          © {new Date().getFullYear()} Straume Tekniske AS
        </p>
      </div>
    </main>
  )
}
