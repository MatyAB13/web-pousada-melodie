'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, AlertCircle, CheckCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { getBlockedDates } from '@/lib/availability'
import type { BlockedDate } from '@/lib/availability'

interface DateSeatSelectorProps {
  roomId: string
  roomName: string
  onSelectionChange?: (startDate: string | null, endDate: string | null) => void
  minNights?: number
  className?: string
}

interface OccupiedRange {
  start: string
  end: string
}

export default function DateSeatSelector({
  roomId,
  roomName,
  onSelectionChange,
  minNights = 2,
  className = ''
}: DateSeatSelectorProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [occupiedRanges, setOccupiedRanges] = useState<OccupiedRange[]>([])
  const [blockedDates, setBlockedDates] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedStart, setSelectedStart] = useState<string | null>(null)
  const [selectedEnd, setSelectedEnd] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [hoveredDate, setHoveredDate] = useState<string | null>(null)

  // Load occupied dates from Supabase bookings + blocked dates
  useEffect(() => {
    loadAvailabilityData()
  }, [roomId, currentMonth])

  const loadAvailabilityData = async () => {
    setIsLoading(true)
    try {
      // Bookings ocupadas (confirmed)
      const { data: bookings } = await supabase
        .from('bookings')
        .select('check_in, check_out')
        .eq('room_id', roomId)
        .eq('status', 'confirmed')
        .gte('check_out', currentMonth.toISOString().split('T')[0])

      // Blocked dates
      const blocked = await getBlockedDates(roomId)

      // Convert to ranges
      const ranges: OccupiedRange[] = []
      
      bookings?.forEach((booking: any) => {
        ranges.push({
          start: booking.check_in,
          end: booking.check_out
        })
      })

      setOccupiedRanges(ranges)
      setBlockedDates(blocked || [])
    } catch (error) {
      console.error('Error loading availability:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getMonthDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const days: string[] = []

    // Fill previous month
    const prevMonthDays = new Date(year, month, 0).getDate()
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(`${year}-${String(month).padStart(2, '0')}-${String(prevMonthDays - i).padStart(2, '0')}`)
    }

    // Current month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(`${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`)
    }

    // Next month to fill 6 rows
    const nextDaysNeeded = 42 - days.length
    const nextMonthNum = month + 1 > 11 ? 0 : month + 1
    const nextYearNum = month + 1 > 11 ? year + 1 : year
    for (let dayNum = 1; dayNum <= nextDaysNeeded; dayNum++) {
      days.push(`${nextYearNum}-${String(nextMonthNum + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`)
    }

    return days
  }

  const isDateOccupied = (dateStr: string): boolean => {
    return occupiedRanges.some(range => {
      const rangeStart = new Date(range.start)
      const rangeEnd = new Date(range.end)
      const currentDate = new Date(dateStr)
      return currentDate >= rangeStart && currentDate < rangeEnd
    })
  }

  const isDateBlocked = (dateStr: string): boolean => {
    return blockedDates.some(blockedDate => blockedDate === dateStr)
  }

  const isDateSelectable = (dateStr: string): boolean => {
    return !isDateOccupied(dateStr) && !isDateBlocked(dateStr)
  }

  const handleDateClick = useCallback((dateStr: string) => {
    setErrorMessage('')
    
    if (selectedStart && !selectedEnd) {
      const startDateObj = new Date(selectedStart)
      const clickedDateObj = new Date(dateStr)
      
      if (clickedDateObj > startDateObj) {
        // Verify minimum nights
        const nightsCount = Math.floor((clickedDateObj.getTime() - startDateObj.getTime()) / (1000 * 60 * 60 * 24))
        if (nightsCount < minNights) {
          setErrorMessage(`La reserva mínima es de ${minNights} noches`)
          return
        }
        
        setSelectedEnd(dateStr)
        onSelectionChange?.(selectedStart, dateStr)
      } else {
        // Re-select start date
        setSelectedStart(dateStr)
        setSelectedEnd(null)
      }
    } else {
      // Select new start date
      setSelectedStart(dateStr)
      setSelectedEnd(null)
    }
  }, [selectedStart, selectedEnd, minNights, roomId, onSelectionChange])

  const handleDateHover = (dateStr: string) => {
    if (selectedStart && !selectedEnd && isDateSelectable(dateStr)) {
      setHoveredDate(dateStr)
    } else {
      setHoveredDate(null)
    }
  }

  const clearSelection = () => {
    setSelectedStart(null)
    setSelectedEnd(null)
    setErrorMessage('')
    onSelectionChange?.(null, null)
  }

  if (isLoading) {
    return (
      <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>
        <div className="flex items-center justify-center h-80">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    )
  }

  const days = getMonthDays()

  return (
    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-500 to-blue-600">
        <div className="flex items-center justify-between mb-2">
          <button 
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
            className="p-2 hover:bg-white/20 rounded-lg transition-all"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <h3 className="font-bold text-xl text-white">
            {currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
          </h3>
          <button 
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
            className="p-2 hover:bg-white/20 rounded-lg transition-all"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
        <div className="text-white/90 text-sm">{roomName}</div>
      </div>

      {/* Error message */}
      {errorMessage && (
        <div className="p-4 bg-yellow-50 border-b border-yellow-200">
          <div className="flex items-center gap-2 text-yellow-800 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
            <button onClick={clearSelection} className="ml-auto text-yellow-700 hover:text-yellow-900">
              <CheckCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Week days */}
      <div className="grid grid-cols-7 bg-gray-50">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, i) => (
          <div key={i} className="p-3 text-center font-semibold text-gray-600 text-xs uppercase tracking-wide">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {days.map((dateStr, index) => {
          const date = new Date(dateStr)
          const dayNum = date.getDate()
          const isCurrentMonth = date.getMonth() === currentMonth.getMonth()
          const isOccupied = isDateOccupied(dateStr)
          const isBlocked = isDateBlocked(dateStr)
          const isSelectable = isDateSelectable(dateStr)
          
          let bgColor = 'bg-white'
          let textColor = 'text-gray-900'
          let borderColor = 'border-transparent'
          let cursorStyle = 'cursor-pointer'
          
          // Status colors
          if (isOccupied) {
            bgColor = 'bg-red-50'
            textColor = 'text-red-600'
            cursorStyle = 'cursor-not-allowed'
          } else if (isBlocked) {
            bgColor = 'bg-gray-100'
            textColor = 'text-gray-400'
            cursorStyle = 'cursor-not-allowed'
          } else if (isSelectable) {
            bgColor = 'bg-green-50 hover:bg-green-100'
            textColor = 'text-green-700'
          } else {
            bgColor = 'bg-gray-50'
            textColor = 'text-gray-500'
          }

          // Selection colors
          if (selectedStart === dateStr) {
            bgColor = 'bg-yellow-400'
            textColor = 'text-white font-bold'
            borderColor = 'ring-4 ring-yellow-500 ring-offset-2'
          } else if (selectedEnd === dateStr) {
            bgColor = 'bg-yellow-400'
            textColor = 'text-white font-bold'
            borderColor = 'ring-4 ring-yellow-500 ring-offset-2'
          } else if (selectedStart && selectedEnd && dateStr > selectedStart && dateStr < selectedEnd) {
            bgColor = 'bg-yellow-200'
            textColor = 'text-yellow-800 font-semibold'
          } else if (selectedStart && hoveredDate && dateStr > selectedStart && dateStr <= hoveredDate) {
            bgColor = 'bg-yellow-100 border-yellow-300'
            textColor = 'text-yellow-800'
          }

          return (
            <button
              key={`${dateStr}-${index}`}
              onClick={() => isSelectable && handleDateClick(dateStr)}
              onMouseEnter={() => handleDateHover(dateStr)}
              className={`
                relative flex items-center justify-center aspect-square border p-2 m-1
                rounded-lg font-mono font-bold text-lg transition-all duration-200 hover:scale-105
                ${bgColor} ${textColor} ${borderColor} ${cursorStyle}
                ${!isCurrentMonth ? 'opacity-50' : ''}
              `}
              disabled={!isSelectable}
            >
              <span>{dayNum}</span>
              
              {/* Status indicator */}
              {(isOccupied || isBlocked) && (
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-white bg-red-500" />
              )}
            </button>
          )
        })}
      </div>

      {/* Selected range info */}
      {(selectedStart || selectedEnd) && (
        <div className="p-4 border-t border-gray-100 bg-blue-50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-sm">
            <span className="font-medium">
              📅 {selectedStart || '?'} {selectedEnd && `→ ${selectedEnd}`}
              {selectedEnd && (
                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  {Math.floor((new Date(selectedEnd).getTime() - new Date(selectedStart!).getTime()) / (1000 * 60 * 60 * 24))} noches
                </span>
              )}
            </span>
            <button 
              onClick={clearSelection}
              className="px-4 py-1.5 bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-medium text-xs transition-colors shadow-sm"
            >
              ❌ Limpiar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
