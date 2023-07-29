import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaCheckCircle } from "react-icons/fa";
import { RiShareBoxLine } from "react-icons/ri";
import WishlistError from "../../assets/images/wishlistError.png";
import WishlistErrorWebp from "../../assets/images/wishlistError.webp";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { isWebpSupported } from "react-image-webp/dist/utils";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

function ProfileOrders() {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);

      await axios
        .get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/orders/user-orders/${
            user._id
          }`
        )
        .then((response) => {
          setLoading(false);
          setOrders([...response.data.orders].reverse());
        })
        .catch((error) => {
          setLoading(false);
          toast.error("Something went wrong!");
        });
    }

    // console.log(orders);

    fetchOrders();
  }, []);

  function downloadInvoice(event, invoice) {
    event.preventDefault();
    saveAs(invoice.invoiceUrl, `Invoice_${invoice.invoiceNo}`);
  }

  function goToBrowse(event) {
    event.preventDefault();
    navigate("/browse");
  }

  async function viewListing(event, artworkId) {
    event.preventDefault();

    // Get artwork by id
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_URL}/artworks/${artworkId}`
    );

    navigate("/view-artwork", {
      state: { artwork: response.data, canReview: true },
    });
  }

  function getDeliveryStatusAndShipmentInvoice(orderId, productId) {
    for (const order of orders) {
      if (order._id.toString() === orderId) {
        for (const sellerOrder of order.sellerOrders) {
          const { products } = sellerOrder;

          for (const product of products) {
            if (product.product.toString() === productId) {
              var deliveryStatus = sellerOrder.deliveryStatus;
              if (sellerOrder.deliveryStatus === "Shipped Approval")
                deliveryStatus = "Shipment Created";
              else if (sellerOrder.deliveryStatus === "Delivered Approval")
                deliveryStatus = "Shipped";
              return {
                deliveryStatus: deliveryStatus,
                shipmentInvoice: sellerOrder.shipmentInvoice,
              };
            }
          }
        }
      }
    }

    // If the order or product is not found, return null or handle the error accordingly
    return null;
  }

  return (
    <div>
      <div className="px-5 mb-5">
        <h1 className="text-3xl font-poppins font-semibold text-center md:text-left">
          Order History
        </h1>
        <p className="text-base font-open-sans text-center md:text-left text-[#555555]">
          Check the status of recent and old orders & discover more products
        </p>
      </div>

      {loading ? (
        <div className="h-[80vh] flex justify-center items-center">
          <LoadingAnimation />
        </div>
      ) : orders.length === 0 ? (
        <div className="h-[70vh] flex items-center justify-center mt-10">
          <div className="flex flex-col items-center font-poppins max-w-xl">
            <img
              src={isWebpSupported() ? WishlistErrorWebp : WishlistError}
              alt="Wishlist Error"
              className="h-[40vh] w-auto"
            />
            <h2 className="font-bold text-3xl text-[#555555] text-center mt-2">
              No orders!
            </h2>
            <p className="text-base text-[#666666] text-center mt-2">
              Your order history is as fresh as a blank canvas. Start painting
              it with beautiful memories by placing your first order today.
            </p>
            <div onClick={goToBrowse} className="mt-3">
              <Button type="contained" color="primary" size="large">
                Browse
              </Button>
            </div>
          </div>
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="mt-10 bg-white p-5 rounded-xl shadow-xl"
          >
            {/* Order Details */}
            <div className="flex flex-col sm:flex-row md:flex-col pc-small:flex-row item-center sm:justify-between md:justify-normal pc-small:justify-between gap-2 bg-gray-100 p-5 text-xs mobile:text-sm">
              <div className="flex items-center justify-between sm:flex-col md:flex-row pc-small:flex-col sm:items-start sm:justify-center md:justify-between pc-small:justify-center font-poppins gap-2">
                <h3 className="font-semibold">Order Date</h3>
                <h3 className="text-[#555555] text-right">
                  {order.orderedOn.date}
                </h3>
              </div>

              <div className="flex items-center justify-between sm:flex-col md:flex-row pc-small:flex-col sm:items-start sm:justify-center md:justify-between pc-small:justify-center font-poppins gap-2">
                <h3 className="font-semibold">Order Number</h3>
                <h3 className="text-[#555555] text-right">{order.orderNo}</h3>
              </div>
              <div className="flex items-center justify-between sm:flex-col md:flex-row pc-small:flex-col sm:items-start sm:justify-center md:justify-between pc-small:justify-center font-poppins gap-2">
                <h3 className="font-semibold">Total Amount</h3>
                <h3 className="text-[#555555] text-right">
                  ₹ {order.total.toFixed(2)}
                </h3>
              </div>
              <div className="flex items-center justify-center">
                <button
                  onClick={(e) => downloadInvoice(e, order.invoice)}
                  className="bg-white w-full sm:w-auto px-5 lg:px-10 py-2 rounded-md border border-gray-500 font-semibold hover:bg-gray-50"
                >
                  Invoice
                </button>
              </div>
            </div>

            {/* Order */}
            <div key={order._id} className="mt-10 font-poppins">
              <div className="hidden sm:grid grid-cols-6 text-[#555555] border-b">
                <h2 className="col-span-3">Product</h2>
                <h2 className="">Price</h2>
                <h2 className="">Status</h2>
                <h2 className="text-right">Info</h2>
              </div>

              {order.products.map((product) => (
                <div
                  key={product.productID}
                  className="grid grid-cols-3 sm:grid-cols-6 border-b items-center"
                >
                  <div className="col-span-1 sm:col-span-3 sm:grid sm:grid-cols-3 py-5 items-center">
                    {isWebpSupported() ? (
                      <img
                        src={product.imageWebp}
                        alt={product.title}
                        className=""
                      />
                    ) : (
                      <img
                        src={product.image}
                        alt={product.title}
                        className=""
                      />
                    )}
                    <div className="hidden sm:block sm:col-span-2 px-5">
                      <h3 className="font-semibold text-lg">{product.title}</h3>
                      <h5 className="text-[#555555] text-sm">
                        Qty: {product.quantity}
                      </h5>
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-3 sm:grid sm:grid-cols-3 items-center px-5 sm:px-0">
                    <div className="sm:hidden">
                      <h3 className="font-playfair-display font-semibold mobile-sm:text-xl mobile:text-3xl sm:text-2xl">
                        {product.title}
                      </h3>
                      <h5 className="text-[#555555] text-xs mobile-sm:text-sm">
                        Qty: {product.quantity}
                      </h5>
                    </div>
                    <h3 className="text-[#555555] mt-3 sm:mt-0 text-xs mobile-sm:text-base">
                      ₹ {product.price.toFixed(2)}
                    </h3>
                    <h3
                      className={`${
                        getDeliveryStatusAndShipmentInvoice(
                          order._id,
                          product.productID
                        ).deliveryStatus === "Cancelled"
                          ? "text-red-500"
                          : getDeliveryStatusAndShipmentInvoice(
                              order._id,
                              product.productID
                            ).deliveryStatus === "Shipment Created"
                          ? "text-yellow-500 underline"
                          : getDeliveryStatusAndShipmentInvoice(
                              order._id,
                              product.productID
                            ).deliveryStatus === "Shipped"
                          ? "text-primary underline"
                          : getDeliveryStatusAndShipmentInvoice(
                              order._id,
                              product.productID
                            ).deliveryStatus === "Delivered"
                          ? "text-green-500"
                          : "text-blue-500"
                      } flex gap-1 items-center font-semibold text-xs mobile-sm:text-base`}
                    >
                      {getDeliveryStatusAndShipmentInvoice(
                        order._id,
                        product.productID
                      ).deliveryStatus === "Delivered" ? (
                        <>
                          <FaCheckCircle />
                          {
                            getDeliveryStatusAndShipmentInvoice(
                              order._id,
                              product.productID
                            ).deliveryStatus
                          }
                        </>
                      ) : getDeliveryStatusAndShipmentInvoice(
                          order._id,
                          product.productID
                        ).deliveryStatus === "Shipped" ||
                        getDeliveryStatusAndShipmentInvoice(
                          order._id,
                          product.productID
                        ).deliveryStatus === "Shipment Created" ? (
                        <a
                          target="_blank"
                          href={
                            getDeliveryStatusAndShipmentInvoice(
                              order._id,
                              product.productID
                            ).shipmentInvoice
                          }
                          className="cursor-pointer flex items-center"
                        >
                          {
                            getDeliveryStatusAndShipmentInvoice(
                              order._id,
                              product.productID
                            ).deliveryStatus
                          }
                          <RiShareBoxLine />
                        </a>
                      ) : getDeliveryStatusAndShipmentInvoice(
                          order._id,
                          product.productID
                        ).deliveryStatus === "Cancelled" ? (
                        "Cancelled"
                      ) : (
                        "Processing"
                      )}
                    </h3>
                    <h3 className="font-semibold text-xs mobile-sm:text-base sm:text-lg text-primary sm:text-right mt-3 sm:mt-0">
                      <span
                        onClick={(e) => viewListing(e, product.productID)}
                        className="cursor-pointer"
                      >
                        View
                      </span>
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ProfileOrders;
