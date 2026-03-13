import { languages, type Language, defaultLang } from '@/lib/i18n'
import { notFound } from 'next/navigation'
import RoomsClient from './RoomsClient'

export function generateStaticParams() {
  return Object.keys(languages).map((lang) => ({ lang }))
}

export async function generateMetadata({ 
  params 
}: { 
  params: { lang: string } 
}) {
  const lang = params.lang as Language
  const validLang = languages[lang] ? lang : defaultLang

  const titles = {
    pt: 'Quartos e Acomodações | Melodie Pousada',
    es: 'Habitaciones y Alojamientos | Melodie Pousada',
    en: 'Rooms and Accommodations | Melodie Pousada',
  }

  const descriptions = {
    pt: 'Confortáveis quartos com vista para o mar em Florianópolis. Acomodações para casais, famílias e grupos. Reserve agora!',
    es: 'Cómodas habitaciones con vista al mar en Florianopolis. Alojamientos para parejas, familias y grupos. Reserve ahora!',
    en: 'Comfortable rooms with sea view in Florianopolis. Accommodations for couples, families and groups. Book now!',
  }

  return {
    title: titles[validLang],
    description: descriptions[validLang],
  }
}

export default function RoomsPage({ 
  params 
}: { 
  params: { lang: string } 
}) {
  const lang = params.lang as Language
  const validLang = languages[lang] ? lang : defaultLang
  
  return <RoomsClient lang={validLang} />
}

