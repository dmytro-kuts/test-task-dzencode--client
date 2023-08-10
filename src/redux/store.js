import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from './orders/ordersSlice';
import productsReducer from './products/productsSlice';

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    products: productsReducer,
  },
});
