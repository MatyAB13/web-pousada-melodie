import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : process.env.NEXT_PUBLIC_BASE_URL 
        ? `https://${process.env.NEXT_PUBLIC_BASE_URL}`
        : 'https://melodiepousada.com.br'
  ),
  title: 'Melodie Pousada à Beira Mar | Hospedagem em Ingleses Norte',
  description: 'Pousada frente ao mar em Ingleses Norte, Florianópolis. Hospedagem familiar com acesso direto à praia, churrasqueira e mirante. Avaliação 4.9 estrelas!',
  keywords: 'pousada, florianopolis, inglesa, frente ao mar, hotel, hospedagem',
  authors: [{ name: 'Melodie Pousada' }],
  openGraph: {
    title: 'Melodie Pousada à Beira Mar',
    description: 'Seu refúgio perfeito frente ao mar em Ingleses Norte, Florianópolis',
    type: 'website',
    locale: 'pt_BR',
    alternateLocale: ['es_ES', 'en_US'],
    siteName: 'Melodie Pousada',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Melodie Pousada à Beira Mar',
    description: 'Seu refúgio perfeito frente ao mar em Ingleses Norte, Florianópolis',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className={inter.className}>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#0D4F4F',
              color: '#fff',
            },
            success: {
              iconTheme: {
                primary: '#FF8C42',
                secondary: '#fff',
              },
            },
          }}
        />
        {children}
      </body>
    </html>
  )
}

