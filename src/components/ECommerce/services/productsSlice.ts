import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { Product } from '../types'
import { apiFetch, apiPost, apiPut, apiDelete } from '../utils/utils'

interface ProductsState {
  items: Product[]
  loading: boolean
  error: string | null
}

const initialState: ProductsState = { items: [], loading: false, error: null }

// ── Async Thunks ─────────────────────────────────────────────────────────────

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  return apiFetch<Product[]>('/products')
})

export const saveProduct = createAsyncThunk(
  'products/save',
  async (args: { mode: 'add' | 'edit'; id?: string | null; data: Partial<Product> }) => {
    if (args.mode === 'edit') {
      return apiPut<Product>(`/products/${args.id}`, args.data)
    }
    return apiPost<Product>('/products', args.data)
  },
)

export const deleteProduct = createAsyncThunk('products/delete', async (id: string) => {
  await apiDelete(`/products/${id}`)
  return id
})

// ── Slice ────────────────────────────────────────────────────────────────────

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchProducts
      .addCase(fetchProducts.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchProducts.fulfilled, (state, action) => { state.loading = false; state.items = action.payload })
      .addCase(fetchProducts.rejected, (state, action) => { state.loading = false; state.error = action.error.message ?? 'Failed to load products' })
      // saveProduct – re-fetch handled by component
      .addCase(saveProduct.rejected, (state, action) => { state.error = action.error.message ?? 'Failed to save product' })
      // deleteProduct – optimistic remove
      .addCase(deleteProduct.fulfilled, (state, action) => { state.items = state.items.filter((p) => p._id !== action.payload) })
      .addCase(deleteProduct.rejected, (state, action) => { state.error = action.error.message ?? 'Failed to delete product' })
  },
})

export default productsSlice.reducer
