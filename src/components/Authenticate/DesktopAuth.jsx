import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Login from "../Login/Login";
import Register from "../Register/Register";

const leftVariants = {
  hidden: {
    opacity: 0,
    x: "-100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1 },
  },
  exit: {
    opacity: 0,
    x: "-100vw",
    transition: { duration: 0.5 },
  },
};
const rightVariants = {
  hidden: {
    opacity: 0,
    x: "100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, delay: 0.5 },
  },
  exit: {
    opacity: 0,
    x: "100vw",
    transition: { duration: 1 },
  },
};

function DesktopAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [blobTransform, setBlobTransform] = useState(
    "translateX(0) translateY(0)"
  );

  function handleClick(event) {
    event.preventDefault();
    if (isLogin === true) {
      setIsLogin(false);
      setBlobTransform("translateX(100%)");
    } else {
      setIsLogin(true);
      setBlobTransform("translateX(0)");
    }
  }

  function template() {
    return blobTransform;
  }

  return (
    <div className="relative overflow-hidden">
      <motion.div
        transformTemplate={template}
        className="z-[-10] absolute bg-primary w-full h-screen rounded-full transition duration-1000 top-0 left-[-50%]"
      />
      <AnimatePresence mode="wait">
        {isLogin && (
          <motion.div
            variants={leftVariants}
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
            variants={rightVariants}
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

export default DesktopAuth;
