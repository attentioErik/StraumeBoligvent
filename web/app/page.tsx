export const revalidate = 60

import { client, urlFor } from '@/lib/sanity'
import {
  siteSettingsQuery,
  servicesQuery,
  referenceProjectsQuery,
  faqQuery,
} from '@/lib/queries'
import type { SiteSettings, Service, ReferenceProject, FAQ } from '@/lib/types'

import Image from 'next/image'
import Hero from '@/components/Hero'
import ServiceCard from '@/components/ServiceCard'
import FaqSection from '@/components/FaqSection'
import ContactForm from '@/components/ContactForm'
import Link from 'next/link'
import Script from 'next/script'

// Static fallback projects
const FALLBACK_PROJECTS: ReferenceProject[] = [
  {
    _id: '1',
    title: 'Utskifting av aggregat – Enebolig',
    slug: { current: 'utskifting-aggregat-enebolig' },
  },
  {
    _id: '2',
    title: 'Borettslag – Serviceavtale og oppfølging',
    slug: { current: 'borettslag-serviceavtale' },
  },
  {
    _id: '3',
    title: 'Kanalrens og innregulering',
    slug: { current: 'kanalrens-innregulering' },
  },
]

// Static fallback FAQs
const FALLBACK_FAQS: FAQ[] = [
  {
    _id: 'faq1',
    question: 'Hvor ofte bør ventilasjonsanlegg ha service?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'De fleste anlegg bør ha service én gang per år. Borettslag og næringsbygg med høy belastning kan ha behov for hyppigere oppfølging. Vi anbefaler konkret intervall etter første kartlegging av ditt anlegg.',
          },
        ],
      },
    ],
  },
  {
    _id: 'faq2',
    question: 'Hva koster service?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Prisen varierer etter anleggstype og størrelse. Vi gir alltid et tydelig tilbud etter kartlegging – ingen skjulte kostnader. Ta kontakt for en uforpliktende prat.',
          },
        ],
      },
    ],
  },
  {
    _id: 'faq3',
    question: 'Hvor lang tid tar et servicebesøk?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Et standard servicebesøk tar typisk 1–3 timer avhengig av anleggets størrelse og tilstand. Vi informerer om estimert tid ved bestilling.',
          },
        ],
      },
    ],
  },
  {
    _id: 'faq4',
    question: 'Må jeg være hjemme under besøket?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'For private boliger foretrekker vi at noen er til stede, særlig ved første besøk. For borettslag og sameier avtaler vi adkomst med forvalter.',
          },
        ],
      },
    ],
  },
  {
    _id: 'faq5',
    question: 'Får jeg dokumentasjon etter besøket?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Ja, alltid. Du mottar en servicerapport med alle målinger, utførte tiltak og eventuelle anbefalinger. Borettslag og sameier får rapport tilpasset styret.',
          },
        ],
      },
    ],
  },
  {
    _id: 'faq6',
    question: 'Hva er forskjellen på service og innregulering?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Service innebærer rengjøring og kontroll av anleggets komponenter. Innregulering handler om å balansere luftmengdene i alle rom for optimal ytelse og energieffektivitet.',
          },
        ],
      },
    ],
  },
]

