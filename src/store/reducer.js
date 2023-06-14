import { combineReducers } from "redux";
import authReducer from "./slices/AuthSlice";
import orderReducer from "./slices/OrderSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  order: orderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
