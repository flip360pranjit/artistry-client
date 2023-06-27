import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsCartPlus } from "react-icons/bs";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import WishlistError from "../../assets/images/wishlistError.png";
import Button from "../Button/Button";
import { toast } from "react-toastify";
import {
  getWishlist,
  removeFromWishlist,
} from "../../store/thunks/WishlistThunks";
import { clearWishlist } from "../../store/slices/WishlistSlice";
import { addToCart } from "../../store/thunks/CartThunks";

function Wishlist() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.wishlist);
  const wLoading = useSelector((state) => state.wishlist.loading);
  const cLoading = useSelector((state) => state.cart.loading);
  const [currentArtwork, setCurrentArtwork] = useState("");

  useEffect(() => {
    dispatch(getWishlist({ user: user._id }));
  }, [dispatch]);

  // View the artwork
  function viewArtwork(event, artwork) {
    event.preventDefault();

    navigate("/view-artwork", { state: { artwork: artwork } });
  }
  function goToBrowse(event) {
    event.preventDefault();
    navigate("/browse");
  }

  function handleAddToCart(event, artworkId) {
    event.preventDefault();
    setCurrentArtwork(artworkId);

    dispatch(addToCart({ user: user._id, productId: artworkId, quantity: 1 }))
      .unwrap()
      .then(() => {
        dispatch(removeFromWishlist({ user: user._id, productId: artworkId }));

        navigate("/cart");
      });
  }
  function handleRemove(event, artworkId) {
    event.preventDefault();
    setCurrentArtwork(artworkId);

    dispatch(removeFromWishlist({ user: user._id, productId: artworkId }))
      .unwrap()
      .then(() => {
        toast.info("Artwork removed!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  }

  return (
    <div className="font-poppins pt-20 pb-16 px-4 sm:px-6 lg:px-8 mx-4 md:mx-20 min-h-screen">
      <h1 className="font-semibold text-3xl text-center">Wishlist</h1>
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
              Time to start filling it up with amazing treasures! Explore our
              collection and add your favorite items to the wishlist.
            </p>
            <div onClick={goToBrowse} className="mt-3">
              <Button type="contained" color="primary" size="large">
                Browse
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-5">
          <div className="grid grid-cols-2 sm:grid-cols-5 text-xl mobile-sm:text-2xl font-semibold">
            <div className="flex items-center justify-center border py-3">
              <h3 className="">Artwork</h3>
            </div>
            <div className="sm:col-span-4 grid grid-cols-1 sm:grid-cols-4 border sm:border-none">
              <div className="flex sm:hidden items-center justify-center border py-3">
                <h3 className="">Details</h3>
              </div>
              <div className="hidden sm:flex items-center justify-center border py-3">
                <h3 className="">Title</h3>
              </div>
              <div className="hidden sm:flex items-center justify-center border py-3">
                <h3 className="">Price</h3>
              </div>
              <div className="sm:col-span-2 hidden sm:flex items-center justify-center border py-3">
                <h3 className="">Actions</h3>
              </div>
            </div>
          </div>
          {items.map((item) => (
            <div key={item._id} className="grid grid-cols-2 sm:grid-cols-5">
              <div
                onClick={(e) => viewArtwork(e, item.product)}
                className="cursor-pointer border p-3"
              >
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className=""
                />
              </div>
              <div className="py-2 sm:py-0 sm:col-span-4 grid grid-cols-1 sm:grid-cols-4 border sm:border-none">
                <div className="flex items-center justify-center sm:border">
                  <h1 className="font-playfair-display text-sm text-center mobile-sm:text-xl font-semibold text-[#555555]">
                    {item.product.title}
                  </h1>
                </div>
                <div className="flex items-center justify-center sm:border">
                  <h2 className="flex gap-1 items-center text-sm mobile-sm:text-xl lg:text-2xl">
                    <MdOutlineCurrencyRupee />{" "}
                    <span className="font-semibold">
                      {Math.floor(item.product.price.toFixed(2).split(".")[0])}
                      <span className="text-xs mobile-sm:text-sm lg:text-base align-super text-[#444444]">
                        {item.product.price.toFixed(2).split(".")[1]}
                      </span>
                    </span>
                  </h2>
                </div>
                <div className="sm:col-span-2 flex items-center justify-center sm:border">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 mobile-sm:gap-5 mx-2 sm:mx-5">
                    <button
                      disabled={cLoading}
                      onClick={(e) => handleAddToCart(e, item.product._id)}
                      className="flex gap-2 items-center justify-center text-white text-[9px] mobile-sm:text-xs sm:text-base p-2 rounded-sm bg-primary hover:bg-primary-hover"
                    >
                      {currentArtwork === item.product._id && cLoading ? (
                        "Loading.."
                      ) : (
                        <>
                          <BsCartPlus />
                          Add to Cart
                        </>
                      )}
                    </button>
                    <button
                      disabled={wLoading}
                      onClick={(e) => handleRemove(e, item.product._id)}
                      className="flex gap-2 items-center justify-center text-[#333333] text-[9px] mobile-sm:text-xs sm:text-base outline outline-1 p-2 rounded-sm bg-white hover:bg-gray-100"
                    >
                      {currentArtwork === item.product._id && wLoading ? (
                        "Loading.."
                      ) : (
                        <>
                          <FaRegTrashAlt />
                          Remove
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
