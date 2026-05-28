import { supabase } from './supabase'
import type { Product, Category, Order, Profile } from '../types'

// ── Products ──

export async function getActiveProducts() {
  const { data } = await supabase
    .from('products')
    .select(`*, category:categories(name)`)
    .eq('is_active', true)
    .order('name')
  return (data ?? []) as Product[]
}

export async function getFeaturedProducts() {
  const { data } = await supabase
    .from('products')
    .select(`*, category:categories(name)`)
    .eq('is_featured', true)
    .eq('is_active', true)
    .order('name')
  return (data ?? []) as Product[]
}

export async function getProductBySlug(slug: string) {
  const { data } = await supabase
    .from('products')
    .select(`*, category:categories(name)`)
    .eq('slug', slug)
    .eq('is_active', true)
    .single()
  return data as Product | null
}

export async function searchProducts(query: string) {
  const { data } = await supabase
    .from('products')
    .select(`*, category:categories(name)`)
    .eq('is_active', true)
    .ilike('name', `%${query}%`)
    .order('name')
  return (data ?? []) as Product[]
}

// ── Categories ──

export async function getCategories() {
  const { data } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order')
  return (data ?? []) as Category[]
}

// ── Orders ──

export async function createOrder(order: {
  user_id: string
  total: number
  shipping_address: any
  items: { product_id: string; product_name: string; quantity: number; weight_label: string; unit_price: number }[]
}) {
  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: order.user_id,
      total: order.total,
      shipping_address: order.shipping_address,
    })
    .select()
    .single()

  if (orderError || !orderData) throw new Error(orderError?.message ?? 'Error creating order')

  const items = order.items.map((item) => ({
    order_id: orderData.id,
    ...item,
  }))

  const { error: itemsError } = await supabase.from('order_items').insert(items)
  if (itemsError) throw new Error(itemsError.message)

  return orderData as Order
}

export async function getUserOrders(userId: string) {
  const { data } = await supabase
    .from('orders')
    .select(`*, items:order_items(*)`)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  return (data ?? []) as Order[]
}

// ── Admin ──

export async function getAllOrders() {
  const { data } = await supabase
    .from('orders')
    .select(`*, items:order_items(*)`)
    .order('created_at', { ascending: false })
  return (data ?? []) as Order[]
}

export async function updateOrderStatus(orderId: string, status: string) {
  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId)
  if (error) throw new Error(error.message)
}

export async function getAllProducts() {
  const { data } = await supabase
    .from('products')
    .select(`*, category:categories(name)`)
    .order('name')
  return (data ?? []) as Product[]
}

export async function upsertProduct(product: Partial<Product> & { name: string; slug: string; price: number }) {
  if (product.id) {
    const { error } = await supabase.from('products').update(product).eq('id', product.id)
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase.from('products').insert(product)
    if (error) throw new Error(error.message)
  }
}

export async function getAllCategories() {
  const { data } = await supabase.from('categories').select('*').order('sort_order')
  return (data ?? []) as Category[]
}

export async function upsertCategory(category: Partial<Category> & { name: string; slug: string }) {
  if (category.id) {
    const { error } = await supabase.from('categories').update(category).eq('id', category.id)
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase.from('categories').insert(category)
    if (error) throw new Error(error.message)
  }
}

export async function getAllProfiles() {
  const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: false })
  return (data ?? []) as Profile[]
}

// ── Storage ──

export async function uploadCategoryImage(file: File) {
  const ext = file.name.split('.').pop()
  const path = `${crypto.randomUUID()}.${ext}`
  const { error } = await supabase.storage.from('product-images').upload(path, file)
  if (error) throw new Error(error.message)
  const { data: urlData } = supabase.storage.from('product-images').getPublicUrl(path)
  return urlData.publicUrl
}

export async function uploadProductImage(file: File) {
  const ext = file.name.split('.').pop()
  const path = `${crypto.randomUUID()}.${ext}`
  const { error } = await supabase.storage.from('product-images').upload(path, file)
  if (error) throw new Error(error.message)
  const { data: urlData } = supabase.storage.from('product-images').getPublicUrl(path)
  return urlData.publicUrl
}

// ── Auth helpers ──

export async function getCurrentProfile(): Promise<Profile | null> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  return data as Profile | null
}
