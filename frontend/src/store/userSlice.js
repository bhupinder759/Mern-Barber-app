import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  role: null,
  isloading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isloading = action.payload; // true or false
    },
    setUser(state, action) {
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.isloading = false;
    },
    logout(state) {
      state.user = null;
      state.role = null;
      state.isloading = false;
    },
  },
});

export const { setUser, logout, setLoading } = userSlice.actions;
export default userSlice.reducer;