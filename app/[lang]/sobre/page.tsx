import { languages, type Language, defaultLang } from '@/lib/i18n'
import AboutClient from './AboutClient'

export function generateStaticParams() {
  return Object.keys(languages).map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }) {
  const lang = params.lang as Language
  const validLang = languages[lang] ? lang : defaultLang
  
  const titles = {
    pt: 'Sobre Nós | Melodie Pousada',
    es: 'Sobre Nosotros | Melodie Pousada',
    en: 'About Us | Melodie Pousada',
  }
  
  return {
    title: titles[validLang],
  }
}

export default function AboutPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Language
  const validLang = languages[lang] ? lang : defaultLang
  return <AboutClient lang={validLang} />
}

