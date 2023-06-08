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

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="*" element={<Error />} />
      <Route path="/auth" element={<Authenticate />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
}

export default Routers;
