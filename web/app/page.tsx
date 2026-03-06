export const revalidate = 60

import { client } from '@/lib/sanity'
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
import ReviewCard from '@/components/ReviewCard'
import ProjectCard from '@/components/ProjectCard'
import FaqSection from '@/components/FaqSection'
import ContactForm from '@/components/ContactForm'
import Link from 'next/link'

// Static fallback reviews
const REVIEWS = [
  {
    text: 'Tok raskt tak i et komplekst problem som forrige firma ikke fulgte opp. Profesjonelt og grundig fra start til slutt.',
    name: 'Svetlana Jakšić',
    role: 'Boligeier, Bergen',
  },
  {
    text: 'Ryddig service, god kommunikasjon og tydelig tilbakemelding på anleggets tilstand. Bruker dem fast.',
    name: 'Jan Olsen',
    role: 'Eiendomsforvalter',
  },
  {
    text: 'Serviceavtalen fungerer utmerket. Styret får alltid dokumentasjon etter på – enkelt og oversiktlig.',
    name: 'Arne Dahl',
    role: 'Styreleder, borettslag',
  },
]

// Static fallback projects
const FALLBACK_PROJECTS: ReferenceProject[] = [
  {
    _id: '1',
    title: 'Utskifting av aggregat – Enebolig',
    slug: { current: 'utskifting-aggregat-enebolig' },
    category: 'Enebolig',
    serviceType: 'Utskifting av aggregat',
    description: 'Utskifting av eldre ventilasjonsaggregat til nytt energieffektivt anlegg.',
    detail: 'Full demontering, montering, innregulering og dokumentert funksjonstest.',
  },
  {
    _id: '2',
    title: 'Borettslag – Serviceavtale og oppfølging',
    slug: { current: 'borettslag-serviceavtale' },
    category: 'Borettslag',
    serviceType: 'Serviceavtale',
    description: 'Løpende service og vedlikehold av felles ventilasjonsanlegg.',
    detail: 'Fast kontroll, dokumentasjon til styret og planlagt utskifting ved behov.',
  },
  {
    _id: '3',
    title: 'Kanalrens og innregulering',
    slug: { current: 'kanalrens-innregulering' },
    category: 'Kanalrens',
    serviceType: 'Kanalrens og innregulering',
    description: 'Rengjøring av kanaler og komponenter. Måling og justering av luftmengder.',
    detail: 'Korrekt balanse og stabil drift dokumentert med målerapport.',
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
              <h2 className="stitle">Tjenester</h2>
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
                { num: '01', name: 'Service og vedlikehold', desc: 'Filterbytte, kontroll av luftmengder, varmegjenvinner, vifter og styresystem.' },
                { num: '02', name: 'Kanalrens', desc: 'Rengjøring av vifte, motor, kanaler og kjøkkenavtrekk. Måling og justering.' },
                { num: '03', name: 'Innregulering', desc: 'Riktig luftmengde i alle rom. Optimalisering av tilluft og avtrekk for lavere energibruk.' },
                { num: '04', name: 'Montasje og utskifting', desc: 'Montasje av aggregat, ventilasjonsanlegg og avtrekksvifter for bolig og næring.' },
                { num: '05', name: 'Serviceavtale', desc: 'Fast avtale med dokumentasjon og oppfølging. Anbefalt for borettslag og sameier.' },
                { num: '06', name: 'For borettslag og næring', desc: 'Tilpassede løsninger for sameier, borettslag og mindre næringsbygg. Tydelig dokumentasjon til styret.', hl: true },
              ].map((s, i) => (
                <div
                  key={s.num}
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
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '0.75rem', fontWeight: 700, color: 'var(--amid)', marginBottom: 20, letterSpacing: '0.1em' }}>{s.num}</div>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 12, lineHeight: 1.2 }}>{s.name}</div>
                  <p style={{ fontSize: '0.855rem', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          )}
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
      <section id="prosess" style={{ background: 'var(--dark)', padding: '108px 5%' }}>
        <div className="inner">
          <div className="slabel reveal" style={{ color: 'var(--amid)' }}>Arbeidsmetode</div>
          <h2 className="stitle reveal" style={{ color: '#f5f0e8' }}>Slik jobber vi</h2>
          <p className="sdesc reveal" style={{ color: '#6a6050' }}>
            Vi følger en fast struktur på alle oppdrag – fra første kontakt til ferdig dokumentasjon.
          </p>
          <div
            className="process-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 1,
              marginTop: 60,
              background: 'var(--dark3)',
              borderRadius: 6,
              overflow: 'hidden',
            }}
          >
            {[
              { num: '01', name: 'Kartlegging', desc: 'Vi går gjennom anlegget og lytter til dine erfaringer for å få full oversikt før vi starter.' },
              { num: '02', name: 'Gjennomføring', desc: 'Service, rens eller montasje utføres fagmessig og effektivt etter avtalte spesifikasjoner.' },
              { num: '03', name: 'Kontroll og dokumentasjon', desc: 'Alle målinger og tiltak dokumenteres. Borettslag og sameier får rapport til styret.' },
              { num: '04', name: 'Oppfølging', desc: 'Vi følger opp kundene over tid. Vi selger ikke engangsoppdrag – vi bygger relasjoner.' },
            ].map((step) => (
              <div
                key={step.num}
                className="pstep reveal"
                style={{
                  background: 'var(--dark2)',
                  padding: '48px 36px',
                  position: 'relative',
                  transition: 'background 0.25s',
                }}
              >
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '3rem', fontWeight: 700, color: 'var(--amber)', lineHeight: 1, marginBottom: 28, opacity: 0.9 }}>{step.num}</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', fontWeight: 700, color: '#e8dfc8', marginBottom: 14 }}>{step.name}</div>
                <p style={{ fontSize: '0.845rem', color: '#7a6e5e', lineHeight: 1.7, fontWeight: 300 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .pstep:hover { background: #2e2818 !important; }
          @media (max-width: 980px) {
            .process-grid { grid-template-columns: 1fr 1fr !important; }
          }
          @media (max-width: 640px) {
            .process-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
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
                Straume Boligvent er en spesialisert tjeneste fra Straume Tekniske AS, etablert i 2012 med bred erfaring innen tekniske installasjoner.
              </p>
              <p style={{ fontSize: '0.925rem', color: 'var(--muted)', lineHeight: 1.8, marginBottom: 16, fontWeight: 300 }}>
                Vi samarbeider tett med Straume Tekniske, noe som gir oss tilgang til et bredt fagmiljø – bak én kontaktperson og ett ansvar.
              </p>
              <div className="checklist">
                {[
                  'Sertifiserte teknikere med dokumentert kompetanse',
                  'Erfaring med Flexit, Systemair og Ventiståhl',
                  'Komplett leveranse – service til montasje',
                  'Tydelig dokumentasjon til borettslag og sameier',
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

      {/* ─── ANMELDELSER ─── */}
      <section id="anmeldelser" style={{ background: 'var(--white)', padding: '108px 5%' }}>
        <div className="inner">
          <div className="slabel reveal">Erfaringer</div>
          <h2 className="stitle reveal">Kundene sier</h2>
          <div
            className="reviews-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 24,
              marginTop: 60,
            }}
          >
            {REVIEWS.map((r) => (
              <ReviewCard key={r.name} text={r.text} name={r.name} role={r.role} />
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 980px) { .reviews-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 640px) { .reviews-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ─── PROSJEKTER ─── */}
      <section id="prosjekter" style={{ background: 'var(--warm)', padding: '108px 5%' }}>
        <div className="inner">
          <div className="slabel reveal">Referanser</div>
          <h2 className="stitle reveal">Utførte prosjekter</h2>
          <p className="sdesc reveal">
            Et utvalg av arbeid vi har gjennomført for boligeiere og borettslag i Bergen og omegn.
          </p>
          <div
            className="proj-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 24,
              marginTop: 60,
            }}
          >
            {displayProjects.slice(0, 3).map((p) => (
              <ProjectCard key={p._id} project={p} />
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 980px) { .proj-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 640px) { .proj-grid { grid-template-columns: 1fr !important; } }
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
                  { lbl: 'Telefon', val: settings?.phone || '561 26 800' },
                  { lbl: 'E-post', val: settings?.email || 'ordre@straumetekniske.no' },
                  { lbl: 'Adresse', val: settings?.address || 'Idrettsveien 93, 5353 Straume' },
                ].map((row) => (
                  <div key={row.lbl} style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--sec)', width: 64, flexShrink: 0, paddingTop: 3 }}>
                      {row.lbl}
                    </span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--body)', lineHeight: 1.6 }}>{row.val}</span>
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
