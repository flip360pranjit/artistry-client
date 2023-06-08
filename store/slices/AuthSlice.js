import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state, action) => {
      console.log(action);
    },
  },
});

export const { addUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
