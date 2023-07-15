import { createSlice } from "@reduxjs/toolkit";

const socialSlice = createSlice({
  name: "social",
  initialState: {
    type: "",
    loading: false,
  },
  reducers: {
    updateSocial: (state, action) => {
      state.type = action.payload;
      state.loading = true;
    },
    resetSocial: (state, action) => {
      state.type = "";
      state.loading = false;
    },
  },
});

export const { updateSocial, resetSocial } = socialSlice.actions;
export default socialSlice.reducer;
