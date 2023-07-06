import React from "react";
import { IconContext } from "react-icons";
import { MdVerified } from "react-icons/md";
import { easeInOut, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { saveAs } from "file-saver";

function OrderSuccess() {
  const navigate = useNavigate();
  const { order } = useSelector((state) => state.order);

  function downloadInvoice(event) {
    event.preventDefault();
    saveAs(order.invoice.invoiceUrl, `Invoice_${order.invoice.invoiceNo}`);
  }

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
          className="text-4xl font-semibold text-center mt-5"
        >
          Order Placed!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: "100vh" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            ease: easeInOut,
            delay: 3,
            duration: 0.5,
          }}
          className="text-center text-lg text-[#333333] mt-2"
        >
          Thank you for choosing Artistry! We have received your order and it's
          being processed. You will receive an email confirmation shortly.
        </motion.p>
        <motion.button
          onClick={downloadInvoice}
          className="mt-5 py-2 px-10 rounded-full text-white bg-black hover:bg-gray-800 w-full sm:w-auto"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            ease: easeInOut,
            delay: 3.5,
            duration: 0.5,
          }}
        >
          Download Invoice
        </motion.button>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            ease: easeInOut,
            delay: 4,
            duration: 0.5,
          }}
          className="flex flex-col sm:flex-row items-center justify-center w-full sm:w-auto sm:gap-10 mt-7"
        >
          <button
            onClick={() => navigate("/")}
            className="mt-5 py-2 px-10 rounded-full text-primary bg-white hover:bg-gray-100 w-full sm:w-auto"
          >
            Go to Home
          </button>

          <button
            onClick={() => navigate("/profile/orders")}
            className="mt-5 py-2 px-10 rounded-full text-primary bg-white hover:bg-gray-100 w-full sm:w-auto"
          >
            View Order
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default OrderSuccess;
