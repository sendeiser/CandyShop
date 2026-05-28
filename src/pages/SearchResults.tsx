import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Search, ArrowLeft } from 'lucide-react'
import ProductGrid from '../components/product/ProductGrid'
import { searchProducts } from '../lib/api'
import type { Product } from '../types'

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!query) {
      setProducts([])
      setLoading(false)
      return
    }
    setLoading(true)
    searchProducts(query).then((data) => {
      setProducts(data)
      setLoading(false)
    })
  }, [query])

  return (
    <div className="relative mx-auto max-w-7xl px-4 py-10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hidden sm:block">
          <div className="absolute -left-4 top-20 h-6 w-6 rounded-full bg-candy/10" style={{ animation: 'float-slow 5s ease-in-out 0s infinite' }} />
          <div className="absolute right-8 top-16 h-4 w-4 rounded-lg bg-mint/15 rotate-12" style={{ animation: 'float-slow 4.5s ease-in-out 1.5s infinite' }} />
        </div>
      </div>

      <Link to="/catalogo" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-candy">
        <ArrowLeft className="h-4 w-4" />
        Volver al catálogo
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <Search className="h-5 w-5 text-gray-400" />
        <h1 className="text-2xl font-bold text-chocolate sm:text-3xl">
          Resultados para "{query}"
        </h1>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-400">
          <p className="text-lg font-medium">Buscando...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <Search className="h-16 w-16 mb-4" />
          <p className="text-lg font-medium">No encontramos "{query}"</p>
          <p className="text-sm mt-1">Probá con otro término</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-6">{products.length} producto{products.length !== 1 ? 's' : ''} encontrado{products.length !== 1 ? 's' : ''}</p>
          <ProductGrid products={products} />
        </>
      )}
    </div>
  )
}
