import React, { useState } from "react";
import { motion } from "framer-motion";

const divVariants = {
  hidden: {
    opacity: 0,
    y: "100vh",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.5 },
  },
};

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="bg-[#f4e7d3] h-screen pt-20 mx-10 md:mx-20">
      <motion.div
        variants={divVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center justify-center h-full rounded-b-xl px-10"
      >
        <h1 className="text-3xl font-montserrat font-bold text-center">
          Forgot Password?
        </h1>
        <p className="text-sm font-open-sans mt-4 mb-7 text-center text-[#555555]">
          Don't worry! It happens to the best of us. Please enter your email
          address below and we will send you a password reset link.
        </p>
        <div className="bg-white p-5 rounded-lg mobile:w-96">
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading ? true : false}
                className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary mt-5 ${
                  loading
                    ? "bg-gray-500 hover:bg-gray-600"
                    : "bg-primary hover:bg-primary-hover"
                }`}
              >
                {loading ? "Loading...." : "Send Email"}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default ForgotPassword;
