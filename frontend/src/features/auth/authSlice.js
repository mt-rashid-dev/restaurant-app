import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/check`, { withCredentials: true });
  return {
    _id: res.data._id,
    firstName: res.data.fullName,
    lastName: res.data.fullName,
    email: res.data.email,
    profilePic: res.data.profilePic,
    role: res.data.role
  };
});

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isCheckingAuth = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = null;
        state.isCheckingAuth = false;
      })
  }
});

export const { setUser, resetUser } = authSlice.actions;

export default authSlice.reducer;