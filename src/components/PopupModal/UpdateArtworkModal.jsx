import axios from "axios";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

function UpdateArtworkModal({ onClose, artworkToEdit, fetchSellerListings }) {
  const [loading, setLoading] = useState(false);
  const [artworkStatus, setArtworkStatus] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleStatusChange(event) {
    setArtworkStatus(event.target.value);

    if (event.target.value !== "active") setQuantity(1);
  }
  function handleQuantityChange(event) {
    if (event.target.value < 1) setQuantity(1);
    else setQuantity(event.target.value);
  }

  function handleClear(event) {
    event.preventDefault();

    setArtworkStatus("");
    setQuantity(1);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const currentDate = new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    if (artworkStatus === "active") {
      axios
        .put(
          `${import.meta.env.VITE_REACT_APP_API_URL}/artworks/${
            artworkToEdit._id
          }`,
          { status: artworkStatus, quantity, updatedAt: currentDate }
        )
        .then((res) => {
          setLoading(false);

          toast.success("Artwork status updated!");
          onClose();
          fetchSellerListings();
        })
        .catch((err) => {
          setLoading(false);

          toast.error("Something went wrong!");
          onClose();
        });
    } else {
      axios
        .put(
          `${import.meta.env.VITE_REACT_APP_API_URL}/artworks/${
            artworkToEdit._id
          }`,
          { status: artworkStatus, updatedAt: currentDate }
        )
        .then((res) => {
          setLoading(false);

          toast.success("Artwork status updated!");
          onClose();
          fetchSellerListings();
        })
        .catch((err) => {
          setLoading(false);

          toast.error("Something went wrong!");
          onClose();
        });
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 pr-10 min-w-[50vw] z-[100] relative">
        <div
          onClick={onClose}
          className="absolute top-3 right-3 text-xl cursor-pointer"
        >
          <FaTimes />
        </div>
        {loading ? (
          <div className="flex flex-col items-center">
            <LoadingAnimation />
            <h3 className="mt-2">Please Wait...</h3>
          </div>
        ) : (
          <div className="">
            <h1 className="text-3xl font-bold font-poppins py-2 border-b">
              Update Artwork Status
            </h1>

            <h3 className="pt-3 font-poppins text-[#555555] text-lg">
              Current Quantity:{" "}
              <span className="text-red-600 font-semibold">
                {artworkToEdit.quantity}
              </span>
            </h3>

            <div className="mt-5 border-b pb-7">
              <div className="w-full">
                <label
                  htmlFor="status"
                  className="block text-lg font-medium leading-6 text-gray-900"
                >
                  Status
                </label>
                <div className="mt-2">
                  <select
                    id="status"
                    name="status"
                    value={artworkStatus}
                    onChange={handleStatusChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="">Select</option>
                    <option value="active">Update Quantity</option>
                    <option value="active">Back In Stock</option>
                    <option value="sold">Mark as Sold</option>
                    <option value="out of stock">Mark as Out of Stock</option>
                  </select>
                </div>
              </div>

              {artworkStatus === "active" && (
                <div className="mt-5">
                  <div className="w-full">
                    <label
                      htmlFor="quantity"
                      className="block text-lg font-medium leading-6 text-gray-900"
                    >
                      Quantity
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      id="quantity"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="mt-2 block w-28 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:max-w-xs sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                onClick={handleClear}
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Clear
              </button>
              <button
                onClick={handleSubmit}
                className="rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm bg-primary hover:bg-primary-hover"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="fixed inset-0 bg-black opacity-50 z-50"></div>
    </div>
  );
}
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";

export default UpdateArtworkModal;
