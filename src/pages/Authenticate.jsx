import React, { useEffect, useState } from "react";
import DesktopAuth from "../components/Authenticate/DesktopAuth";
import MobileAuth from "../components/Authenticate/MobileAuth";
import "react-toastify/dist/ReactToastify.css";

function Authenticate() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleWindowResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return windowWidth < 640 ? <MobileAuth /> : <DesktopAuth />;
}

export default Authenticate;
