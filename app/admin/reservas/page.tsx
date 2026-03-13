'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AdminLayout from '@/components/admin/AdminLayout'
import { 
  Search, Plus, Eye, Edit, Trash2,
  CheckCircle, Clock, XCircle, ChevronLeft, ChevronRight,
  Wallet, CreditCard, Building, Filter, User, Phone, Mail
} from 'lucide-react'

interface Booking {
  id: number
  roomId: number
  guestName: string
  guestEmail: string
  guestPhone: string
  checkIn: string
  checkOut: string
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled'
  guests: number
  totalPrice: number
}

const roomNames: Record<number, string> = {
  1: 'Cobertura',
  2: 'Frente de Mar 1',
  3: 'Frente de Mar 2',
  4: 'Casal 1',
  5: 'Casal 2',
  6: 'Casal 3',
  7: 'Duplex 1',
  8: 'Duplex 2',
}

const statusOptions = [
  { value: 'all', label: 'Todos os status' },
  { value: 'pending', label: 'Pendentes' },
  { value: 'confirmed', label: 'Confirmadas' },
  { value: 'completed', label: 'Finalizadas' },
  { value: 'cancelled', label: 'Canceladas' },
]

function getStoredBookings(): Booking[] {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem('melodie_bookings')
  if (!stored) return []
  
  try {
    const bookings = JSON.parse(stored)
    return bookings.map((b: any, idx: number) => ({
      id: idx + 1,
      roomId: b.roomId || 1,
      guestName: b.guestName || 'Guest',
      guestEmail: b.guestEmail || '',
      guestPhone: b.guestPhone || '',
      checkIn: b.checkIn || '',
      checkOut: b.checkOut || '',
      status: 'confirmed' as const,
      guests: 2,
      totalPrice: b.totalPrice || 0
    }))
  } catch {
    return []
  }
}

export default function AdminReservas() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedBookings, setSelectedBookings] = useState<number[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  useEffect(() => {
    setBookings(getStoredBookings())
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 text-green-600 bg-green-50 px-2.5 py-1 rounded-full text-xs font-medium">
            <CheckCircle className="w-3 h-3" /> Confirmada
          </span>
        )
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full text-xs font-medium">
            <Clock className="w-3 h-3" /> Pendente
          </span>
        )
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full text-xs font-medium">
            <CheckCircle className="w-3 h-3" /> Finalizada
          </span>
        )
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 text-red-600 bg-red-50 px-2.5 py-1 rounded-full text-xs font-medium">
            <XCircle className="w-3 h-3" /> Cancelada
          </span>
        )
      default:
        return <span className="text-gray-600 text-xs">{status}</span>
    }
  }

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (roomNames[booking.roomId] || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.guestEmail.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const toggleSelectAll = () => {
    if (selectedBookings.length === filteredBookings.length) {
      setSelectedBookings([])
    } else {
      setSelectedBookings(filteredBookings.map(b => b.id))
    }
  }

  const toggleSelect = (id: number) => {
    setSelectedBookings(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const deleteBooking = (id: number) => {
    if (!confirm('Tem certeza que deseja excluir esta reserva?')) return
    
    const updated = bookings.filter(b => b.id !== id)
    setBookings(updated)
    localStorage.setItem('melodie_bookings', JSON.stringify(updated))
  }

  return (
    <AdminLayout currentPage="reservas">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl text-text-primary">Reservas</h1>
            <p className="text-text-secondary mt-1">Gerencie todas as reservas ({bookings.length} total)</p>
          </div>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors shadow-soft hover:shadow-medium">
            <Plus className="w-5 h-5" />
            <span className="font-medium">Nova Reserva</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total', value: bookings.length, color: 'bg-primary' },
            { label: 'Pendentes', value: bookings.filter(b => b.status === 'pending').length, color: 'bg-amber-500' },
            { label: 'Confirmadas', value: bookings.filter(b => b.status === 'confirmed').length, color: 'bg-green-500' },
            { label: 'Canceladas', value: bookings.filter(b => b.status === 'cancelled').length, color: 'bg-red-500' },
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
                  <span className="text-white font-bold">{stat.value}</span>
                </div>
                <span className="text-text-secondary text-sm">{stat.label}</span>
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
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nome, email ou quarto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Bookings Table */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-soft overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="px-4 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedBookings.length === filteredBookings.length && filteredBookings.length > 0}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-text-secondary uppercase">Hóspede</th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-text-secondary uppercase">Quarto</th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-text-secondary uppercase">Datas</th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-text-secondary uppercase">Status</th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-text-secondary uppercase">Total</th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-text-secondary uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-text-secondary">
                      {bookings.length === 0 ? 'Nenhuma reserva encontrada. Faça uma reserva no site!' : 'Nenhuma reserva matches os filtros.'}
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          checked={selectedBookings.includes(booking.id)}
                          onChange={() => toggleSelect(booking.id)}
                          className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-primary font-medium text-sm">{booking.guestName.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-medium text-text-primary">{booking.guestName}</p>
                            <p className="text-text-secondary text-xs">{booking.guestEmail}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-text-secondary">{roomNames[booking.roomId] || `Quarto ${booking.roomId}`}</td>
                      <td className="px-4 py-4 text-text-secondary">
                        <div className="text-sm">
                          <p className="text-text-primary">{booking.checkIn}</p>
                          <p className="text-text-secondary text-xs">até {booking.checkOut}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4">{getStatusBadge(booking.status)}</td>
                      <td className="px-4 py-4 font-semibold text-text-primary">R$ {booking.totalPrice.toLocaleString('pt-BR')}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => setSelectedBooking(booking)}
                            className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors" 
                            title="Ver detalhes"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Editar">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => deleteBooking(booking.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                            title="Excluir"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-text-secondary">
              Mostrando {filteredBookings.length} de {bookings.length} reservas
            </p>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors disabled:opacity-50" disabled>
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="px-3 py-1.5 bg-primary text-white rounded-lg text-sm font-medium">1</button>
              <button className="px-3 py-1.5 text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg text-sm">2</button>
              <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-md w-full"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-heading text-xl text-text-primary">Detalhes da Reserva</h2>
              <button 
                onClick={() => setSelectedBooking(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XCircle className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg text-text-primary">{selectedBooking.guestName}</h3>
                  <p className="text-text-secondary text-sm">{roomNames[selectedBooking.roomId] || `Quarto ${selectedBooking.roomId}`}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-text-secondary">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{selectedBooking.guestEmail}</span>
              </div>

              <div className="flex items-center gap-2 text-text-secondary">
                <Phone className="w-4 h-4" />
                <span className="text-sm">{selectedBooking.guestPhone}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-text-secondary text-xs">Check-in</p>
                  <p className="font-medium text-text-primary">{selectedBooking.checkIn}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-text-secondary text-xs">Check-out</p>
                  <p className="font-medium text-text-primary">{selectedBooking.checkOut}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Status</span>
                {getStatusBadge(selectedBooking.status)}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Hóspedes</span>
                <span className="font-medium text-text-primary">{selectedBooking.guests}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Total</span>
                <span className="font-bold text-primary text-lg">R$ {selectedBooking.totalPrice.toLocaleString('pt-BR')}</span>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 flex gap-3">
              <button 
                onClick={() => setSelectedBooking(null)}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-text-secondary rounded-xl hover:bg-gray-50 transition-colors"
              >
                Fechar
              </button>
              <button className="flex-1 px-4 py-2.5 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors flex items-center justify-center gap-2">
                <Edit className="w-4 h-4" />
                Editar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AdminLayout>
  )
}

