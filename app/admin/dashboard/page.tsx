'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import AdminLayout from '@/components/admin/AdminLayout'
import { 
  TrendingUp, Users, DollarSign, Star, Calendar, 
  BedDouble, CheckCircle, Clock, Plus, ArrowUpRight,
  Wallet, CreditCard, Building
} from 'lucide-react'

const stats = [
  { 
    label: 'Reservas este mês', 
    value: '24', 
    icon: Calendar, 
    change: '+12%', 
    color: 'bg-primary',
    trend: 'up'
  },
  { 
    label: 'Ocupação', 
    value: '78%', 
    icon: TrendingUp, 
    change: '+5%', 
    color: 'bg-accent',
    trend: 'up'
  },
  { 
    label: 'Receita este mês', 
    value: 'R$ 18.450', 
    icon: DollarSign, 
    change: '+8%', 
    color: 'bg-green-500',
    trend: 'up'
  },
  { 
    label: 'Nota média', 
    value: '4.9', 
    icon: Star, 
    change: '+0.1', 
    color: 'bg-yellow-500',
    trend: 'up'
  },
]

const recentBookings = [
  { 
    id: 1, 
    name: 'João Silva', 
    room: 'Cobertura', 
    checkIn: '15/02/2024', 
    checkOut: '20/02/2024', 
    status: 'confirmed', 
    guests: 6, 
    total: 3000,
    avatar: 'JS'
  },
  { 
    id: 2, 
    name: 'Maria Santos', 
    room: 'Frente de Mar 1', 
    checkIn: '18/02/2024', 
    checkOut: '22/02/2024', 
    status: 'pending', 
    guests: 2, 
    total: 1600,
    avatar: 'MS'
  },
  { 
    id: 3, 
    name: 'Carlos Oliveira', 
    room: 'Casal 1', 
    checkIn: '10/02/2024', 
    checkOut: '12/02/2024', 
    status: 'completed', 
    guests: 2, 
    total: 500,
    avatar: 'CO'
  },
  { 
    id: 4, 
    name: 'Ana Pereira', 
    room: 'Duplex 1', 
    checkIn: '25/02/2024', 
    checkOut: '01/03/2024', 
    status: 'pending', 
    guests: 6, 
    total: 2100,
    avatar: 'AP'
  },
]

const quickActions = [
  { 
    label: 'Nova Reserva', 
    description: 'Criar uma nova reserva',
    icon: Plus, 
    href: '/admin/reservas',
    color: 'bg-primary hover:bg-primary-dark'
  },
  { 
    label: 'Gerenciar Quartos', 
    description: 'Editar preços e disponibilidade',
    icon: BedDouble, 
    href: '/admin/quartos',
    color: 'bg-accent hover:bg-accent-dark'
  },
  { 
    label: 'Ver Reservas', 
    description: 'Ver todas as reservas',
    icon: Calendar, 
    href: '/admin/reservas',
    color: 'bg-green-500 hover:bg-green-600'
  },
]

export default function AdminDashboard() {
  const [timeFilter, setTimeFilter] = useState('month')

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
      default:
        return <span className="text-gray-600 text-xs">{status}</span>
    }
  }

  const getPaymentIcon = (type: string) => {
    switch (type) {
      case 'pix': return <Wallet className="w-4 h-4" />
      case 'card': return <CreditCard className="w-4 h-4" />
      case 'transfer': return <Building className="w-4 h-4" />
      default: return <Wallet className="w-4 h-4" />
    }
  }

  return (
    <AdminLayout currentPage="dashboard">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl text-text-primary">Dashboard</h1>
            <p className="text-text-secondary mt-1">Bem-vindo de volta, Fabio!</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="week">Esta semana</option>
              <option value="month">Este mês</option>
              <option value="year">Este ano</option>
            </select>
            <Link
              href="/admin/reservas"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors shadow-soft hover:shadow-medium"
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">Nova Reserva</span>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.change}
                  <ArrowUpRight className={`w-4 h-4 ${stat.trend === 'down' ? 'rotate-90' : ''}`} />
                </div>
              </div>
              <p className="text-text-secondary text-sm">{stat.label}</p>
              <p className="font-heading text-2xl text-text-primary mt-1">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Recent Bookings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-soft overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="font-heading text-xl text-text-primary">Reservas Recentes</h2>
              <p className="text-text-secondary text-sm mt-0.5">Últimas reservas do sistema</p>
            </div>
            <Link 
              href="/admin/reservas" 
              className="inline-flex items-center gap-1 text-primary hover:text-primary-dark font-medium text-sm"
            >
              Ver todas <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Hóspede</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Quarto</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Datas</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-primary font-medium text-sm">{booking.avatar}</span>
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">{booking.name}</p>
                          <p className="text-text-secondary text-xs">{booking.guests} hóspedes</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-text-secondary">{booking.room}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="text-text-primary">{booking.checkIn}</p>
                        <p className="text-text-secondary text-xs">até {booking.checkOut}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(booking.status)}</td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-text-primary">R$ {booking.total.toLocaleString('pt-BR')}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <Link
                href={action.href}
                className="block group"
              >
                <div className={`${action.color} rounded-2xl p-6 text-white transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-large`}>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                    <action.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading text-lg">{action.label}</h3>
                  <p className="text-white/80 text-sm mt-1">{action.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Payment Methods Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl p-6 shadow-soft"
        >
          <h2 className="font-heading text-xl text-text-primary mb-6">Métodos de Pagamento</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { method: 'PIX', amount: 'R$ 12.450', percentage: '67%', color: 'bg-green-500' },
              { method: 'Cartão', amount: 'R$ 4.200', percentage: '23%', color: 'bg-blue-500' },
              { method: 'Transferência', amount: 'R$ 1.800', percentage: '10%', color: 'bg-purple-500' },
            ].map((payment) => (
              <div key={payment.method} className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-text-secondary text-sm">{payment.method}</span>
                  <span className="text-text-primary font-medium">{payment.percentage}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div className={`${payment.color} h-2 rounded-full`} style={{ width: payment.percentage }} />
                </div>
                <p className="text-text-primary font-semibold">{payment.amount}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  )
}

