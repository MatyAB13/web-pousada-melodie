'use client'

import { type Language } from '@/lib/i18n'
import { motion } from 'framer-motion'
import { Users, Bed, Waves } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const roomsData = {
  pt: {
    title: 'Nossas Acomodações',
    subtitle: 'Conforto e estilo em cada detalhe',
    book: 'Reservar Agora',
    perNight: '/noite',
    guests: 'hóspedes',
    beds: 'camas',
  },
  es: {
    title: 'Nuestros Alojamientos',
    subtitle: 'Comodidad y estilo en cada detalle',
    book: 'Reservar Ahora',
    perNight: '/noche',
    guests: 'huéspedes',
    beds: 'camas',
  },
  en: {
    title: 'Our Accommodations',
    subtitle: 'Comfort and style in every detail',
    book: 'Book Now',
    perNight: '/night',
    guests: 'guests',
    beds: 'beds',
  },
}

const rooms = [
  {
    id: 1,
    name: { pt: 'Cobertura', es: 'Terraza', en: 'Rooftop' },
    description: { 
      pt: 'Exclusiva cobertura com vista 360° do mar e dunas, perfeita para grupos grandes.', 
      es: 'Exclusiva terraza con vista 360° del mar y dunas, perfecta para grupos grandes.',
      en: 'Exclusive rooftop with 360° view of sea and dunes, perfect for large groups.' 
    },
    price: 600,
    capacity: 10,
    capacityMin: 8,
    beds: 5,
    view: 'sea',
    image: '/images/rooms/cobertura.jpg',
    amenities: ['Wi-Fi', 'TV', 'Ar Condicionado'],
  },
  {
    id: 2,
    name: { pt: 'Frente de Mar 1', es: 'Frente al Mar 1', en: 'Beachfront 1' },
    description: { 
      pt: 'Luxo frente ao mar com vista panorâmica.', 
      es: 'Lujo frente al mar con vista panorámica.',
      en: 'Luxury beachfront with panoramic view.' 
    },
    price: 400,
    capacity: 4,
    capacityMin: 1,
    beds: 2,
    view: 'sea',
    image: '/images/rooms/frente-de-mar-1.jpg',
    amenities: ['Wi-Fi', 'TV', 'Ar Condicionado'],
  },
  {
    id: 3,
    name: { pt: 'Frente de Mar 2', es: 'Frente al Mar 2', en: 'Beachfront 2' },
    description: { 
      pt: 'Espaçoso quarto frente ao mar.', 
      es: 'Espacioso cuarto frente al mar.',
      en: 'Spacious beachfront room.' 
    },
    price: 400,
    capacity: 4,
    capacityMin: 1,
    beds: 2,
    view: 'sea',
    image: '/images/rooms/frente-de-mar-2.jpg',
    amenities: ['Wi-Fi', 'TV', 'Ar Condicionado'],
  },
  {
    id: 4,
    name: { pt: 'Casal 1', es: 'Pareja 1', en: 'Couple 1' },
    description: { 
      pt: 'Romântico quarto de casal com vista para o mar.', 
      es: 'Romántica habitación de pareja con vista al mar.',
      en: 'Romantic couple room with sea view.' 
    },
    price: 250,
    capacity: 2,
    capacityMin: 2,
    beds: 1,
    view: 'sea',
    image: '/images/rooms/casal-1.jpg',
    amenities: ['Wi-Fi', 'TV', 'Ar Condicionado'],
  },
  {
    id: 5,
    name: { pt: 'Casal 2', es: 'Pareja 2', en: 'Couple 2' },
    description: { 
      pt: 'Acolhedor quarto de casal com vista para o mar.', 
      es: 'Acogedora habitación de pareja con vista al mar.',
      en: 'Cozy couple room with sea view.' 
    },
    price: 250,
    capacity: 2,
    capacityMin: 2,
    beds: 1,
    view: 'sea',
    image: '/images/rooms/casal-2.jpg',
    amenities: ['Wi-Fi', 'TV', 'Ar Condicionado'],
  },
  {
    id: 6,
    name: { pt: 'Casal 3', es: 'Pareja 3', en: 'Couple 3' },
    description: { 
      pt: 'Confortável quarto de casal com vista para o mar.', 
      es: 'Cómoda habitación de pareja con vista al mar.',
      en: 'Comfortable couple room with sea view.' 
    },
    price: 250,
    capacity: 2,
    capacityMin: 2,
    beds: 1,
    view: 'sea',
    image: '/images/rooms/casal-3.jpg',
    amenities: ['Wi-Fi', 'TV', 'Ar Condicionado'],
  },
  {
    id: 7,
    name: { pt: 'Duplex 1', es: 'Dúplex 1', en: 'Duplex 1' },
    description: { 
      pt: 'Espaçoso quarto duplex sem vista para o mar, perfeito para famílias grandes.', 
      es: 'Espacioso cuarto dúplex sin vista al mar, perfecto para familias grandes.',
      en: 'Spacious duplex room without sea view, perfect for large families.' 
    },
    price: 350,
    capacity: 8,
    capacityMin: 8,
    beds: 4,
    view: 'garden',
    image: '/images/rooms/duplex-1.jpg',
    amenities: ['Wi-Fi', 'TV', 'Ar Condicionado', 'Cozinha'],
  },
  {
    id: 8,
    name: { pt: 'Duplex 2', es: 'Dúplex 2', en: 'Duplex 2' },
    description: { 
      pt: 'Confortável quarto duplex com vista para o mar.', 
      es: 'Cómodo cuarto dúplex con vista al mar.',
      en: 'Comfortable duplex room with sea view.' 
    },
    price: 350,
    capacity: 8,
    capacityMin: 8,
    beds: 4,
    view: 'sea',
    image: '/images/rooms/duplex-2.jpg',
    amenities: ['Wi-Fi', 'TV', 'Ar Condicionado', 'Cozinha'],
  },
]

