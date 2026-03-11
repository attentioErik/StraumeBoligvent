'use client'

import { useState } from 'react'
import type { Service } from '@/lib/types'

interface ContactFormProps {
  services?: Service[]
  defaultService?: string
}

export default function ContactForm({ services, defaultService }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: defaultService ?? '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('https://usebasin.com/f/a4f5a134dfe9', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', phone: '', email: '', service: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputStyle: React.CSSProperties = {
    background: 'var(--white)',
    border: '1px solid var(--lm)',
    color: 'var(--body)',
    fontFamily: 'Lato, sans-serif',
    fontSize: '0.875rem',
    fontWeight: 400,
    padding: '14px 16px',
    outline: 'none',
    borderRadius: 3,
    width: '100%',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '0.65rem',
    fontWeight: 700,
    letterSpacing: '0.14em',
    textTransform: 'uppercase' as const,
    color: 'var(--muted)',
  }

  if (status === 'success') {
    return (
      <div
        style={{
          padding: '48px 40px',
          background: 'var(--abg)',
          borderRadius: 6,
          border: '1px solid var(--amid)',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '2rem', marginBottom: 16 }}>✓</div>
        <h3
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.4rem',
            fontWeight: 700,
            color: 'var(--ink)',
            marginBottom: 12,
          }}
        >
          Takk for henvendelsen!
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--muted)', fontWeight: 300 }}>
          Vi svarer deg innen én virkedag.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="btn-amber"
          style={{ marginTop: 24 }}
        >
          Send en ny forespørsel
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Name + Phone */}
      <div
        className="form-row"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={labelStyle}>Navn</label>
          <input
            style={inputStyle}
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Ditt navn"
            required
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--amber)'
              e.target.style.boxShadow = '0 0 0 3px rgba(240,165,0,0.12)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--lm)'
              e.target.style.boxShadow = 'none'
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={labelStyle}>Telefon</label>
          <input
            style={inputStyle}
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Mobilnummer"
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--amber)'
              e.target.style.boxShadow = '0 0 0 3px rgba(240,165,0,0.12)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--lm)'
              e.target.style.boxShadow = 'none'
            }}
          />
        </div>
      </div>

      {/* Email */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label style={labelStyle}>E-post</label>
        <input
          style={inputStyle}
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="din@epost.no"
          required
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--amber)'
            e.target.style.boxShadow = '0 0 0 3px rgba(240,165,0,0.12)'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'var(--lm)'
            e.target.style.boxShadow = 'none'
          }}
        />
      </div>

      {/* Service select */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label style={labelStyle}>Hva gjelder det?</label>
        <select
          style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
          name="service"
          value={form.service}
          onChange={handleChange}
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--amber)'
            e.target.style.boxShadow = '0 0 0 3px rgba(240,165,0,0.12)'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'var(--lm)'
            e.target.style.boxShadow = 'none'
          }}
        >
          <option value="">Velg tjeneste</option>
          {services && services.length > 0 ? (
            services.map((s) => (
              <option key={s._id} value={s.slug.current}>
                {s.title}
              </option>
            ))
          ) : (
            <>
              <option>Service og vedlikehold</option>
              <option>Kanalrens</option>
              <option>Innregulering</option>
              <option>Montasje og utskifting</option>
              <option>Serviceavtale</option>
              <option>For borettslag og næring</option>
            </>
          )}
        </select>
      </div>

      {/* Message */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label style={labelStyle}>Melding (valgfritt)</label>
        <textarea
          style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Beskriv anlegget ditt eller hva du lurer på…"
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--amber)'
            e.target.style.boxShadow = '0 0 0 3px rgba(240,165,0,0.12)'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'var(--lm)'
            e.target.style.boxShadow = 'none'
          }}
        />
      </div>

      {status === 'error' && (
        <p style={{ fontSize: '0.85rem', color: '#c0392b' }}>
          Noe gikk galt. Prøv igjen eller ring oss direkte.
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-amber"
          style={{
            width: '100%',
            padding: 15,
            fontSize: '0.9rem',
            justifyContent: 'center',
            borderRadius: 3,
            opacity: status === 'loading' ? 0.7 : 1,
          }}
        >
          {status === 'loading' ? 'Sender…' : 'Send forespørsel'}
        </button>
        <p
          style={{
            fontSize: '0.75rem',
            color: 'var(--sec)',
            marginTop: 8,
            letterSpacing: '0.04em',
          }}
        >
          Vi svarer innen én virkedag
        </p>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </form>
  )
}
