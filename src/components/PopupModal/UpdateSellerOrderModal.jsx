import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

function UpdateSellerOrderModal({ onClose, order, fetchOrders }) {
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      setFile(file);
    } else {
      setFile(null);
      toast.error("Please select a file up to 10MB in size.");
    }
  };

  const handleClear = (event) => {
    event.preventDefault();

    setDeliveryStatus("");
    setFile(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (deliveryStatus === "Shipment Invoice Submitted") {
      // Generate a unique filename for the PDF
      const filename = `${order.order.orderNo}.pdf`;

      // Upload the PDF to Cloudinary
      const formData = new FormData();
      formData.append("file", file, filename);
      formData.append("upload_preset", "shipment-invoices");

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_REACT_APP_CLOUDINARY_CLOUD_NAME
        }/raw/upload`,
        formData
      );

      axios
        .put(
          `${import.meta.env.VITE_REACT_APP_API_URL}/orders/update-delivery`,
          {
            sellerOrderId: order._id,
            deliveryStatus,
            shipmentInvoice: response.data.secure_url,
          }
        )
        .then((res) => {
          setLoading(false);

          toast.success("Update sent for review!");
          onClose();
          fetchOrders();
        })
        .catch((err) => {
          setLoading(false);

          toast.error("Something went wrong!");
          onClose();
          fetchOrders();
        });
    }

    axios
      .put(`${import.meta.env.VITE_REACT_APP_API_URL}/orders/update-delivery`, {
        sellerOrderId: order._id,
        deliveryStatus,
        shipmentInvoice: null,
      })
      .then((res) => {
        setLoading(false);

        toast.success("Update sent for review!");
        onClose();
      })
      .catch((err) => {
        setLoading(false);

        toast.error("Something went wrong!");
        onClose();
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="font-poppins bg-white rounded-lg p-6 pr-10 min-w-[50vw] z-50 relative">
        {loading ? (
          <>
            <LoadingAnimation />
            <h2 className="text-center">Please Wait...</h2>
          </>
        ) : (
          <>
            <div
              onClick={onClose}
              className="absolute top-3 right-3 text-xl cursor-pointer"
            >
              <FaTimes />
            </div>
            <h2 className="text-2xl font-bold mb-4">
              Update Order Delivery Status
            </h2>

            <div className="py-5 border-y">
              <div className="w-full sm:w-1/2">
                <label
                  htmlFor="status"
                  className="block text-lg font-medium leading-6 text-gray-900"
                >
                  Delivery Status
                </label>
                <div className="mt-2">
                  <select
                    id="status"
                    name="status"
                    value={deliveryStatus}
                    onChange={(e) => setDeliveryStatus(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="">Select</option>
                    <option value="Shipment Invoice Submitted">
                      Submit Shipment Invoice
                    </option>
                    <option value="Shipped Approval">Shipped</option>
                    <option value="Delivered Approval">Delivered</option>
                  </select>
                </div>
              </div>

              {deliveryStatus === "Shipment Invoice Submitted" && (
                <div className="w-full sm:w-1/2 mt-5">
                  <label
                    htmlFor="status"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Shipment Invoice
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      type="file"
                      name="title"
                      id="title"
                      onChange={handleFileChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
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
          </>
        )}
      </div>
      <div className="fixed inset-0 bg-black opacity-50"></div>
    </div>
  );
}

export default UpdateSellerOrderModal;
