import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  role: null,
  isloading: false,
  authChecked: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isloading = action?.payload; 
      console.log("Loading state set to:", state.isloading);
    },
    setUser(state, action) {
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.isloading = false;
      state.authChecked = true;
    },
    setAuthChecked(state) {
      state.authChecked = true; // ✅ Even when not logged in
      state.isloading = false;
    },
    logout(state) {
      state.user = null;
      state.role = null;
      state.isloading = false;
    },
  },
});

export const { setUser, logout, setLoading, setAuthChecked } = userSlice.actions;
export default userSlice.reducer;