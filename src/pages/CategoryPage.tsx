import { useLocation, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import ProductGrid from '../components/product/ProductGrid'

const categoryMap: Record<string, { title: string; description: string }> = {
  gomitas: { title: 'Gomitas', description: 'Todas nuestras gomitas sueltas y por peso' },
  combos: { title: 'Combos', description: 'Combos armados para compartir' },
  eventos: { title: 'Eventos', description: 'Cotizá combos para cumpleaños y fiestas' },
  'gomitas-por-kilo': { title: 'Gomitas por Kilo', description: 'Gomitas sueltas al peso que más quieras' },
  'bolsitas-surtidas': { title: 'Bolsitas Surtidas', description: 'Bolistias de 100g y 250g con variedad' },
  'candy-boxes': { title: 'Candy Boxes & Regalos', description: 'Cajas armadas para regalar' },
  'combos-eventos': { title: 'Combos para Eventos', description: 'Combos para cumpleaños y fiestas' },
}

const mockProducts = [
  { id: '1', name: 'Ositos de Gelatina', slug: 'ositos-gelatina', price: 1200, description: null, category_id: null, image_url: null, weight_options: [{ label: '100g', grams: 100, price: 1200 }, { label: '250g', grams: 250, price: 2800 }, { label: '500g', grams: 500, price: 5200 }, { label: '1kg', grams: 1000, price: 9500 }], is_featured: true, is_active: true, created_at: new Date().toISOString(), category: { name: 'Gomitas por Kilo' } },
  { id: '2', name: 'Corazones Frutales', slug: 'corazones-frutales', price: 1400, description: null, category_id: null, image_url: null, weight_options: [{ label: '100g', grams: 100, price: 1400 }, { label: '250g', grams: 250, price: 3200 }, { label: '500g', grams: 500, price: 5800 }, { label: '1kg', grams: 1000, price: 10500 }], is_featured: true, is_active: true, created_at: new Date().toISOString(), category: { name: 'Gomitas por Kilo' } },
  { id: '3', name: 'Gusanos Ácidos', slug: 'gusanos-acidos', price: 1100, description: null, category_id: null, image_url: null, weight_options: [{ label: '100g', grams: 100, price: 1100 }, { label: '250g', grams: 250, price: 2500 }, { label: '500g', grams: 500, price: 4800 }, { label: '1kg', grams: 1000, price: 8800 }], is_featured: true, is_active: true, created_at: new Date().toISOString(), category: { name: 'Gomitas por Kilo' } },
  { id: '4', name: 'Mix Frutal', slug: 'mix-frutal', price: 1500, description: null, category_id: null, image_url: null, weight_options: [{ label: '100g', grams: 100, price: 1500 }, { label: '250g', grams: 250, price: 3500 }, { label: '500g', grams: 500, price: 6200 }, { label: '1kg', grams: 1000, price: 11500 }], is_featured: true, is_active: true, created_at: new Date().toISOString(), category: { name: 'Gomitas por Kilo' } },
  { id: '5', name: 'Aros de Fruta', slug: 'aros-fruta', price: 1300, description: null, category_id: null, image_url: null, weight_options: [{ label: '100g', grams: 100, price: 1300 }, { label: '250g', grams: 250, price: 3000 }, { label: '500g', grams: 500, price: 5500 }, { label: '1kg', grams: 1000, price: 10000 }], is_featured: false, is_active: true, created_at: new Date().toISOString(), category: { name: 'Gomitas por Kilo' } },
  { id: '6', name: 'Botellas de Coca', slug: 'botellas-coca', price: 1200, description: null, category_id: null, image_url: null, weight_options: [{ label: '100g', grams: 100, price: 1200 }, { label: '250g', grams: 250, price: 2800 }, { label: '500g', grams: 500, price: 5200 }, { label: '1kg', grams: 1000, price: 9500 }], is_featured: false, is_active: true, created_at: new Date().toISOString(), category: { name: 'Gomitas por Kilo' } },
]

export default function CategoryPage() {
  const { pathname } = useLocation()
  const slug = pathname.replace(/^\//, '')
  const info = slug ? categoryMap[slug] : categoryMap['gomitas']

  return (
    <div className="relative mx-auto max-w-7xl px-4 py-10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 top-20 h-6 w-6 rounded-full bg-candy/10" style={{ animation: 'float-slow 5s ease-in-out 0s infinite' }} />
        <div className="absolute right-8 top-16 h-4 w-4 rounded-lg bg-mint/15 rotate-12" style={{ animation: 'float-slow 4.5s ease-in-out 1.5s infinite' }} />
        <div className="absolute left-1/3 bottom-12 h-5 w-5 rounded-full bg-cotton/12" style={{ animation: 'float-slow 6s ease-in-out 0.5s infinite' }} />
      </div>

      <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-candy">
        <ArrowLeft className="h-4 w-4" />
        Volver al inicio
      </Link>

      <h1 className="text-3xl font-bold text-chocolate sm:text-4xl animate-fade-in-up">{info?.title ?? 'Categoría'}</h1>
      {info?.description && (
        <p className="mt-2 text-gray-600 animate-fade-in" style={{ animationDelay: '0.2s' }}>{info.description}</p>
      )}

      <div className="mt-8">
        <ProductGrid products={mockProducts} />
      </div>
    </div>
  )
}
