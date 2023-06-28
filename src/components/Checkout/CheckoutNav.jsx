import React from "react";
import { useNavigate } from "react-router-dom";

const checkoutLinks = [
  {
    id: 1,
    name: "Review Order",
    link: "/checkout/review",
  },
  {
    id: 2,
    name: "Shipping & Billing",
    link: "/checkout/shipping",
  },
  {
    id: 3,
    name: "Payment",
    link: "/checkout/payment",
  },
  {
    id: 4,
    name: "Confirmation",
    link: "/checkout/confirmation",
  },
];

function CheckoutNav({
  items,
  totalAmount,
  totalQuantity,
  currentPage,
  setCurrentPage,
}) {
  const navigate = useNavigate();

  function handleClick(event, linkName, link) {
    event.preventDefault();

    if (linkName !== "Confirmation") {
      setCurrentPage(linkName);
      navigate(link, {
        state: {
          items,
          totalAmount,
          totalQuantity,
        },
      });
    }
  }
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-center sm:gap-0">
      {checkoutLinks.map((link) => (
        <h1
          key={link.id}
          onClick={(e) => handleClick(e, link.name, link.link)}
          className={`cursor-pointer text-center w-full sm:w-52 py-3 text-xs ${
            currentPage === link.name
              ? "text-white bg-primary hover:bg-primary-hover"
              : "text-primary ring-1 ring-inset ring-primary hover:bg-gray-50"
          }`}
        >
          {link.name}
        </h1>
      ))}
    </div>
  );
}

export default CheckoutNav;
