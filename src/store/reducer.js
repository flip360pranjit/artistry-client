import { combineReducers } from "redux";
import authReducer from "./slices/AuthSlice";
import orderReducer from "./slices/OrderSlice";
import wishlistReducer from "./slices/WishlistSlice";
import cartReducer from "./slices/CartSlice";
import checkoutReducer from "./slices/CheckoutSlice";
import socialReducer from "./slices/SocialSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  order: orderReducer,
  wishlist: wishlistReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  social: socialReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
