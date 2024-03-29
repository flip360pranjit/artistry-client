import React, { useEffect, useState } from "react";
import { FaArrowRight, FaBars, FaTimes } from "react-icons/fa";
import NavLinks from "./NavLinks";
import { IconContext } from "react-icons";
import Button from "../Button/Button";
import Logo from "../../assets/images/logo.png";
import LogoWebp from "../../assets/images/logo.webp";
import ProfileIcon from "./ProfileIcon";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isWebpSupported } from "react-image-webp/dist/utils";

function Navbar() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isClicked, setIsClicked] = useState(false);

  const { user } = useSelector((state) => state.auth);

  // Window Resize
  useEffect(() => {
    function handleWindowResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  function handleClick(event) {
    event.preventDefault();
    setIsClicked(false);
  }

  return (
    <header className="font-poppins text-sm bg-[white] md:px-20 fixed z-[1000] w-full">
      <nav className="relative flex flex-col items-start md:flex-row md:items-center md:justify-between">
        <div className="flex bg-[white] px-2 mobile-sm:px-8 md:px-0 pt-1 md:pt-0 w-full md:w-auto justify-between items-center z-[999]">
          <div className="flex flex-row items-center gap-4">
            {/* Hamburger Menu */}
            <button
              className="md:hidden mr-2 transition-all duration-500 ease-in-out"
              onClick={() => {
                setIsClicked(!isClicked);
              }}
            >
              <IconContext.Provider value={{ size: "1.5rem" }}>
                {isClicked ? <FaTimes /> : <FaBars />}
              </IconContext.Provider>
            </button>
            {/* Brand */}
            <Link to="/" className="flex items-center justify-center lg:gap-2">
              <img
                src={isWebpSupported() ? LogoWebp : Logo}
                alt="Logo"
                className="w-14 lg:w-14 xl:w-18"
              />
              <h3 className="font-lobster mb-1 lg:mb-2 text-[#cca300] text-2xl lg:text-3xl xl:text-4xl">
                Art
                <span className="text-[#3c166d]">istry</span>
              </h3>
            </Link>
          </div>
          {/* Profile Icon */}
          {user && windowWidth < 768 && <ProfileIcon />}
        </div>

        {/* Dropdown Links */}
        <NavLinks
          isClicked={isClicked}
          isLoggedIn={user}
          handleClick={handleClick}
        />

        {/* Authenticate */}
        {!user && (
          <a href="/auth" className="hidden md:inline-block">
            <Button type="outlined" color="primary" size="small">
              Log in
              <FaArrowRight />
            </Button>
          </a>
        )}

        {/* Profile Icon */}
        {user && windowWidth >= 768 && <ProfileIcon />}
      </nav>
    </header>
  );
}

export default Navbar;
