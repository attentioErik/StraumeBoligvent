'use client'

import { useEffect, useState } from 'react'

// Samme mottak som ContactForm
const ENDPOINT = 'https://usebasin.com/f/a4f5a134dfe9'

type Field = 'navn' | 'telefon' | 'adresse'

const rules: Record<Field, (v: string) => boolean> = {
  navn: (v) => v.trim().length > 1,
  telefon: (v) => /^(\+?47)?\d{8}$/.test(v.replace(/[\s\-()]/g, '')),
  adresse: (v) => v.trim().length > 1,
}

const mnd = ['jan.', 'feb.', 'mars', 'apr.', 'mai', 'juni', 'juli', 'aug.', 'sep.', 'okt.', 'nov.', 'des.']

function isoWeek(d: Date) {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  const day = t.getUTCDay() || 7
  t.setUTCDate(t.getUTCDate() + 4 - day)
  const y = new Date(Date.UTC(t.getUTCFullYear(), 0, 1))
  return Math.ceil(((+t - +y) / 864e5 + 1) / 7)
}

// De neste 8 ukene, fra og med neste mandag
function nextWeeks() {
  const mon = new Date()
  mon.setHours(0, 0, 0, 0)
  mon.setDate(mon.getDate() + ((8 - (mon.getDay() || 7)) % 7 || 7))
  return Array.from({ length: 8 }, (_, i) => {
    const a = new Date(mon)
    a.setDate(mon.getDate() + i * 7)
    const b = new Date(a)
    b.setDate(a.getDate() + 4)
    const span =
      a.getMonth() === b.getMonth()
        ? `${a.getDate()}.–${b.getDate()}. ${mnd[b.getMonth()]}`
        : `${a.getDate()}. ${mnd[a.getMonth()]}–${b.getDate()}. ${mnd[b.getMonth()]}`
    return `Uke ${isoWeek(a)} (${span})`
  })
}

// Kilde fra UTM-parametere, huskes for økten
function readSource() {
  const q = new URLSearchParams(location.search)
  const parts: string[] = []
  ;['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'].forEach((k) => {
    const v = q.get(k)
    if (v) parts.push(`${k}=${v}`)
  })
  let kilde = parts.join('&')
  try {
    if (kilde) sessionStorage.setItem('kilde', kilde)
    else kilde = sessionStorage.getItem('kilde') || ''
  } catch {}
  return kilde || (document.referrer ? `referrer=${document.referrer}` : 'direkte')
}

export default function OrderForm() {
  const [values, setValues] = useState({ navn: '', telefon: '', adresse: '', epost: '', uke: 'Første ledige', melding: '' })
  const [invalid, setInvalid] = useState<Record<Field, boolean>>({ navn: false, telefon: false, adresse: false })
  const [weeks, setWeeks] = useState<string[]>([])
  const [kilde, setKilde] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    setWeeks(nextWeeks())
    setKilde(readSource())

    // Bestill-knapper: flytt fokus til første felt etter scroll
    let t: ReturnType<typeof setTimeout> | undefined
    const onClick = (e: MouseEvent) => {
      if (!(e.target as Element).closest?.('a[href="#bestill"]')) return
      t = setTimeout(() => document.getElementById('navn')?.focus({ preventScroll: true }), 500)
    }
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('click', onClick)
      if (t) clearTimeout(t)
    }
  }, [])

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    // Fjern feilmeldingen så snart feltet er gyldig
    if (name in rules && rules[name as Field](value)) setInvalid((i) => ({ ...i, [name]: false }))
  }

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const name = e.target.name as Field
    if (e.target.value) setInvalid((i) => ({ ...i, [name]: !rules[name](e.target.value) }))
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const next = { navn: !rules.navn(values.navn), telefon: !rules.telefon(values.telefon), adresse: !rules.adresse(values.adresse) }
    setInvalid(next)
    const first = (Object.keys(next) as Field[]).find((k) => next[k])
    if (first) {
      document.getElementById(first)?.focus()
      return
    }

    setStatus('loading')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: values.navn,
          phone: values.telefon,
          email: values.epost,
          service: 'kanalrens',
          address: values.adresse,
          week: values.uke,
          message: values.melding,
          source: kilde,
        }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="form-done" role="status">
        <h3>Takk, vi har fått bestillingen!</h3>
        <p>Vi ringer deg innen 1 virkedag for å avtale tidspunkt.</p>
      </div>
    )
  }

  const errProps = (f: Field) =>
    invalid[f] ? { 'aria-invalid': true, 'aria-describedby': `${f}-err` } : { 'aria-invalid': false }

  return (
    <form className="form" id="order-form" onSubmit={onSubmit} noValidate>
      <div className={`field${invalid.navn ? ' invalid' : ''}`}>
        <label htmlFor="navn">Navn</label>
        <input id="navn" name="navn" type="text" autoComplete="name" required value={values.navn} onChange={onChange} onBlur={onBlur} {...errProps('navn')} />
        <span className="err" id="navn-err">Skriv inn navnet ditt.</span>
      </div>
      <div className="row2">
        <div className={`field${invalid.telefon ? ' invalid' : ''}`}>
          <label htmlFor="telefon">Telefon</label>
          <input id="telefon" name="telefon" type="tel" inputMode="tel" autoComplete="tel" required value={values.telefon} onChange={onChange} onBlur={onBlur} {...errProps('telefon')} />
          <span className="err" id="telefon-err">Skriv inn et telefonnummer med 8 siffer.</span>
        </div>
        <div className="field">
          <label htmlFor="uke">Ønsket uke</label>
          <select id="uke" name="uke" value={values.uke} onChange={onChange}>
            <option value="Første ledige">Første ledige tid</option>
            {weeks.map((w) => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>
        </div>
      </div>
      <div className={`field${invalid.adresse ? ' invalid' : ''}`}>
        <label htmlFor="adresse">Adresse eller sted</label>
        <input id="adresse" name="adresse" type="text" autoComplete="street-address" placeholder="F.eks. Idrettsveien 1, Straume" required value={values.adresse} onChange={onChange} onBlur={onBlur} {...errProps('adresse')} />
        <span className="err" id="adresse-err">Skriv inn adresse eller sted.</span>
      </div>
      <div className="field">
        <label htmlFor="epost">E-post <span className="opt">(valgfritt)</span></label>
        <input id="epost" name="epost" type="email" autoComplete="email" value={values.epost} onChange={onChange} />
      </div>
      <div className="field">
        <label htmlFor="melding">Melding <span className="opt">(valgfritt)</span></label>
        <textarea id="melding" name="melding" placeholder="F.eks. type anlegg, eller når det passer best" value={values.melding} onChange={onChange} />
      </div>
      <button className="btn btn-primary" id="cta-skjema" type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sender …' : 'Bestill kanalrens'}
      </button>
      {status === 'error' && (
        <p className="form-error" role="alert">
          Noe gikk galt. Prøv igjen, eller ring oss på <a href="tel:56126800">56 12 68 00</a>.
        </p>
      )}
      <p className="form-note">Fast pris før vi starter. Vi ringer deg innen 1 virkedag for å avtale tidspunkt.</p>
    </form>
  )
}
