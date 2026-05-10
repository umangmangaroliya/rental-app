import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  sizes: string[];
  rating: number;
  reviews: number;
}

interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  selectedCategory: string | null;
  selectedSizes: string[];
  priceRange: [number, number];
  sortBy: 'price-asc' | 'price-desc' | 'popular' | 'newest';
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  selectedCategory: null,
  selectedSizes: [],
  priceRange: [0, 1000],
  sortBy: 'popular',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      state.filteredItems = action.payload;
    },
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    toggleSize: (state, action: PayloadAction<string>) => {
      const index = state.selectedSizes.indexOf(action.payload);
      if (index > -1) {
        state.selectedSizes.splice(index, 1);
      } else {
        state.selectedSizes.push(action.payload);
      }
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload;
    },
    setSortBy: (state, action: PayloadAction<ProductsState['sortBy']>) => {
      state.sortBy = action.payload;
    },
    applyFilters: (state) => {
      let filtered = [...state.items];

      // Filter by category
      if (state.selectedCategory) {
        filtered = filtered.filter((item) => item.category === state.selectedCategory);
      }

      // Filter by sizes
      if (state.selectedSizes.length > 0) {
        filtered = filtered.filter((item) =>
          item.sizes.some((size) => state.selectedSizes.includes(size))
        );
      }

      // Filter by price range
      filtered = filtered.filter(
        (item) => item.price >= state.priceRange[0] && item.price <= state.priceRange[1]
      );

      // Sort
      switch (state.sortBy) {
        case 'price-asc':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'popular':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          // Assuming newer items have higher IDs
          filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
          break;
      }

      state.filteredItems = filtered;
    },
    clearFilters: (state) => {
      state.selectedCategory = null;
      state.selectedSizes = [];
      state.priceRange = [0, 1000];
      state.filteredItems = state.items;
    },
  },
});

export const {
  setProducts,
  setCategory,
  toggleSize,
  setPriceRange,
  setSortBy,
  applyFilters,
  clearFilters,
} = productsSlice.actions;
export default productsSlice.reducer;
