import React from "react";
import { FaShareSquare } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { saveAs } from "file-saver";
import { isWebpSupported } from "react-image-webp/dist/utils";
import { MdOutlineCurrencyRupee } from "react-icons/md";

function Order() {
  const location = useLocation();

  const order = location.state.order;

  // console.log(order);

  function downloadShippingInvoice(event) {
    event.preventDefault();
    saveAs(order.shipmentInvoice, `Invoice_${order.order.orderNo}`);
  }
  return (
    <div className="font-poppins">
      <div className="ml-2 my-5">
        <h1 className="text-base mobile-lg:text-lg mobile-start:text-2xl font-poppins font-bold text-left">
          Order No:{" "}
          <span className="text-[#555555]">#{order.order.orderNo}</span>
        </h1>
      </div>
      <div className="bg-white p-7 rounded-3xl shadow-2xl">
        <p
          onClick={
            order.deliveryStatus !== "Processing" && downloadShippingInvoice
          }
          className="flex gap-2"
        >
          Shipping Details:{" "}
          {order.deliveryStatus === "Processing" ? (
            <span className="text-[#555555]">Shipment not created</span>
          ) : (
            <span className="font-semibold text-primary flex items-center gap-2 underline cursor-pointer">
              Shipping Invoice
              <FaShareSquare />
            </span>
          )}
        </p>
        <div className="mt-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 sm:gap-10 pb-5 border-b">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold">Total Quantity: </h4>
              <h4 className="text-[#333333]">{order.totalQuantity}</h4>
            </div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold">Total Amount: </h4>
              <h4 className="flex items-center text-[#333333]">
                <MdOutlineCurrencyRupee />{" "}
                <span className="font-poppins">
                  {Math.floor(order.totalAmount)}.
                  <span className="text-[#444444]">
                    {order.totalAmount.toFixed(2).split(".")[1]}
                  </span>
                </span>
              </h4>
            </div>
          </div>
          {order.products.map((product) => (
            <div key={product.product._id} className="flex py-5 border-b">
              <div className="min-w-[25vw] max-w-[25vw] md:min-w-[15vw] md:max-w-[15vw]">
                <img
                  src={
                    isWebpSupported()
                      ? product.product.imageWebp
                      : product.product.image
                  }
                  alt={product.product.title}
                />
              </div>
              <div className="flex flex-col mx-5 max-w-[70vw] overflow-x-auto pb-5">
                <h2 className="text-2xl font-semibold font-playfair-display">
                  {product.product.title}
                </h2>
                <p className="font-poppins text-teal-600 mt-2">
                  Medium:{" "}
                  <span className="font-semibold">
                    {product.product.medium}
                  </span>
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-10 mt-5">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">Quantity: </h4>
                    <h4 className="text-[#333333]">{product.quantity}</h4>
                  </div>

                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">Price: </h4>
                    <h4 className="flex items-center text-[#333333]">
                      <MdOutlineCurrencyRupee />{" "}
                      <span className="font-poppins">
                        {Math.floor(product.product.price)}.
                        <span className="text-[#444444]">
                          {product.product.price.toFixed(2).split(".")[1]}
                        </span>
                      </span>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col pt-7 px-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-b pb-7">
            <div className="flex flex-col items-start text-sm gap-1 text-[#444444]">
              <h3 className="font-semibold text-[#000000] text-base mb-1">
                Shipping Address
              </h3>
              <h3>
                <span className="font-semibold">Name:</span>{" "}
                {order.order._id.shippingAddress.fullName}
              </h3>
              <h3>
                <span className="font-semibold">Contact:</span> +
                {order.order._id.shippingAddress.phoneNumber}
              </h3>
              <h3>
                <span className="font-semibold">Email:</span>{" "}
                {order.order._id.shippingAddress.email}
              </h3>
              <h3>
                <span className="font-semibold">Address:</span>{" "}
                {order.order._id.shippingAddress.streetAddress}
              </h3>
              <h3>
                {order.order._id.shippingAddress.city},{" "}
                {order.order._id.shippingAddress.state} -{" "}
                {order.order._id.shippingAddress.pincode}
              </h3>
              <h3>{order.order._id.shippingAddress.country}</h3>
            </div>

            <div className="flex flex-col items-start text-sm gap-1 text-[#444444]">
              <h3 className="font-semibold text-[#000000] text-base mb-1">
                Billing Address
              </h3>
              <h3>
                <span className="font-semibold">Name:</span>{" "}
                {order.order._id.billingAddress.fullName}
              </h3>
              <h3>
                <span className="font-semibold">Contact:</span> +
                {order.order._id.billingAddress.phoneNumber}
              </h3>
              <h3>
                <span className="font-semibold">Email:</span>{" "}
                {order.order._id.billingAddress.email}
              </h3>
              <h3>
                <span className="font-semibold">Address:</span>{" "}
                {order.order._id.billingAddress.streetAddress}
              </h3>
              <h3>
                {order.order._id.billingAddress.city},{" "}
                {order.order._id.billingAddress.state} -{" "}
                {order.order._id.billingAddress.pincode}
              </h3>
              <h3>{order.order._id.shippingAddress.country}</h3>
            </div>
          </div>

          <div className="flex flex-col items-start text-sm gap-1 text-[#444444] py-7">
            <h3 className="font-semibold text-[#000000] text-base mb-1">
              Payment Method
            </h3>
            <h3>Cash on Delivery</h3>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <h2
            className={`text-white py-2 px-7 block text-center rounded-full ${
              order.deliveryStatus === "Delivered"
                ? "bg-[#00c853]"
                : order.deliveryStatus === "Shipped"
                ? "bg-[#2196f3]"
                : "bg-[#ff9800]"
            }`}
          >
            {order.deliveryStatus}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Order;
