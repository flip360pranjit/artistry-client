import { createSlice } from "@reduxjs/toolkit";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../thunks/WishlistThunks";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearWishlist: (state, action) => {
      (state.loading = false), (state.items = []), (state.error = null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.loading = false;
        state.items = [];
        state.error = action.payload;
      })
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeFromWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
