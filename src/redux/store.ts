import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import activeSessionsReducer from './activeSessions/activeSessionsSlice';
import ordersReducer from './orders/ordersSlice';
import productsReducer from './products/productsSlice';

export const store = configureStore({
  reducer: {
    activeSessions: activeSessionsReducer,
    orders: ordersReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;