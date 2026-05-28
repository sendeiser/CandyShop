import { Link } from 'react-router-dom'
import { ArrowRight, Package } from 'lucide-react'
import { BlobShape, BlobShape2, DotsPattern } from '../ui/Decorations'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#26c6da] via-[#1aa3b3] to-[#ec4899] px-6 py-20 sm:px-12 sm:py-28 lg:px-20">
      <div className="pointer-events-none absolute inset-0">
        <BlobShape className="absolute -left-20 -top-20 h-[500px] w-[500px] animate-blob" color="#ffffff" opacity={0.08} />
        <BlobShape2 className="absolute -bottom-32 -right-20 h-[600px] w-[600px] animate-blob-slow" color="#ec4899" opacity={0.12} />
        <BlobShape className="absolute left-1/3 top-1/4 h-[200px] w-[200px] animate-blob-slow" color="#8bc34a" opacity={0.1} style={{ animationDelay: '2s' }} />
        <BlobShape2 className="absolute right-1/4 bottom-1/3 h-[180px] w-[180px] animate-blob" color="#ffffff" opacity={0.06} style={{ animationDelay: '4s' }} />
        <DotsPattern className="absolute right-0 top-0 h-full w-full opacity-60" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center">
          <div className="flex-1 lg:pr-12">
            <div className="animate-fade-in-up">
              <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                Dulces artesanales
              </span>
            </div>
            <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
              Arma tu mix perfecto
              <br />
              <span className="text-[#fbbf24]">y recibilo en casa</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/85 sm:text-xl animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              Las gomitas mas frescas y sabrosas las armas vos. Elegi, combina y
              recibi tu pedido donde quieras.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
              <Link
                to="/catalogo"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-[#26c6da] shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95"
              >
                Ver Catalogo
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/catalogo"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/60 px-8 py-3.5 text-base font-semibold text-white transition-all hover:border-white hover:bg-white/10 active:scale-95"
              >
                <Package className="h-5 w-5" />
                Mayoristas
              </Link>
            </div>
          </div>

          <div className="relative hidden flex-1 lg:block">
            <div className="relative mx-auto h-[400px] w-[400px]">
              <BlobShape className="absolute left-0 top-0 h-full w-full animate-blob" color="#ffffff" opacity={0.1} />
              <BlobShape2 className="absolute left-[10%] top-[10%] h-[80%] w-[80%] animate-blob-slow" color="#ec4899" opacity={0.12} style={{ animationDelay: '1s' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl font-black text-white/15" style={{ fontFamily: "'DM Serif Display', serif" }}>
                    CS
                  </div>
                  <p className="mt-2 text-sm font-medium tracking-widest text-white/40 uppercase">
                    Candy Shop
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
