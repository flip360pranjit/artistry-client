import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";
import About from "./pages/About";
import Careers from "./pages/Careers";
import ContactUs from "./pages/ContactUs";
import Error from "./pages/Error";
import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();
  // Check if the current location is either "/login" or "/register"
  const isLoginOrRegisterPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!isLoginOrRegisterPage && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes>
          {/* <Route element={<PrivateRoutes />}>
          </Route> */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </AnimatePresence>
      {!isLoginOrRegisterPage && <Footer />}
    </>
  );
}

export default App;
