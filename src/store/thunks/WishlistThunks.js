import { createAsyncThunk } from "@reduxjs/toolkit";
import wishlistApi from "../api/wishlistApi";
import { toast } from "react-toastify";

export const getWishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async ({ user }, { rejectWithValue }) => {
    try {
      const response = await wishlistApi.fetchWishlist(user);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async ({ user, productId }, { rejectWithValue }) => {
    try {
      const response = await wishlistApi.addToWishlist(user, productId);
      return response;
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return rejectWithValue(error.message);
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async ({ user, productId }, { rejectWithValue }) => {
    try {
      const response = await wishlistApi.removeFromWishlist(user, productId);
      return response;
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return rejectWithValue(error.message);
    }
  }
);
