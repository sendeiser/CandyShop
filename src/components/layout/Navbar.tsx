import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Search, Menu, X, Shield, User, LogOut } from 'lucide-react'
import { useCart } from '../../contexts/CartContext'
import { useAuth } from '../../contexts/AuthContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const { totalItems } = useCart()
  const { user, isAdmin, signOut } = useAuth()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/buscar?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  const navLinks = [
    { label: 'Gomitas', to: '/gomitas' },
    { label: 'Combos', to: '/combos' },
    { label: 'Eventos', to: '/eventos' },
    { label: 'Nosotros', to: '/nosotros' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span
              className="text-2xl font-bold tracking-tight"
              style={{ color: '#26c6da', fontFamily: "'Fredoka One', 'Fredoka', cursive" }}
            >
              Candy Shop
            </span>
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar productos..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 bg-gray-50 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all"
              />
            </div>
          </form>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-gray-600 hover:text-pink-500 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link
                to="/admin"
                className="hidden md:flex items-center gap-1 text-sm font-medium text-gray-400 hover:text-pink-500 transition-colors"
              >
                <Shield className="w-4 h-4" />
                <span>Admin</span>
              </Link>
            )}

            {user ? (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/auth/login" className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-pink-500 transition-colors">
                  <User className="w-4 h-4" />
                  <span>{user.name ?? user.email}</span>
                </Link>
                <button onClick={signOut} className="flex items-center gap-1 text-sm text-gray-400 hover:text-red-500 transition-colors">
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Link
                to="/auth/login"
                className="hidden md:flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-pink-500 transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Ingresar</span>
              </Link>
            )}

            <Link
              to="/carrito"
              className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-pink-50 transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-gray-600 hover:text-pink-500 transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-5 h-5 text-[11px] font-bold text-white rounded-full"
                  style={{ backgroundColor: '#ec4899' }}
                >
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
            >
              {isOpen ? <X className="w-5 h-5 text-gray-600" /> : <Menu className="w-5 h-5 text-gray-600" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-4 space-y-4">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar productos..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 bg-gray-50 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all"
                />
              </div>
            </form>

            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="flex min-h-[44px] items-center px-4 text-sm font-medium text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              {user ? (
                <>
                  <div className="flex min-h-[44px] items-center gap-2 px-4 text-sm text-gray-500">
                    <User className="w-4 h-4 shrink-0" />
                    <span className="truncate">{user.name ?? user.email}</span>
                  </div>
                  <button onClick={() => { signOut(); setIsOpen(false) }} className="flex min-h-[44px] items-center px-4 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors w-full text-left">
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <Link to="/auth/login" onClick={() => setIsOpen(false)} className="flex min-h-[44px] items-center px-4 text-sm font-medium text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition-colors">
                  Ingresar
                </Link>
              )}
              {isAdmin && (
                <Link to="/admin" onClick={() => setIsOpen(false)} className="flex min-h-[44px] items-center gap-2 px-4 text-sm font-medium text-gray-400 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition-colors">
                  <Shield className="w-4 h-4 shrink-0" />
                  Admin
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
