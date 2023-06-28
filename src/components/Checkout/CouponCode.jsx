import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyCoupon, removeCoupon } from "../../store/slices/CartSlice";
import {
  applyCheckoutCoupon,
  removeCheckoutCoupon,
} from "../../store/slices/CheckoutSlice";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

function CouponCode({ page }) {
  const dispatch = useDispatch();

  const cartDiscount = useSelector((state) => state.cart.discount);
  const cartAmount = useSelector((state) => state.cart.totalAmount);
  const checkoutDiscount = useSelector(
    (state) => state.checkout.order.discount
  );
  const checkoutAmount = useSelector(
    (state) => state.checkout.order.totalAmount
  );

  // States
  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState({
    page: "",
    error: "",
  });

  //   Apply Coupon Code
  async function applyCouponCode(event) {
    event.preventDefault();
    setCouponLoading(true);

    try {
      await axios
        .post(
          `${import.meta.env.VITE_REACT_APP_API_URL}/coupons/apply-coupon`,
          {
            code: couponCode,
          }
        )
        .then((response) => {
          setCouponLoading(false);

          if (page === "cart") {
            const discountPercent = response.data.coupon.discount;
            const discountAmount = (discountPercent / 100) * cartAmount;
            dispatch(
              applyCoupon({
                amount: discountAmount,
                coupon: response.data.coupon,
              })
            );
          } else {
            const discountPercent = response.data.coupon.discount;
            const discountAmount = (discountPercent / 100) * checkoutAmount;
            dispatch(
              applyCheckoutCoupon({
                amount: discountAmount,
                coupon: response.data.coupon,
              })
            );
          }
          toast.success("Coupon Applied!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setCouponCode("");
          setCouponError("");
        });
    } catch (error) {
      setCouponLoading(false);
      setCouponError({
        page: page,
        error: error.response.data.message,
      });
    }
  }
  function handleCouponRemove(event) {
    event.preventDefault();

    if (page === "cart") dispatch(removeCoupon());
    else dispatch(removeCheckoutCoupon());
  }

  if (page === "cart") {
    return cartDiscount.applied ? (
      <div
        className={`relative bg-white w-full ${
          page === "cart" && "lg:w-2/3 "
        } p-3 pr-5 shadow-2xl rounded-md`}
      >
        <div
          onClick={handleCouponRemove}
          className="absolute right-1 cursor-pointer"
        >
          <FaTimes />
        </div>
        <h2 className="flex mobile-sm:gap-1 items-center text-base mobile-lg:text-lg font-semibold text-[#3ec70b]">
          {`Code (${cartDiscount.coupon.code}) applied!`}
          <MdVerified />
        </h2>
        <h4 className="font-open-sans">{`${cartDiscount.coupon.discount}% off!`}</h4>
      </div>
    ) : (
      <>
        <h5 className="font-semibold text-center text-red-600">
          {couponError.page === "cart" && couponError.error}
        </h5>
        <div className="flex items-center justify-center w-full">
          <input
            type="text"
            name="coupon"
            id="coupon"
            placeholder="Please enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="block w-1/2 rounded-y-md rounded-l-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-primary placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
          />
          <button
            disabled={couponLoading}
            onClick={applyCouponCode}
            className="px-3 py-2 flex items-center justify-center rounded-r-md text-white text-sm bg-primary hover:bg-primary-hover"
          >
            {couponLoading ? "Loading" : "Apply Discount"}
          </button>
        </div>
      </>
    );
  } else {
    return checkoutDiscount.applied ? (
      <div
        className={`relative bg-white w-full ${
          page === "cart" && "lg:w-2/3 "
        } p-3 pr-5 shadow-2xl rounded-md`}
      >
        <div
          onClick={handleCouponRemove}
          className="absolute right-1 cursor-pointer"
        >
          <FaTimes />
        </div>
        <h2 className="flex mobile-sm:gap-1 items-center text-base mobile-lg:text-lg font-semibold text-[#3ec70b]">
          {`Code (${checkoutDiscount.coupon.code}) applied!`}
          <MdVerified />
        </h2>
        <h4 className="font-open-sans">{`${checkoutDiscount.coupon.discount}% off!`}</h4>
      </div>
    ) : (
      <>
        <h5 className="font-semibold text-center text-red-600">
          {couponError.page === "checkout" && couponError.error}
        </h5>
        <div className="flex items-center justify-center w-full">
          <input
            type="text"
            name="coupon"
            id="coupon"
            placeholder="Please enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="block w-1/2 rounded-y-md rounded-l-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-primary placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
          />
          <button
            disabled={couponLoading}
            onClick={applyCouponCode}
            className="px-3 py-2 flex items-center justify-center rounded-r-md text-white text-sm bg-primary hover:bg-primary-hover"
          >
            {couponLoading ? "Loading" : "Apply Discount"}
          </button>
        </div>
      </>
    );
  }
}

export default CouponCode;
