/**
 * Sporing: GTM (GTM-MP923ZMV) + Attentio Consent (CMP lastes via GTM, site key pk_fdxk4ggn4wfu).
 * Ingen c.js i layout — GTM-malen injecter banneret.
 *
 * Rekkefølge i DOM (må ikke endres):
 * 1) Consent Mode v2-default (beforeInteractive)
 * 2) GTM (beforeInteractive)
 */

export const GTM_ID = 'GTM-MP923ZMV'
export const CONSENT_SITE_KEY = 'pk_fdxk4ggn4wfu'
export const CONSENT_DECLARATION_URL = `https://consent.attentio.no/d/${CONSENT_SITE_KEY}`

/**
 * Consent Mode v2-standard: alt nektet unntatt security_storage.
 * Attentio Consent (via GTM) sender update etter valg / fra att_consent-cookien.
 * wait_for_update 2000 matcher Attentios GTM-mal.
 */
export const consentDefaultsScript = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'denied',personalization_storage:'denied',security_storage:'granted',wait_for_update:2000});
gtag('set','ads_data_redaction',true);`

export const gtmScript = (id: string) =>
  `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${id}');`

/** Push conversion event after Basin confirms receipt. Never include field values. */
export function pushFormSubmitSuccess(formId: string) {
  if (typeof window === 'undefined') return
  const w = window as Window & { dataLayer?: Record<string, unknown>[] }
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push({ event: 'form_submit_success', form_id: formId })
}
