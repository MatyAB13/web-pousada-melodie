'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import AdminLayout from '@/components/admin/AdminLayout'
import { 
  Search, Plus, Eye, Edit, Trash2, User, Mail, Phone, 
  Calendar, Star, MessageSquare, ChevronLeft, ChevronRight,
  Filter, Download, UserPlus
} from 'lucide-react'

const guests = [
  { 
    id: 1, 
    name: 'João Silva', 
    email: 'joao@email.com',
    phone: '+55 48 99999-0001',
    country: 'Brasil',
    totalBookings: 3,
    lastStay: '15/02/2024',
    totalSpent: 4500,
    notes: 'Cliente frequente, prefere quarto com vista para o mar',
    rating: 5,
    avatar: 'JS'
  },
  { 
    id: 2, 
    name: 'Maria Santos', 
    email: 'maria@email.com',
    phone: '+55 48 99999-0002',
    country: 'Brasil',
    totalBookings: 1,
    lastStay: '18/02/2024',
    totalSpent: 1600,
    notes: '',
    rating: 5,
    avatar: 'MS'
  },
  { 
    id: 3, 
    name: 'Carlos García', 
    email: 'carlos@email.com',
    phone: '+34 666 666 666',
    country: 'Espanha',
    totalBookings: 2,
    lastStay: '10/01/2024',
    totalSpent: 2800,
    notes: 'Viaja frequentemente a negócio',
    rating: 4,
    avatar: 'CG'
  },
  { 
    id: 4, 
    name: 'Ana Pereira', 
    email: 'ana@email.com',
    phone: '+55 48 99999-0004',
    country: 'Brasil',
    totalBookings: 5,
    lastStay: '25/02/2024',
    totalSpent: 6200,
    notes: 'Cliente VIP, sempre traz familiares',
    rating: 5,
    avatar: 'AP'
  },
  { 
    id: 5, 
    name: 'John Smith', 
    email: 'john@email.com',
    phone: '+1 555 0001',
    country: 'Estados Unidos',
    totalBookings: 1,
    lastStay: '05/01/2024',
    totalSpent: 2100,
    notes: 'Honeymoon',
    rating: 5,
    avatar: 'JS'
  },
  { 
    id: 6, 
    name: 'Pedro Costa', 
    email: 'pedro@email.com',
    phone: '+55 48 99999-0005',
    country: 'Brasil',
    totalBookings: 2,
    lastStay: '05/03/2024',
    totalSpent: 1800,
    notes: '',
    rating: 4,
    avatar: 'PC'
  },
]

const countries = [
  'Brasil', 'Argentina', 'Chile', 'Uruguai', 'Paraguai',
  'Espanha', 'Portugal', 'França', 'Itália', 'Alemanha',
  'Estados Unidos', 'Canadá', 'Reino Unido', 'Outros'
]

