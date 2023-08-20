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
  reducers: {
    deleteProduct: (state, action) => {
      state.products = state.products.filter((product) => product.id !== action.payload);
    },
  },
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

export const { deleteProduct } = productsSlice.actions;

export default productsSlice.reducer;
