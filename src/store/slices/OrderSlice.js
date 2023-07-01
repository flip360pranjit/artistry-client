import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: null,
    commissionedOrder: null,
  },
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    removeOrder: (state, action) => {
      state.order = null;
    },
    setCommissionedOrder: (state, action) => {
      state.commissionedOrder = action.payload;
    },
    removeCommissionedOrder: (state, action) => {
      state.commissionedOrder = null;
    },
  },
});

export const {
  setOrder,
  removeOrder,
  setCommissionedOrder,
  removeCommissionedOrder,
} = orderSlice.actions;
export default orderSlice.reducer;
