import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  sizeOptions: string;
  viscosity: string;
  brand: string;
  sku: string;
  sizesAvailable: boolean;
  category: string;
  title: string;
  id: number;
  price: string;
}

interface ProductState {
  items: Product[];
  filters: Record<string, unknown>;
  sort: string;
  currentPage: number;
  productsPerPage: number;
}

const initialState: ProductState = {
  items: [],
  filters: {},
  sort: 'default',
  currentPage: 1,
  productsPerPage: 9,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.items = action.payload;
    },
    setFilters(state, action: PayloadAction<Record<string, unknown>>) {
      state.filters = action.payload;
    },
    setSort(state, action: PayloadAction<string>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const { setProducts, setFilters, setSort, setCurrentPage } = productSlice.actions;
export default productSlice.reducer;
