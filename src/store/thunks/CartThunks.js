import { createAsyncThunk } from "@reduxjs/toolkit";
import cartApi from "../api/cartApi";
import { toast } from "react-toastify";

export const getCart = createAsyncThunk(
  "cart/getCart",
  async ({ user }, { rejectWithValue }) => {
    try {
      const response = await cartApi.getCartApi(user);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ user, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await cartApi.addToCartApi(user, productId, quantity);
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

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ user, productId }, { rejectWithValue }) => {
    try {
      const response = await cartApi.removeFromCartApi(user, productId);
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

export const setQuantity = createAsyncThunk(
  "cart/setQuantity",
  async ({ user, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await cartApi.setQuantityApi(user, productId, quantity);
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

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async ({ user }, { rejectWithValue }) => {
    try {
      const response = await cartApi.clearCartApi(user);
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
