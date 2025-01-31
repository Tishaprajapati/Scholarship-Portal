import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({//small part of state
  name: "auth",//authentication released state store kare
  initialState: {
    loading: false,
    user: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      // Optionally clear other state when user is set to null
      if (action.payload === null) {
        state.loading = false;
      }
    },
  },
});

export const { setLoading, setUser } = authSlice.actions;
export default authSlice.reducer;
