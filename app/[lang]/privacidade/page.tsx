import PrivacyPolicy from '../../../privacidade'
import { getDictionary } from '@/lib/i18n'

export async function generateStaticParams() {
  return [
    { lang: 'pt' },
    { lang: 'es' },
    { lang: 'en' },
  ]
}

export default async function Page({ params }: { params: { lang: string } }) {
  const lang = params.lang as 'pt' | 'es' | 'en'
  const dict = await getDictionary(lang)
  
  return <PrivacyPolicy lang={lang} />
}
