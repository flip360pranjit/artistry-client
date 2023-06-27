// cartApi.js

import axios from "axios";

const getCartApi = async (user) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_URL}/cart`,
      { user }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
const addToCartApi = async (user, productId, quantity) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_URL}/cart/add`,
      { user, productId, quantity }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const removeFromCartApi = async (user, productId) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_URL}/cart/remove`,
      { user, productId }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const setQuantityApi = async (user, productId, quantity) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_URL}/cart/set`,
      { user, productId, quantity }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const clearCartApi = async (user) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_URL}/cart/clear`,
      { user }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export default {
  getCartApi,
  addToCartApi,
  removeFromCartApi,
  setQuantityApi,
  clearCartApi,
};
