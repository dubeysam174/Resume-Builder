import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    loading: false  // ✅ start as false
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token
      state.user = action.payload.user
      state.loading = false  // ✅ reset loading on login
    },
    logout: (state) => {
      state.token = null    // ✅ semicolons, and null is cleaner than ""
      state.user = null
      state.loading = false
      localStorage.removeItem('token')
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  }
})

export const { login, logout, setLoading } = authSlice.actions
export default authSlice.reducer