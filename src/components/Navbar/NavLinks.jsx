import React, { useEffect, useState } from "react";
import { links } from "./Links";
import DesktopView from "./DesktopView";
import MobileView from "./MobileView";
import Button from "../Button/Button";
import { FaArrowRight } from "react-icons/fa";
import { useLocation } from "react-router-dom";

function NavLinks({ isClicked, isLoggedIn, handleClick }) {
  const location = useLocation();

  const [headLink, setHeadLink] = useState("");
  const [subLink, setSubLink] = useState("");

  useEffect(() => {
    setHeadLink("");
    setSubLink("");
  }, [location]);

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
        className={`absolute px-2 mobile-sm:px-8 md:px-0 mt-10 md:hidden w-full min-h-screen flex flex-col bg-[white] transition-all duration-500 ease-in-out z-[990] pt-20 ${
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
            handleClick={handleClick}
          />
        ))}
        {!isLoggedIn && (
          <a href="/auth" className="flex justify-center mb-10">
            <Button type="contained" color="primary" size="mobile-login">
              Log in
              <FaArrowRight />
            </Button>
          </a>
        )}
      </ul>
    </>
  );
}

export default NavLinks;
