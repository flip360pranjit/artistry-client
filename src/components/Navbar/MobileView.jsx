import React from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { Link } from "react-router-dom";

function MobileView({
  link,
  headLink,
  subLink,
  toggleHeadDropdown,
  toggleSubDropdown,
}) {
  return (
    <div className="mx-4 mb-10">
      {!link.isDropdown && (
        <Link to={link.link}>
          <h1 className="text-lg flex items-center justify-between cursor-pointer text-[#333333] hover:text-[#cca300]">
            {link.name}
            {link.isDropdown &&
              (headLink === link.name ? <FaAngleUp /> : <FaAngleDown />)}
          </h1>
        </Link>
      )}
      {link.isDropdown && (
        <h1
          className="text-lg flex items-center justify-between cursor-pointer text-[#333333] hover:text-[#cca300]"
          onClick={(Event) => {
            toggleHeadDropdown(Event, link);
          }}
        >
          {link.name}
          {link.isDropdown &&
            (headLink === link.name ? <FaAngleUp /> : <FaAngleDown />)}
        </h1>
      )}
      {link.isDropdown && headLink === link.name && (
        <div className="px-5">
          {/* If the dropdown is not nested */}
          {!link.submenu &&
            link.sublinks.map((sublink) => (
              <Link to={sublink.link} key={sublink.name}>
                <h2 className="text-base mt-5 text-[#333333] hover:text-[#cca300] cursor-pointer">
                  {sublink.name}
                </h2>
              </Link>
            ))}

          {/* If the dropdown is nested */}
          {link.submenu &&
            link.sublinks.map((sublink) => (
              <div key={sublink.name}>
                <h2
                  className="flex items-center justify-between text-base mt-5 text-[#333333] hover:text-[#cca300] cursor-pointer"
                  onClick={(Event) => {
                    toggleSubDropdown(Event, sublink);
                  }}
                >
                  {sublink.name}
                  {subLink === sublink.name ? <FaAngleUp /> : <FaAngleDown />}
                </h2>
                <div className="px-5">
                  {subLink === sublink.name &&
                    sublink.sublinks.map((slink) => (
                      <Link to={slink.link} key={slink.name}>
                        <h3 className="flex items-center justify-between text-base mt-5 text-[#333333] hover:text-[#cca300] cursor-pointer">
                          {slink.name}
                        </h3>
                      </Link>
                    ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default MobileView;
