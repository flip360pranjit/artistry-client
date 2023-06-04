import React, { useState } from "react";
import { FaArrowRight, FaBars, FaTimes } from "react-icons/fa";
import NavLinks from "./NavLinks";
import { IconContext } from "react-icons";
import Button from "../Button/Button";
import Logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

function Navbar() {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <header className="font-poppins text-sm bg-[white] px-8 md:px-20 fixed z-[1000] w-full">
      <nav className="relative flex flex-col items-start md:flex-row md:items-center md:justify-between">
        <div className="flex bg-[white] pt-5 md:pt-0 w-full md:w-auto justify-between items-center z-[999]">
          {/* Brand */}
          <a href="/" className="flex items-center justify-center lg:gap-2">
            <img src={Logo} alt="Logo" className="w-14 lg:w-14 xl:w-18" />
            <h3 className="font-lobster mb-1 lg:mb-2 text-[#cca300] text-2xl lg:text-3xl xl:text-4xl">
              Art
              <span className="text-[#3c166d]">istry</span>
            </h3>
          </a>
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
        </div>

        {/* Dropdown Links */}
        <NavLinks isClicked={isClicked} />

        <a href="/login" className="hidden md:inline-block">
          <Button type="outlined" color="primary" size="small">
            Log in
            <FaArrowRight />
          </Button>
        </a>
      </nav>
    </header>
  );
}

export default Navbar;
