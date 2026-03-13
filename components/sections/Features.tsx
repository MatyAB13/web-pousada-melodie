'use client'

import { motion } from 'framer-motion'
import { Waves, Heart, Bed, MapPin, Flame, Palmtree } from 'lucide-react'
import { type Language } from '@/lib/i18n'

interface FeaturesProps {
  lang: Language
}

const featuresData = {
  pt: {
    title: 'Por que se hospedar conosco?',
    subtitle: 'Uma experiência única de hospedagem',
    features: [
      {
        icon: Waves,
        title: 'Frente ao Mar',
        description: 'Acesso direto à praia de Ingleses Norte, uma das mais belas de Florianópolis'
      },
      {
        icon: Heart,
        title: 'Atendimento Familiar',
        description: 'Fabio e Taiza oferecem atenção personalizada a todos os hóspedes'
      },
      {
        icon: Bed,
        title: 'Conforto',
        description: 'Acomodações confortáveis e bem equipadas para sua máxima comodidade'
      },
      {
        icon: MapPin,
        title: 'Localização Privilegiada',
        description: 'Perto das dunas de Santinho e das melhores atrações de Ingleses'
      },
      {
        icon: Flame,
        title: 'Estrutura Completa',
        description: 'Churrasqueira, mirante, cadeiras e sombrillas para os hóspedes'
      },
      {
        icon: Palmtree,
        title: 'Ambiente Tranquilo',
        description: 'O lugar perfeito para descansar e relaxar em família'
      },
    ],
  },
  es: {
    title: 'Por qué hospedarse con nosotros?',
    subtitle: 'Una experiencia única de hospedaje',
    features: [
      {
        icon: Waves,
        title: 'Frente al Mar',
        description: 'Acceso directo a la playa de Ingleses Norte, una de las más bellas de Florianopolis'
      },
      {
        icon: Heart,
        title: 'Atención Familiar',
        description: 'Fabio y Taiza ofrecen atención personalizada a todos los huéspedes'
      },
      {
        icon: Bed,
        title: 'Comodidad',
        description: 'Alojamientos cómodos y bien equipados para tu máxima comodidad'
      },
      {
        icon: MapPin,
        title: 'Ubicación Privilegiada',
        description: 'Cerca de las dunas de Santinho y las mejores atracciones de Ingleses'
      },
      {
        icon: Flame,
        title: 'Estructura Completa',
        description: 'Parrilla, mirador, sillas y parasoles para los huéspedes'
      },
      {
        icon: Palmtree,
        title: 'Ambiente Tranquilo',
        description: 'El lugar perfecto para descansar y relajarse en familia'
      },
    ],
  },
  en: {
    title: 'Why stay with us?',
    subtitle: 'A unique lodging experience',
    features: [
      {
        icon: Waves,
        title: 'Beachfront',
        description: 'Direct access to Ingleses Norte beach, one of the most beautiful in Florianopolis'
      },
      {
        icon: Heart,
        title: 'Family Service',
        description: 'Fabio and Taiza offer personalized attention to all guests'
      },
      {
        icon: Bed,
        title: 'Comfort',
        description: 'Comfortable and well-equipped accommodations for your maximum comfort'
      },
      {
        icon: MapPin,
        title: 'Prime Location',
        description: 'Near Santinho dunes and the best attractions of Ingleses'
      },
      {
        icon: Flame,
        title: 'Full Facilities',
        description: 'BBQ grill, viewpoint, chairs and umbrellas for guests'
      },
      {
        icon: Palmtree,
        title: 'Peaceful Environment',
        description: 'The perfect place to rest and relax with family'
      },
    ],
  },
}

export default function Features({ lang }: FeaturesProps) {
  const data = featuresData[lang] || featuresData.pt

  return (
    <section className="section-padding bg-ocean-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-primary mb-4">
            {data.title}
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="card p-8 group hover:border-primary/20 border-2 border-transparent"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-xl text-primary mb-3">
                {feature.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

