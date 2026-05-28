import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Minus, Plus, ShoppingBag } from 'lucide-react'
import WeightSelector from '../components/product/WeightSelector'
import { useCart } from '../contexts/CartContext'
import { getProductBySlug } from '../lib/api'
import type { WeightOption, Product } from '../types'

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { addItem } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    getProductBySlug(slug).then((data) => {
      setProduct(data)
      setLoading(false)
    })
  }, [slug])

  const [selectedWeight, setSelectedWeight] = useState<WeightOption | null>(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (product?.weight_options) {
      setSelectedWeight(product.weight_options[0])
      setQuantity(1)
    }
  }, [product])

  const handleAddToCart = () => {
    if (!product || !selectedWeight) return
    addItem(product as any, selectedWeight, quantity)
  }

  if (loading) {
    return (
      <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-32">
        <p className="text-lg text-gray-400">Cargando producto...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <p className="text-lg text-gray-500">Producto no encontrado</p>
        <Link to="/catalogo" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#26c6da] hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Volver al catálogo
        </Link>
      </div>
    )
  }

  return (
    <div className="relative mx-auto max-w-7xl px-4 py-10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hidden sm:block">
          <div className="absolute right-12 top-24 h-8 w-8 rounded-full border-2 border-[#26c6da]/10" style={{ animation: 'float-slow 5s ease-in-out 0s infinite' }} />
          <div className="absolute left-8 bottom-24 h-5 w-5 rounded-lg bg-[#8bc34a]/15 rotate-12" style={{ animation: 'float-slow 4.5s ease-in-out 1.5s infinite' }} />
          <div className="absolute right-1/4 top-1/2 h-4 w-4 rounded-full bg-[#4dd3e0]/12" style={{ animation: 'float-slow 6s ease-in-out 0.8s infinite' }} />
        </div>
      </div>

      <Link
        to="/catalogo"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-[#26c6da] transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al catálogo
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="flex h-96 items-center justify-center rounded-2xl bg-[#faf6f5] shadow-sm">
          {product.image_url ? (
            <img src={product.image_url} alt={product.name} className="h-full w-full rounded-2xl object-cover" />
          ) : (
            <span className="text-7xl font-black text-white/40">
              {product.name.charAt(0)}
            </span>
          )}
        </div>

        <div>
          {product.category && (
            <span className="inline-block rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-[#26c6da]">
              {product.category.name}
            </span>
          )}

          <h1 className="mt-3 text-3xl font-bold text-[#1a3a2e] sm:text-4xl">
            {product.name}
          </h1>

          <p className="mt-4 leading-relaxed text-gray-600">
            {product.description}
          </p>

          {selectedWeight && (
            <p className="mt-6 text-3xl font-bold text-[#26c6da]">
              ${selectedWeight.price.toLocaleString('es-AR')}
            </p>
          )}

          {product.weight_options && product.weight_options.length > 0 && (
            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Peso
              </label>
              <WeightSelector
                options={product.weight_options}
                value={selectedWeight}
                onChange={(opt) => {
                  setSelectedWeight(opt)
                  setQuantity(1)
                }}
              />
            </div>
          )}

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Cantidad
            </label>
            <div className="inline-flex items-center gap-3 rounded-xl border border-gray-200 px-3 py-2">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 hover:text-[#26c6da]"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-[2rem] text-center text-lg font-semibold text-gray-800">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 hover:text-[#26c6da]"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#ec4899] py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-[#db2777] active:scale-95 sm:w-auto sm:px-12"
          >
            <ShoppingBag className="h-5 w-5" />
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  )
}