export default async function Home() {
  const [settings, services, projects, faqs] = await Promise.all([
    client.fetch<SiteSettings>(siteSettingsQuery).catch(() => null),
    client.fetch<Service[]>(servicesQuery).catch(() => []),
    client.fetch<ReferenceProject[]>(referenceProjectsQuery).catch(() => []),
    client.fetch<FAQ[]>(faqQuery).catch(() => []),
  ])

  const displayProjects = projects.length > 0 ? projects : FALLBACK_PROJECTS
  const displayFaqs = faqs.length > 0 ? faqs : FALLBACK_FAQS

  return (
    <>
      <Hero settings={settings} />

      {/* ─── TJENESTER ─── */}
      <section id="tjenester" style={{ background: 'var(--off)', padding: '108px 5%' }}>
        <div className="inner">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: 56,
              gap: 32,
            }}
            className="stitle-row"
          >
            <div>
              <div className="slabel">Hva vi gjør</div>
              <h2 className="stitle">Tjenester for bolig og borettslag</h2>
              <p className="sdesc">Fra enkelt filterbytte til full montasje og utskifting av anlegg.</p>
            </div>
          </div>

          {services.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                border: '1px solid var(--ll)',
                borderRadius: 4,
                overflow: 'hidden',
              }}
              className="services-grid"
            >
              {services.map((s, i) => (
                <ServiceCard key={s._id} service={s} index={i} />
              ))}
            </div>
          ) : (
            /* Fallback static grid */
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                border: '1px solid var(--ll)',
                borderRadius: 4,
                overflow: 'hidden',
              }}
              className="services-grid"
            >
              {[
                { icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>), name: 'Service og vedlikehold', desc: 'Filterbytte, kontroll av luftmengder, varmegjenvinner, vifter og styresystem.' },
                { icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/><circle cx="12" cy="12" r="3"/></svg>), name: 'Kanalrens', desc: 'Rengjøring av vifte, motor, kanaler og kjøkkenavtrekk. Måling og justering.' },
                { icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10m0 0l-3 3m3-3l3 3"/><path d="M12 4V2"/><path d="M4 14h16"/><rect x="2" y="6" width="20" height="12" rx="2"/></svg>), name: 'Innregulering', desc: 'Riktig luftmengde i alle rom. Optimalisering av tilluft og avtrekk for lavere energibruk.' },
                { icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 6v12"/><path d="M2 12h20"/><path d="M6 2v4m12-4v4"/></svg>), name: 'Montasje og utskifting', desc: 'Montasje av aggregat, ventilasjonsanlegg og avtrekksvifter for bolig og næring.' },
                { icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4"/><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="M12 6v1m0 10v1"/></svg>), name: 'Serviceavtale', desc: 'Fast avtale med oppfølging. Anbefalt for borettslag og sameier.' },
                { icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>), name: 'For borettslag og næring', desc: 'Tilpassede løsninger for sameier, borettslag og mindre næringsbygg.', hl: true },
              ].map((s, i) => (
                <div
                  key={s.name}
                  className={`scard reveal${s.hl ? ' hl' : ''}`}
                  style={{
                    padding: '40px 36px',
                    borderRight: i % 3 !== 2 ? '1px solid var(--ll)' : undefined,
                    borderBottom: i < 3 ? '1px solid var(--ll)' : undefined,
                    background: s.hl ? 'var(--abg)' : 'var(--white)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'background 0.25s',
                  }}
                >
                  <div className="scard-bar" style={{ position: 'absolute', top: 0, left: 0, width: 3, height: 0, background: 'var(--amber)', transition: 'height 0.3s ease' }} />
                  <div style={{ marginBottom: 20 }}>{s.icon}</div>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 12, lineHeight: 1.2 }}>{s.name}</div>
                  <p style={{ fontSize: '0.855rem', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link href="/kontakt" className="btn-amber">
              Kontakt oss for tilbud
            </Link>
          </div>
        <style>{`
          .services-grid .scard:nth-child(3n) { border-right: none !important; }
          .services-grid .scard:nth-child(n+4) { border-bottom: none !important; }
          .scard:hover { background: var(--alight) !important; }
          .scard.hl:hover { background: #fff3c0 !important; }
          .scard:hover .scard-bar { height: 100% !important; }
          @media (max-width: 980px) {
            .services-grid { grid-template-columns: 1fr 1fr !important; }
            .stitle-row { flex-direction: column; align-items: flex-start; }
          }
          @media (max-width: 640px) {
            .services-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ─── PROSESS ─── */}
      <section id="prosess" style={{ background: '#1e1a12', padding: '108px 5%' }}>
        <div className="inner">
          <div className="slabel reveal" style={{ color: 'var(--amid)' }}>Arbeidsmetode</div>
          <h2 className="stitle reveal" style={{ color: '#f5f0e8' }}>Slik jobber vi</h2>
          <p className="sdesc reveal" style={{ color: '#a89e90' }}>
            Alle oppdrag gjennomføres etter en fast arbeidsmetode – fra kartlegging til oppfølging.
          </p>
          <div
            className="process-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 1,
              marginTop: 60,
              background: '#302a1e',
              borderRadius: 6,
              overflow: 'hidden',
            }}
          >
            {[
              { num: '01', name: 'Kartlegging', desc: 'Vi kontrollerer resultatet av arbeidet og gir tilbakemelding på anleggets tilstand og eventuelle tiltak.' },
              { num: '02', name: 'Utførelse', desc: 'Service, kanalrens eller montasje utføres etter avtalt arbeid.' },
              { num: '03', name: 'Kontroll', desc: 'Vi kontrollerer resultatet av arbeidet og gir tilbakemelding på anleggets tilstand og eventuelle tiltak.' },
              { num: '04', name: 'Oppfølging', desc: 'Vi følger opp kundene over tid og gir anbefalinger for videre vedlikehold.' },
            ].map((step) => (
              <div
                key={step.num}
                className="pstep reveal"
                style={{
                  background: '#272114',
                  padding: '48px 36px',
                  position: 'relative',
                  transition: 'background 0.25s',
                }}
              >
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '3rem', fontWeight: 700, color: 'var(--amber)', lineHeight: 1, marginBottom: 28, opacity: 0.9 }}>{step.num}</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', fontWeight: 700, color: '#f0e8d8', marginBottom: 14 }}>{step.name}</div>
                <p style={{ fontSize: '0.845rem', color: '#a89e90', lineHeight: 1.7, fontWeight: 300 }}>{step.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link href="/kontakt" className="btn-amber">
              Ta kontakt
            </Link>
          </div>
        </div>
        <style>{`
          .pstep:hover { background: #322a1c !important; }
          @media (max-width: 980px) {
            .process-grid { grid-template-columns: 1fr 1fr !important; }
          }
          @media (max-width: 640px) {
            .process-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ─── ANMELDELSER ─── */}
      <section id="anmeldelser" style={{ background: 'var(--white)', padding: '108px 5%' }}>
        <div className="inner">
          <div className="slabel reveal">Erfaringer</div>
          <h2 className="stitle reveal">Hva kundene i Bergen sier</h2>
          <div style={{ marginTop: 60 }}>
            <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
            <div className="elfsight-app-f72eef5c-9e8b-40c6-904b-dd6484fdcb3d" data-elfsight-app-lazy></div>
          </div>
        </div>
      </section>

      {/* ─── BOLIGEIERE ─── */}
      <section id="boligeiere" style={{ background: 'var(--warm)', padding: '108px 5%' }}>
        <div className="inner">
          <div
            className="split"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}
          >
            <div className="reveal">
              <div className="slabel">Boligeiere</div>
              <h2 className="stitle">For deg som eier bolig</h2>
              <p className="sdesc">Ventilasjonsanlegget går hver dag. Regelmessig service gir:</p>
              <div className="checklist">
                {['Bedre inneklima', 'Stabil temperatur', 'Lavere energibruk', 'Lengre levetid på anlegget'].map((item) => (
                  <div key={item} className="citem">
                    <div className="cicon">✓</div>
                    {item}
                  </div>
                ))}
              </div>
              <div className="note">
                Vi tilpasser tiltaket etter boligens behov – ikke mer enn nødvendig.
              </div>
            </div>
            <div className="reveal" style={{ position: 'relative' }}>
              <div
                style={{
                  width: '100%',
                  aspectRatio: '4/3',
                  borderRadius: 6,
                  overflow: 'hidden',
                  boxShadow: '0 16px 48px rgba(20,16,8,0.1)',
                  position: 'relative',
                }}
              >
                <Image
                  src="https://ucarecdn.com/dc624f56-8c72-4b43-8818-149be7a94947/hf_20260224_115140_8d1fc521c6fe470eabf2fe55099a1570.jpeg"
                  alt="For deg som eier bolig"
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    background: 'var(--amber)',
                    color: 'var(--ink)',
                    fontSize: '0.67rem',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    padding: '6px 12px',
                    borderRadius: 2,
                  }}
                >
                  For boligeiere
                </div>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 980px) { .split { grid-template-columns: 1fr !important; gap: 48px !important; } }
        `}</style>
      </section>

      {/* ─── OM OSS ─── */}
      <section id="om-oss" style={{ background: 'var(--off)', padding: '108px 5%' }}>
        <div className="inner">
          <div
            className="split"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}
          >
            <div className="reveal" style={{ position: 'relative' }}>
              <div
                style={{
                  width: '100%',
                  aspectRatio: '4/5',
                  borderRadius: 6,
                  overflow: 'hidden',
                  boxShadow: '0 16px 48px rgba(20,16,8,0.1)',
                  position: 'relative',
                }}
              >
                <Image
                  src="https://ucarecdn.com/3cebd723-9ca8-4376-b03d-c3f0df6ebad4/DSC03897.jpg"
                  alt="Om Straume Boligvent"
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    background: 'var(--amber)',
                    padding: '22px 28px',
                    borderRadius: '6px 0 6px 0',
                  }}
                >
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', fontWeight: 700, color: 'var(--ink)' }}>Straume</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--adark)', marginTop: 5, fontWeight: 700, letterSpacing: '0.04em' }}>Del av Straume Tekniske AS</div>
                </div>
              </div>
            </div>
            <div className="reveal">
              <div className="slabel">Om oss</div>
              <h2 className="stitle">Lokal fagkunnskap.<br />Langsiktige relasjoner.</h2>
              <p style={{ fontSize: '0.925rem', color: 'var(--muted)', lineHeight: 1.8, marginBottom: 16, fontWeight: 300 }}>
                Spesialisert ventilasjon siden 2012 – del av Straume Tekniske AS.
              </p>
              <p style={{ fontSize: '0.925rem', color: 'var(--muted)', lineHeight: 1.8, marginBottom: 16, fontWeight: 300 }}>
                Én kontaktperson, fullt ansvar, bredt fagmiljø i ryggen.
              </p>
              <div className="checklist">
                {[
                  'Sertifiserte teknikere med dokumentert kompetanse',
                  'Erfaring med Flexit, Systemair og Ventiståhl',
                  'Komplett leveranse – service til montasje',
                  'Tilpasset oppfølging for borettslag og sameier',
                  'Langsiktig oppfølging – ikke engangsoppdrag',
                ].map((item) => (
                  <div key={item} className="citem">
                    <div className="cicon">✓</div>
                    {item}
                  </div>
                ))}
              </div>
              <Link href="/kontakt" className="btn-amber" style={{ marginTop: 16, display: 'inline-flex' }}>
                Ta kontakt
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── GALLERI ─── */}
      <section id="galleri" style={{ background: 'var(--warm)', padding: '108px 5%' }}>
        <div className="inner">
          <div className="slabel reveal">Galleri</div>
          <h2 className="stitle reveal">Bilder fra oppdrag i Bergen og omegn</h2>
          <p className="sdesc reveal">
            Et utvalg bilder fra arbeid vi har utført for boligeiere og borettslag i Bergen og omegn.
          </p>
          <div
            className="gallery-home-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 16,
              marginTop: 60,
            }}
          >
            {displayProjects
              .flatMap((p) => (p.galleri || []).map((img) => ({ img, title: p.title, id: p._id })))
              .slice(0, 6)
              .map((item, idx) => (
              <Link
                key={`${item.id}-${idx}`}
                href="/galleri"
                className="gallery-home-item reveal"
                style={{
                  position: 'relative',
                  aspectRatio: '4/3',
                  borderRadius: 6,
                  overflow: 'hidden',
                  display: 'block',
                }}
              >
                <Image
                  src={urlFor(item.img).width(640).height(480).url()}
                  alt={item.img.alt || item.title}
                  fill
                  style={{ objectFit: 'cover', transition: 'transform 0.3s' }}
                />
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/galleri" className="btn-ghost">
              Se hele galleriet →
            </Link>
          </div>
        </div>
        <style>{`
          .gallery-home-item:hover img { transform: scale(1.05); }
          @media (max-width: 980px) { .gallery-home-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 640px) { .gallery-home-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ─── FAQ ─── */}
      <FaqSection faqs={displayFaqs} />

      {/* ─── KONTAKT ─── */}
      <section id="kontakt" style={{ background: 'var(--warm)', padding: '108px 5%' }}>
        <div className="inner">
          <div className="slabel reveal">Kom i gang</div>
          <div
            className="contact-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.4fr',
              gap: 80,
              marginTop: 60,
              alignItems: 'start',
            }}
          >
            <div className="reveal">
              <h2
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(1.9rem, 3vw, 2.8rem)',
                  fontWeight: 700,
                  color: 'var(--ink)',
                  lineHeight: 1.15,
                  marginBottom: 20,
                }}
              >
                Ta kontakt –<br />vi svarer innen<br />én virkedag
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.8, marginBottom: 40, fontWeight: 300 }}>
                Fyll ut skjemaet, eller ring oss direkte. Vi stiller gjerne spørsmål om anlegget ditt for å gi deg riktig tilbud.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { lbl: 'Telefon', val: settings?.phone || '561 26 800', href: `tel:${(settings?.phone || '561 26 800').replace(/\s/g, '')}` },
                  { lbl: 'E-post', val: settings?.email || 'ordre@straumetekniske.no', href: `mailto:${settings?.email || 'ordre@straumetekniske.no'}` },
                  { lbl: 'Adresse', val: settings?.address || 'Idrettsveien 93, 5353 Straume', href: undefined },
                  { lbl: 'Åpent', val: 'Man–Fre 08:00–16:00 · Lør 09:00–15:00', href: undefined },
                ].map((row) => (
                  <div key={row.lbl} style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--sec)', width: 64, flexShrink: 0, paddingTop: 3 }}>
                      {row.lbl}
                    </span>
                    {row.href ? (
                      <a href={row.href} style={{ fontSize: '0.875rem', color: 'var(--adark)', fontWeight: 700, textDecoration: 'none', lineHeight: 1.6 }}>{row.val}</a>
                    ) : (
                      <span style={{ fontSize: '0.875rem', color: 'var(--body)', lineHeight: 1.6 }}>{row.val}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal">
              <ContactForm services={services} />
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 980px) { .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }
        `}</style>
      </section>
    </>
  )
}
