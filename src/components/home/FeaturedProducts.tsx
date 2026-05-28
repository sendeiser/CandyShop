import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { useCart } from '../../contexts/CartContext'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import type { Product } from '../../types'

interface Props {
  products: Product[]
}

const badges = ['Mas Vendido', 'Nuevo!', 'Mas Vendido', 'Nuevo!']
const gradients = ['from-pink-200 to-yellow-200', 'from-red-200 to-orange-200', 'from-lime-200 to-green-200', 'from-yellow-200 to-amber-200']

export default function FeaturedProducts({ products }: Props) {
  const { addItem } = useCart()
  const sectionRef = useScrollReveal()

  return (
    <section ref={sectionRef} className="relative overflow-hidden gradient-mesh px-6 py-16 sm:px-12 lg:px-20 reveal">
      <div className="pointer-events-none absolute inset-0">
        <div className="hidden sm:block">
          <div className="absolute right-12 top-10 h-10 w-10 rounded-full border-2 border-[#26c6da]/20" style={{ animation: 'float-slow 6s ease-in-out 0s infinite' }} />
          <div className="absolute left-12 bottom-16 h-6 w-6 rounded-xl bg-[#ec4899]/15 -rotate-12" style={{ animation: 'float-slow 5s ease-in-out 1.5s infinite' }} />
          <div className="absolute right-1/3 top-8 h-4 w-4 rounded-full bg-[#8bc34a]/20" style={{ animation: 'float-slow 4s ease-in-out 0.8s infinite' }} />
          <div className="absolute left-1/4 top-1/3 h-3 w-3 rounded-full bg-[#26c6da]/15" style={{ animation: 'float-slow 3.5s ease-in-out 2.5s infinite' }} />
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold text-[#1a3a2e] sm:text-4xl">
            Los Mas Tentadores
          </h2>
          <p className="mt-2 text-lg text-[#8d6e63]">Productos estrella</p>
        </div>

        {products.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, i) => {
              const badge = badges[i % badges.length]
              return (
                <div
                  key={product.id}
                  className={`group rounded-2xl bg-white shadow-sm ${i % 2 === 0 ? 'sm:card-tilt-right sm:mt-2' : 'sm:card-tilt-left sm:-mt-1'}`}
                  style={{ animation: `fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 * (i + 1)}s both` }}
                >
                  <div className="relative overflow-hidden rounded-t-2xl">
                    <Link to={`/producto/${product.slug}`}>
                      {product.image_url ? (
                        <div className="h-52 overflow-hidden">
                          <img src={product.image_url} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" decoding="async" />
                        </div>
                      ) : (
                        <div className={`flex h-52 items-center justify-center bg-gradient-to-br ${gradients[i % gradients.length]}`}>
                          <span className="text-5xl font-black text-white/30">{product.name.charAt(0)}</span>
                        </div>
                      )}
                    </Link>
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#ec4899] shadow-sm">
                      {badge}
                    </span>
                  </div>
                  <div className="p-4">
                    <Link to={`/producto/${product.slug}`}>
                      <h3 className="font-sans text-base font-semibold text-[#1a3a2e] transition-colors group-hover:text-[#26c6da]">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="mt-1 text-xl font-bold text-[#26c6da]">
                      ${product.price.toLocaleString('es-AR')}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        const w = product.weight_options?.[0] ?? { label: '100g', grams: 100, price: product.price }
                        addItem(product as any, w, 1)
                      }}
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#ec4899] py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#db2777] active:scale-95"
                    >
                      <Plus className="h-4 w-4" />
                      Agregar +
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="mt-10 flex items-center justify-center py-12 text-gray-400">
            <p className="text-lg font-medium">Cargando productos destacados...</p>
          </div>
        )}
      </div>
    </section>
  )
}
