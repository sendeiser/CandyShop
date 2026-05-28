import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { useCart } from '../../contexts/CartContext'

interface ProductCardProps {
  product: {
    id: string
    name: string
    slug: string
    price: number
    image_url: string | null
    weight_options: any[] | null
    is_featured: boolean
    category?: { name: string } | null
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  const defaultWeight = product.weight_options?.[0] ?? { label: '100g', grams: 100, price: product.price }

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product as any, defaultWeight)
  }

  return (
    <Link
      to={`/producto/${product.slug}`}
      className="card-3d block bg-white rounded-2xl shadow-sm group"
    >
      <div className="aspect-square rounded-t-2xl overflow-hidden bg-vanilla">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="shimmer w-full h-full" />
        )}
      </div>

      <div className="p-4">
        {product.category && (
          <span className="inline-block text-xs font-medium text-pink-500 bg-pink-50 px-2 py-0.5 rounded-full mb-2">
            {product.category.name}
          </span>
        )}

        <h3 className="font-sans font-semibold text-gray-800 text-sm leading-tight mb-1 line-clamp-2">
          {product.name}
        </h3>

        <p className="font-bold text-lg text-candy">
          ${defaultWeight.price.toFixed(2)}
        </p>

        <button
          onClick={handleAdd}
          className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 rounded-full text-sm font-semibold text-white bg-candy transition-opacity hover:opacity-90 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Agregar +
        </button>
      </div>
    </Link>
  )
}
