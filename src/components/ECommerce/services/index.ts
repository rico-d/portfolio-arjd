export { store, useAppDispatch, useAppSelector } from './store'
export type { RootState, AppDispatch } from './store'

export { fetchProducts, saveProduct, deleteProduct } from './productsSlice'
export { fetchOrders, placeOrder, updateOrder } from './ordersSlice'
export { addToCart, updateQty, removeFromCart, clearCart } from './cartSlice'
