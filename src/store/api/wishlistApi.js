// wishlistApi.js

import axios from "axios";

const fetchWishlist = async (user) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_URL}/wishlist`,
      { user }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
const addToWishlist = async (user, productId) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_URL}/wishlist/add`,
      { user, productId }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const removeFromWishlist = async (user, productId) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_URL}/wishlist/remove`,
      { user, productId }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export default { fetchWishlist, addToWishlist, removeFromWishlist };
