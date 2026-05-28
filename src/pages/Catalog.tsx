import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import ProductGrid from '../components/product/ProductGrid'
import { getActiveProducts } from '../lib/api'
import type { Product } from '../types'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Catalog() {
  const ref = useScrollReveal()
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getActiveProducts().then((data) => {
      setProducts(data)
      setLoading(false)
    })
  }, [])

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div ref={ref} className="scroll-reveal relative mx-auto max-w-7xl px-4 py-10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hidden sm:block">
          <div className="absolute -left-4 top-20 h-6 w-6 rounded-full bg-[#26c6da]/10" style={{ animation: 'float-slow 5s ease-in-out 0s infinite' }} />
          <div className="absolute right-8 top-16 h-4 w-4 rounded-lg bg-[#8bc34a]/15 rotate-12" style={{ animation: 'float-slow 4.5s ease-in-out 1.5s infinite' }} />
          <div className="absolute left-1/3 bottom-12 h-5 w-5 rounded-full bg-[#4dd3e0]/12" style={{ animation: 'float-slow 6s ease-in-out 0.5s infinite' }} />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-[#1a3a2e] sm:text-4xl animate-fade-in-up">Catálogo de Gomitas</h1>

      <div className="relative mt-6 max-w-md animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar gomitas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm text-gray-700 placeholder-gray-400 shadow-sm focus:border-[#26c6da] focus:outline-none focus:ring-2 focus:ring-[#26c6da]/20"
        />
      </div>

      <div className="mt-8">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-gray-400">
            <p className="text-lg font-medium">Cargando productos...</p>
          </div>
        ) : (
          <ProductGrid products={filtered} />
        )}
      </div>
    </div>
  )
}
