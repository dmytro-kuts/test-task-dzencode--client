import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../api/axios';


export interface Order {
  id: number;
  title: string;
  date: string;
  description: string;
}

interface OrdersState {
  orders: Order[];
  isLoading: boolean;
}

export const fetchOrders = createAsyncThunk<Order[]>('orders/fetchOrders', async () => {
  try {
    const { data } = await axios.get('/orders-products');
    return data[0].orders;
  } catch (error) {}
});

const initialState: OrdersState = {
  orders: [],
  isLoading: false,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    deleteOrder: (state, action: PayloadAction<number>) => {
      state.orders = state.orders.filter((order) => order.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchOrders.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { deleteOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
