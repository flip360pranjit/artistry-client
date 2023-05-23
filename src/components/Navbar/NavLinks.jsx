import React, { useState } from "react";
import { links } from "./Links";
import "./Navbar.scss";
import DesktopView from "./DesktopView";
import MobileView from "./MobileView";
import Button from "../Button/Button";
import { FaArrowRight } from "react-icons/fa";

function NavLinks({ isClicked }) {
  const [headLink, setHeadLink] = useState("");
  const [subLink, setSubLink] = useState("");

  function toggleHeadDropdown(event, currentLink) {
    event.preventDefault();
    setSubLink("");
    headLink === currentLink.name
      ? setHeadLink("")
      : setHeadLink(currentLink.name);
  }

  function toggleSubDropdown(event, currentLink) {
    event.preventDefault();
    subLink === currentLink.name
      ? setSubLink("")
      : setSubLink(currentLink.name);
  }

  return (
    <>
      {/* Desktop View */}
      <ul className="hidden md:flex md:items-center md:gap-[2vw] lg:gap-[3vw]">
        {links.map((link) => (
          <DesktopView
            key={link.name}
            link={link}
            headLink={headLink}
            toggleHeadDropdown={toggleHeadDropdown}
          />
        ))}
      </ul>

      {/* Mobile View */}
      <ul
        className={`absolute mt-10 md:hidden w-full min-h-screen flex flex-col bg-[white] transition-all duration-500 ease-in-out z-[990] pt-20 ${
          isClicked && ""
        } ${!isClicked && "translate-y-[-200%]"}`}
      >
        {links.map((link) => (
          <MobileView
            key={link.name}
            link={link}
            headLink={headLink}
            subLink={subLink}
            toggleHeadDropdown={toggleHeadDropdown}
            toggleSubDropdown={toggleSubDropdown}
          />
        ))}
        <div className="flex justify-center mb-10">
          <Button type="contained" color="primary" size="mobile-login">
            Log in
            <FaArrowRight />
          </Button>
        </div>
      </ul>
    </>
  );
}

export default NavLinks;
