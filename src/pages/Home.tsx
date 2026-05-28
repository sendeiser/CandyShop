import { useEffect, useState } from 'react'
import Hero from '../components/home/Hero'
import CategoriesGrid from '../components/home/CategoriesGrid'
import FeaturedProducts from '../components/home/FeaturedProducts'
import TrustSection from '../components/home/TrustSection'
import { getFeaturedProducts, getCategories } from '../lib/api'
import type { Product, Category } from '../types'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    getFeaturedProducts().then(setProducts)
    getCategories().then(setCategories)
  }, [])

  return (
    <main>
      <Hero />
      <div className="skew-section-alt bg-[#faf8f5]">
        <CategoriesGrid categories={categories} />
      </div>
      <FeaturedProducts products={products} />
      <div className="mx-auto max-w-7xl px-4">
        <TrustSection />
      </div>
    </main>
  )
}
