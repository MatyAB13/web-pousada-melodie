'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe } from 'lucide-react'
import { languages, type Language } from '@/lib/i18n'
import { cn } from '@/lib/utils'

interface HeaderProps {
  lang: Language
}

const navItems = {
  pt: [
    { href: '/pt', label: 'Início' },
    { href: '/pt/quartos', label: 'Quartos' },
    { href: '/pt/galeria', label: 'Galeria' },
    { href: '/pt/localizacao', label: 'Localização' },
    { href: '/pt/sobre', label: 'Sobre' },
  ],
  es: [
    { href: '/es', label: 'Inicio' },
    { href: '/es/quartos', label: 'Habitaciones' },
    { href: '/es/galeria', label: 'Galeria' },
    { href: '/es/localizacao', label: 'Ubicación' },
    { href: '/es/sobre', label: 'Sobre' },
  ],
  en: [
    { href: '/en', label: 'Home' },
    { href: '/en/quartos', label: 'Rooms' },
    { href: '/en/galeria', label: 'Gallery' },
    { href: '/en/localizacao', label: 'Location' },
    { href: '/en/sobre', label: 'About' },
  ],
}

export default function Header({ lang }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showLangMenu, setShowLangMenu] = useState(false)
  const pathname = usePathname()

  const items = navItems[lang] || navItems.pt

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const getHrefForLang = (itemHref: string, targetLang: Language): string => {
    if (itemHref === '/pt' || itemHref === '/es' || itemHref === '/en') {
      return `/${targetLang}`
    }
    const currentLang = pathname.split('/')[1]
    return itemHref.replace(`/${currentLang}`, `/${targetLang}`)
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-soft py-3'
          : 'bg-gradient-to-b from-black/40 to-transparent py-5'
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href={`/${lang}`}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-heading text-xl">M</span>
            </div>
            <div className="flex flex-col">
              <span className={cn(
                "font-heading text-lg font-semibold transition-colors",
                isScrolled ? "text-primary" : "text-white"
              )}>
                Melodie
              </span>
              <span className={cn(
                "text-xs transition-colors",
                isScrolled ? "text-text-secondary" : "text-white/80"
              )}>
                Pousada
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-sm font-medium transition-colors hover:text-primary",
                  isScrolled ? "text-text-primary" : "text-white",
                  pathname === item.href && "text-primary"
                )}
              >
                {item.label}
                {pathname === item.href && (
                  <motion.span
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className={cn(
                  "p-2 rounded-full transition-colors",
                  isScrolled ? "hover:bg-ocean-50 text-primary" : "hover:bg-white/20 text-white"
                )}
              >
                <Globe className={cn(
                  "w-5 h-5",
                  isScrolled ? "text-primary" : "text-white"
                )} />
              </button>
              
              <AnimatePresence>
                {showLangMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-medium overflow-hidden"
                  >
                    {Object.entries(languages).map(([key, label]) => (
                      <Link
                        key={key}
                        href={getHrefForLang(pathname, key as Language)}
                        className={cn(
                          "block px-4 py-2 text-sm hover:bg-ocean-50 transition-colors",
                          lang === key ? "text-primary font-medium" : "text-text-primary"
                        )}
                      >
                        {label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Book Now Button */}
            <Link
              href={`/${lang}/reservas`}
              className="hidden md:inline-flex btn-primary text-sm py-2"
            >
              {lang === 'pt' ? 'Reservar' : lang === 'es' ? 'Reservar' : 'Book Now'}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "lg:hidden p-2 rounded-full transition-colors",
                isScrolled ? "hover:bg-ocean-50" : "hover:bg-white/20"
              )}
            >
              {isOpen ? (
                <X className={isScrolled ? "w-6 h-6" : "w-6 h-6 text-white"} />
              ) : (
                <Menu className={isScrolled ? "w-6 h-6" : "w-6 h-6 text-white"} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-ocean-100"
          >
            <nav className="container-custom py-6 flex flex-col gap-4">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-lg font-medium py-2 border-b border-ocean-100",
                    pathname === item.href ? "text-primary" : "text-text-primary"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={`/${lang}/reservas`}
                className="btn-primary text-center mt-4"
              >
                {lang === 'pt' ? 'Reservar Agora' : lang === 'es' ? 'Reservar Ahora' : 'Book Now'}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}


