import React, { useState } from "react";
import { IconContext } from "react-icons";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { Outlet, useNavigate } from "react-router-dom";
import CheckoutNav from "../components/Checkout/CheckoutNav";
import CheckoutSummary from "../components/Checkout/CheckoutSummary";
import { useDispatch, useSelector } from "react-redux";
import { checkoutNextPage } from "../store/slices/CheckoutSlice";

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { review, shipping, payment, confirmation, allDetails } = useSelector(
    (state) => state.checkout
  );
  const { items, totalAmount, totalQuantity, discount } = useSelector(
    (state) => state.checkout.order
  );

  //   states
  const [currentPage, setCurrentPage] = useState("Review Order");

  const deliveryCharges = totalQuantity * 100;
  const taxCharges = 0.18 * (totalAmount - discount.amount + deliveryCharges);
  const cartTotal =
    totalAmount - discount.amount + deliveryCharges + taxCharges;

  //   Continue Shopping
  function handleBrowse(event) {
    event.preventDefault();
    navigate("/browse");
  }

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
    <div className="font-poppins my-10 px-4 sm:px-6 lg:px-8 mx-4 md:mx-20">
      <div className="flex items-center justify-start sm:justify-between mb-5">
        <h2
          onClick={handleBrowse}
          className="flex items-center gap-2 text-[#666666] cursor-pointer"
        >
          <IconContext.Provider value={{ size: "1.5rem" }}>
            <HiOutlineArrowNarrowLeft />
          </IconContext.Provider>
          Continue Shopping
        </h2>

        <button
          onClick={handlePage}
          className=" hidden sm:flex lg:hidden w-28 gap-2 items-center justify-center font-poppins text-white outline outline-1 py-2 rounded-sm bg-primary hover:bg-primary-hover"
        >
          {currentPage === "Confirmation" ? "Place Order" : "Next"}
        </button>
      </div>
      <CheckoutNav
        items={items}
        totalAmount={totalAmount}
        totalQuantity={totalQuantity}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 py-10">
        <div className="lg:col-span-2">
          <Outlet context={[items]} />
        </div>
        <div className="">
          <CheckoutSummary
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            items={items}
            totalAmount={totalAmount}
            totalQuantity={totalQuantity}
            discount={discount}
            deliveryCharges={deliveryCharges}
            taxCharges={taxCharges}
            cartTotal={cartTotal}
          />
        </div>
      </div>
    </div>
  );
}

export default Checkout;
