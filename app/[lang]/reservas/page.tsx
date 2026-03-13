import { languages } from '@/lib/i18n'
import { notFound } from 'next/navigation'
import BookingClient from './BookingClient'

export function generateStaticParams() {
  return Object.keys(languages).map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }) {
  const lang = params.lang as keyof typeof languages
  if (!languages[lang]) notFound()
  
  const titles = {
    pt: 'Reserve Já | Melodie Pousada',
    es: 'Reserve Ya | Melodie Pousada',
    en: 'Book Now | Melodie Pousada',
  }
  
  return {
    title: titles[lang] || titles.pt,
  }
}

export default function BookingPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as keyof typeof languages
  if (!languages[lang]) notFound()
  
  return <BookingClient lang={lang} />
}

