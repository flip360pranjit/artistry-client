import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Routers from "./routers/Routers";
import { ToastContainer } from "react-toastify";

function App() {
  const location = useLocation();
  // Check if the current location is either "/login" or "/register"
  const isLoginOrRegisterPage =
    location.pathname === "/auth" ||
    location.pathname.includes("/dashboard") ||
    location.pathname.includes("/profile");

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
