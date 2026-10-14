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
      const index = state.items.find(item => item._id === action.payload._id);
      if (index !== -1) {
        state.items.push(action.payload);
      }
      state.total = action.payload.price;
      state.length++;
    }
  }
})

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;