import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

const initialState = {
  orders: [],
  isLoading: false,
};



export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  try {
    const { data } = await axios.get('/orders-products');
  
    return data;
  } catch (error) {}
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    deleteOrder: (state, action) => {
      return state.filter((order) => order.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload[0].orders;
      state.isLoading = false;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const {  deleteOrder } = ordersSlice.actions;


export default ordersSlice.reducer;
