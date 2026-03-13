'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { checkAvailability, getBookingsForCalendar, getBlockedDates } from '@/lib/availability'
import type { Booking, BlockedDate } from '@/lib/availability'

interface AvailabilityCalendarProps {
  roomId: string
  onDateSelect?: (checkIn: string, checkOut: string) => void
  className?: string
}

export default function AvailabilityCalendar({
  roomId,
  onDateSelect,
  className = ''
}: AvailabilityCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [bookings, setBookings] = useState<Booking[]>([])
  const [blockedDates, setBlockedDates] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedStart, setSelectedStart] = useState<string | null>(null)
  const [selectedEnd, setSelectedEnd] = useState<string | null>(null)
  const [hoveredDate, setHoveredDate] = useState<string | null>(null)

  useEffect(() => {
    loadCalendarData()
  }, [roomId, currentMonth])

  const loadCalendarData = async () => {
    setIsLoading(true)
    try {
      const [bookingsData, blockedData] = await Promise.all([
        getBookingsForCalendar(roomId),
        getBlockedDates(roomId)
      ])
      setBookings(bookingsData)
      setBlockedDates(blockedData)
    } catch (error) {
      console.error('Error loading calendar data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const isDateOccupied = (dateStr: string) => {
    const date = new Date(dateStr)
    
    // Check bookings
    return bookings.some(booking => {
      const checkIn = new Date(booking.check_in)
      const checkOut = new Date(booking.check_out)
      return date >= checkIn && date < checkOut
    })
  }

  const isDateBlocked = (dateStr: string) => {
    return blockedDates.includes(dateStr)
  }

  const isDateAvailable = async (dateStr: string) => {
    if (isDateOccupied(dateStr) || isDateBlocked(dateStr)) return false
    // Single night check
    return await checkAvailability(roomId, dateStr, dateStr)
  }

  const getDateStatus = async (dateStr: string) => {
    if (isDateBlocked(dateStr)) return 'blocked'
    if (isDateOccupied(dateStr)) return 'occupied'
    return await isDateAvailable(dateStr) ? 'available' : 'checking'
  }

  const handleDateClick = async (dateStr: string) => {
    if (selectedStart && !selectedEnd) {
      const start = new Date(selectedStart)
      const clicked = new Date(dateStr)
      
      if (clicked > start) {
        // Check availability for range
        const available = await checkAvailability(roomId, selectedStart, dateStr)
        if (available) {
          setSelectedEnd(dateStr)
          onDateSelect?.(selectedStart, dateStr)
        }
      } else {
        setSelectedStart(dateStr)
        setSelectedEnd(null)
      }
    } else {
      setSelectedStart(dateStr)
      setSelectedEnd(null)
    }
    setHoveredDate(null)
  }

  const generateCalendarDays = async () => {
    if (isLoading) return []
    
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDay = getFirstDayOfMonth(currentMonth)
    const days: (string | null)[] = []

    // Previous month days
    const prevMonthDays = getDaysInMonth(new Date(year, month - 1))
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(`${year}-${String(month).padStart(2, '0')}-${String(prevMonthDays - i).padStart(2, '0')}`)
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      days.push(dateStr)
    }

    // Next month days (fill to 42 days)
    const remaining = 42 - days.length
    const nextMonth = month + 1
    for (let i = 1; i <= remaining; i++) {
      days.push(`${nextMonth > 11 ? year + 1 : year}-${String(nextMonth > 11 ? 1 : nextMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`)
    }

    return days
  }

  const changeMonth = (delta: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + delta, 1))
    setSelectedStart(null)
    setSelectedEnd(null)
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-soft">
        <div className="flex items-center justify-center gap-2 text-primary">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm">Cargando calendario...</span>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-2xl shadow-soft overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <button
            onClick={() => changeMonth(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h3 className="font-heading text-xl text-primary">
            {currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
          </h3>
          <button
            onClick={() => changeMonth(1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Days Header */}
      <div className="grid grid-cols-7 gap-1 p-4 bg-gray-50">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
          <div key={day} className="text-center py-2 font-medium text-gray-600 text-sm">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 p-4">
        {generateCalendarDays().then(days => {
          return days.map((dateStr, index) => {
            if (!dateStr) return null
            
            const isCurrentMonth = new Date(dateStr).getMonth() === currentMonth.getMonth()
            const isToday = dateStr === new Date().toISOString().split('T')[0]
            
            const status = isDateOccupied(dateStr) ? 'occupied' : 
                          isDateBlocked(dateStr) ? 'blocked' : 'available'
            
            let isInRange = false
            let isSelected = false
            
            if (selectedStart && selectedEnd && dateStr >= selectedStart && dateStr <= selectedEnd) {
              isInRange = true
            }
            
            if (dateStr === selectedStart || dateStr === selectedEnd) {
              isSelected = true
            }

            return (
              <button
                key={`${dateStr}-${index}`}
                onClick={() => handleDateClick(dateStr)}
                onMouseEnter={() => {
                  if (selectedStart && !selectedEnd && dateStr > selectedStart) {
                    setHoveredDate(dateStr)
                  }
                }}
                onMouseLeave={() => setHoveredDate(null)}
                disabled={status === 'occupied' || status === 'blocked'}
                className={`
                  relative w-14 h-14 rounded-lg font-medium transition-all group
                  ${!isCurrentMonth ? 'text-gray-400' : ''}
                  ${isToday ? 'ring-2 ring-primary ring-offset-1' : ''}
                  ${isSelected ? 'bg-primary text-white shadow-md scale-105' : ''}
                  ${status === 'available' ? 'hover:bg-green-50 hover:scale-105 hover:shadow-md' : ''}
                  ${status === 'occupied' ? 'bg-red-50 text-red-600 cursor-not-allowed' : ''}
                  ${status === 'blocked' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}
                  ${isInRange ? 'bg-blue-50 border-2 border-blue-200' : ''}
                `}
              >
                <span>{new Date(dateStr).getDate()}</span>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                  {status === 'occupied' ? 'Ocupado' : 
                   status === 'blocked' ? 'Bloqueado' : 'Disponível'}
                </div>
              </button>
            )
          })
        })}
      </div>

      {/* Selected Range Info */}
      {selectedStart && (
        <div className="p-4 border-t border-gray-100 bg-green-50">
          <div className="flex items-center gap-2 text-sm text-green-800">
            <span>Fechas seleccionadas:</span>
            <span className="font-medium">{selectedStart} 
              {selectedEnd && ` - ${selectedEnd}`}
              {selectedEnd && ` (${Math.ceil((new Date(selectedEnd).getTime() - new Date(selectedStart).getTime()) / (1000 * 60 * 60 * 24))} noches)`}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

