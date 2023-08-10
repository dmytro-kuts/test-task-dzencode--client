import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

const initialState = {
  products: [],
  isLoading: false,
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  try {
    const { data } = await axios.get('/orders-products');
    return data;
  } catch (error) {}
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload[0].products;
      state.isLoading = false;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default productsSlice.reducer;
