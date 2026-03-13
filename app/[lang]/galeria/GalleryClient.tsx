'use client'

import { type Language } from '@/lib/i18n'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const galleryData = {
  pt: {
    title: 'Galeria de Fotos',
    subtitle: 'Momentos inesquecíveis na Melodie Pousada',
    categories: {
      all: 'Todas',
      beach: 'Praia',
      rooms: 'Quartos',
      common: 'Áreas Comuns',
    },
  },
  es: {
    title: 'Galería de Fotos',
    subtitle: 'Momentos inoublables en Melodie Pousada',
    categories: {
      all: 'Todas',
      beach: 'Playa',
      rooms: 'Habitaciones',
      common: 'Áreas Comunes',
    },
  },
  en: {
    title: 'Photo Gallery',
    subtitle: 'Unforgettable moments at Melodie Pousada',
    categories: {
      all: 'All',
      beach: 'Beach',
      rooms: 'Rooms',
      common: 'Common Areas',
    },
  },
}

const images = [
  { id: 1, category: 'beach', src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', alt: 'Praia Ingleses Norte' },
  { id: 2, category: 'rooms', src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800', alt: 'Quarto Duplex' },
  { id: 3, category: 'common', src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', alt: 'Pousada' },
  { id: 4, category: 'beach', src: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800', alt: 'Praia' },
  { id: 5, category: 'rooms', src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800', alt: 'Suite' },
  { id: 6, category: 'common', src: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800', alt: 'Área de Conforto' },
  { id: 7, category: 'beach', src: 'https://images.unsplash.com/photo-1476673160081-cf065607f449?w=800', alt: 'Pôr do sol' },
  { id: 8, category: 'rooms', src: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800', alt: 'Quarto Frente Mar' },
  { id: 9, category: 'common', src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', alt: 'Piscina' },
]

export default function GalleryClient({ lang }: { lang: Language }) {
  const t = galleryData[lang] || galleryData.pt
  const [filter, setFilter] = useState('all')
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const filteredImages = filter === 'all' 
    ? images 
    : images.filter(img => img.category === filter)

  const currentIndex = filteredImages.findIndex(img => img.id === selectedImage)

  const closeLightbox = () => setSelectedImage(null)

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation()
    const idx = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1
    setSelectedImage(filteredImages[idx].id)
  }

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    const idx = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0
    setSelectedImage(filteredImages[idx].id)
  }

  return (
    <div className="min-h-screen bg-ocean-50 pt-24 pb-12">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-primary mb-4">
            {t.title}
          </h1>
          <p className="text-text-secondary text-lg">{t.subtitle}</p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {(['all', 'beach', 'rooms', 'common'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full transition-all ${
                filter === cat 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-text-secondary hover:bg-primary/10'
              }`}
            >
              {t.categories[cat]}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group relative"
              onClick={() => setSelectedImage(image.id)}
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button 
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white p-2 hover:bg-white/20 rounded-full z-10"
            >
              <X className="w-8 h-8" />
            </button>
            
            {/* Previous button */}
            <button 
              onClick={goToPrevious}
              className="absolute left-4 text-white p-2 hover:bg-white/20 rounded-full z-10"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            
            {/* Image container - stop propagation to prevent closing */}
            <div 
              className="relative max-w-full max-h-[80vh]" 
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={filteredImages[currentIndex]?.src}
                alt={filteredImages[currentIndex]?.alt}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
            </div>
            
            {/* Next button */}
            <button 
              onClick={goToNext}
              className="absolute right-4 text-white p-2 hover:bg-white/20 rounded-full z-10"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
              {currentIndex + 1} / {filteredImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

