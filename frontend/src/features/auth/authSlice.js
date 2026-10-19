import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isCheckingAuth: true
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetUser: state => {
      state.user = null;
    }
  }
});

export const { setUser, resetUser } = authSlice.actions;

export default authSlice.reducer;