'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import AdminLayout from '@/components/admin/AdminLayout'
import { 
  Download, TrendingUp, TrendingDown, DollarSign, 
  BedDouble, Users, Calendar, FileText, Filter,
  ChevronDown, Printer, Share2
} from 'lucide-react'

const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

const revenueData = [
  { month: 'Jan', revenue: 12500, bookings: 18, occupancy: 72 },
  { month: 'Fev', revenue: 18200, bookings: 24, occupancy: 85 },
  { month: 'Mar', revenue: 15800, bookings: 21, occupancy: 78 },
  { month: 'Abr', revenue: 14200, bookings: 19, occupancy: 71 },
  { month: 'Mai', revenue: 9800, bookings: 14, occupancy: 58 },
  { month: 'Jun', revenue: 8500, bookings: 12, occupancy: 52 },
  { month: 'Jul', revenue: 15600, bookings: 22, occupancy: 76 },
  { month: 'Ago', revenue: 22100, bookings: 28, occupancy: 89 },
  { month: 'Set', revenue: 19400, bookings: 25, occupancy: 82 },
  { month: 'Out', revenue: 16800, bookings: 22, occupancy: 75 },
  { month: 'Nov', revenue: 14200, bookings: 19, occupancy: 68 },
  { month: 'Dez', revenue: 28500, bookings: 32, occupancy: 94 },
]

const roomPerformance = [
  { name: 'Cobertura', revenue: 42000, bookings: 28, occupancy: 85, avgPrice: 600 },
  { name: 'Frente de Mar 1', revenue: 28000, bookings: 35, occupancy: 78, avgPrice: 400 },
  { name: 'Frente de Mar 2', revenue: 26400, bookings: 33, occupancy: 75, avgPrice: 400 },
  { name: 'Casal 1', revenue: 18750, bookings: 50, occupancy: 82, avgPrice: 250 },
  { name: 'Casal 2', revenue: 15000, bookings: 40, occupancy: 68, avgPrice: 250 },
  { name: 'Duplex 1', revenue: 24500, bookings: 35, occupancy: 72, avgPrice: 350 },
]

const guestOrigins = [
  { country: 'Brasil', count: 145, percentage: 68, revenue: 125000 },
  { country: 'Espanha', count: 22, percentage: 10, revenue: 28000 },
  { country: 'Argentina', count: 18, percentage: 8, revenue: 22000 },
  { country: 'Portugal', count: 12, percentage: 6, revenue: 15000 },
  { country: 'Estados Unidos', count: 8, percentage: 4, revenue: 12000 },
  { country: 'Outros', count: 9, percentage: 4, revenue: 11000 },
]

