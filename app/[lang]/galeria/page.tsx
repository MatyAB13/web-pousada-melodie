import { languages, type Language, defaultLang } from '@/lib/i18n'
import GalleryClient from './GalleryClient'

export function generateStaticParams() {
  return Object.keys(languages).map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }) {
  const lang = params.lang as Language
  const validLang = languages[lang] ? lang : defaultLang
  
  const titles = {
    pt: 'Galeria de Fotos | Melodie Pousada',
    es: 'Galeria de Fotos | Melodie Pousada',
    en: 'Photo Gallery | Melodie Pousada',
  }
  
  return {
    title: titles[validLang],
  }
}

export default function GalleryPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Language
  const validLang = languages[lang] ? lang : defaultLang
  return <GalleryClient lang={validLang} />
}

