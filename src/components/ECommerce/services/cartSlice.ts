import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { CartItem, Product } from '../types'
import { addItemToCart, updateItemQty, removeItem } from '../utils/utils'

interface CartState {
  items: CartItem[]
}

const initialState: CartState = { items: [] }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      state.items = addItemToCart(state.items, action.payload)
    },
    updateQty(state, action: PayloadAction<{ id: string; qty: number }>) {
      state.items = updateItemQty(state.items, action.payload.id, action.payload.qty)
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = removeItem(state.items, action.payload)
    },
    clearCart(state) {
      state.items = []
    },
  },
})

export const { addToCart, updateQty, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
