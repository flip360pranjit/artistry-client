import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { saveAs } from "file-saver";
import { FiCheck } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { isWebpSupported } from "react-image-webp/dist/utils";

function CommissionedOrder() {
  const location = useLocation();
  const order = location.state.order;
  const [loading, setLoading] = useState(false);

  const handleImageDownload = (event) => {
    event.preventDefault();
    setLoading(true);

    saveAs(order.referenceImage, `ReferenceImage_${order.fullName}`);
    setLoading(false);
  };

  return (
    <div className="font-poppins">
      <h1 className="text-2xl text-center md:text-left mt-5 ml-5">
        <span className="font-bold">Commissioned Order</span> from{" "}
        {order.fullName}
      </h1>
      <div className="bg-white p-10 m-5 mt-10">
        <div className="">
          <h2 className="font-semibold text-xl text-[#333333] border-b-2">
            Client Details
          </h2>
          <h3 className="text-lg text-[#555555] mt-2">
            <span className="font-semibold">Full Name:</span> {order.fullName}
          </h3>
          <h3 className="text-lg text-[#555555] mt-1">
            <span className="font-semibold">Phone Number:</span>{" "}
            {order.phoneNumber}
          </h3>
          <h3 className="text-lg text-[#555555] mt-1">
            <span className="font-semibold">Email:</span> {order.email}
          </h3>
        </div>

        <div className="mt-10">
          <h2 className="font-semibold text-xl text-[#333333] border-b-2">
            Contact Details
          </h2>
          <h3 className="text-lg text-[#555555] mt-2">
            <span className="font-semibold">Preferred Contact Method:</span>{" "}
            {order.contactMethod}
          </h3>
          {order.whatsappNumber !== "" && (
            <h3 className="text-lg text-[#555555] mt-1">
              <span className="font-semibold">Whatsapp Number:</span>{" "}
              {order.whatsappNumber}
            </h3>
          )}
        </div>

        <div className="mt-10">
          <h2 className="font-semibold text-xl text-[#333333] border-b-2">
            Artwork Details
          </h2>
          <h3 className="text-lg text-[#555555] mt-2">
            <span className="font-semibold">Desired Completion Date:</span>{" "}
            {order.desiredCompletionDate}
          </h3>
          <h3 className="text-lg text-[#555555] mt-1">
            <span className="font-semibold">Approximate Size:</span>{" "}
            {order.artworkSize}
          </h3>
          <h3 className="text-lg text-[#555555] mt-1">
            <span className="font-semibold">Request Description:</span>{" "}
            {order.description}
          </h3>
          <h3 className="font-semibold text-lg text-[#555555] mt-1">
            Reference Image:
          </h3>
          <img
            src={
              isWebpSupported()
                ? order.referenceImageWebp
                : order.referenceImage
            }
            alt=""
            className="w-full sm:w-1/3"
          />
          <button
            disabled={loading}
            onClick={handleImageDownload}
            className="px-3 py-1 bg-primary hover:bg-primary-hover text-white mt-2 rounded-sm"
          >
            {loading ? "Loading..." : "Download"}
          </button>
        </div>

        <div className="mt-10">
          <h2 className="font-semibold text-xl text-[#333333] border-b-2">
            Created on:
          </h2>
          <h3 className="text-lg text-[#555555] mt-2">
            <span className="font-semibold">Date:</span> {order.dateTime.date}
          </h3>
          <h3 className="text-lg text-[#555555] mt-1">
            <span className="font-semibold">Time:</span> {order.dateTime.time}
          </h3>
        </div>
        <div className="flex items-center justify-center gap-3">
          {order.status === "Accepted" ? (
            <span className="bg-blue-500 text-white py-1 px-4 rounded-2xl">
              Accepted
            </span>
          ) : order.status === "rejected" ? (
            <span className="bg-red-500 text-white py-1 px-4 rounded-2xl">
              Rejected
            </span>
          ) : (
            <span className="bg-yellow-500 py-1 px-4 rounded-2xl">
              Not Reviewed
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommissionedOrder;
