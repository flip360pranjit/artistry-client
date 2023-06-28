import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { toast } from "react-toastify";
import WishlistError from "../../assets/images/wishlistError.png";
import {
  clearCart,
  getCart,
  removeFromCart,
  setQuantity,
} from "../../store/thunks/CartThunks";
import QuantityInput from "./QuantityInput";
import QuantityMenu from "./QuantityMenu";
import Button from "../Button/Button";
import CouponCode from "./CouponCode";
import { resetCheckout, setOrderItems } from "../../store/slices/CheckoutSlice";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { loading, items, totalQuantity, totalAmount, discount } = useSelector(
    (state) => state.cart
  );
  const [cLoading, setCLoading] = useState(false);
  const [currentArtwork, setCurrentArtwork] = useState("");
  const [openInput, setOpenInput] = useState(false);
  const [focusedInput, setFocusedInput] = useState(false);
  const [customQuantity, setCustomQuantity] = useState(11);

  const deliveryCharges = totalQuantity * 100;
  const taxCharges = 0.18 * (totalAmount - discount.amount + deliveryCharges);
  const cartTotal =
    totalAmount - discount.amount + deliveryCharges + taxCharges;

  useEffect(() => {
    dispatch(getCart({ user: user._id }));
    dispatch(resetCheckout());
  }, [dispatch]);

  // handle order quantity
  function handleSetQuantity(event, artworkId, quantity) {
    event.preventDefault();
    setCurrentArtwork(artworkId);

    if (quantity === "10+") {
      setOpenInput(true);
    } else {
      if (quantity < 1) {
        toast.error("Quantity should be 1 atleast!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        dispatch(
          setQuantity({ user: user._id, productId: artworkId, quantity: 1 })
        )
          .unwrap()
          .then(() => {
            setFocusedInput(false);
            if (quantity < 10) {
              setOpenInput(false);
            } else {
              setOpenInput(true);
            }
          });
      } else {
        dispatch(
          setQuantity({ user: user._id, productId: artworkId, quantity })
        )
          .unwrap()
          .then(() => {
            toast.info("Quantity changed!", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setFocusedInput(false);
            if (quantity < 10) {
              setOpenInput(false);
            } else {
              setOpenInput(true);
            }
          });
      }
    }
  }

  // View the artwork
  function viewArtwork(event, artwork) {
    event.preventDefault();

    navigate("/view-artwork", { state: { artwork: artwork } });
  }
  //   Remove Artwork from Cart
  function handleRemove(event, artworkId) {
    event.preventDefault();
    setCurrentArtwork(artworkId);

    dispatch(removeFromCart({ user: user._id, productId: artworkId }))
      .unwrap()
      .then(() => {
        scrollTo(0, 0);
      });
  }

  // Go to checkout
  function handleCheckout(event) {
    event.preventDefault();

    dispatch(setOrderItems({ items, totalAmount, totalQuantity, discount }));

    navigate("/checkout/review");
  }
  //   Continue Shopping
  function handleBrowse(event) {
    event.preventDefault();
    navigate("/browse");
  }
  //   Clear Cart
  function handleClearCart(event) {
    event.preventDefault();
    setCLoading(true);
    dispatch(clearCart({ user: user._id }))
      .unwrap()
      .then(() => {
        setCLoading(false);
        toast.info("Cart cleared!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        scrollTo(0, 0);
      });
  }

  return (
    <div className="font-poppins pt-20 pb-16 px-4 sm:px-6 lg:px-8 mx-4 md:mx-20">
      <h1 className="font-semibold text-4xl text-center pb-5 sm:pb-0 border-b-2 sm:border-none">
        Shopping Cart
      </h1>
      {items.length === 0 ? (
        <div className="h-full flex items-center justify-center mt-10">
          <div className="flex flex-col items-center font-poppins max-w-xl">
            <img
              src={WishlistError}
              alt="Wishlist Error"
              className="h-[40vh] w-auto"
            />
            <h2 className="font-bold text-3xl text-[#555555] text-center mt-2">
              It's empty!
            </h2>
            <p className="text-base text-[#666666] text-center mt-2">
              Time to go on a shopping spree and fill it up with amazing
              goodies!
            </p>
            <div onClick={handleBrowse} className="mt-3">
              <Button type="contained" color="primary" size="large">
                Browse
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="hidden sm:grid grid-cols-4 border-b-2 mt-5">
            <h1 className="py-2 pl-5 col-span-2 text-xl text-[#555555] text-center sm:text-left">
              Artwork
            </h1>
            <h1 className="py-2 text-xl text-[#555555] text-center">
              Quantity
            </h1>
            <h1 className="py-2 text-xl text-[#555555] text-center">Total</h1>
          </div>
          {items.map((item) => (
            <div
              key={item.product._id}
              className={`grid grid-cols-2 sm:grid-cols-4 p-5 sm:py-5 sm:pl-5 sm:pr-0 border-2 border-t-0 items-center ${
                loading &&
                currentArtwork === item.product._id &&
                "opacity-50 pointer-events-none"
              }`}
            >
              <div className="col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    onClick={(e) => viewArtwork(e, item.artwork)}
                    className="cursor-pointer"
                  />
                </div>
                <div className="sm:col-span-2">
                  <h3 className="font-playfair-display font-bold text-2xl">
                    {item.product.title}
                  </h3>
                  <h4 className="font-semibold mt-3">
                    <span className="text-[#555555] font-normal mr-2">
                      Medium:
                    </span>
                    {item.product.medium}
                  </h4>
                  <h4 className="font-semibold mt-1">
                    <span className="text-[#555555] font-normal mr-2">
                      Category:
                    </span>
                    {item.product.category}
                  </h4>
                  <h4 className="flex items-center mt-1">
                    <span className="text-[#555555] mr-2">Price:</span>
                    <MdOutlineCurrencyRupee />{" "}
                    <span className="font-semibold">
                      {Math.floor(item.product.price)}
                      <span className="text-xs align-super text-[#444444]">
                        {item.product.price.toFixed(2).split(".")[1]}
                      </span>
                    </span>
                  </h4>
                  <button
                    disabled={loading}
                    onClick={(e) => handleRemove(e, item.product._id)}
                    className="mt-7 text-red-600 font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center col-span-2 mobile-sm:col-span-1">
                <div className="flex justify-center items-center h-7 mt-4 bg-white">
                  {currentArtwork === item.product._id ? (
                    openInput ? (
                      <div className="flex gap-1 items-center justify-center">
                        <QuantityInput
                          quantity={item.quantity}
                          productId={item.product._id}
                          customQuantity={customQuantity}
                          focusedInput={focusedInput}
                          setCustomQuantity={setCustomQuantity}
                          setFocusedInput={setFocusedInput}
                          handleSetQuantity={handleSetQuantity}
                        />
                      </div>
                    ) : (
                      <QuantityMenu
                        quantity={item.quantity}
                        productId={item.product._id}
                        handleSetQuantity={handleSetQuantity}
                      />
                    )
                  ) : item.quantity < 10 ? (
                    <QuantityMenu
                      quantity={item.quantity}
                      productId={item.product._id}
                      handleSetQuantity={handleSetQuantity}
                    />
                  ) : (
                    <QuantityInput
                      quantity={item.quantity}
                      productId={item.product._id}
                      customQuantity={customQuantity}
                      focusedInput={focusedInput}
                      setCustomQuantity={setCustomQuantity}
                      setFocusedInput={setFocusedInput}
                      handleSetQuantity={handleSetQuantity}
                    />
                  )}
                </div>
              </div>
              <div className="flex items-center justify-center text-2xl mt-4 sm:mt-0">
                <MdOutlineCurrencyRupee />{" "}
                <span className="font-semibold">
                  {Math.floor(item.product.price * item.quantity)}
                  <span className="text-sm align-super text-[#444444]">
                    {
                      (item.product.price * item.quantity)
                        .toFixed(2)
                        .split(".")[1]
                    }
                  </span>
                </span>
              </div>
            </div>
          ))}
          <div className="grid grid-cols-1 lg:grid-cols-3 bg-gray-100 p-5 mt-7">
            <div className="my-10 lg:my-0 lg:col-span-2 flex flex-col items-center justify-center gap-3 order-last lg:order-first">
              <CouponCode page="cart" />
            </div>
            <div className="flex items-center">
              <div className="w-full p-5 bg-white rounded-lg shadow-xl">
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
                  onClick={handleCheckout}
                  className="flex w-full gap-2 items-center justify-center font-poppins text-white outline outline-1 py-2 mt-7 rounded-sm bg-primary hover:bg-primary-hover"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={handleBrowse}
                  className="flex w-full gap-2 items-center justify-center font-poppins text-[#333333] outline outline-1 py-2 mt-3 rounded-sm bg-white hover:bg-gray-100"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={handleClearCart}
                  disabled={cLoading}
                  className="flex w-full gap-2 items-center justify-center font-poppins text-white outline outline-1 py-2 mt-3 rounded-sm bg-red-600 hover:bg-red-700"
                >
                  {cLoading ? "Loading" : "Clear Cart"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
