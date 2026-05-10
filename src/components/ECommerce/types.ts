export interface Product {
  _id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
  rating: number
  numReviews: number
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface OrderItem {
  product: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface Order {
  _id: string
  customerName: string
  customerEmail: string
  items: OrderItem[]
  totalAmount: number
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'
  deliveryStatus: 'Pending' | 'In Progress' | 'Shipped Out' | 'In Logistics Center' | 'Out for Delivery' | 'Delivered'
  paymentMethod: 'Stripe' | 'PayPal' | 'COD'
  paymentStatus: 'Unpaid' | 'Paid' | 'Refunded'
  shippingAddress: {
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  createdAt: string
}

export type UserRole = 'guest' | 'customer' | 'admin'

export interface SimulatedUser {
  name: string
  email: string
  role: UserRole
  avatar: string
}

export const DEMO_USERS: Record<Exclude<UserRole, 'guest'>, SimulatedUser> = {
  customer: { name: 'Jane Smith', email: 'jane@example.com', role: 'customer', avatar: 'J' },
  admin: { name: 'Rico Admin', email: 'admin@rico.dev', role: 'admin', avatar: 'R' },
}

// Use relative API path for both local and deployed environments
export const API = '/api'

export const CATEGORIES = ['All', 'Electronics', 'Furniture', 'Accessories', 'Home']

export const DELIVERY_STATUSES = ['Pending', 'In Progress', 'Shipped Out', 'In Logistics Center', 'Out for Delivery', 'Delivered'] as const

export const lightFieldSx = {
  '& .MuiOutlinedInput-root': {
    bgcolor: '#fff', borderRadius: '8px',
    '& fieldset': { borderColor: '#e5e7eb' },
    '&:hover fieldset': { borderColor: '#9ca3af' },
    '&.Mui-focused fieldset': { borderColor: '#4f46e5' },
  },
  '& .MuiInputLabel-root': { color: '#6b7280' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#4f46e5' },
}
