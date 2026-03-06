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
  icons: {
    icon: [
      { url: 'https://ucarecdn.com/1d19609f-0002-4148-a926-a35653ed9d88/Logo_Sosiale_medier_Lys.png', sizes: '32x32', type: 'image/png' },
      { url: 'https://ucarecdn.com/1d19609f-0002-4148-a926-a35653ed9d88/Logo_Sosiale_medier_Lys.png', sizes: '256x256', type: 'image/png' },
    ],
    apple: 'https://ucarecdn.com/1d19609f-0002-4148-a926-a35653ed9d88/Logo_Sosiale_medier_Lys.png',
  },
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
