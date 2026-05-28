import { Smile } from 'lucide-react'
import ProductCard from './ProductCard'

interface ProductGridProps {
  products: any[]
  columns?: 2 | 3 | 4
}

export default function ProductGrid({ products, columns = 4 }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <Smile className="w-16 h-16 mb-4" />
        <p className="text-lg font-medium">Próximamente...</p>
      </div>
    )
  }

  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
