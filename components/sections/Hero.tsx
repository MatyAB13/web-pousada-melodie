'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronDown, Star, MapPin } from 'lucide-react'
import { type Language } from '@/lib/i18n'

interface HeroProps {
  lang: Language
}

const heroContent = {
  pt: {
    title: 'Melodie Pousada à Beira Mar',
    subtitle: 'Seu refúgio perfeito frente ao mar',
    description: 'Experimente a verdadeira hospitalidade brasileira em um paraíso tropical. Relaxe em nossas acomodações confortáveis com vista para o mar.',
    cta: 'Reserve Sua Estadia',
    ctaLink: '/pt/reservas',
    rating: '4.9',
    reviews: '58 avaliações',
    location: 'Ingleses Norte, Florianópolis',
  },
  es: {
    title: 'Melodie Pousada à Beira Mar',
    subtitle: 'Tu refugio perfecto frente al mar',
    description: 'Experimenta la verdadera hospitalidad brasileña en un paraíso tropical. Relájate en nuestros alojamientos cómodos con vista al mar.',
    cta: 'Reserve Tu Estancia',
    ctaLink: '/es/reservas',
    rating: '4.9',
    reviews: '58 evaluaciones',
    location: 'Ingleses Norte, Florianópolis',
  },
  en: {
    title: 'Melodie Pousada à Beira Mar',
    subtitle: 'Your perfect seaside retreat',
    description: 'Experience true Brazilian hospitality in a tropical paradise. Relax in our comfortable accommodations with ocean views.',
    cta: 'Book Your Stay',
    ctaLink: '/en/reservas',
    rating: '4.9',
    reviews: '58 reviews',
    location: 'Ingleses Norte, Florianopolis',
  },
}

export default function Hero({ lang }: HeroProps) {
  const [scrollY, setScrollY] = useState(0)
  const content = heroContent[lang] || heroContent.pt

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80)',
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pattern-waves opacity-30" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Rating Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 mb-6"
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-accent text-accent" />
              ))}
            </div>
            <span className="text-white text-sm font-medium">
              {content.rating} • {content.reviews}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4 leading-tight"
          >
            {content.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-accent text-xl md:text-2xl text-white/90 mb-6"
          >
            {content.subtitle}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            {content.description}
          </motion.p>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-2 text-white/70 mb-8"
          >
            <MapPin className="w-5 h-5" />
            <span className="text-sm">{content.location}</span>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Link
              href={content.ctaLink}
              className="inline-flex btn-accent text-lg px-8 py-4"
            >
              {content.cta}
              <ChevronDown className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-8 h-12 rounded-full border-2 border-white/50 flex justify-center pt-2"
          >
            <div className="w-1.5 h-3 bg-white rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

