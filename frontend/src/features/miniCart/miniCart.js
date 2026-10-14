import { createSlice } from "@reduxjs/toolkit";

export const miniCartSlice = createSlice({
  name: "miniCart",
  initialState: {
    display: false
  },
  reducers: {
    setDisplay: (state, action) => {
      state.display = action.payload;
    }
  }
});

export const { setDisplay } = miniCartSlice.actions;

export default miniCartSlice.reducer;