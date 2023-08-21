import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../api/axios';

export interface Product {
  id: number;
  serialNumber: number;
  isNew: boolean;
  photo: string;
  title: string;
  type: string;
  specification: string;
  guarantee: {
    start: string;
    end: string;
  };
  price: {
    value: number;
    symbol: string;
    isDefault: boolean;
  }[];
  order: number;
  date: string;
}

interface ProductsState {
  products: Product[];
  isLoading: boolean;
}

export const fetchProducts = createAsyncThunk<Product[]>('products/fetchProducts', async () => {
  try {
    const { data } = await axios.get('/orders-products');
    return data[0].products;
  } catch (error) {}
});

const initialState: ProductsState = {
  products: [],
  isLoading: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((product) => product.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { deleteProduct } = productsSlice.actions;

export default productsSlice.reducer;
