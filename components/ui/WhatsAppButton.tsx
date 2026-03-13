'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { generateWhatsAppLink } from '@/lib/utils'

const phoneNumber = '+554888212772'

const messages = {
  pt: {
    greeting: 'Olá! Gostaria de fazer uma reserva ou tenho algumas dúvidas.',
    default: 'Olá! Em que posso ajudar?',
  },
  es: {
    greeting: 'Hola! Me gustaría hacer una reserva o tengo algunas dudas.',
    default: 'Hola! En qué puedo ayudar?',
  },
  en: {
    greeting: 'Hello! I would like to make a reservation or I have some questions.',
    default: 'Hello! How can I help you?',
  },
}

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const lang = 'pt' // Default - could be from context
  const msg = messages[lang as keyof typeof messages] || messages.pt

  const quickMessages = [
    { text: msg.greeting, label: 'Reserva' },
    { text: 'Gostaria de saber mais sobre os quartos disponíveis.', label: 'Quartos' },
    { text: 'Qual a melhor forma de chegar?', label: 'Como Chegar' },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-16 right-0 w-72 bg-white rounded-2xl shadow-large overflow-hidden"
          >
            <div className="bg-primary p-4">
              <p className="text-white font-medium text-sm">
                {lang === 'pt' ? 'Olá! Como podemos ajudar?' : lang === 'es' ? 'Hola! Como podemos ayudar?' : 'Hello! How can we help?'}
              </p>
            </div>
            <div className="p-3 space-y-2">
              {quickMessages.map((item, index) => (
                <a
                  key={index}
                  href={generateWhatsAppLink(phoneNumber, item.text)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full p-3 bg-ocean-50 hover:bg-ocean-100 rounded-xl text-sm text-text-primary transition-colors text-left"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-large flex items-center justify-center transition-colors"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </motion.button>
    </div>
  )
}

