import React, { useState } from "react";
import { IconContext } from "react-icons";
import {
  TbSquareRoundedChevronLeftFilled,
  TbSquareRoundedChevronRightFilled,
} from "react-icons/tb";
import Logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import ProfileButton from "../Dashboard/ProfileButton";

function DesktopSidebar({ links }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="flex text-white fixed">
      <div className="bg-primary min-h-screen relative p-5 duration-300 w-52">
        <Link to="/">
          <div className="flex items-center justify-start gap-1 cursor-pointer">
            <img src={Logo} alt="Logo" className="w-16 mt-2" />
            <h1 className="font-lobster text-2xl duration-200">Artistry</h1>
          </div>
        </Link>
        <div className="flex justify-center">
          <ProfileButton size="medium" />
        </div>
        <ul className="mt-3 h-screen">
          {links.map((link) => (
            <Link to={link.link} key={link.title}>
              <li
                className={`flex flex-row items-center gap-4 mt-9 p-2 rounded-md cursor-pointer hover:bg-white hover:text-primary duration-300 ${
                  !isOpen && "justify-center"
                }`}
              >
                <IconContext.Provider value={{ size: "1.5rem" }}>
                  {link.icon}
                </IconContext.Provider>
                <h2 className="duration-100">{link.title}</h2>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DesktopSidebar;
