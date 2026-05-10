import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  pickupDate: string;
  returnDate: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const calculateTotal = (items: CartItem[]) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id && item.size === action.payload.size
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      state.total = calculateTotal(state.items);
    },
    removeFromCart: (state, action: PayloadAction<{ id: string; size: string }>) => {
      state.items = state.items.filter(
        (item) => !(item.id === action.payload.id && item.size === action.payload.size)
      );
      state.total = calculateTotal(state.items);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; size: string; quantity: number }>
    ) => {
      const item = state.items.find(
        (item) => item.id === action.payload.id && item.size === action.payload.size
      );
      if (item) {
        item.quantity = action.payload.quantity;
        state.total = calculateTotal(state.items);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
