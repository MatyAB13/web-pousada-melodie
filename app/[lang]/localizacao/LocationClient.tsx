'use client'

import { type Language } from '@/lib/i18n'
import { MapPin, Car, Plane, Utensils, ShoppingCart } from 'lucide-react'

const locationData = {
  pt: {
    title: 'Localização',
    subtitle: 'Encontre nosso paraíso',
    address: 'Endereço',
    howToGet: 'Como Chegar',
    nearby: 'Pontos Próximos',
    getDirections: 'Ver Direções',
    places: {
      beach: 'Praia de Ingleses Norte',
      dunes: 'Dunas de Santinho',
      airport: 'Aeroporto',
      restaurant: 'Restaurantes',
      supermarket: 'Supermercados',
    },
    distances: {
      beach: '0 m (acesso direto)',
      dunes: '1,5 km',
      airport: '35 km',
      restaurant: '500 m',
      supermarket: '800 m',
    },
  },
  es: {
    title: 'Ubicación',
    subtitle: 'Encuentra nuestro paraíso',
    address: 'Dirección',
    howToGet: 'Cómo Llegar',
    nearby: 'Lugares Cercanos',
    getDirections: 'Ver Direcciones',
    places: {
      beach: 'Playa de Ingleses Norte',
      dunes: 'Dunas de Santinho',
      airport: 'Aeropuerto',
      restaurant: 'Restaurantes',
      supermarket: 'Supermercados',
    },
    distances: {
      beach: '0 m (acceso directo)',
      dunes: '1,5 km',
      airport: '35 km',
      restaurant: '500 m',
      supermarket: '800 m',
    },
  },
  en: {
    title: 'Location',
    subtitle: 'Find our paradise',
    address: 'Address',
    howToGet: 'How to Get There',
    nearby: 'Nearby Places',
    getDirections: 'Get Directions',
    places: {
      beach: 'Ingleses Norte Beach',
      dunes: 'Santinho Dunes',
      airport: 'Airport',
      restaurant: 'Restaurants',
      supermarket: 'Supermarkets',
    },
    distances: {
      beach: '0 m (direct access)',
      dunes: '1.5 km',
      airport: '35 km',
      restaurant: '500 m',
      supermarket: '800 m',
    },
  },
}

const address = 'Servidão Fermino Manoel Zeferino, 79 - Ingleses Norte, Florianópolis - SC, CEP 88058-702, Brasil'
const googleMapsUrl = 'https://www.google.com/maps/place/Melodie+Pousada+%C3%A0+Beira+Mar/@-27.4440227,-48.3785867,17z'

export default function LocationClient({ lang }: { lang: Language }) {
  const t = locationData[lang] || locationData.pt

  return (
    <div className="min-h-screen bg-ocean-50 pt-24 pb-12">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-primary mb-4">
            {t.title}
          </h1>
          <p className="text-text-secondary text-lg">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Map */}
          <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
            <iframe
              src="https://www.google.com/maps?q=-27.4440227,-48.3760118&z=17&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="w-full"
            />
            <div className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading text-lg text-primary mb-1">{t.address}</h3>
                  <p className="text-text-secondary text-sm">{address}</p>
                </div>
              </div>
              <a 
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full text-center block"
              >
                {t.getDirections}
              </a>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            {/* How to Get */}
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <h3 className="font-heading text-xl text-primary mb-4">{t.howToGet}</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Plane className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-text-primary">{lang === 'pt' ? 'Do Aeropuerto' : lang === 'es' ? 'Del Aeropuerto' : 'From Airport'}</p>
                    <p className="text-text-secondary text-sm">35 km - aproximadamente 45 minutos de carro</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Car className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-text-primary">{lang === 'pt' ? 'De carro' : lang === 'es' ? 'En coche' : 'By car'}</p>
                    <p className="text-text-secondary text-sm">BR-101 até Ingleses Norte</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Nearby Places */}
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <h3 className="font-heading text-xl text-primary mb-4">{t.nearby}</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-ocean-100">
                  <div className="flex items-center gap-3">
                    <Utensils className="w-5 h-5 text-accent" />
                    <span className="text-text-primary">{t.places.beach}</span>
                  </div>
                  <span className="text-text-secondary text-sm">{t.distances.beach}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-ocean-100">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-accent" />
                    <span className="text-text-primary">{t.places.dunes}</span>
                  </div>
                  <span className="text-text-secondary text-sm">{t.distances.dunes}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-ocean-100">
                  <div className="flex items-center gap-3">
                    <Plane className="w-5 h-5 text-accent" />
                    <span className="text-text-primary">{t.places.airport}</span>
                  </div>
                  <span className="text-text-secondary text-sm">{t.distances.airport}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-ocean-100">
                  <div className="flex items-center gap-3">
                    <Utensils className="w-5 h-5 text-accent" />
                    <span className="text-text-primary">{t.places.restaurant}</span>
                  </div>
                  <span className="text-text-secondary text-sm">{t.distances.restaurant}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <ShoppingCart className="w-5 h-5 text-accent" />
                    <span className="text-text-primary">{t.places.supermarket}</span>
                  </div>
                  <span className="text-text-secondary text-sm">{t.distances.supermarket}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

