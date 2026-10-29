export const revalidate = 60

import { client } from '@/lib/sanity'
import { referenceProjectsQuery } from '@/lib/queries'
import type { ReferenceProject } from '@/lib/types'
import type { Metadata } from 'next'
import GalleryGrid from './GalleryGrid'
import '@/styles/landing.css'
import ScrollMotion from '@/components/landing/ScrollMotion'
import { ContactSection } from '@/components/landing/parts'
import { absUrl } from '@/lib/site'

const PAGE_PATH = '/galleri'
const PAGE_TITLE = 'Galleri – referanseprosjekter'
const PAGE_DESC =
  'Se bilder fra ventilasjonsoppdrag vi har utført for boligeiere, borettslag og næringsbygg i Bergen og omegn.'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: { canonical: PAGE_PATH },
  openGraph: { title: PAGE_TITLE, description: PAGE_DESC, url: absUrl(PAGE_PATH), type: 'website' },
  twitter: { title: PAGE_TITLE, description: PAGE_DESC },
}

export default async function GalleriPage() {
  const projects = await client.fetch<ReferenceProject[]>(referenceProjectsQuery).catch(() => [])

  return (
    <div className="kr">
      <ScrollMotion />
      <section className="hero" aria-labelledby="h1">
        <div className="wrap hero-grid no-media">
          <div>
            <span className="hero-eyebrow">Bilder fra oppdrag</span>
            <h1 id="h1">Galleri</h1>
            <p className="hero-sub">Et utvalg bilder fra oppdrag vi har utført for boligeiere, borettslag og sameier i Bergen og omegn.</p>
          </div>
        </div>
      </section>

      <section className="section alt galleri" aria-label="Bilder">
        <div className="wrap">
          <GalleryGrid projects={projects} />
        </div>
      </section>

      <ContactSection title="Vil du ha et lignende resultat?" lead="Fortell oss om anlegget ditt, så gir vi deg en anbefaling og et tydelig tilbud." />
    </div>
  )
}
