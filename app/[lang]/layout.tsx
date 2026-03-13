import { languages, defaultLang } from '@/lib/i18n'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import '../globals.css'

export function generateStaticParams() {
  return Object.keys(languages).map((lang) => ({ lang }))
}

export async function generateMetadata({ 
  params 
}: { 
  params: { lang: string } 
}) {
  const lang = params.lang as keyof typeof languages
  if (!languages[lang]) notFound()

  return {
    alternates: {
      canonical: `https://melodiepousada.com.br/${lang}`,
      languages: Object.keys(languages).reduce((acc, l) => {
        acc[l] = `https://melodiepousada.com.br/${l}`
        return acc
      }, {} as Record<string, string>),
    },
  }
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const lang = params.lang as keyof typeof languages
  if (!languages[lang]) notFound()

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={lang} />
      <main className="flex-1">
        {children}
      </main>
      <Footer lang={lang} />
      <WhatsAppButton />
    </div>
  )
}

