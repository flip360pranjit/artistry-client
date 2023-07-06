import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Routers from "./routers/Routers";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  removeCommissionedOrder,
  removeOrder,
} from "./store/slices/OrderSlice";
import { resetCheckout } from "./store/slices/CheckoutSlice";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  // Check if the current location is either "/login" or "/register"
  const isLoginOrRegisterPage =
    location.pathname === "/auth" ||
    location.pathname.includes("/dashboard") ||
    location.pathname.includes("/profile") ||
    location.pathname.includes("/checkout");

  useEffect(() => {
    if (
      location.pathname !==
      "/commissioned-orders/submit-commission-request/success"
    ) {
      dispatch(removeCommissionedOrder());
    }
    if (!location.pathname.includes("/checkout/")) {
      dispatch(removeOrder());
      dispatch(resetCheckout());
    }
  }, [location]);

  return (
    <>
      <div className="absolute right-0">
        <ToastContainer />
      </div>
      {!isLoginOrRegisterPage && <Navbar />}
      <Routers />
      {!isLoginOrRegisterPage && <Footer />}
    </>
  );
}

export default App;
