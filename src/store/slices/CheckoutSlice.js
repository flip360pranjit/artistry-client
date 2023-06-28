import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    review: true,
    order: {
      items: [],
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
    shipping: false,
    shippingInfo: {
      shipping: {},
      billing: {},
    },
    payment: false,
    confirmation: false,
    allDetails: false,
  },
  reducers: {
    checkoutNextPage: (state, action) => {
      if (action.payload.page === "Review Order") state.review = true;
      else if (action.payload.page === "Shipping & Billing")
        state.shipping = true;
      else if (action.payload.page === "Payment") state.payment = true;
      else if (action.payload.page === "Confirmation")
        state.confirmation = true;
    },
    applyCheckoutCoupon: (state, action) => {
      state.order.discount = {
        applied: true,
        amount: action.payload.amount,
        coupon: action.payload.coupon,
      };
    },
    removeCheckoutCoupon: (state, action) => {
      state.order.discount = {
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
    setOrderItems: (state, action) => {
      state.order = {
        items: action.payload.items,
        totalQuantity: action.payload.totalQuantity,
        totalAmount: action.payload.totalAmount,
        discount: action.payload.discount,
      };
    },
    setShippingInfo: (state, action) => {
      state.shippingInfo = {
        billing: action.payload.billing,
        shipping: action.payload.shipping,
      };
    },
    resetCheckout: (state, action) => {
      state.review = true;
      state.shipping = false;
      state.payment = false;
      state.confirmation = false;
      state.allDetails = false;
      state.order = {
        items: [],
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
      };
      state.shippingInfo = {
        shipping: {},
        billing: {},
      };
    },
    proceedToConfirm: (state, action) => {
      if (
        state.review === true &&
        state.shipping === true &&
        state.payment === true &&
        state.confirmation === true
      )
        state.allDetails = true;
    },
  },
});

export const {
  checkoutNextPage,
  applyCheckoutCoupon,
  removeCheckoutCoupon,
  setOrderItems,
  setShippingInfo,
  resetCheckout,
  proceedToConfirm,
} = checkoutSlice.actions;
export default checkoutSlice.reducer;
