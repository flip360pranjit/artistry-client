import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: null,
  },
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    removeOrder: (state, action) => {
      state.order = null;
    },
  },
});

export const { setOrder, removeOrder } = orderSlice.actions;
export default orderSlice.reducer;
