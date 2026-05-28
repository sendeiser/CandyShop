import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, LogOut, Shield } from 'lucide-react'
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
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="candy-stripe-top" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-candy to-candy-light flex items-center justify-center shadow-md shadow-candy/20 group-hover:shadow-lg group-hover:shadow-candy/30 transition-shadow">
              <span className="text-base" aria-hidden="true">🍬</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold tracking-tight text-candy" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                Candy Shop
              </span>
              <div className="text-[0.5rem] font-medium text-caramel tracking-[0.15em] uppercase leading-none -mt-0.5" style={{ fontFamily: "'Sora', sans-serif" }}>
                Artisanal sweets
              </div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, i) => (
              i === 0 ? (
                <Link
                  key={link.to}
                  to={link.to}
                  className="px-3.5 py-1.5 rounded-full bg-candy text-white text-sm font-medium shadow-sm shadow-candy/20"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  className="px-3.5 py-1.5 text-sm font-medium text-caramel hover:text-candy transition-colors"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-sm mx-4 lg:mx-8">
            <div className="relative w-full">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs" aria-hidden="true">🍭</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar..."
                aria-label="Buscar productos"
                autoComplete="off"
                className="w-full pl-9 pr-4 py-2 rounded-full border border-bubblegum bg-white text-sm text-chocolate placeholder-caramel/60 focus:outline-none focus:ring-2 focus:ring-candy/30 focus:border-candy transition-all"
                style={{ fontFamily: "'Sora', sans-serif" }}
              />
            </div>
          </form>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <Link
                to="/admin"
                className="hidden md:flex items-center gap-1 text-sm font-medium text-caramel hover:text-candy transition-colors"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                <Shield className="w-4 h-4" />
              </Link>
            )}

            {user ? (
              <div className="hidden md:flex items-center gap-1.5">
                <Link to="/auth/login" className="flex items-center gap-1.5 text-sm font-medium text-caramel hover:text-candy transition-colors max-w-[120px]" style={{ fontFamily: "'Sora', sans-serif" }}>
                  <User className="w-4 h-4 shrink-0" />
                  <span className="truncate">{user.name ?? user.email}</span>
                </Link>
                <button onClick={signOut} className="text-caramel hover:text-red-500 transition-colors p-1">
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Link
                to="/auth/login"
                className="hidden md:flex items-center gap-1.5 text-sm font-medium text-caramel hover:text-candy transition-colors"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                <User className="w-4 h-4" />
                <span>Ingresar</span>
              </Link>
            )}

            <Link
              to="/carrito"
              className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-candy to-candy-light shadow-md shadow-candy/20 active:scale-95 transition-all"
            >
              <span className="text-sm" aria-hidden="true">🍬</span>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4.5 h-4.5 text-[10px] font-bold text-white rounded-full bg-orange"
                  style={{ background: '#ff6d00', boxShadow: '0 2px 6px rgba(255,109,0,0.4)' }}
                >
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex items-center gap-1 px-3 py-1.5 rounded-full border border-bubblegum text-sm text-caramel hover:bg-bubblegum/20 transition-colors"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              <span className="flex gap-0.5 text-xs" aria-hidden="true">🍬🍭🍫</span>
              <span>Menú</span>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-dashed border-bubblegum bg-white">
          <div className="px-4 py-4 space-y-4">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs" aria-hidden="true">🍭</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar..."
                  aria-label="Buscar productos"
                  autoComplete="off"
                  className="w-full pl-9 pr-4 py-2.5 rounded-full border border-bubblegum bg-white text-sm text-chocolate placeholder-caramel/60 focus:outline-none focus:ring-2 focus:ring-candy/30 focus:border-candy transition-all"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                />
              </div>
            </form>

            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="flex min-h-[44px] items-center px-4 text-sm font-medium text-caramel hover:text-candy hover:bg-candy/5 rounded-lg transition-colors"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  {link.label}
                </Link>
              ))}
              {user ? (
                <>
                  <div className="flex min-h-[44px] items-center gap-2 px-4 text-sm text-caramel">
                    <User className="w-4 h-4 shrink-0" />
                    <span className="truncate">{user.name ?? user.email}</span>
                  </div>
                  <button
                    onClick={() => { signOut(); setIsOpen(false) }}
                    className="flex min-h-[44px] items-center px-4 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors w-full text-left"
                    style={{ fontFamily: "'Sora', sans-serif" }}
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <Link
                  to="/auth/login"
                  onClick={() => setIsOpen(false)}
                  className="flex min-h-[44px] items-center px-4 text-sm font-medium text-caramel hover:text-candy hover:bg-candy/5 rounded-lg transition-colors"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  Ingresar
                </Link>
              )}
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex min-h-[44px] items-center gap-2 px-4 text-sm font-medium text-caramel hover:text-candy hover:bg-candy/5 rounded-lg transition-colors"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
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
