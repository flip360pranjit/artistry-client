import React from "react";
import { IconContext } from "react-icons";
import { FaBars } from "react-icons/fa";
import Logo from "../../assets/images/logo.png";
import LogoWebp from "../../assets/images/logo.webp";
import { Link } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { isWebpSupported } from "react-image-webp/dist/utils";

function TopNav({ isOpen, handleClick }) {
  return (
    <div className="flex items-center justify-between p-2 fixed w-full bg-white z-20">
      <div className="cursor-pointer z-50" onClick={handleClick}>
        {!isOpen && (
          <IconContext.Provider value={{ color: "#3c166d", size: "1.5rem" }}>
            <FaBars />
          </IconContext.Provider>
        )}
      </div>
      <Link to="/">
        <div className="flex items-center">
          <img
            src={isWebpSupported() ? LogoWebp : Logo}
            alt="Logo"
            className="w-12"
          />
          <h1 className="font-lobster mb-1 lg:mb-2 text-[#cca300] text-2xl lg:text-3xl xl:text-4xl">
            Art
            <span className="text-[#3c166d]">istry</span>
          </h1>
        </div>
      </Link>
      <ProfileButton size="small" />
    </div>
  );
}

export default TopNav;
