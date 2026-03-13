import { languages, type Language, defaultLang } from '@/lib/i18n'
import LocationClient from './LocationClient'

export function generateStaticParams() {
  return Object.keys(languages).map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }) {
  const lang = params.lang as Language
  const validLang = languages[lang] ? lang : defaultLang
  
  const titles = {
    pt: 'Localização | Melodie Pousada',
    es: 'Ubicación | Melodie Pousada',
    en: 'Location | Melodie Pousada',
  }
  
  return {
    title: titles[validLang],
  }
}

export default function LocationPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Language
  const validLang = languages[lang] ? lang : defaultLang
  return <LocationClient lang={validLang} />
}

