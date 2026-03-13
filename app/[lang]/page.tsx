import { languages, type Language, defaultLang } from '@/lib/i18n'
import HomeClient from './HomeClient'

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
    pt: 'Melodie Pousada à Beira Mar | Hospedagem em Ingleses Norte Florianópolis',
    es: 'Melodie Pousada à Beira Mar | Hospedaje en Ingleses Norte Florianopolis',
    en: 'Melodie Pousada à Beira Mar | Accommodation in Ingleses Norte Florianopolis',
  }

  const descriptions = {
    pt: 'Pousada frente ao mar em Ingleses Norte, Florianópolis. Hospedagem familiar com acesso direto à praia, churrasqueira e mirante. Avaliação 4.9 estrelas!',
    es: 'Pousada frente al mar en Ingleses Norte, Florianopolis. Hospedaje familiar con acceso directo a la playa, parrilla y mirador. Calificación 4.9 estrellas!',
    en: 'Beachfront pousada in Ingleses Norte, Florianopolis. Family lodging with direct beach access, BBQ grill and viewpoint. 4.9 star rating!',
  }

  return {
    title: titles[validLang],
    description: descriptions[validLang],
    alternates: {
      canonical: `https://melodiepousada.com.br/${validLang}`,
      languages: {
        pt: 'https://melodiepousada.com.br/pt',
        es: 'https://melodiepousada.com.br/es',
        en: 'https://melodiepousada.com.br/en',
      },
    },
  }
}

export default function HomePage({ 
  params 
}: { 
  params: { lang: string } 
}) {
  const lang = params.lang as Language
  const validLang = (languages[lang] ? lang : defaultLang) as Language

  return <HomeClient lang={validLang} />
}

