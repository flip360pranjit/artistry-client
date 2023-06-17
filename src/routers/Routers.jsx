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

      <Route path="/profile" element={<Profile />}>
        <Route index element={<ProfileOverview />} />
        <Route path="orders" element={<ProfileOrders />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="account" element={<Account />} />
      </Route>

      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Overview />} />
        <Route path="listings" element={<Listings />} />
        <Route path="orders" element={<Orders />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="add-artwork" element={<AddArtwork />} />
      </Route>
    </Routes>
  );
}

export default Routers;
