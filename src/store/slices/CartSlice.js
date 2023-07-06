import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
  setQuantity,
} from "../thunks/CartThunks";

const getTotalQuantity = (state) => {
  return state.items.reduce((total, item) => total + item.quantity, 0);
};

const getTotalAmount = (state) => {
  return state.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
    totalQuantity: 0,
    totalAmount: 0,
    discount: {
      applied: false,
      amount: 0,
      coupon: {
        code: "",
        discount: 0,
        expirationDate: 0,
        offerHeading: "",
        offerDescription: "",
        image: "",
        theme: "",
      },
    },
  },
  reducers: {
    applyCoupon: (state, action) => {
      state.discount = {
        applied: true,
        amount: action.payload.amount,
        coupon: action.payload.coupon,
      };
    },
    removeCoupon: (state, action) => {
      state.discount = {
        applied: false,
        amount: 0,
        coupon: {
          code: "",
          discount: 0,
          expirationDate: 0,
          offerHeading: "",
          offerDescription: "",
          image: "",
          theme: "",
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
        state.totalQuantity = getTotalQuantity(state);
        state.totalAmount = getTotalAmount(state);
        state.discount = {
          applied: false,
          amount: 0,
          coupon: {
            code: "",
            discount: 0,
            expirationDate: 0,
            offerHeading: "",
            offerDescription: "",
            image: "",
            theme: "",
          },
        };
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;

        state.items = [];
        state.loading = false;
        state.totalQuantity = 0;
        state.totalAmount = 0;
        state.discount = {
          applied: false,
          amount: 0,
          coupon: {
            code: "",
            discount: 0,
            expirationDate: 0,
            offerHeading: "",
            offerDescription: "",
            image: "",
            theme: "",
          },
        };
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
        toast.success("Artwork added to cart!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        state.totalQuantity = getTotalQuantity(state);
        state.totalAmount = getTotalAmount(state);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload.info, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
        toast.success("Artwork removed from cart!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        state.totalQuantity = getTotalQuantity(state);
        state.totalAmount = getTotalAmount(state);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .addCase(setQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
        state.totalQuantity = getTotalQuantity(state);
        state.totalAmount = getTotalAmount(state);
      })
      .addCase(setQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = [];
        state.error = null;
        state.totalQuantity = 0;
        state.totalAmount = 0;
        state.discount = {
          discount: 0,
          amount: 0,
          coupon: {
            code: "",
            discount: 0,
            expirationDate: 0,
            offerHeading: "",
            offerDescription: "",
            image: "",
            theme: "",
          },
        };
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  },
});

export const { applyCoupon, removeCoupon } = cartSlice.actions;
export default cartSlice.reducer;
