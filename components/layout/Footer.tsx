'use client'

import Link from 'next/link'
import { MapPin, Phone, Mail, Instagram, Facebook, Send } from 'lucide-react'
import { type Language } from '@/lib/i18n'
import { generateWhatsAppLink } from '@/lib/utils'

const footerLinks = {
  pt: {
    quickLinks: [
      { href: '/pt', label: 'Início' },
      { href: '/pt/quartos', label: 'Quartos' },
      { href: '/pt/galeria', label: 'Galeria' },
      { href: '/pt/localizacao', label: 'Localização' },
      { href: '/pt/sobre', label: 'Sobre Nós' },
    ],
  },
  es: {
    quickLinks: [
      { href: '/es', label: 'Inicio' },
      { href: '/es/quartos', label: 'Habitaciones' },
      { href: '/es/galeria', label: 'Galeria' },
      { href: '/es/localizacao', label: 'Ubicación' },
      { href: '/es/sobre', label: 'Sobre Nosotros' },
    ],
  },
  en: {
    quickLinks: [
      { href: '/en', label: 'Home' },
      { href: '/en/quartos', label: 'Rooms' },
      { href: '/en/galeria', label: 'Gallery' },
      { href: '/en/localizacao', label: 'Location' },
      { href: '/en/sobre', label: 'About Us' },
    ],
  },
}

const contactInfo = {
  address: 'Servidão Fermino Manoel Zeferino, 79',
  neighborhood: 'Ingleses Norte',
  city: 'Florianópolis - SC',
  cep: 'CEP 88058-702',
  phone: '+55 48 98821-2772',
  email: 'pousadamelodiesc@gmail.com',
}

const socialMedia = {
  instagram: 'https://www.instagram.com/melodiepousadaingleses?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
  facebook: 'https://www.facebook.com/share/1Aq2P7vnU5/',
}

interface FooterProps {
  lang: Language
}

export default function Footer({ lang }: FooterProps) {
  const links = footerLinks[lang] || footerLinks.pt
  
  const newsletterMessages = {
    pt: { title: 'Receba nossas novidades', placeholder: 'Seu email', button: 'Inscrever' },
    es: { title: 'Recibir nuestras noticias', placeholder: 'Tu email', button: 'Suscribirse' },
    en: { title: 'Receive our updates', placeholder: 'Your email', button: 'Subscribe' },
  }
  
  const msg = newsletterMessages[lang] || newsletterMessages.pt

  const whatsappMessage = lang === 'pt' 
    ? 'Olá! Gostaria de fazer uma reserva na Melodie Pousada.'
    : lang === 'es'
    ? 'Hola! Me gustaría hacer una reserva en Melodie Pousada.'
    : 'Hello! I would like to make a reservation at Melodie Pousada.'

  return (
    <footer className="bg-ocean-900 text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <Link href={`/${lang}`} className="flex items-center gap-2 mb-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <span className="text-white font-heading text-2xl">M</span>
              </div>
              <div>
                <span className="font-heading text-xl font-semibold">Melodie</span>
                <p className="text-xs text-ocean-200">Pousada à Beira Mar</p>
              </div>
            </Link>
            <p className="text-ocean-200 text-sm mb-6 leading-relaxed">
              {lang === 'pt' 
                ? 'Seu refúgio perfeito frente ao mar em Ingleses Norte, Florianópolis.'
                : lang === 'es'
                ? 'Tu refugio perfecto frente al mar en Ingleses Norte, Florianopolis.'
                : 'Your perfect seaside retreat in Ingleses Norte, Florianopolis.'}
            </p>
            
            {/* Social Media */}
            <div className="flex gap-4">
              <a
                href={socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">
              {lang === 'pt' ? 'Links Rápidos' : lang === 'es' ? 'Enlaces Rapidos' : 'Quick Links'}
            </h4>
            <ul className="space-y-3">
              {links.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ocean-200 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">
              {lang === 'pt' ? 'Contato' : lang === 'es' ? 'Contacto' : 'Contact'}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-ocean-200 text-sm">
                  {contactInfo.address}<br />
                  {contactInfo.neighborhood}<br />
                  {contactInfo.city}<br />
                  {contactInfo.cep}
                </span>
              </li>
              <li>
                <a
                  href={generateWhatsAppLink(contactInfo.phone, whatsappMessage)}
                  className="flex items-center gap-3 text-ocean-200 hover:text-white transition-colors"
                >
                  <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-sm">{contactInfo.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-3 text-ocean-200 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-sm">{contactInfo.email}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">
              {msg.title}
            </h4>
            <p className="text-ocean-200 text-sm mb-4">
              {lang === 'pt' 
                ? 'Receba ofertas exclusivas e novidades sobre a pousada.'
                : lang === 'es'
                ? 'Recibe ofertas exclusivas y noticias sobre la pousada.'
                : 'Receive exclusive offers and news about the pousada.'}
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder={msg.placeholder}
                className="flex-1 px-4 py-2.5 rounded-full bg-white/10 border border-ocean-700 text-white placeholder:text-ocean-400 focus:outline-none focus:border-accent"
              />
              <button
                type="submit"
                className="w-12 h-12 rounded-full bg-accent hover:bg-accent-light transition-colors flex items-center justify-center"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-ocean-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-ocean-300 text-sm">
              © 2024 Melodie Pousada à Beira Mar. {lang === 'pt' ? 'Todos os direitos reservados.' : lang === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
            </p>
            <div className="flex gap-6 text-sm text-ocean-300">
              <a href="#" className="hover:text-white transition-colors">
                {lang === 'pt' ? 'Termos de Uso' : lang === 'es' ? 'Terminos de Uso' : 'Terms of Use'}
              </a>
              <a href="#" className="hover:text-white transition-colors">
                {lang === 'pt' ? 'Política de Privacidade' : lang === 'es' ? 'Politica de Privacidad' : 'Privacy Policy'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

