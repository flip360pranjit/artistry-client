import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Careers from "../pages/Careers";
import ContactUs from "../pages/ContactUs";
import Error from "../pages/Error";
import Authenticate from "../pages/Authenticate";
import ProtectedRoutes from "./ProtectedRoutes";
import Profile from "../pages/Profile";
import ForgotPassword from "../pages/ForgotPassword";
import Dashboard from "../pages/Dashboard";
import {
  AddArtwork,
  Analytics,
  CommissionedOrder,
  CommissionedOrders,
  Listings,
  Orders,
  Overview,
} from "../components/Dashboard";
import {
  Account,
  ProfileOrders,
  ProfileOverview,
  Wishlist,
} from "../components/Profile";
import Artwork from "../components/Artwork/Artwork";
import HowToSell from "../pages/HowToSell";
import BecomeASeller from "../pages/BecomeASeller";
import Browse from "../components/Browse/Browse";
import Reviews from "../components/Artwork/Reviews";
import Cart from "../components/Checkout/Cart";
import Checkout from "../pages/Checkout";
import {
  Confirmation,
  Payment,
  ReviewOrder,
  Shipping,
} from "../components/Checkout";
import CommissionedProcess from "../pages/CommissionedProcess";
import SubmitCommissionedRequest from "../pages/SubmitCommissionedRequest";
import ViewSellerOrder from "../components/Dashboard/ViewSellerOrder";
import CommissionedArtworkSuccess from "../pages/CommissionedArtworkSuccess";
import ProtectedOrder from "./ProtectedOrder";

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="*" element={<Error />} />
      <Route path="/auth" element={<Authenticate />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/view-artwork" element={<Artwork />} />
      <Route path="/sell-art/how-to-sell" element={<HowToSell />} />
      <Route
        path="/sell-art/become-a-seller"
        element={
          <ProtectedRoutes>
            <BecomeASeller />
          </ProtectedRoutes>
        }
      />
      <Route path="/browse" element={<Browse />} />
      <Route path="/artwork/reviews" element={<Reviews />} />
      <Route
        path="/wishlist"
        element={
          <ProtectedRoutes>
            <Wishlist />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoutes>
            <Cart />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoutes>
            <Checkout />
          </ProtectedRoutes>
        }
      >
        <Route path="review" element={<ReviewOrder />} />
        <Route path="shipping" element={<Shipping />} />
        <Route path="payment" element={<Payment />} />
        <Route path="confirmation" element={<Confirmation />} />
      </Route>

      <Route
        path="/profile"
        element={
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
        }
      >
        <Route index element={<ProfileOverview />} />
        <Route path="orders" element={<ProfileOrders />} />
        <Route path="account" element={<Account />} />
      </Route>

      <Route
        path="/dashboard"
        element={
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        }
      >
        <Route index element={<Overview />} />
        <Route path="listings" element={<Listings />} />
        <Route path="commissioned-orders" element={<CommissionedOrders />} />
        <Route path="orders" element={<Orders />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="add-artwork" element={<AddArtwork />} />
        <Route path="view-seller-order" element={<ViewSellerOrder />} />
        <Route path="view-commissioned-order" element={<CommissionedOrder />} />
      </Route>

      <Route
        path="/commissioned-orders/custom-artwork-process"
        element={<CommissionedProcess />}
      />

      <Route
        path="/commissioned-orders/submit-commission-request"
        element={
          <ProtectedRoutes>
            <SubmitCommissionedRequest />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/commissioned-orders/submit-commission-request/success"
        element={
          <ProtectedOrder>
            <CommissionedArtworkSuccess />
          </ProtectedOrder>
        }
      />
    </Routes>
  );
}

export default Routers;
