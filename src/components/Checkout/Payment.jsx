import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { FaCreditCard } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch } from "react-redux";
import {
  removePaymentInfo,
  setPaymentInfo,
} from "../../store/slices/CheckoutSlice";

function Payment() {
  const dispatch = useDispatch();
  const [selectedPayment, setSelectedPayment] = useState("cashOnDelivery");

  useEffect(() => {
    dispatch(removePaymentInfo());
  }, [dispatch]);

  function handleChange() {
    dispatch(setPaymentInfo({ type: "Cash On Delivery", details: {} }));
    scrollTo(0, 0);
  }

  return (
    <div className="font-poppins sm:mr-16">
      <div className="">
        <h1 className="flex items-center gap-4 font-semibold text-[#333333]">
          <IconContext.Provider value={{ size: "1.5rem" }}>
            <FaCreditCard />
          </IconContext.Provider>
          <span className="text-lg mobile-sm:text-2xl">Payment Options</span>
        </h1>
        <div className="mt-5">
          <div className="flex items-center gap-5 border rounded-lg px-5 py-3 opacity-50">
            <input
              type="radio"
              id="razorpay"
              name="payment"
              value="razorpay"
              // disabled={true}
              checked={selectedPayment === "razorpay"}
              onChange={(e) => setSelectedPayment(e.target.value)}
              className="text-primary cursor-pointer"
            />
            <label
              htmlFor="razorpay"
              className="text-[#555555] mobile-sm:text-xl"
            >
              Razorpay (Unavailable)
            </label>
          </div>
          <div className="border rounded-lg py-3 mt-2">
            <div className="flex items-center gap-5 px-5">
              <input
                type="radio"
                id="cashOnDelivery"
                name="payment"
                value="cashOnDelivery"
                checked={selectedPayment === "cashOnDelivery"}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="text-primary cursor-pointer"
              />
              <label
                htmlFor="cashOnDelivery"
                className="text-[#555555] mobile-sm:text-xl"
              >
                Cash On Delivery
              </label>
            </div>
            {selectedPayment === "cashOnDelivery" && (
              <div className="mt-4">
                <ReCAPTCHA
                  sitekey={
                    import.meta.env
                      .VITE_REACT_APP_RECAPTCHA_CASH_ON_DELIVERY_SITE_KEY
                  }
                  onChange={handleChange}
                  className="relative -left-7 scale-[0.6] mobile-sm:-left-4 mobile-sm:scale-[0.7] mobile-md2:scale-[0.85] mobile-md2:left-0 sm:scale-100 sm:mx-5"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
