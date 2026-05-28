import { Heart, Shield, Award } from 'lucide-react'

export default function About() {
  return (
    <div className="relative mx-auto max-w-4xl px-4 py-16">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-6 top-32 h-10 w-10 rounded-full border-2 border-[#26c6da]/10" style={{ animation: 'float-slow 6s ease-in-out 0s infinite' }} />
        <div className="absolute right-8 top-20 h-5 w-5 rounded-lg bg-[#8bc34a]/15 rotate-12" style={{ animation: 'float-slow 4.5s ease-in-out 1.5s infinite' }} />
        <div className="absolute left-1/2 bottom-16 h-4 w-4 rounded-full bg-[#4dd3e0]/12" style={{ animation: 'float-slow 5s ease-in-out 1s infinite' }} />
      </div>

      <div className="relative text-center animate-fade-in-up">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#26c6da]/10">
          <Heart className="h-7 w-7 text-[#26c6da]" />
        </div>
        <h1 className="mt-6 text-4xl font-bold text-[#1a3a2e] sm:text-5xl">
          Sobre Candy Shop
        </h1>
        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
          Somos una tienda de gomitas artesanales con la misión de endulzar tus momentos especiales.
          Elegí, combiná y recibí tu pedido donde quieras.
        </p>
      </div>

      <div className="mt-16 grid gap-8 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm text-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#8bc34a]/20">
            <Shield className="h-6 w-6 text-[#e5a800]" />
          </div>
          <h3 className="mt-4 font-semibold text-[#1a3a2e]">Calidad Garantizada</h3>
          <p className="mt-2 text-sm text-gray-500">Seleccionamos los mejores ingredientes para ofrecerte gomitas frescas y deliciosas.</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#4dd3e0]/20">
            <Award className="h-6 w-6 text-[#4abc9a]" />
          </div>
          <h3 className="mt-4 font-semibold text-[#1a3a2e]">Hecho en Argentina</h3>
          <p className="mt-2 text-sm text-gray-500">Producimos localmente con los más altos estándares de higiene y calidad.</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm text-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#26c6da]/10">
            <Heart className="h-6 w-6 text-[#26c6da]" />
          </div>
          <h3 className="mt-4 font-semibold text-[#1a3a2e]">Amor por el Dulce</h3>
          <p className="mt-2 text-sm text-gray-500">Cada producto está hecho con pasión para que disfrutes el mejor sabor.</p>
        </div>
      </div>

      <div className="mt-16 rounded-2xl bg-gradient-to-br from-[#26c6da] to-[#4dd3e0] p-10 text-center text-white animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <h2 className="text-2xl font-bold">¿Listo para tu mix perfecto?</h2>
        <p className="mt-2 text-white/80">Armá tu pedido personalizado y recibilo en casa</p>
        <a href="/catalogo" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-[#26c6da] shadow-lg transition-transform hover:scale-105">Ir al Catálogo</a>
      </div>
    </div>
  )
}