export default function AdminHuespedes() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGuest, setSelectedGuest] = useState<typeof guests[0] | null>(null)
  const [showModal, setShowModal] = useState(false)

  const filteredGuests = guests.filter(guest => 
    guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.phone.includes(searchTerm)
  )

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-3 h-3 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ))
  }

  return (
    <AdminLayout currentPage="huespedes">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl text-text-primary">Hóspedes</h1>
            <p className="text-text-secondary mt-1">Gerencie seus hóspedes e clientes</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-text-secondary rounded-xl hover:bg-gray-50 transition-colors">
              <Download className="w-5 h-5" />
              <span className="font-medium">Exportar</span>
            </button>
            <button 
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors shadow-soft hover:shadow-medium"
            >
              <UserPlus className="w-5 h-5" />
              <span className="font-medium">Novo Hóspede</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total de Hóspedes', value: guests.length, color: 'bg-primary' },
            { label: 'Clientes VIP', value: guests.filter(g => g.rating >= 5).length, color: 'bg-yellow-500' },
            { label: 'Novos este Mês', value: 8, color: 'bg-green-500' },
            { label: 'Retorno', value: '65%', color: 'bg-blue-500' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl p-4 shadow-soft"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-text-secondary text-xs">{stat.label}</p>
                  <p className="text-text-primary font-bold text-xl">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-soft p-4"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nome, email ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white">
                <option value="all">Todos os países</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Guests Grid */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredGuests.map((guest) => (
            <div 
              key={guest.id} 
              className="bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-medium transition-shadow"
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-semibold">{guest.avatar}</span>
                    </div>
                    <div>
                      <h3 className="font-heading text-lg text-text-primary">{guest.name}</h3>
                      <p className="text-text-secondary text-sm">{guest.country}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {getRatingStars(guest.rating)}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{guest.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Phone className="w-4 h-4" />
                    <span>{guest.phone}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <p className="text-text-secondary text-xs">Reservas</p>
                    <p className="font-semibold text-text-primary">{guest.totalBookings}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-text-secondary text-xs">Última vez</p>
                    <p className="font-semibold text-text-primary">{guest.lastStay}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-text-secondary text-xs">Total gasto</p>
                    <p className="font-semibold text-primary">R$ {guest.totalSpent.toLocaleString('pt-BR')}</p>
                  </div>
                </div>

                {guest.notes && (
                  <div className="mt-3 p-2 bg-yellow-50 rounded-lg">
                    <p className="text-xs text-yellow-700 flex items-start gap-1">
                      <MessageSquare className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      {guest.notes}
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => { setSelectedGuest(guest); setShowModal(true); }}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-primary hover:bg-primary/5 rounded-lg transition-colors text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    Ver
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm">
                    <Calendar className="w-4 h-4" />
                    Reservas
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors text-sm">
                    <Edit className="w-4 h-4" />
                    Editar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Guest Detail Modal */}
        {showModal && selectedGuest && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold text-xl">{selectedGuest.avatar}</span>
                    </div>
                    <div>
                      <h2 className="font-heading text-2xl text-text-primary">{selectedGuest.name}</h2>
                      <p className="text-text-secondary">{selectedGuest.country}</p>
                      <div className="flex gap-1 mt-1">
                        {getRatingStars(selectedGuest.rating)}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-text-secondary text-sm">Total de Reservas</p>
                    <p className="font-heading text-2xl text-text-primary">{selectedGuest.totalBookings}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-text-secondary text-sm">Total Gasto</p>
                    <p className="font-heading text-2xl text-primary">R$ {selectedGuest.totalSpent.toLocaleString('pt-BR')}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-heading text-lg text-text-primary mb-3">Informações de Contato</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-text-secondary">
                      <Mail className="w-4 h-4" />
                      {selectedGuest.email}
                    </div>
                    <div className="flex items-center gap-2 text-text-secondary">
                      <Phone className="w-4 h-4" />
                      {selectedGuest.phone}
                    </div>
                  </div>
                </div>

                {selectedGuest.notes && (
                  <div>
                    <h3 className="font-heading text-lg text-text-primary mb-3">Notas</h3>
                    <div className="p-4 bg-yellow-50 rounded-xl">
                      <p className="text-yellow-800">{selectedGuest.notes}</p>
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="font-heading text-lg text-text-primary mb-3">Histórico de Reservas</h3>
                  <div className="space-y-2">
                    {[
                      { room: 'Cobertura', date: '15/02/2024 - 20/02/2024', total: 3000 },
                      { room: 'Frente de Mar 1', date: '10/01/2024 - 12/01/2024', total: 1000 },
                      { room: 'Casal 1', date: '05/12/2023 - 08/12/2023', total: 500 },
                    ].map((booking, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-text-primary">{booking.room}</p>
                          <p className="text-text-secondary text-sm">{booking.date}</p>
                        </div>
                        <p className="font-semibold text-primary">R$ {booking.total}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-100 flex gap-3">
                <button 
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 text-text-secondary rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Fechar
                </button>
                <button className="flex-1 px-4 py-2.5 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors">
                  Nova Reserva
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

