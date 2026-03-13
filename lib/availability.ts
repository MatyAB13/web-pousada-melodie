import { supabase } from './supabase'
import type { Database } from '../types/supabase' // A crear si no existe

export type Booking = Database['public']['Tables']['bookings']['Row']
export type Room = Database['public']['Tables']['rooms']['Row']
export type BlockedDate = Database['public']['Tables']['blocked_dates']['Row']

/**
 * Verifica disponibilidad para un room_id en rango de fechas
 * Retorna true si disponible, false si ocupada/bloqueada
 */
export async function checkAvailability(
  roomId: string,
  checkIn: string,
  checkOut: string
): Promise<boolean> {
  try {
    // Query bookings que overlap
    const { data: bookings } = await supabase
      .from('bookings')
      .select('id')
      .eq('room_id', roomId)
      .gte('check_out', checkIn)
      .lte('check_in', checkOut)

    if (bookings && bookings.length > 0) return false

    // Query blocked dates que overlap
    const { data: blocked } = await supabase
      .from('blocked_dates')
      .select('id')
      .eq('room_id', roomId)
      .gte('date', checkIn)
      .lte('date', checkOut)

    return !(blocked && blocked.length > 0)
  } catch (error) {
    console.error('Error checking availability:', error)
    return true // Fallback a disponible si error
  }
}

/**
 * Obtiene todas las reservas para un room en formato calendario
 */
export async function getBookingsForCalendar(roomId: string): Promise<Booking[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('room_id', roomId)
    .eq('status', 'confirmed')
    .order('check_in')

  if (error) {
    console.error('Error fetching bookings:', error)
    return []
  }
  return data || []
}

/**
 * Obtiene rooms disponibles para fechas específicas
 */
export async function getAvailableRooms(
  checkIn: string, 
  checkOut: string
): Promise<Room[]> {
  const { data: rooms } = await supabase
    .from('rooms')
    .select('*')
    .eq('is_active', true)

  if (!rooms) return []

  const availableRooms = await Promise.all(
    rooms.map(async (room): Promise<Room | null> => {
      const isAvailable = await checkAvailability(room.id, checkIn, checkOut)
      return isAvailable ? room : null
    })
  )

  return availableRooms.filter(Boolean) as Room[]
}

/**
 * Obtiene fechas bloqueadas para calendario visual
 */
export async function getBlockedDates(roomId: string): Promise<string[]> {
  const { data } = await supabase
    .from('blocked_dates')
    .select('date')
    .eq('room_id', roomId)

  return data?.map(b => b.date) || []
}

// Función para fallback localStorage (compatibilidad)
export function getLocalBookingsFallback(): any[] {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem('melodie_bookings')
  return stored ? JSON.parse(stored) : []
}

