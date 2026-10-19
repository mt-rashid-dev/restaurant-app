import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/theme/themeSlice.js";
import cartReducer from "../features/cart/cartSlice.js";
import authReducer from "../features/auth/authSlice.js";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    cart: cartReducer,
    auth: authReducer
  }
});