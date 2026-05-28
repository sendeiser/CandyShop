import { Sparkles, Truck, DollarSign } from 'lucide-react'

const trustItems = [
  {
    icon: Sparkles,
    title: 'Fraccionamiento 100% Higiénico',
    description: 'Todo nuestro proceso cumple con los más altos estándares de higiene y calidad.',
  },
  {
    icon: Truck,
    title: 'Envíos Rápidos a todo el país',
    description: 'Recibí tu pedido en 24 a 72 horas hábiles. Enviamos a toda la Argentina.',
  },
  {
    icon: DollarSign,
    title: 'Descuentos por pago en Efectivo',
    description: 'Aprovechá promociones exclusivas pagando en efectivo o transferencia bancaria.',
  },
]

export default function TrustSection() {
  return (
    <section className="relative overflow-hidden bg-vanilla px-6 py-16 sm:px-12 lg:px-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-8 top-8 h-5 w-5 rounded-full bg-candy/10" style={{ animation: 'float-slow 4.5s ease-in-out 0s infinite' }} />
        <div className="absolute right-12 bottom-12 h-4 w-4 rounded-lg bg-mint/15 rotate-12" style={{ animation: 'float-slow 5.5s ease-in-out 1s infinite' }} />
        <div className="absolute left-1/2 bottom-8 h-3 w-3 rounded-full bg-cotton/15" style={{ animation: 'float-slow 3.5s ease-in-out 2s infinite' }} />
      </div>
      <div className="relative mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {trustItems.map((item, i) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="flex flex-col items-center text-center animate-fade-in-up" style={{ animationDelay: `${0.15 * (i + 1)}s` }}>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-candy/10">
                  <Icon className="h-7 w-7 text-candy" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-chocolate">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#8d6e63]">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
