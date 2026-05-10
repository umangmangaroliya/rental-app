import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import chatReducer from './slices/chatSlice';
import productsReducer from './slices/productsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    cart: cartReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
