'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import AdminLayout from '@/components/admin/AdminLayout'
import { 
  Plus, Edit, Trash2, Eye, BedDouble, Users, 
  DollarSign, Wifi, Car, Coffee, Tv, Waves, ToggleLeft, ToggleRight
} from 'lucide-react'

const rooms = [
  { 
    id: 1, 
    name: 'Cobertura', 
    type: 'Cobertura',
    price: 600,
    maxGuests: 10,
    minGuests: 8,
    size: '120m²',
    status: 'available',
    featured: true,
    amenities: ['wifi', 'ac', 'tv'],
    image: '/images/rooms/cobertura.jpg'
  },
  { 
    id: 2, 
    name: 'Frente de Mar 1', 
    type: 'Frente de Mar',
    price: 400,
    maxGuests: 4,
    minGuests: 1,
    size: '45m²',
    status: 'available',
    featured: true,
    amenities: ['wifi', 'ac', 'tv'],
    image: '/images/rooms/frente-de-mar-1.jpg'
  },
  { 
    id: 3, 
    name: 'Frente de Mar 2', 
    type: 'Frente de Mar',
    price: 400,
    maxGuests: 4,
    minGuests: 1,
    size: '45m²',
    status: 'occupied',
    featured: true,
    amenities: ['wifi', 'ac', 'tv'],
    image: '/images/rooms/frente-de-mar-2.jpg'
  },
  { 
    id: 4, 
    name: 'Casal 1', 
    type: 'Casal',
    price: 250,
    maxGuests: 2,
    minGuests: 2,
    size: '25m²',
    status: 'available',
    featured: false,
    amenities: ['wifi', 'ac', 'tv'],
    image: '/images/rooms/casal-1.jpg'
  },
  { 
    id: 5, 
    name: 'Casal 2', 
    type: 'Casal',
    price: 250,
    maxGuests: 2,
    minGuests: 2,
    size: '25m²',
    status: 'maintenance',
    featured: false,
    amenities: ['wifi', 'ac'],
    image: '/images/rooms/casal-2.jpg'
  },
  { 
    id: 6, 
    name: 'Duplex 1', 
    type: 'Duplex',
    price: 350,
    maxGuests: 8,
    minGuests: 8,
    size: '80m²',
    status: 'available',
    featured: false,
    amenities: ['wifi', 'ac', 'tv', 'kitchen'],
    image: '/images/rooms/duplex-1.jpg'
  },
]

const amenityIcons: Record<string, React.ReactNode> = {
  wifi: <Wifi className="w-4 h-4" />,
  ac: <span className="text-xs font-bold">AC</span>,
  tv: <Tv className="w-4 h-4" />,
  'sea-view': <Waves className="w-4 h-4" />,
  balcony: <span className="text-xs">🌅</span>,
  kitchen: <Coffee className="w-4 h-4" />,
  parking: <Car className="w-4 h-4" />,
}

export default function AdminQuartos() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || room.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return (
          <span className="inline-flex items-center gap-1 text-green-600 bg-green-50 px-2.5 py-1 rounded-full text-xs font-medium">
            Disponível
          </span>
        )
      case 'occupied':
        return (
          <span className="inline-flex items-center gap-1 text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full text-xs font-medium">
            Ocupado
          </span>
        )
      case 'maintenance':
        return (
          <span className="inline-flex items-center gap-1 text-red-600 bg-red-50 px-2.5 py-1 rounded-full text-xs font-medium">
            Manutenção
          </span>
        )
      default:
        return <span className="text-gray-600 text-xs">{status}</span>
    }
  }

  return (
    <AdminLayout currentPage="quartos">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl text-text-primary">Quartos</h1>
            <p className="text-text-secondary mt-1">Gerencie os quartos da pousada</p>
          </div>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors shadow-soft hover:shadow-medium">
            <Plus className="w-5 h-5" />
            <span className="font-medium">Novo Quarto</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total de Quartos', value: rooms.length, color: 'bg-primary' },
            { label: 'Disponíveis', value: rooms.filter(r => r.status === 'available').length, color: 'bg-green-500' },
            { label: 'Ocupados', value: rooms.filter(r => r.status === 'occupied').length, color: 'bg-blue-500' },
            { label: 'Em Manutenção', value: rooms.filter(r => r.status === 'maintenance').length, color: 'bg-red-500' },
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
                  <BedDouble className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-text-secondary text-xs">{stat.label}</p>
                  <p className="text-text-primary font-bold text-xl">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-soft p-4"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Buscar quarto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2.5 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <BedDouble className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
            >
              <option value="all">Todos os status</option>
              <option value="available">Disponíveis</option>
              <option value="occupied">Ocupados</option>
              <option value="maintenance">Em manutenção</option>
            </select>
          </div>
        </motion.div>

        {/* Rooms Grid */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredRooms.map((room) => (
            <div key={room.id} className="bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-medium transition-shadow group">
              {/* Image Placeholder */}
              <div className="h-40 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative">
                <BedDouble className="w-16 h-16 text-primary/30" />
                {room.featured && (
                  <span className="absolute top-3 right-3 bg-accent text-white text-xs px-2 py-1 rounded-full">
                    Destaque
                  </span>
                )}
              </div>
              
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-heading text-lg text-text-primary">{room.name}</h3>
                    <p className="text-text-secondary text-sm">{room.type}</p>
                  </div>
                  {getStatusBadge(room.status)}
                </div>

                <div className="flex items-center gap-4 text-sm text-text-secondary mb-4">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {room.maxGuests} hóspedes
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    R$ {room.price}/noite
                  </span>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {room.amenities.slice(0, 4).map((amenity) => (
                    <span 
                      key={amenity}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-lg text-xs text-text-secondary"
                    >
                      {amenityIcons[amenity]}
                    </span>
                  ))}
                  {room.amenities.length > 4 && (
                    <span className="inline-flex items-center px-2 py-1 bg-gray-100 rounded-lg text-xs text-text-secondary">
                      +{room.amenities.length - 4}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-primary hover:bg-primary/5 rounded-lg transition-colors text-sm">
                    <Eye className="w-4 h-4" />
                    Ver
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm">
                    <Edit className="w-4 h-4" />
                    Editar
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm">
                    <Trash2 className="w-4 h-4" />
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </AdminLayout>
  )
}

