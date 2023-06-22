import React from "react";
import { motion } from "framer-motion";

const heroVariants = {
  hidden: {
    opacity: 0,
    y: "50vh",
  },
  visible: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: "-100vh",
    transition: { ease: "easeInOut" },
  },
};

const Careers = () => {
  return (
    <div className="bg-[#f4e7d3] pt-32 pb-16 px-4 sm:px-6 lg:px-8 rounded-b-3xl mx-4 md:mx-20">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0, duration: 0.6 }}
          exit="exit"
          className="text-4xl text-center font-bold mb-4 font-montserrat"
        >
          No Careers Available
        </motion.h2>
        <motion.p
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3, duration: 0.6 }}
          exit="exit"
          className="font-open-sans text-base text-gray-700"
        >
          Thank you for your interest in joining our team. Currently, we do not
          have any open positions available. We appreciate your enthusiasm and
          encourage you to check back in the future for any career opportunities
          that may arise.
        </motion.p>
        <motion.p
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6, duration: 0.6 }}
          exit="exit"
          className="font-open-sans text-base text-gray-700 mt-4"
        >
          If you would like to stay updated on any future job openings, you can
          subscribe to our newsletter or follow us on social media.
        </motion.p>
        <motion.p
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.9, duration: 0.6 }}
          exit="exit"
          className="font-open-sans text-base text-gray-700 mt-4"
        >
          In the meantime, we value your support as a customer and appreciate
          your continued engagement with our products/services.
        </motion.p>
        <motion.p
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.2, duration: 0.6 }}
          exit="exit"
          className="font-open-sans text-base text-gray-700 mt-4"
        >
          If you have any questions or would like to reach out to us, please
          feel free to contact our support team.
        </motion.p>
      </div>
    </div>
  );
};

export default Careers;
