'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AdminLayout from '@/components/admin/AdminLayout'
import { 
  Save, Eye, EyeOff, Settings, DollarSign, Key, Share2, 
  Building, Phone, Mail, MapPin, Clock, CheckCircle
} from 'lucide-react'

const tabs = [
  { id: 'general', label: 'Geral', icon: Settings },
  { id: 'pricing', label: 'Preços', icon: DollarSign },
  { id: 'api', label: 'API Keys', icon: Key },
  { id: 'social', label: 'Redes Sociais', icon: Share2 },
]

export default function AdminConfiguracoes() {
  const [activeTab, setActiveTab] = useState('general')
  const [showApiKey, setShowApiKey] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const [config, setConfig] = useState({
    pousadaName: 'Melodie Pousada à Beira Mar',
    pousadaDescription: 'Pousada frente ao mar em Ingleses Norte, Florianópolis',
    phone: '+55 48 98821-2772',
    whatsapp: '+55 48 98821-2772',
    email: 'contato@melodiepousada.com.br',
    address: 'Servidão Fermino Manoel Zeferino, 79',
    city: 'Florianópolis',
    state: 'SC',
    cep: '88058-402',
    checkInTime: '14:00',
    checkOutTime: '11:00',
    defaultPrice: 250,
    seasonPrice: 400,
    highSeasonPrice: 600,
    highSeasonStart: '15/12',
    highSeasonEnd: '15/02',
    googleMapsKey: '',
    supabaseUrl: '',
    supabaseKey: '',
    instagram: 'melodiepousada',
    facebook: 'melodiepousada',
    tripadvisor: '',
  })

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const updateConfig = (key: string, value: string | number) => {
    setConfig(prev => ({ ...prev, [key]: value }))
  }

  return (
    <AdminLayout currentPage="configuracoes">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl text-text-primary">Configurações</h1>
            <p className="text-text-secondary mt-1">Gerencie as configurações da sua pousada</p>
          </div>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors shadow-soft hover:shadow-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : saved ? (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>Salvo!</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span className="font-medium">Salvar Alterações</span>
              </>
            )}
          </button>
        </div>

        {/* Success Message */}
        <AnimatePresence>
          {saved && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Configuração salva com sucesso!
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-100 px-4 lg:px-6 overflow-x-auto">
            <div className="flex gap-1 min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id 
                      ? 'border-primary text-primary' 
                      : 'border-transparent text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {/* General Settings */}
            {activeTab === 'general' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-heading text-lg text-text-primary mb-4 flex items-center gap-2">
                    <Building className="w-5 h-5 text-primary" />
                    Informações da Pousada
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-text-secondary mb-1.5">Nome da Pousada</label>
                      <input
                        type="text"
                        value={config.pousadaName}
                        onChange={(e) => updateConfig('pousadaName', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-text-secondary mb-1.5">Descrição</label>
                      <textarea
                        value={config.pousadaDescription}
                        onChange={(e) => updateConfig('pousadaDescription', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h3 className="font-heading text-lg text-text-primary mb-4 flex items-center gap-2">
                    <Phone className="w-5 h-5 text-primary" />
                    Contato
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1.5">Telefone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          value={config.phone}
                          onChange={(e) => updateConfig('phone', e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1.5">WhatsApp</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          value={config.whatsapp}
                          onChange={(e) => updateConfig('whatsapp', e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-text-secondary mb-1.5">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={config.email}
                          onChange={(e) => updateConfig('email', e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h3 className="font-heading text-lg text-text-primary mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Endereço
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-text-secondary mb-1.5">Endereço</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={config.address}
                          onChange={(e) => updateConfig('address', e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1.5">Cidade</label>
                      <input
                        type="text"
                        value={config.city}
                        onChange={(e) => updateConfig('city', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1.5">Estado</label>
                      <input
                        type="text"
                        value={config.state}
                        onChange={(e) => updateConfig('state', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h3 className="font-heading text-lg text-text-primary mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Horários
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1.5">Check-in</label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="time"
                          value={config.checkInTime}
                          onChange={(e) => updateConfig('checkInTime', e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1.5">Check-out</label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="time"
                          value={config.checkOutTime}
                          onChange={(e) => updateConfig('checkOutTime', e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Pricing Settings */}
            {activeTab === 'pricing' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-heading text-lg text-text-primary mb-4 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    Preços por Temporada
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1.5">Preço Normal (R$)</label>
                      <input
                        type="number"
                        value={config.defaultPrice}
                        onChange={(e) => updateConfig('defaultPrice', Number(e.target.value))}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1.5">Temporada (R$)</label>
                      <input
                        type="number"
                        value={config.seasonPrice}
                        onChange={(e) => updateConfig('seasonPrice', Number(e.target.value))}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1.5">Alta Temporada (R$)</label>
                      <input
                        type="number"
                        value={config.highSeasonPrice}
                        onChange={(e) => updateConfig('highSeasonPrice', Number(e.target.value))}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h3 className="font-heading text-lg text-text-primary mb-4">Período de Alta Temporada</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1.5">Início</label>
                      <input
                        type="text"
                        value={config.highSeasonStart}
                        onChange={(e) => updateConfig('highSeasonStart', e.target.value)}
                        placeholder="15/12"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1.5">Fim</label>
                      <input
                        type="text"
                        value={config.highSeasonEnd}
                        onChange={(e) => updateConfig('highSeasonEnd', e.target.value)}
                        placeholder="15/02"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* API Settings */}
            {activeTab === 'api' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-heading text-lg text-text-primary mb-4 flex items-center gap-2">
                    <Key className="w-5 h-5 text-primary" />
                    Configurações de API
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1.5">Google Maps API Key</label>
                      <div className="relative">
                        <input
                          type={showApiKey ? 'text' : 'password'}
                          value={config.googleMapsKey}
                          onChange={(e) => updateConfig('googleMapsKey', e.target.value)}
                          placeholder="AIza..."
                          className="w-full px-4 py-2.5 pr-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                        <button
                          type="button"
                          onClick={() => setShowApiKey(!showApiKey)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1.5">Supabase URL</label>
                      <input
                        type="url"
                        value={config.supabaseUrl}
                        onChange={(e) => updateConfig('supabaseUrl', e.target.value)}
                        placeholder="https://xxxxx.supabase.co"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1.5">Supabase Anon Key</label>
                      <input
                        type="password"
                        value={config.supabaseKey}
                        onChange={(e) => updateConfig('supabaseKey', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Social Settings */}
            {activeTab === 'social' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-heading text-lg text-text-primary mb-4 flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-primary" />
                    Redes Sociais
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1.5">Instagram</label>
                      <div className="flex items-center">
                        <span className="px-3 py-2.5 bg-gray-100 border border-r-0 border-gray-200 rounded-l-xl text-gray-500">@</span>
                        <input
                          type="text"
                          value={config.instagram}
                          onChange={(e) => updateConfig('instagram', e.target.value)}
                          className="flex-1 px-4 py-2.5 border border-gray-200 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1.5">Facebook</label>
                      <input
                        type="text"
                        value={config.facebook}
                        onChange={(e) => updateConfig('facebook', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1.5">TripAdvisor</label>
                      <input
                        type="text"
                        value={config.tripadvisor}
                        onChange={(e) => updateConfig('tripadvisor', e.target.value)}
                        placeholder="Link do TripAdvisor"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

