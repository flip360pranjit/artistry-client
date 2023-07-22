import React from "react";
import { useOutletContext } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { IconContext } from "react-icons";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { isWebpSupported } from "react-image-webp/dist/utils";

function ReviewOrder() {
  const [items] = useOutletContext();
  return (
    <div className="font-poppins sm:mr-16">
      <h1 className="flex items-center gap-4 font-semibold pb-10 text-[#333333]">
        <IconContext.Provider value={{ size: "1.5rem" }}>
          <FaShoppingCart />
        </IconContext.Provider>
        <span className="text-2xl">My Cart Items</span>
      </h1>
      <div className="">
        {items.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-10 sm:px-10 border-t-2"
          >
            <div className="">
              {isWebpSupported() ? (
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className=""
                />
              ) : (
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className=""
                />
              )}
            </div>
            <div className="sm:col-span-2 flex items-center px-7">
              <div className="">
                <h1 className="text-2xl font-playfair-display font-semibold">
                  {item.product.title}
                </h1>
                <p className="font-poppins text-teal-600 mt-1">
                  Medium:{" "}
                  <span className="font-semibold">{item.product.medium}</span>
                </p>
                <h4 className="flex mt-3 text-[#333333]">
                  <MdOutlineCurrencyRupee />{" "}
                  <span className="text-4xl font-poppins font-semibold">
                    {Math.floor(item.product.price)}
                    <span className="text-2xl align-super text-[#444444]">
                      {item.product.price.toFixed(2).split(".")[1]}
                    </span>
                  </span>
                </h4>
                <p className="font-poppins text-[#555555] mt-1">
                  Quantity:{" "}
                  <span className="font-semibold">{item.quantity}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewOrder;
