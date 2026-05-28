import { Link } from 'react-router-dom'
import { ArrowRight, Package } from 'lucide-react'
import { BlobShape, BlobShape2 } from '../ui/Decorations'

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 py-16 sm:px-12 sm:py-20 lg:px-20 min-h-[100svh] flex items-center">
      <div className="pointer-events-none absolute inset-0">
        <img
          src="/images/hero.jpg"
          alt=""
          className="h-full w-full object-cover object-center"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      </div>
      <div className="pointer-events-none absolute inset-0">
        <div className="hidden sm:block">
          <BlobShape className="absolute -left-20 -top-20 h-[500px] w-[500px] animate-blob" color="#ffffff" opacity={0.08} />
          <BlobShape2 className="absolute -bottom-32 -right-20 h-[600px] w-[600px] animate-blob-slow" color="#ffb3d0" opacity={0.12} />
          <BlobShape className="absolute left-1/4 top-1/4 h-[200px] w-[200px] animate-blob-slow" color="#69f0ae" opacity={0.1} style={{ animationDelay: '2s' }} />
          <BlobShape2 className="absolute right-1/4 bottom-1/3 h-[180px] w-[180px] animate-blob" color="#ffffff" opacity={0.06} style={{ animationDelay: '4s' }} />
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl w-full">
        <div className="max-w-2xl">
          <div className="animate-fade-in-up">
            <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white sm:backdrop-blur-sm">
              Dulces artesanales
            </span>
          </div>
          <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            Arma tu mix perfecto
            <br />
            <span className="text-lemon">y recibilo en casa</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/85 sm:text-xl animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            Las gomitas mas frescas y sabrosas las armas vos. Elegi, combina y
            recibi tu pedido donde quieras.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
            <Link
              to="/catalogo"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-candy shadow-lg transition-transform transition-shadow hover:scale-105 hover:shadow-xl active:scale-95"
            >
              Ver Catalogo
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/catalogo"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/60 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:border-white hover:bg-white/10 active:scale-95"
            >
              <Package className="h-5 w-5" />
              Mayoristas
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
