'use client'

import { type Language } from '@/lib/i18n'
import { motion } from 'framer-motion'
import { Heart, Star, Users } from 'lucide-react'

const aboutData = {
  pt: {
    title: 'Sobre Nós',
    subtitle: 'Nossa História',
    storyTitle: 'Nossa História',
    story: 'Melodie Pousada à Beira Mar nasceu do sonho de oferecer aos hóspedes um lugar especial para descanso e conexão com a natureza. Localizada em Ingleses Norte, uma das regiões mais belas de Florianópolis, a pousada combina conforto, hospitality e a beleza natural do litoral catarinense.',
    ownersTitle: 'Nossos Donos',
    owners: 'Fabio e Taiza são os responsáveis por tornar a experiência de cada hóspede única. Conhecidos por sua excelente atenção e hospitalidade, eles recebem cada visitante como parte da família.',
    philosophyTitle: 'Filosofia',
    philosophy: 'Acreditamos que uma boa hospedagem vai além de uma cama confortável. É sobre criar memórias, oferecer momentos de paz e proporcionar uma experiência que os hóspedes levam no coração.',
    rating: 'Avaliação',
    reviews: 'avaliações',
    guests: 'hóspedes atendidos',
  },
  es: {
    title: 'Sobre Nosotros',
    subtitle: 'Nuestra Historia',
    storyTitle: 'Nuestra Historia',
    story: 'Melodie Pousada à Beira Mar nació del sueño de ofrecer a los huéspedes un lugar especial para descanso y conexión con la naturaleza. Ubicada en Ingleses Norte, una de las regiones más bellas de Florianopolis, la pousada combina comodidad, hospitalidad y la belleza natural del litoral catarinense.',
    ownersTitle: 'Nuestros Dueños',
    owners: 'Fabio y Taiza son los responsables de hacer que la experiencia de cada huésped sea única. Conocidos por su excelente atención y hospitalidad, reciben a cada visitante como parte de la familia.',
    philosophyTitle: 'Filosofía',
    philosophy: 'Creemos que una buena hospedaje va más allá de una cama cómoda. Es sobre crear recuerdos, ofrecer momentos de paz y proporcionar una experiencia que los huéspedes se llevan en el corazón.',
    rating: 'Calificación',
    reviews: 'reseñas',
    guests: 'huéspedes atendidos',
  },
  en: {
    title: 'About Us',
    subtitle: 'Our Story',
    storyTitle: 'Our Story',
    story: 'Melodie Pousada à Beira Mar was born from the dream of offering guests a special place for rest and connection with nature. Located in Ingleses Norte, one of the most beautiful regions of Florianopolis, the pousada combines comfort, hospitality and the natural beauty of the Santa Catarina coast.',
    ownersTitle: 'Our Owners',
    owners: 'Fabio and Taiza are responsible for making each guest\'s experience unique. Known for their excellent service and hospitality, they welcome each visitor as part of the family.',
    philosophyTitle: 'Philosophy',
    philosophy: 'We believe that good lodging goes beyond a comfortable bed. It\'s about creating memories, offering moments of peace and providing an experience that guests carry in their hearts.',
    rating: 'Rating',
    reviews: 'reviews',
    guests: 'guests served',
  },
}

export default function AboutClient({ lang }: { lang: Language }) {
  const t = aboutData[lang] || aboutData.pt

  return (
    <div className="min-h-screen bg-ocean-50 pt-24 pb-12">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-primary mb-4">
            {t.title}
          </h1>
          <p className="text-text-secondary text-lg">{t.subtitle}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-soft p-6 text-center"
          >
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-accent" />
            </div>
            <p className="text-4xl font-heading font-bold text-primary">4.9</p>
            <p className="text-text-secondary">{t.rating}</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-soft p-6 text-center"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <p className="text-4xl font-heading font-bold text-primary">58</p>
            <p className="text-text-secondary">{t.reviews}</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-soft p-6 text-center"
          >
            <div className="w-16 h-16 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <p className="text-4xl font-heading font-bold text-primary">500+</p>
            <p className="text-text-secondary">{t.guests}</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Story */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-soft p-8"
          >
            <h2 className="font-heading text-2xl text-primary mb-4">{t.storyTitle}</h2>
            <p className="text-text-secondary leading-relaxed">{t.story}</p>
          </motion.div>

          {/* Owners */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-soft p-8"
          >
            <h2 className="font-heading text-2xl text-primary mb-4">{t.ownersTitle}</h2>
            <p className="text-text-secondary leading-relaxed">{t.owners}</p>
          </motion.div>

          {/* Philosophy */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-primary text-white rounded-2xl p-8 lg:col-span-2"
          >
            <h2 className="font-heading text-2xl mb-4">{t.philosophyTitle}</h2>
            <p className="text-white/80 leading-relaxed">{t.philosophy}</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

