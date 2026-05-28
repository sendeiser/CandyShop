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
    <div ref={ref} className="relative mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold text-chocolate sm:text-4xl" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
        Catálogo de Gomitas
      </h1>

      <div className="relative mt-6 max-w-md">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-caramel/60" />
        <input
          type="text"
          placeholder="Buscar gomitas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-bubblegum bg-white py-3 pl-12 pr-4 text-sm text-chocolate placeholder-caramel/60 focus:border-candy focus:outline-none focus:ring-2 focus:ring-candy/20"
          style={{ fontFamily: "'Sora', sans-serif" }}
        />
      </div>

      <div className="mt-8">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-caramel">
            <p className="text-lg font-medium">Cargando productos...</p>
          </div>
        ) : (
          <ProductGrid products={filtered} />
        )}
      </div>
    </div>
  )
}
