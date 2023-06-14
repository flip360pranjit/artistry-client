import React, { useEffect, useState } from "react";
import { AnimatePresence, easeInOut, motion } from "framer-motion";
import { Outlet } from "react-router-dom";
import TopNav from "../components/Dashboard/TopNav";
import { SidebarLinks } from "../components/Dashboard";
import DesktopSidebar from "../components/Sidebar/DesktopSidebar";
import MobileSidebar from "../components/Sidebar/MobileSidebar";

const sidebarVariants = {
  hidden: {
    opacity: 0,
    x: "-100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
  exit: {
    opacity: 0,
    x: "-100vw",
    transition: { ease: easeInOut, duration: 0.5 },
  },
};

function Dashboard() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isOpen, setIsOpen] = useState(false);

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
    setIsOpen(!isOpen);
  }

  return (
    <div className="overflow-hidden">
      {windowWidth < 768 && (
        <TopNav isOpen={isOpen} handleClick={handleClick} />
      )}
      <div className="flex">
        {windowWidth >= 768 ? (
          <DesktopSidebar links={SidebarLinks} />
        ) : (
          <AnimatePresence mode="wait">
            {isOpen && (
              <motion.div
                variants={sidebarVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed z-40 min-h-screen h-full w-56 p-2 text-white bg-primary"
              >
                <MobileSidebar
                  isOpen={isOpen}
                  handleClick={handleClick}
                  links={SidebarLinks}
                />
              </motion.div>
            )}
          </AnimatePresence>
        )}
        <div
          className={`bg-primary w-full min-h-screen mt-16 md:mt-0 md:ml-52`}
        >
          <div
            className={`bg-gray-300 h-full px-2 py-3 pb-7 duration-500 ${
              isOpen && "scale-75 translate-x-1/2 rounded-3xl"
            }`}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
