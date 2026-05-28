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
    <footer className="relative overflow-hidden">
      <div
        className="candy-stripe-top"
        style={{
          background: 'repeating-linear-gradient(90deg,#ff2a75 0px,#ff2a75 12px,transparent 12px,transparent 16px,#ffb3d0 16px,#ffb3d0 28px,transparent 28px,transparent 32px)',
        }}
      />

      <div className="relative bg-gradient-to-br from-candy-dark via-candy to-candy-light">
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.08) 20px, rgba(255,255,255,0.08) 22px)`,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center">
                  <span className="text-base" aria-hidden="true">🍬</span>
                </div>
                <div>
                  <span className="text-lg font-bold tracking-tight text-white" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                    Candy Shop
                  </span>
                  <div className="text-[0.5rem] font-medium text-white/60 tracking-[0.15em] uppercase leading-none -mt-0.5" style={{ fontFamily: "'Sora', sans-serif" }}>
                    Artisanal sweets
                  </div>
                </div>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                Los mejores dulces y golosinas personalizadas para cualquier ocasión. Calidad y sabor que endulzan tu vida.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                  <Camera className="w-4 h-4 text-white" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                  <Globe className="w-4 h-4 text-white" />
                </a>
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                  <MessageCircle className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Enlaces rápidos</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm text-white/70 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Contacto</h3>
              <ul className="space-y-3 text-sm text-white/70">
                <li className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-white/50 shrink-0" />
                  <span>+1 (234) 567-890</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-white/50 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>hola@candyshop.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-white/50 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Av. Dulce 123, Ciudad</span>
                </li>
              </ul>
              <div className="pt-2">
                <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Métodos de pago</h4>
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-10 h-7 rounded bg-white/20">
                    <CreditCard className="w-4 h-4 text-white/80" />
                  </div>
                  <div className="flex items-center justify-center w-10 h-7 rounded bg-white/20 text-[10px] font-bold text-white/80">MC</div>
                  <div className="flex items-center justify-center w-10 h-7 rounded bg-white/20 text-[10px] font-bold text-white/80">VISA</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-white/60">
              &copy; {new Date().getFullYear()} Candy Shop. Todos los derechos reservados.
            </p>
            <p className="text-xs text-white/60">
              Hecho con <span className="text-white">&hearts;</span> para los amantes del dulce
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
