import type { Metadata } from 'next'
import '@/styles/globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'
import { client } from '@/lib/sanity'
import { siteSettingsQuery } from '@/lib/queries'
import type { SiteSettings } from '@/lib/types'
import Script from 'next/script'
import { SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE } from '@/lib/site'
import { organizationJsonLd, jsonLdScript } from '@/lib/jsonld'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Straume Boligvent — Ventilasjon for bolig og næring i Bergen og omegn',
    template: '%s | Straume Boligvent',
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: 'Straume Tekniske AS' }],
  creator: 'Straume Tekniske AS',
  publisher: 'Straume Tekniske AS',
  keywords: [
    'ventilasjon',
    'ventilasjon Bergen',
    'kanalrens',
    'ventilasjonsservice',
    'balansert ventilasjon',
    'ventilasjonsanlegg',
    'innregulering',
    'serviceavtale',
    'borettslag',
    'Enova-støtte',
    'Straume Boligvent',
    'Sotra',
    'Øygarden',
  ],
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: 'https://ucarecdn.com/1d19609f-0002-4148-a926-a35653ed9d88/Logo_Sosiale_medier_Lys.png', sizes: '32x32', type: 'image/png' },
      { url: 'https://ucarecdn.com/1d19609f-0002-4148-a926-a35653ed9d88/Logo_Sosiale_medier_Lys.png', sizes: '256x256', type: 'image/png' },
    ],
    apple: 'https://ucarecdn.com/1d19609f-0002-4148-a926-a35653ed9d88/Logo_Sosiale_medier_Lys.png',
  },
  openGraph: {
    siteName: SITE_NAME,
    locale: 'nb_NO',
    type: 'website',
    url: SITE_URL,
    title: 'Straume Boligvent — Ventilasjon for bolig og næring i Bergen og omegn',
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Straume Boligvent',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Straume Boligvent — Ventilasjon for bolig og næring',
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'Ventilasjon',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings: SiteSettings | null = await client
    .fetch(siteSettingsQuery)
    .catch(() => null)

  return (
    <html lang="no">
      <head>
        <Script id="gtm" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MP923ZMV');
        `}</Script>
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MP923ZMV"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(
            organizationJsonLd({
              phone: settings?.phone,
              email: settings?.email,
              address: settings?.address,
            }),
          )}
        />
        <Navigation />
        <main>{children}</main>
        <Footer settings={settings} />
        <ScrollReveal />
        {/* BusinessBooster chatbot */}
        <Script id="bb-config" strategy="beforeInteractive">{`
          window.bbConfig = { clientId: "38c8383e-c7c1-4be9-a0db-17764b5566a8", agentId: "7df4adaf-8168-4101-ace9-718b96d94141" };
        `}</Script>
        <Script src="https://booster-engine.vercel.app/api/widget" strategy="afterInteractive" />
      </body>
    </html>
  )
}
