'use client'

import { type Language } from '@/lib/i18n'
import Hero from '@/components/sections/Hero'
import Features from '@/components/sections/Features'

export default function HomeClient({ lang }: { lang: Language }) {
  return (
    <>
      <Hero lang={lang} />
      <Features lang={lang} />
      
      {/* Rooms Preview Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-primary mb-4">
              {lang === 'pt' ? 'Nossas Acomodações' : lang === 'es' ? 'Nuestros Alojamientos' : 'Our Accommodations'}
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              {lang === 'pt' 
                ? 'Conforto e estilo em cada detalhe' 
                : lang === 'es' 
                ? 'Comodidad y estilo en cada detalle' 
                : 'Comfort and style in every detail'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: { pt: 'Cobertura', es: 'Cobertura', en: 'Penthouse' },
                price: 'R$ 600',
                guests: '8-10',
                beds: 5,
                image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
                description: { pt: 'Exclusiva cobertura com vista 360° do mar e dunas, perfeita para grupos grandes.', es: 'Cobertura exclusiva con vista 360° al mar y dunas, perfecta para grupos grandes.', en: 'Exclusive penthouse with 360° view of the sea and dunes, perfect for large groups.' }
              },
              {
                name: { pt: 'Frente de Mar 1', es: 'Frente al Mar 1', en: 'Ocean Front 1' },
                price: 'R$ 400',
                guests: '1-4',
                beds: 2,
                image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
                description: { pt: 'Luxo frente ao mar com vista panorâmica.', es: 'Lujo frente al mar con vista panorámica.', en: 'Luxury oceanfront with panoramic view.' }
              },
              {
                name: { pt: 'Frente de Mar 2', es: 'Frente al Mar 2', en: 'Ocean Front 2' },
                price: 'R$ 400',
                guests: '1-4',
                beds: 2,
                image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
                description: { pt: 'Espaçoso quarto frente ao mar.', es: 'Espaciosa habitación frente al mar.', en: 'Spacious oceanfront room.' }
              }
            ].map((room, i) => (
              <div key={i} className="card overflow-hidden group">
                <div className="relative h-64 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${room.image})` }}
                  />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                      {room.price}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl text-primary mb-2">
                    {room.name[lang as keyof typeof room.name]}
                  </h3>
                  <p className="text-text-secondary text-sm mb-4">
                    {lang === 'pt' 
                      ? 'Vista panorâmica para o mar' 
                      : lang === 'es' 
                      ? 'Vista panorámica al mar' 
                      : 'Panoramic sea view'}
                  </p>
                  <div className="flex gap-4 text-sm text-text-secondary">
                    <span>{room.guests} {lang === 'pt' ? 'hóspedes' : lang === 'es' ? 'huéspedes' : 'guests'}</span>
                    <span>{room.beds} {lang === 'pt' ? 'camas' : lang === 'es' ? 'camas' : 'beds'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <a 
              href={`/${lang}/quartos`}
              className="btn-outline"
            >
              {lang === 'pt' ? 'Ver Todos os Quartos' : lang === 'es' ? 'Ver Todas las Habitaciones' : 'View All Rooms'}
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-sand/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-primary mb-4">
              {lang === 'pt' ? 'O que dizem nossos hóspedes' : lang === 'es' ? 'Lo que dicen nuestros huéspedes' : 'What our guests say'}
            </h2>
            <p className="text-text-secondary text-lg">
              {lang === 'pt' ? 'Avaliações reais' : lang === 'es' ? 'Reseñas reales' : 'Real reviews'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Maria Silva', country: { pt: 'BR', es: 'BR', en: 'BR' }, text: { pt: 'Local perfeito! Fabio e esposa são excelente hosts. Voltarei com certeza!', es: '¡Local perfecto! Fabio y su esposa son excelentes anfitriones. ¡Volveré con certeza!', en: 'Perfect location! Fabio and his wife are excellent hosts. I will definitely come back!' } },
              { name: 'Carlos García', country: { pt: 'AR', es: 'AR', en: 'AR' }, text: { pt: 'Incrível localização frente à praia. O tratamento familiar foi excepcional.', es: 'Increíble ubicación frente a la playa. El trato familiar fue excepcional.', en: 'Incredible beachfront location. The family treatment was exceptional.' } },
              { name: 'John Smith', country: { pt: 'US', es: 'US', en: 'US' }, text: { pt: 'Localização perfeita, anfitriões incríveis. O acesso à praia é fantástico!', es: 'Ubicación perfecta, anfitriones increíbles. ¡El acceso a la playa es fantástico!', en: 'Perfect location, amazing hosts. The beach access is fantastic!' } },
            ].map((review, i) => (
              <div key={i} className="card p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-accent">★</span>
                  ))}
                </div>
                <p className="text-text-secondary mb-4 italic">"{review.text[lang as keyof typeof review.text]}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg">{review.country[lang as keyof typeof review.country]}</span>
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">{review.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-6">
            {lang === 'pt' ? 'Pronto para relaxar?' : lang === 'es' ? 'Listo para relajarse?' : 'Ready to relax?'}
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            {lang === 'pt' 
              ? 'Reserve agora sua estadia na Melodie Pousada e viva momentos inesquecíveis em Ingleses Norte.' 
              : lang === 'es' 
              ? 'Reserve ahora su estadía en Melodie Pousada y viva momentos inolvidables en Ingleses Norte.' 
              : 'Book now your stay at Melodie Pousada and experience unforgettable moments in Ingleses Norte.'}
          </p>
          <a 
            href={`/${lang}/reservas`}
            className="btn-accent text-lg px-10 py-4"
          >
            {lang === 'pt' ? 'Reservar Agora' : lang === 'es' ? 'Reservar Ahora' : 'Book Now'}
          </a>
        </div>
      </section>
    </>
  )
}
