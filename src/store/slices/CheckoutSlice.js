import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  review: true,
  order: {
    items: [],
    totalQuantity: 0,
    subtotal: 0,
    delivery: 0,
    tax: 0,
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
        imageWebp: "",
        theme: "",
      },
    },
  },
  shipping: false,
  shippingInfo: {
    shipping: {
      fullName: "",
      phoneNumber: "",
      email: "",
      country: "",
      streetAddress: "",
      pincode: "",
      city: "",
      state: "",
    },
    billing: {
      fullName: "",
      phoneNumber: "",
      email: "",
      country: "",
      streetAddress: "",
      pincode: "",
      city: "",
      state: "",
    },
  },
  payment: false,
  paymentInfo: { type: "", details: {} },
  confirmation: false,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: initialState,
  reducers: {
    checkoutNextPage: (state, action) => {
      if (action.payload.page === "Review Order") state.review = true;
      else if (action.payload.page === "Shipping & Billing")
        state.shipping = true;
      else if (action.payload.page === "Payment") state.payment = true;
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
          imageWebp: "",
          theme: "",
        },
      };
    },
    setOrderItems: (state, action) => {
      // console.log("Data passed:", action.payload);
      state.order = {
        items: action.payload.items,
        totalQuantity: action.payload.totalQuantity,
        subtotal: action.payload.subtotal,
        delivery: action.payload.delivery,
        tax: action.payload.delivery,
        totalAmount: action.payload.totalAmount,
        discount: action.payload.discount,
      };
    },
    setShippingInfo: (state, action) => {
      state.shippingInfo = {
        billing: action.payload.billing,
        shipping: action.payload.shipping,
      };
      state.shipping = true;
    },
    setPaymentInfo: (state, action) => {
      state.payment = true;
      state.paymentInfo = {
        type: action.payload.type,
        details: action.payload.details,
      };
    },
    removePaymentInfo: (state, action) => {
      state.payment = false;
      state.paymentInfo = {
        type: "",
        details: {},
      };
    },
    resetCheckout: (state, action) => {
      state.review = true;
      state.shipping = false;
      state.payment = false;
      state.confirmation = false;
      state.order = {
        items: [],
        totalQuantity: 0,
        subtotal: 0,
        delivery: 0,
        tax: 0,
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
        shipping: {
          fullName: "",
          phoneNumber: "",
          email: "",
          country: "",
          streetAddress: "",
          pincode: "",
          city: "",
          state: "",
        },
        billing: {
          fullName: "",
          phoneNumber: "",
          email: "",
          country: "",
          streetAddress: "",
          pincode: "",
          city: "",
          state: "",
        },
      };
      state.paymentInfo = { type: "", details: {} };
    },
    proceedToConfirm: (state, action) => {
      if (
        state.review === true &&
        state.shipping === true &&
        state.payment === true
      )
        state.confirmation = true;
    },
  },
});

export const {
  checkoutNextPage,
  applyCheckoutCoupon,
  removeCheckoutCoupon,
  setOrderItems,
  setShippingInfo,
  setPaymentInfo,
  removePaymentInfo,
  resetCheckout,
  proceedToConfirm,
} = checkoutSlice.actions;
export default checkoutSlice.reducer;
