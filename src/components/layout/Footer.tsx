import { Link } from 'react-router-dom'
import { Camera, Globe, MessageCircle, CreditCard } from 'lucide-react'

export default function Footer() {
  const quickLinks = [
    { label: 'Gomitas', to: '/gomitas' },
    { label: 'Combos', to: '/combos' },
    { label: 'Eventos', to: '/eventos' },
    { label: 'Nosotros', to: '/nosotros' },
    { label: 'Contacto', to: '/contacto' },
  ]

  return (
    <footer className="relative overflow-hidden bg-[#1a3a2e] text-gray-300">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-6 top-20 h-8 w-8 rounded-full border border-white/5" style={{ animation: 'float-slow 7s ease-in-out 0s infinite' }} />
        <div className="absolute right-12 top-10 h-4 w-4 rounded-lg border border-white/5 rotate-12" style={{ animation: 'float-slow 5s ease-in-out 2s infinite' }} />
        <div className="absolute left-1/3 bottom-16 h-5 w-5 rounded-full bg-white/[0.02]" style={{ animation: 'float-slow 6s ease-in-out 1s infinite' }} />
        <div className="absolute right-1/4 bottom-8 h-3 w-3 rounded-full bg-white/[0.03]" style={{ animation: 'float-slow 4s ease-in-out 0.5s infinite' }} />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div className="space-y-4">
            <span
              className="text-2xl font-bold tracking-tight"
              style={{ color: '#26c6da', fontFamily: "'Fredoka One', 'Fredoka', cursive" }}
            >
              Candy Shop
            </span>
            <p className="text-sm text-gray-400 leading-relaxed">
              Los mejores dulces y golosinas personalizadas para cualquier ocasión. Calidad y sabor que endulzan tu vida.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-pink-500 hover:text-white transition-all"
              >
                <Camera className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-pink-500 hover:text-white transition-all"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-pink-500 hover:text-white transition-all"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Enlaces rápidos</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-400 hover:text-pink-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Contacto</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-pink-400 shrink-0" />
                <span>+1 (234) 567-890</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-pink-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>hola@candyshop.com</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-pink-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Av. Dulce 123, Ciudad</span>
              </li>
            </ul>
            <div className="pt-2">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Métodos de pago</h4>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-7 rounded bg-white/10">
                  <CreditCard className="w-4 h-4 text-gray-300" />
                </div>
                <div className="flex items-center justify-center w-10 h-7 rounded bg-white/10 text-[10px] font-bold text-gray-300">
                  MC
                </div>
                <div className="flex items-center justify-center w-10 h-7 rounded bg-white/10 text-[10px] font-bold text-gray-300">
                  VISA
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Candy Shop. Todos los derechos reservados.
          </p>
          <p className="text-xs text-gray-500">
            Hecho con <span style={{ color: '#26c6da' }}>&hearts;</span> para los amantes del dulce
          </p>
        </div>
      </div>
    </footer>
  )
}