export default function RoomsClient({ lang }: { lang: Language }) {
  const t = roomsData[lang] || roomsData.pt

  return (
    <div className="min-h-screen bg-ocean-50 pt-24 pb-12">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-primary mb-4">
            {t.title}
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Áreas Comuns */}
        <div className="bg-white rounded-2xl p-6 mb-12 shadow-soft">
          <h2 className="font-heading text-xl text-primary mb-4 text-center">
            {lang === 'pt' ? 'Áreas Comuns' : lang === 'es' ? 'Áreas Comunes' : 'Common Areas'}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-ocean-100 text-primary px-4 py-2 rounded-full">
              🌊 {lang === 'pt' ? 'Frente ao Mar' : lang === 'es' ? 'Frente al Mar' : 'Beachfront'}
            </span>
            <span className="bg-ocean-100 text-primary px-4 py-2 rounded-full">
              🍖 {lang === 'pt' ? 'Churrasqueira' : lang === 'es' ? 'Parrilla/Asador' : 'BBQ Grill'}
            </span>
            <span className="bg-ocean-100 text-primary px-4 py-2 rounded-full">
              🅿️ {lang === 'pt' ? 'Estacionamento' : lang === 'es' ? 'Estacionamiento' : 'Parking'}
            </span>
            <span className="bg-ocean-100 text-primary px-4 py-2 rounded-full">
              🏖️ {lang === 'pt' ? 'Cadeiras e Sombrinhas' : lang === 'es' ? 'Sillas y Sombrillas' : 'Chairs and Umbrellas'}
            </span>
            <span className="bg-ocean-100 text-primary px-4 py-2 rounded-full">
              🐾 {lang === 'pt' ? 'Aceitamos Pets' : lang === 'es' ? 'Aceptamos Mascotas' : 'Pet Friendly'}
            </span>
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="card overflow-hidden"
            >
              {/* Room Image */}
              <div className="aspect-[4/3] relative overflow-hidden bg-ocean-200">
                <Image
                  src={room.image}
                  alt={room.name[lang as keyof typeof room.name]}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {room.view === 'sea' ? (
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 px-3 py-1 rounded-full">
                    <Waves className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">
                      {lang === 'pt' ? 'Vista Mar' : lang === 'es' ? 'Vista Mar' : 'Sea View'}
                    </span>
                  </div>
                ) : (
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 px-3 py-1 rounded-full">
                    <span className="text-sm font-medium text-primary">
                      {lang === 'pt' ? 'Sem Vista Mar' : lang === 'es' ? 'Sin Vista Mar' : 'No Sea View'}
                    </span>
                  </div>
                )}
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="bg-accent text-white px-4 py-2 rounded-full font-semibold">
                    R$ {room.price} <span className="text-sm font-normal">{t.perNight}</span>
                  </span>
                </div>
              </div>

              {/* Room Info */}
              <div className="p-6">
                <h3 className="font-heading text-xl text-primary mb-2">
                  {room.name[lang as keyof typeof room.name]}
                </h3>
                <p className="text-text-secondary text-sm mb-4">
                  {room.description[lang as keyof typeof room.description]}
                </p>

                {/* Room Details */}
                <div className="flex gap-4 mb-4 text-sm text-text-secondary">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>
                      {room.capacityMin}{room.capacity > room.capacityMin ? ` - ${room.capacity}` : ''} {t.guests}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bed className="w-4 h-4" />
                    <span>{room.beds} {t.beds}</span>
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {room.amenities.slice(0, 4).map((amenity, i) => (
                    <span key={i} className="text-xs bg-ocean-50 text-primary px-2 py-1 rounded-full">
                      {amenity}
                    </span>
                  ))}
                </div>

                {/* Book Button */}
                <Link 
                  href={`/${lang}/reservas`}
                  className="btn-primary w-full text-center block"
                >
                  {t.book}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}


