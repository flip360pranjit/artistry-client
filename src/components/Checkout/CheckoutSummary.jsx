import React from "react";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import CouponCode from "./CouponCode";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkoutNextPage } from "../../store/slices/CheckoutSlice";

function CheckoutSummary({
  currentPage,
  setCurrentPage,
  items,
  totalAmount,
  totalQuantity,
  discount,
  deliveryCharges,
  taxCharges,
  cartTotal,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { review, shipping, payment, confirmation, allDetails } = useSelector(
    (state) => state.checkout
  );

  function handlePage(event) {
    event.preventDefault();

    dispatch(checkoutNextPage({ page: currentPage }));

    if (currentPage === "Review Order") {
      setCurrentPage("Shipping & Billing");
      navigate("/checkout/shipping", {
        state: {
          items,
          totalAmount,
          totalQuantity,
        },
      });
    } else if (currentPage === "Shipping & Billing") {
      setCurrentPage("Payment");
      navigate("/checkout/payment", {
        state: {
          items,
          totalAmount,
          totalQuantity,
        },
      });
    } else if (currentPage === "Payment") {
      if (review === true && shipping === true && payment === true) {
        setCurrentPage("Confirmation");
        navigate("/checkout/confirmation", {
          state: {
            items,
            totalAmount,
            totalQuantity,
          },
        });
      }
    }
    scrollTo(0, 0);
  }

  return (
    <div className="w-full bg-white rounded-lg shadow-xl">
      <div className="p-5">
        <h2 className="font-semibold text-[#444444] text-xl mb-4">
          Order Summary
        </h2>
        <div className="flex items-center justify-between font-semibold">
          <p className="">Subtotal</p>
          <p className="flex items-center gap-1">
            <MdOutlineCurrencyRupee />{" "}
            <span className="font-semibold">
              {Math.floor(totalAmount)}
              <span className="text-sm align-super text-[#444444]">
                {totalAmount.toFixed(2).split(".")[1]}
              </span>
            </span>
          </p>
        </div>
        <div className="flex items-center justify-between text-[#666666] mt-1">
          <p className="">Discount</p>
          <p className="flex items-center gap-2">
            {"("}
            {discount.coupon.discount}
            {"%)"}
            <span className="flex items-center">
              {"-"}
              <MdOutlineCurrencyRupee />{" "}
              <span className="font-semibold">
                {Math.floor(discount.amount)}
                <span className="text-sm align-super text-[#777777]">
                  {discount.amount.toFixed(2).split(".")[1]}
                </span>
              </span>
            </span>
          </p>
        </div>
        <div className="flex items-center justify-between text-[#666666] mt-1">
          <p className="">Delivery</p>
          <p className="flex items-center gap-1">
            <MdOutlineCurrencyRupee />{" "}
            <span className="font-semibold">
              {Math.floor(deliveryCharges)}
              <span className="text-sm align-super text-[#777777]">
                {deliveryCharges.toFixed(2).split(".")[1]}
              </span>
            </span>
          </p>
        </div>
        <div className="flex items-center justify-between text-[#666666] mt-1">
          <p className="">Tax</p>
          <p className="flex items-center gap-2">
            {"(18%)"}
            <span className="flex items-center">
              <MdOutlineCurrencyRupee />{" "}
              <span className="font-semibold">
                {Math.floor(taxCharges)}
                <span className="text-sm align-super text-[#777777]">
                  {taxCharges.toFixed(2).split(".")[1]}
                </span>
              </span>
            </span>
          </p>
        </div>
        <div className="flex items-center justify-between font-semibold mt-5">
          <p className="">Total</p>
          <p className="flex items-center gap-1">
            <MdOutlineCurrencyRupee />{" "}
            <span className="font-semibold">
              {Math.floor(cartTotal)}
              <span className="text-sm align-super text-[#444444]">
                {cartTotal.toFixed(2).split(".")[1]}
              </span>
            </span>
          </p>
        </div>

        <button
          onClick={handlePage}
          className="flex w-full gap-2 items-center justify-center font-poppins text-white outline outline-1 py-2 mt-7 rounded-sm bg-primary hover:bg-primary-hover"
        >
          {currentPage === "Confirmation" ? "Place Order" : "Next"}
        </button>
      </div>
      <div className="mt-5 bg-gray-200 p-5">
        <h2 className="">Apply Coupon Code</h2>
        <p className="text-xs mt-1 mb-5">
          Enter your coupon code and watch the discounts cast their spell!
        </p>
        <CouponCode page="checkout" />
      </div>
    </div>
  );
}

export default CheckoutSummary;
