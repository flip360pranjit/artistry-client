import React, { useState } from "react";
import { IconContext } from "react-icons";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import CheckoutNav from "../components/Checkout/CheckoutNav";
import CheckoutSummary from "../components/Checkout/CheckoutSummary";
import { useDispatch, useSelector } from "react-redux";
import { checkoutNextPage, resetCheckout } from "../store/slices/CheckoutSlice";
import axios from "axios";
import { setOrder } from "../store/slices/OrderSlice";
import LoadingAnimation from "../components/LoadingAnimation/LoadingAnimation";
import { toast } from "react-toastify";
import generateInvoicePdf, {
  generateInvoiceNumber,
} from "../utils/generateInvoice";
import { clearCart } from "../store/thunks/CartThunks";

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const order = useSelector((state) => state.checkout);
  const { review, shipping, payment, confirmation } = useSelector(
    (state) => state.checkout
  );
  const { items, totalQuantity, discount } = useSelector(
    (state) => state.checkout.order
  );
  const totalAmount = useSelector((state) => state.checkout.order.subtotal);

  //   states
  const [currentPage, setCurrentPage] = useState("Review Order");
  const [loading, setLoading] = useState(false);
  const [invoiceUrl, setInvoiceUrl] = useState("");

  const deliveryCharges = totalQuantity * 100;
  const taxCharges = 0;
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
    } else if (currentPage === "Shipping & Billing" && shipping) {
      setCurrentPage("Payment");
      navigate("/checkout/payment", {
        state: {
          items,
          totalAmount,
          totalQuantity,
        },
      });
    }
    scrollTo(0, 0);
  }

  async function handlePlaceOrder(event) {
    event.preventDefault();
    setLoading(true);
    const num = generateInvoiceNumber();

    try {
      await generateInvoicePdf(order, user, num).then(async (url) => {
        const currentDate = new Date();

        const dateFormatOptions = {
          day: "numeric",
          month: "long",
          year: "numeric",
        };
        const timeFormatOptions = {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        };
        const formattedDate = currentDate.toLocaleDateString(
          "en-US",
          dateFormatOptions
        );
        const formattedTime = currentDate.toLocaleTimeString(
          "en-US",
          timeFormatOptions
        );

        const formattedOrder = {
          orderNo: "ORD-" + num,
          customer: { customerId: user._id, displayName: user.displayName },
          shippingAddress: order.shippingInfo.shipping,
          billingAddress: order.shippingInfo.billing,
          products: order.order.items.map((item) => ({
            productID: item.product._id,
            title: item.product.title,
            image: item.product.image,
            imageWebp: item.product.imageWebp,
            medium: item.product.medium,
            category: item.product.category,
            size: item.product.size,
            price: item.product.price,
            quantity: item.quantity,
            seller: item.product.artist.artistId,
          })),
          subtotal: order.order.subtotal,
          delivery: { charges: order.order.delivery },
          tax: { charges: order.order.tax },
          total: order.order.totalAmount,
          discount: {
            amount: order.order.discount.amount,
            coupon: order.order.discount.coupon,
          },
          orderedOn: { date: formattedDate, time: formattedTime },
          invoice: {
            invoiceNo: "INV-" + num,
            invoiceUrl: url,
          },
        };

        try {
          await axios
            .post(
              `${import.meta.env.VITE_REACT_APP_API_URL}/orders`,
              formattedOrder
            )
            .then(async (response) => {
              await axios
                .post(
                  `${
                    import.meta.env.VITE_REACT_APP_API_URL
                  }/email/confirm-order`,
                  response.data.order
                )
                .then((res) => {
                  dispatch(setOrder(response.data.order));
                  dispatch(clearCart({ user: user._id }));
                  dispatch(resetCheckout());
                  toast.success("Order Placed!");
                })
                .catch((error) => {
                  toast.error("Error sending confirmation mail!");
                });
            });
          setLoading(false);

          navigate("/checkout/confirmation");
        } catch (error) {
          setLoading(false);
          toast.error(error.response.data.error);
        }
      });
    } catch (error) {
      toast.error("Error generating invoice!");
    }
  }

  return (
    <div className="font-poppins my-10 px-4 sm:px-6 lg:px-8 mx-4 md:mx-20">
      {loading ? (
        <div className="h-screen flex items-center justify-center">
          <div className="flex flex-col items-center font-poppins">
            <LoadingAnimation />
            <h2 className="mt-7 text-xl font-semibold">Please Wait...</h2>
            <p className="mt-2 text-[#555555]">Do not close the window!</p>
            <p className="mt-3 text-[#555555]">
              Your order is being placed! It may take a while.
            </p>
          </div>
        </div>
      ) : (
        <>
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
              onClick={
                currentPage === "Payment" ? handlePlaceOrder : handlePage
              }
              disabled={
                (currentPage === "Payment" && !payment) ||
                (currentPage === "Shipping & Billing" && !shipping)
              }
              className={`hidden sm:flex lg:hidden w-28 gap-2 items-center justify-center font-poppins text-white outline outline-1 py-2 mt-7 rounded-sm ${
                (currentPage === "Payment" && !payment) ||
                (currentPage === "Shipping & Billing" && !shipping)
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-primary-hover"
              }`}
            >
              {currentPage === "Payment" ? "Place Order" : "Next"}
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
                handlePlaceOrder={handlePlaceOrder}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Checkout;
