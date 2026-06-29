import type { Product, CartItem, Order } from '../types'
import { API } from '../types'

// ── API Helpers ──────────────────────────────────────────────────────────────

const API_URL = import.meta.env.VITE_API_URL;

export async function apiFetch<T>(endpoint: string): Promise<T> {
  try {
    const res = await fetch(`${API_URL || API}${endpoint}`)
    
    if (res.status === 500 || res.status === 502 || res.status === 503) {
      console.error(`API server error (${res.status}) at ${endpoint}`)
      console.error('Backend may not be deployed. Ensure backend is running or deployed separately.')
      throw new Error(`Server error: ${res.status}`)
    }
    
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: `HTTP ${res.status}` }))
      throw new Error(err.message || `Failed to fetch ${endpoint}`)
    }
    
    return res.json()
  } catch (err) {
    console.error(`API fetch failed for ${endpoint}:`, err instanceof Error ? err.message : String(err))
    throw err
  }
}

export async function apiPost<T>(endpoint: string, body: unknown): Promise<T> {
  try {
    const res = await fetch(`${API_URL || API}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    
    if (res.status === 500 || res.status === 502 || res.status === 503) {
      console.error(`API server error (${res.status}) at ${endpoint}`)
      throw new Error(`Server error: ${res.status}`)
    }
    
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: `HTTP ${res.status}` }))
      throw new Error(err.message || `POST ${endpoint} failed`)
    }
    
    return res.json()
  } catch (err) {
    console.error(`API POST failed for ${endpoint}:`, err instanceof Error ? err.message : String(err))
    throw err
  }
}

export async function apiPut<T>(endpoint: string, body: unknown): Promise<T> {
  try {
    const res = await fetch(`${API_URL || API}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    
    if (res.status === 500 || res.status === 502 || res.status === 503) {
      console.error(`API server error (${res.status}) at ${endpoint}`)
      throw new Error(`Server error: ${res.status}`)
    }
    
    if (!res.ok) throw new Error(`PUT ${endpoint} failed`)
    return res.json()
  } catch (err) {
    console.error(`API PUT failed for ${endpoint}:`, err instanceof Error ? err.message : String(err))
    throw err
  }
}

export async function apiDelete(endpoint: string): Promise<void> {
  try {
    const res = await fetch(`${API_URL || API}${endpoint}`, { method: 'DELETE' })
    
    if (res.status === 500 || res.status === 502 || res.status === 503) {
      console.error(`API server error (${res.status}) at ${endpoint}`)
      throw new Error(`Server error: ${res.status}`)
    }
    
    if (!res.ok) throw new Error(`DELETE ${endpoint} failed`)
  } catch (err) {
    console.error(`API DELETE failed for ${endpoint}:`, err instanceof Error ? err.message : String(err))
    throw err
  }
}

// ── Cart Logic (pure state transformers) ─────────────────────────────────────

export function addItemToCart(cart: CartItem[], product: Product): CartItem[] {
  const existing = cart.find((i) => i.product._id === product._id)
  if (existing) {
    if (existing.quantity >= product.stock) return cart
    return cart.map((i) =>
      i.product._id === product._id ? { ...i, quantity: i.quantity + 1 } : i,
    )
  }
  return [...cart, { product, quantity: 1 }]
}

export function updateItemQty(cart: CartItem[], id: string, qty: number): CartItem[] {
  return cart.map((i) => (i.product._id === id ? { ...i, quantity: qty } : i))
}

export function removeItem(cart: CartItem[], id: string): CartItem[] {
  return cart.filter((i) => i.product._id !== id)
}

export function getCartCount(cart: CartItem[]): number {
  return cart.reduce((s, i) => s + i.quantity, 0)
}

export function buildCheckoutPayload(
  data: { customerName: string; customerEmail: string; paymentMethod: string; shippingAddress: { street: string; city: string; state: string; zip: string; country: string } },
  cart: CartItem[],
) {
  return { ...data, items: cart.map((i) => ({ product: i.product._id, quantity: i.quantity })) }
}

// ── Product Filtering ────────────────────────────────────────────────────────

export function filterProducts(products: Product[], search: string, category: string): Product[] {
  return products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === 'All' || p.category === category
    return matchSearch && matchCategory
  })
}

// ── Dashboard Stats ──────────────────────────────────────────────────────────

export function computeAdminStats(orders: Order[], products: Product[]) {
  return {
    totalRevenue: orders.filter((o) => o.paymentStatus === 'Paid').reduce((s, o) => s + o.totalAmount, 0),
    totalOrders: orders.length,
    totalProducts: products.length,
    lowStock: products.filter((p) => p.stock < 10).length,
  }
}

export function computeCustomerStats(orders: Order[], email: string) {
  const mine = orders.filter((o) => o.customerEmail === email)
  return {
    myOrders: mine.length,
    delivered: mine.filter((o) => o.status === 'Delivered').length,
    inProgress: mine.filter((o) => ['Pending', 'Processing', 'Shipped'].includes(o.status)).length,
    totalSpent: mine.filter((o) => o.paymentStatus === 'Paid').reduce((s, o) => s + o.totalAmount, 0),
  }
}

export function computeDeliveryStats(orders: Order[]) {
  return {
    pending: orders.filter((o) => (o.deliveryStatus || 'Pending') === 'Pending').length,
    inTransit: orders.filter((o) =>
      ['In Progress', 'Shipped Out', 'In Logistics Center', 'Out for Delivery'].includes(o.deliveryStatus || 'Pending'),
    ).length,
    delivered: orders.filter((o) => (o.deliveryStatus || 'Pending') === 'Delivered').length,
    totalShipments: orders.length,
  }
}