export default function AdminReportes() {
  const [selectedYear, setSelectedYear] = useState('2024')
  const [reportType, setReportType] = useState('revenue')

  const totalRevenue = revenueData.reduce((acc, item) => acc + item.revenue, 0)
  const totalBookings = revenueData.reduce((acc, item) => acc + item.bookings, 0)
  const avgOccupancy = Math.round(revenueData.reduce((acc, item) => acc + item.occupancy, 0) / revenueData.length)
  const avgRevenue = Math.round(totalRevenue / 12)

  const maxRevenue = Math.max(...revenueData.map(d => d.revenue))
  const maxBookings = Math.max(...revenueData.map(d => d.bookings))

  return (
    <AdminLayout currentPage="reportes">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl text-text-primary">Relatórios</h1>
            <p className="text-text-secondary mt-1">Análise completa do seu negócio</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
            <button className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-text-secondary rounded-xl hover:bg-gray-50 transition-colors">
              <Printer className="w-5 h-5" />
              <span className="font-medium">Imprimir</span>
            </button>
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors shadow-soft">
              <Download className="w-5 h-5" />
              <span className="font-medium">Exportar PDF</span>
            </button>
          </div>
        </div>

        {/* Report Type Tabs */}
        <div className="flex gap-2 bg-white rounded-xl p-1 shadow-soft w-fit">
          {[
            { id: 'revenue', label: 'Receita', icon: DollarSign },
            { id: 'bookings', label: 'Reservas', icon: Calendar },
            { id: 'rooms', label: 'Quartos', icon: BedDouble },
            { id: 'guests', label: 'Hóspedes', icon: Users },
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setReportType(type.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-colors ${
                reportType === type.id
                  ? 'bg-primary text-white'
                  : 'text-text-secondary hover:text-text-primary hover:bg-gray-50'
              }`}
            >
              <type.icon className="w-4 h-4" />
              <span className="font-medium">{type.label}</span>
            </button>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { 
              label: 'Receita Total', 
              value: `R$ ${(totalRevenue / 1000).toFixed(1)}K`, 
              change: '+18%',
              trend: 'up',
              icon: DollarSign,
              color: 'bg-green-500'
            },
            { 
              label: 'Total de Reservas', 
              value: totalBookings.toString(), 
              change: '+12%',
              trend: 'up',
              icon: Calendar,
              color: 'bg-blue-500'
            },
            { 
              label: 'Ocupação Média', 
              value: `${avgOccupancy}%`, 
              change: '+5%',
              trend: 'up',
              icon: BedDouble,
              color: 'bg-purple-500'
            },
            { 
              label: 'Ticket Médio', 
              value: `R$ ${Math.round(avgRevenue / totalBookings)}`, 
              change: '+8%',
              trend: 'up',
              icon: TrendingUp,
              color: 'bg-orange-500'
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl p-5 shadow-soft"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <p className="text-text-secondary text-sm">{stat.label}</p>
              <p className="font-heading text-2xl text-text-primary mt-1">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-soft p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-heading text-xl text-text-primary">Receita Mensal</h2>
              <p className="text-text-secondary text-sm">Evolução da receita ao longo do ano</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full" />
                <span className="text-sm text-text-secondary">Receita</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-accent rounded-full" />
                <span className="text-sm text-text-secondary">Reservas</span>
              </div>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="h-64 flex items-end gap-2">
            {revenueData.map((item, index) => (
              <motion.div
                key={item.month}
                initial={{ height: 0 }}
                animate={{ height: `${(item.revenue / maxRevenue) * 100}%` }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="flex-1 flex flex-col items-center gap-2 group"
              >
                <div className="relative w-full bg-primary/10 rounded-t-lg overflow-hidden" style={{ height: '100%' }}>
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${(item.revenue / maxRevenue) * 100}%` }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-lg group-hover:bg-primary-dark transition-colors"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      R$ {item.revenue.toLocaleString('pt-BR')}
                    </div>
                  </motion.div>
                </div>
                <span className="text-xs text-text-secondary">{item.month}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Room Performance */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-soft p-6"
          >
            <h2 className="font-heading text-xl text-text-primary mb-6">Desempenho por Quarto</h2>
            <div className="space-y-4">
              {roomPerformance.map((room, index) => (
                <div key={room.name} className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-text-primary">{room.name}</span>
                      <span className="text-sm text-text-secondary">R$ {room.revenue.toLocaleString('pt-BR')}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(room.revenue / 42000) * 100}%` }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="bg-primary h-2 rounded-full"
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-text-primary">{room.occupancy}%</p>
                    <p className="text-xs text-text-secondary">ocupação</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Guest Origins */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-white rounded-2xl shadow-soft p-6"
          >
            <h2 className="font-heading text-xl text-text-primary mb-6">Origem dos Hóspedes</h2>
            <div className="space-y-4">
              {guestOrigins.map((origin, index) => (
                <div key={origin.country} className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-text-primary">{origin.country}</span>
                      <span className="text-sm text-text-secondary">{origin.count} hóspedes</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${origin.percentage}%` }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="bg-accent h-2 rounded-full"
                      />
                    </div>
                  </div>
                  <div className="text-right w-20">
                    <p className="text-sm font-medium text-text-primary">R$ {(origin.revenue / 1000).toFixed(1)}K</p>
                    <p className="text-xs text-text-secondary">{origin.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Detailed Table */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-soft overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100">
            <h2 className="font-heading text-xl text-text-primary">Dados Mensais Detalhados</h2>
            <p className="text-text-secondary text-sm">Relatório completo de desempenho</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase">Mês</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-text-secondary uppercase">Receita</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-text-secondary uppercase">Reservas</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-text-secondary uppercase">Ocupação</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-text-secondary uppercase">Ticket Médio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {revenueData.map((row, index) => (
                  <motion.tr 
                    key={row.month}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="hover:bg-gray-50/50"
                  >
                    <td className="px-6 py-4 font-medium text-text-primary">{months[index]}</td>
                    <td className="px-6 py-4 text-right text-primary font-semibold">R$ {row.revenue.toLocaleString('pt-BR')}</td>
                    <td className="px-6 py-4 text-right text-text-secondary">{row.bookings}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        row.occupancy >= 80 ? 'bg-green-50 text-green-600' :
                        row.occupancy >= 60 ? 'bg-yellow-50 text-yellow-600' :
                        'bg-red-50 text-red-600'
                      }`}>
                        {row.occupancy}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-text-secondary">
                      R$ {Math.round(row.revenue / row.bookings)}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td className="px-6 py-4 font-semibold text-text-primary">Total</td>
                  <td className="px-6 py-4 text-right font-semibold text-primary">R$ {totalRevenue.toLocaleString('pt-BR')}</td>
                  <td className="px-6 py-4 text-right font-semibold text-text-primary">{totalBookings}</td>
                  <td className="px-6 py-4 text-right font-semibold text-text-primary">{avgOccupancy}%</td>
                  <td className="px-6 py-4 text-right font-semibold text-text-primary">R$ {Math.round(totalRevenue / totalBookings)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  )
}

