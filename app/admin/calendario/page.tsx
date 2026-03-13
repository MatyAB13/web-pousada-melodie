'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AdminLayout from '@/components/admin/AdminLayout'
import AvailabilityCalendar from '@/components/AvailabilityCalendar'
// import { supabase } from '@/lib/supabase'
    const supabase = null
import { getBookingsForCalendar } from '@/lib/availability'
import type { Room } from '@/lib/availability'
import { 
  Calendar, BedDouble, Ban, CheckCircle, Clock, 
  ChevronLeft, ChevronRight, Plus, Loader2 
} from 'lucide-react'

interface CalendarViewProps {
  room: Room
  bookingsCount: number
  occupancyRate: number
}

function CalendarView({ room, bookingsCount, occupancyRate }: CalendarViewProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-2xl shadow-soft overflow-hidden border border-gray-100"
    >
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-primary to-primary-dark">
        <h3 className="font-heading text-xl text-white mb-2">{room.name}</h3>
        <div className="flex items-center gap-4 text-white/90 text-sm">
          <div className="flex items-center gap-1">
            <BedDouble className="w-4 h-4" />
            <span>{room.capacity} hóspedes</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{bookingsCount} reservas</span>
          </div>
          <div className="ml-auto">
            <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium">
              {Math.round(occupancyRate)}% ocupação
            </span>
          </div>
        </div>
      </div>
      <div className="p-1">
        <AvailabilityCalendar roomId={room.id} />
      </div>
    </motion.div>
  )
}

export default function AdminCalendar() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [stats, setStats] = useState<Record<string, { bookingsCount: number, occupancyRate: number }>>({})
  const [currentView, setCurrentView] = useState<'grid' | 'list'>('grid')
  const [isLoading, setIsLoading] = useState(true)
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)

  useEffect(() => {
    loadRooms()
  }, [])

  // Realtime subscription
  useEffect(() => {
    if (!supabase) return
    const channel = supabase
      .channel('rooms-bookings')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'bookings' }, 
        () => loadRooms()
      )
      .subscribe()

    return () => {
      if (supabase) supabase.removeChannel(channel)
    }
  }, [])

  const loadRooms = async () => {
    setIsLoading(true)
    try {
      // Mock data para demo sin Supabase
      const roomsData = [
{ id: '1', name: 'Cobertura', name_en: null, name_es: null, description: null, description_en: null, description_es: null, price: null, capacity: 10, size: null, bed_type: null, view_type: null, amenities: null, images: null, is_active: true, sort_order: 1, created_at: null, updated_at: null },
        { id: '2', name: 'Frente de Mar 1', name_en: null, name_es: null, description: null, description_en: null, description_es: null, price: null, capacity: 4, size: null, bed_type: null, view_type: null, amenities: null, images: null, is_active: true, sort_order: 2, created_at: null, updated_at: null },
        { id: '3', name: 'Frente de Mar 2', name_en: null, name_es: null, description: null, description_en: null, description_es: null, price: null, capacity: 4, size: null, bed_type: null, view_type: null, amenities: null, images: null, is_active: true, sort_order: 3, created_at: null, updated_at: null },
        { id: '4', name: 'Casal 1', name_en: null, name_es: null, description: null, description_en: null, description_es: null, price: null, capacity: 2, size: null, bed_type: null, view_type: null, amenities: null, images: null, is_active: true, sort_order: 4, created_at: null, updated_at: null }
      ]
      setRooms(roomsData)
      
      // Mock stats
      const mockStats = {
        '1': { bookingsCount: 8, occupancyRate: 65 },
        '2': { bookingsCount: 12, occupancyRate: 85 },
        '3': { bookingsCount: 5, occupancyRate: 35 },
        '4': { bookingsCount: 3, occupancyRate: 25 }
      }
      setStats(mockStats)
    } catch (error) {
      console.error('Error loading rooms:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const blockDates = async (roomId: string, dates: string[]) => {
    const { error } = await supabase
      .from('blocked_dates')
      .insert(dates.map(date => ({
        room_id: roomId,
        date,
        reason: 'Bloqueo manual admin'
      })))

    if (error) {
      alert('Error blocking dates: ' + error.message)
    } else {
      alert('Fechas bloqueadas correctamente')
      loadRooms()
    }
  }

  const toggleRoomStats = async (roomId: string) => {
    setSelectedRoom(selectedRoom === roomId ? null : roomId)
  }

  if (isLoading) {
    return (
      <AdminLayout currentPage="calendario">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center gap-3 text-primary">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="font-medium">Cargando calendarios...</span>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout currentPage="calendario">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl text-text-primary">Calendario</h1>
            <p className="text-text-secondary mt-1">
              Vista completa de ocupación ({rooms.length} habitaciones)
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentView('grid')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  currentView === 'grid' 
                    ? 'bg-primary text-white shadow-soft' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                Cuadrícula
              </button>
              <button 
                onClick={() => setCurrentView('list')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  currentView === 'list' 
                    ? 'bg-primary text-white shadow-soft' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                Lista
              </button>
            </div>
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-foreground rounded-xl hover:bg-accent/90 transition-all shadow-soft">
              <Plus className="w-5 h-5" />
              <span className="font-medium">Bloquear fechas</span>
            </button>
          </div>
        </div>

        {/* Rooms Grid */}
        <div className={`grid gap-6 ${
          currentView === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {rooms.map((room) => {
            const roomStats = stats[room.id] || { bookingsCount: 0, occupancyRate: 0 }
            
            return (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`group relative overflow-hidden rounded-2xl border-2 border-gray-100 hover:border-primary/50 transition-all hover:shadow-xl ${
                  selectedRoom === room.id ? 'scale-105 ring-4 ring-primary/20 shadow-2xl' : ''
                }`}
              >
                <div 
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleRoomStats(room.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center flex-shrink-0">
                        <BedDouble className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-heading text-xl text-text-primary mb-1">{room.name}</h3>
                        <p className="text-text-secondary text-sm">{room.capacity} max hóspedes</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${
                        roomStats.occupancyRate > 80 ? 'text-red-500' :
                        roomStats.occupancyRate > 50 ? 'text-amber-500' : 'text-green-500'
                      }`}>
                        {roomStats.occupancyRate}%
                      </div>
                      <p className="text-xs text-text-secondary">{roomStats.bookingsCount} reservas</p>
                    </div>
                  </div>
                  
                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <div className="font-bold text-primary text-sm">{roomStats.bookingsCount}</div>
                      <div className="text-xs text-text-secondary">Este mes</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <div className="font-bold text-accent text-sm">R$ 0</div>
                      <div className="text-xs text-text-secondary">Ingresos</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <div className="font-bold text-green-500 text-sm">12</div>
                      <div className="text-xs text-text-secondary">Libres</div>
                    </div>
                  </div>

                  <AvailabilityCalendar roomId={room.id} />
                </div>

                {/* Block button */}
                <button
                  onClick={() => blockDates(room.id, [])}
                  className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all opacity-0 group-hover:opacity-100 flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-primary"
                >
                  <Ban className="w-4 h-4" />
                </button>
              </motion.div>
            )
          })}
        </div>

        {rooms.length === 0 && !isLoading && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24"
          >
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-heading text-text-primary mb-2">No hay habitaciones</h2>
            <p className="text-text-secondary mb-6 max-w-md mx-auto">
              Crea habitaciones en la tabla "rooms" de Supabase o activa las existentes.
            </p>
          </motion.div>
        )}
      </div>
    </AdminLayout>
  )
}

