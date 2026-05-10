import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import productsReducer from './productsSlice'
import ordersReducer from './ordersSlice'
import cartReducer from './cartSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    orders: ordersReducer,
    cart: cartReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
