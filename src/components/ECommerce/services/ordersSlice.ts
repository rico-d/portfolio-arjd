import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { Order } from '../types'
import { apiFetch, apiPost, apiPut } from '../utils/utils'

interface OrdersState {
  items: Order[]
  loading: boolean
  error: string | null
}

const initialState: OrdersState = { items: [], loading: false, error: null }

// ── Async Thunks ─────────────────────────────────────────────────────────────

export const fetchOrders = createAsyncThunk('orders/fetch', async () => {
  return apiFetch<Order[]>('/orders')
})

export const placeOrder = createAsyncThunk('orders/place', async (payload: unknown) => {
  return apiPost<Order>('/orders', payload)
})

export const updateOrder = createAsyncThunk(
  'orders/update',
  async (args: { id: string; data: Record<string, string> }) => {
    return apiPut<Order>(`/orders/${args.id}`, args.data)
  },
)

// ── Slice ────────────────────────────────────────────────────────────────────

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchOrders
      .addCase(fetchOrders.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchOrders.fulfilled, (state, action) => { state.loading = false; state.items = action.payload })
      .addCase(fetchOrders.rejected, (state, action) => { state.loading = false; state.error = action.error.message ?? 'Failed to load orders' })
      // placeOrder – append to list
      .addCase(placeOrder.fulfilled, (state, action) => { state.items.push(action.payload) })
      .addCase(placeOrder.rejected, (state, action) => { state.error = action.error.message ?? 'Checkout failed' })
      // updateOrder – patch in-place
      .addCase(updateOrder.fulfilled, (state, action) => {
        const idx = state.items.findIndex((o) => o._id === action.payload._id)
        if (idx !== -1) state.items[idx] = action.payload
      })
      .addCase(updateOrder.rejected, (state, action) => { state.error = action.error.message ?? 'Failed to update order' })
  },
})

export default ordersSlice.reducer
