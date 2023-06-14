import React from "react";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaTimes } from "react-icons/fa";

function MobileSidebar({ isOpen, handleClick, links }) {
  return (
    <ul className="pt-10 min-h-screen h-full relative">
      <div
        className="absolute top-3 left-1 cursor-pointer z-50"
        onClick={handleClick}
      >
        {isOpen && (
          <IconContext.Provider value={{ color: "#fff", size: "1.5rem" }}>
            <FaTimes />
          </IconContext.Provider>
        )}
      </div>
      {links.map((link) => (
        <Link to={link.link} key={link.title}>
          <li className="flex flex-row items-center gap-4 mt-9 p-2 rounded-md cursor-pointer hover:bg-white hover:text-primary duration-300">
            <IconContext.Provider value={{ size: "1.5rem" }}>
              {link.icon}
            </IconContext.Provider>
            <h2 className="duration-100">{link.title}</h2>
          </li>
        </Link>
      ))}
    </ul>
  );
}

export default MobileSidebar;
