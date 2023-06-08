import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Routers from "./routers/Routers";

function App() {
  const location = useLocation();
  // Check if the current location is either "/login" or "/register"
  const isLoginOrRegisterPage = location.pathname === "/auth";

  return (
    <>
      {!isLoginOrRegisterPage && <Navbar />}
      <Routers />
      {!isLoginOrRegisterPage && <Footer />}
    </>
  );
}

export default App;
