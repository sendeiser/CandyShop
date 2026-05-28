import { useEffect, useState } from 'react'
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Package, Tags, ShoppingCart, Users, Menu, X, ArrowLeft } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/productos', label: 'Productos', icon: Package },
  { to: '/admin/categorias', label: 'Categorías', icon: Tags },
  { to: '/admin/pedidos', label: 'Pedidos', icon: ShoppingCart },
  { to: '/admin/clientes', label: 'Clientes', icon: Users },
]

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, loading, isAdmin } = useAuth()

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) navigate('/auth/login')
  }, [user, loading, isAdmin, navigate])

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-[#faf6f5]"><p className="text-gray-400">Verificando acceso...</p></div>
  if (!user || !isAdmin) return null

  return (
    <div className="min-h-screen bg-[#faf6f5] flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-[#1a3a2e] text-white transform transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <span className="font-bold text-lg tracking-wide">Candy Shop</span>
          <button
            className="lg:hidden p-1 rounded hover:bg-white/10"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = item.to === '/admin'
              ? location.pathname === '/admin'
              : location.pathname.startsWith(item.to)
            const Icon = item.icon
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#26c6da] text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#e0d6d5] px-4 lg:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-1.5 rounded hover:bg-[#faf6f5] text-[#1a3a2e]"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <h1 className="text-lg font-semibold text-[#1a3a2e]">Admin Panel</h1>
          </div>
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm text-[#8d6e63] hover:text-[#26c6da] transition-colors"
          >
            <ArrowLeft size={16} />
            Volver a Tienda
          </Link>
        </header>

        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
