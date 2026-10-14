import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    total: 0,
    length: 0
  },
  reducers: {
    addToCart: (state, action) => {
      const index = state.items.findIndex(item => item._id === action.payload._id);
      if (index === -1) {
        const newItem = { ...action.payload, quantity: 1 };
        state.items.push(newItem);
        state.total += action.payload.price;
        state.length++;
      }
    },
    increment: (state, action) => {
      const cartItem = state.items.find(item => item._id === action.payload);
      cartItem.quantity++;
      state.total += cartItem.price;
    },
    decrement: (state, action) => {
      const cartItem = state.items.find(item => item._id === action.payload);
      if (cartItem.quantity > 1) {
        cartItem.quantity--;
        state.total -= cartItem.price;
      }
    },
    removeItem: (state, action) => {
      const cartItem = state.items.find(item => item._id === action.payload);
      state.total -= cartItem.price * cartItem.quantity;
      state.length--;
      state.items = state.items.filter((item) => item._id !== action.payload);
    }
  }
})

export const { addToCart, increment, decrement, removeItem } = cartSlice.actions;

export default cartSlice.reducer;