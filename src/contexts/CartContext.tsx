import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react'
import type { CartItem, Product, WeightOption } from '../types'

interface CartState {
  items: CartItem[]
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; weight: WeightOption; quantity?: number }
  | { type: 'REMOVE_ITEM'; productId: string; grams: number }
  | { type: 'UPDATE_QUANTITY'; productId: string; grams: number; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; items: CartItem[] }

const STORAGE_KEY = 'candy-shop-cart'

function saveToStorage(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

function loadFromStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(
        (i) => i.product.id === action.product.id && i.weight.grams === action.weight.grams
      )
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === action.product.id && i.weight.grams === action.weight.grams
              ? { ...i, quantity: i.quantity + (action.quantity ?? 1) }
              : i
          ),
        }
      }
      return {
        items: [...state.items, { product: action.product, weight: action.weight, quantity: action.quantity ?? 1 }],
      }
    }
    case 'REMOVE_ITEM':
      return { items: state.items.filter((i) => !(i.product.id === action.productId && i.weight.grams === action.grams)) }
    case 'UPDATE_QUANTITY':
      return {
        items: state.items.map((i) =>
          i.product.id === action.productId && i.weight.grams === action.grams
            ? { ...i, quantity: action.quantity }
            : i
        ),
      }
    case 'CLEAR_CART':
      return { items: [] }
    case 'LOAD_CART':
      return { items: action.items }
    default:
      return state
  }
}

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, weight: WeightOption, quantity?: number) => void
  removeItem: (productId: string, grams: number) => void
  updateQuantity: (productId: string, grams: number, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  useEffect(() => {
    const items = loadFromStorage()
    if (items.length > 0) dispatch({ type: 'LOAD_CART', items })
  }, [])

  useEffect(() => {
    saveToStorage(state.items)
  }, [state.items])

  const addItem = (product: Product, weight: WeightOption, quantity = 1) =>
    dispatch({ type: 'ADD_ITEM', product, weight, quantity })

  const removeItem = (productId: string, grams: number) =>
    dispatch({ type: 'REMOVE_ITEM', productId, grams })

  const updateQuantity = (productId: string, grams: number, quantity: number) =>
    dispatch({ type: 'UPDATE_QUANTITY', productId, grams, quantity })

  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = state.items.reduce((sum, i) => sum + i.weight.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{ items: state.items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
