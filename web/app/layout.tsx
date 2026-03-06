import type { Metadata } from 'next'
import '@/styles/globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'
import { client } from '@/lib/sanity'
import { siteSettingsQuery } from '@/lib/queries'
import type { SiteSettings } from '@/lib/types'

export const metadata: Metadata = {
  title: {
    default: 'Straume Boligvent — Ventilasjon for bolig og næring',
    template: '%s | Straume Boligvent',
  },
  description:
    'Komplett leveranse innen ventilasjon i Bergen og omegn. Service, kanalrens, innregulering og montasje.',
  openGraph: {
    siteName: 'Straume Boligvent',
    locale: 'nb_NO',
    type: 'website',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings: SiteSettings | null = await client
    .fetch(siteSettingsQuery)
    .catch(() => null)

  return (
    <html lang="no">
      <body>
        <Navigation />
        <main>{children}</main>
        <Footer settings={settings} />
        <ScrollReveal />
      </body>
    </html>
  )
}
