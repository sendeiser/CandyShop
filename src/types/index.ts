export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  sort_order: number
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  price: number
  category_id: string | null
  image_url: string | null
  weight_options: WeightOption[] | null
  is_featured: boolean
  is_active: boolean
  created_at: string
  category?: Category
}

export interface WeightOption {
  label: string
  grams: number
  price: number
}

export interface CartItem {
  product: Product
  weight: WeightOption
  quantity: number
}

export interface Order {
  id: string
  user_id: string
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  shipping_address: ShippingAddress
  created_at: string
  items?: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  product_name: string
  quantity: number
  weight_label: string
  unit_price: number
}

export interface ShippingAddress {
  name: string
  phone: string
  street: string
  city: string
  province: string
  zip: string
}

export interface Profile {
  id: string
  email: string
  name: string | null
  phone: string | null
  role: 'client' | 'admin'
  created_at: string
}
