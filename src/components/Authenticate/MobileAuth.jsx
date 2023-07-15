import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Login from "../Login/Login";
import Register from "../Register/Register";

const divVariants = {
  hidden: {
    opacity: 0,
    y: "-100vh",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1 },
  },
  exit: {
    opacity: 0,
    y: "100vh",
    transition: { duration: 0.5 },
  },
};
const topBlobVariants = {
  hidden: {
    opacity: 0,
    y: "-100vh",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1 },
  },
  exit: {
    opacity: 0,
    y: "-100vh",
    transition: { duration: 0.5 },
  },
};
const bottomBlobVariants = {
  hidden: {
    opacity: 0,
    y: "100vh",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1 },
  },
  exit: {
    opacity: 0,
    y: "100vh",
    transition: { duration: 0.5 },
  },
};

function MobileAuth() {
  const [isLogin, setIsLogin] = useState(true);

  function handleClick(event) {
    event.preventDefault();
    setIsLogin(!isLogin);

    scrollTo(0, 0);
  }

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        {isLogin && (
          <motion.div
            variants={topBlobVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="z-[-10] absolute bg-primary w-full h-screen rounded-full transition duration-1000 top-[-60%] mobile-md1:top-[-70%]"
          />
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {!isLogin && (
          <motion.div
            variants={bottomBlobVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="z-[-10] absolute bg-primary w-full h-screen rounded-full transition duration-1000 bottom-[-45%]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isLogin && (
          <motion.div
            variants={divVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Login handleClick={handleClick} />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {!isLogin && (
          <motion.div
            variants={divVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Register handleClick={handleClick} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MobileAuth;
