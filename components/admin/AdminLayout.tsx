'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Home, BedDouble, Calendar, Settings, LogOut, 
  Menu, X, Waves, ChevronLeft, Users, BarChart3, FileBarChart
} from 'lucide-react'

interface AdminLayoutProps {
  children: React.ReactNode
  currentPage: string
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/admin/dashboard' },
  { id: 'reservas', label: 'Reservas', icon: Calendar, href: '/admin/reservas' },
  { id: 'calendario', label: 'Calendário', icon: Calendar, href: '/admin/calendario' },
  { id: 'quartos', label: 'Quartos', icon: BedDouble, href: '/admin/quartos' },
  { id: 'huespedes', label: 'Hóspedes', icon: Users, href: '/admin/huespedes' },
  { id: 'reportes', label: 'Relatórios', icon: FileBarChart, href: '/admin/reportes' },
  { id: 'configuracoes', label: 'Configurações', icon: Settings, href: '/admin/configuracoes' },
]

export default function AdminLayout({ children, currentPage }: AdminLayoutProps) {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      const session = localStorage.getItem('admin_session')
      if (!session) {
        router.push('/admin')
      } else {
        setIsAuthorized(true)
      }
    }
    checkAuth()

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('admin_session')
    router.push('/admin')
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse flex items-center gap-2 text-primary">
          <Waves className="w-8 h-8" />
          <span className="text-xl font-heading">Melodie Pousada</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-primary text-white p-2 rounded-lg shadow-medium"
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          x: isSidebarOpen || !isMobile ? 0 : -280,
          width: isSidebarOpen ? 280 : 80
        }}
        className={`fixed left-0 top-0 h-full bg-primary z-40 flex flex-col ${
          isMobile ? 'shadow-large' : ''
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Waves className="w-6 h-6 text-white" />
            </div>
            {isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="overflow-hidden"
              >
                <h1 className="font-heading text-xl text-white">Melodie</h1>
                <p className="text-white/60 text-xs">Painel Admin</p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                currentPage === item.id
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {isSidebarOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-medium"
                >
                  {item.label}
                </motion.span>
              )}
            </Link>
          ))}
        </nav>

        {/* Sidebar Toggle & Logout */}
        <div className="p-4 border-t border-white/10 space-y-2">
          {!isMobile && (
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-xl w-full transition-colors"
            >
              <ChevronLeft className={`w-5 h-5 transition-transform ${!isSidebarOpen ? 'rotate-180' : ''}`} />
              {isSidebarOpen && <span className="font-medium">Recolher</span>}
            </button>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-red-300 hover:bg-red-500/20 rounded-xl w-full transition-colors"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span className="font-medium">Sair</span>}
          </button>
        </div>
      </motion.aside>

      {/* Overlay for mobile */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main 
        className={`transition-all duration-300 min-h-screen ${
          isSidebarOpen ? 'lg:ml-[280px]' : 'lg:ml-20'
        }`}
      >
        <div className="p-4 lg:p-8 pt-16 lg:pt-8">
          {children}
        </div>
      </main>
    </div>
  )
}

