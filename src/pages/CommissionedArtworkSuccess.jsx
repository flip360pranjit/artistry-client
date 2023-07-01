import React from "react";
import { IconContext } from "react-icons";
import { MdVerified } from "react-icons/md";
import { easeInOut, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function CommissionedArtworkSuccess() {
  const navigate = useNavigate();

  return (
    <div className="bg-green-400 h-screen flex items-center justify-center px-4 sm:px-16 py-10 mx-4 sm:mx-10 pt-24">
      <div className="flex flex-col items-center font-poppins">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            delay: 2,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <IconContext.Provider value={{ size: "5rem" }}>
            <MdVerified />
          </IconContext.Provider>
        </motion.div>
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            ease: easeInOut,
            delay: 2.5,
            duration: 0.5,
          }}
          className="text-3xl font-semibold text-center mt-5"
        >
          Commissioned Work Request Submitted
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: "100vh" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            ease: easeInOut,
            delay: 3,
            duration: 0.5,
          }}
          className="text-center text-[#333333] text-sm mt-2"
        >
          Thank you for submitting your commissioned work request! We have
          received your request and will review it shortly. Our team will get in
          touch with you to discuss the details and provide further information.
        </motion.p>
        <motion.button
          onClick={() => navigate("/")}
          className="mt-5 py-2 px-10 rounded-full text-primary bg-white hover:bg-gray-100"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            ease: easeInOut,
            delay: 3.5,
            duration: 0.5,
          }}
        >
          Go to Home
        </motion.button>
      </div>
    </div>
  );
}

export default CommissionedArtworkSuccess;
