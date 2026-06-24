export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.straumeboligvent.no').replace(/\/$/, '')

export const SITE_NAME = 'Straume Boligvent'
export const COMPANY_LEGAL_NAME = 'Straume Tekniske AS'
export const ORG_NUMBER = '998 766 834'

export const DEFAULT_OG_IMAGE =
  'https://ucarecdn.com/1d19609f-0002-4148-a926-a35653ed9d88/Logo_Sosiale_medier_Lys.png'

export const DEFAULT_DESCRIPTION =
  'Komplett leveranse innen ventilasjon i Bergen og omegn. Service, kanalrens, innregulering og montasje av ventilasjonsanlegg for bolig, borettslag og næring.'

export function absUrl(path = '/') {
  if (!path.startsWith('/')) path = `/${path}`
  return `${SITE_URL}${path}`
}
