import React, { useState } from "react";
import { FaAngleRight, FaCaretDown, FaCaretUp } from "react-icons/fa";
import { Link } from "react-router-dom";

function DesktopView({ link, headLink, toggleHeadDropdown }) {
  return (
    <div className="relative">
      <h1
        className="text-[10px] lg:text-xs text-[#333333] cursor-pointer hover:text-secondary flex items-center justify-center"
        onClick={(Event) => {
          toggleHeadDropdown(Event, link);
        }}
      >
        {link.isDropdown ? (
          <>{link.name}</>
        ) : (
          <Link to={link.link}>{link.name}</Link>
        )}

        {link.isDropdown &&
          (headLink === link.name ? <FaCaretUp /> : <FaCaretDown />)}
      </h1>
      {link.isDropdown && headLink === link.name && (
        <div className="absolute w-max mt-5 lg:mt-9 z-10">
          {/* Triangle for dropdown */}
          <img
            src="./images/caret-up.png"
            alt="Caret Up"
            className="h-4 ml-2"
          />

          <div
            className={`bg-[white] rounded-b-md border border-gray-300 border-t-0 shadow-md transition ease-in-out duration-300 px-8 py-5  ${
              link.submenu ? "grid grid-cols-2 gap-x-10 gap-y-7" : "pl-3 pb-2"
            }`}
          >
            {link.sublinks.map((sublink) => (
              <div key={sublink.name}>
                <h1
                  className={`text-[#333333] ${
                    link.submenu
                      ? "font-bold text-xl"
                      : "text-md cursor-pointer hover:text-[#cca300]"
                  }`}
                >
                  {link.submenu ? (
                    sublink.name
                  ) : (
                    <Link to={sublink.link} className="flex items-center mb-3">
                      <FaAngleRight />
                      <span className="transition duration-300 ease-in-out hover:translate-x-2">
                        {sublink.name}
                      </span>
                    </Link>
                  )}
                </h1>
                {sublink.sublinkCount > 0 && (
                  <div>
                    {sublink.sublinks.map((slink) => (
                      <Link key={slink.name} to={slink.link}>
                        <h2 className="flex flex-row items-center mt-2 cursor-pointer text-md text-[#666666] hover:text-[#cca300]">
                          <FaAngleRight />
                          <span className="transition duration-300 ease-in-out hover:translate-x-2">
                            {slink.name}
                          </span>
                        </h2>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DesktopView;
