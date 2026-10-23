import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/check`, { withCredentials: true });
  return {
    _id: res.data._id,
    profilePicture: res.data.profilePicture,
    firstName: res.data.firstName,
    lastName: res.data.lastName,
    email: res.data.email,
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