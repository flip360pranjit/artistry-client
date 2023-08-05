import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { FaCalendar, FaRegHeart } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { IoPencil } from "react-icons/io5";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import Rating from "../Browse/Rating";
import "./Artwork.scss";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToWishlist } from "../../store/thunks/WishlistThunks";
import { addToCart } from "../../store/thunks/CartThunks";
import generateCode from "../../utils/generateCode";
import { setOrderItems } from "../../store/slices/CheckoutSlice";
import axios from "axios";
import ReviewModal from "../PopupModal/ReviewModal";
import { isWebpSupported } from "react-image-webp/dist/utils";

function Artwork() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // States
  const [quantity, setQuantity] = useState(1);

  const { user } = useSelector((state) => state.auth);
  const wLoading = useSelector((state) => state.wishlist.loading);
  const cLoading = useSelector((state) => state.cart.loading);

  const artwork = location.state.artwork;

  const [reviews, setReviews] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  // const sortedReviews = reviews.sort((a, b) => b.createdAt - a.createdAt);

  // Calculate average rating
  const averageRating =
    reviews.reduce((total, review) => total + review.rating, 0) /
    reviews.length;

  // Calculate count of each star rating
  const starRatingCount = Array.from({ length: 5 }, (_, index) => {
    const rating = index + 1;
    const count = reviews.filter((review) => review.rating === rating).length;
    return { rating, count };
  });

  useEffect(() => {
    async function fetchReviews() {
      // console.log("Artsist:", artwork.artist);
      await axios
        .get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/reviews/${
            artwork.artist.artistId._id
          }`
        )
        .then((response) => {
          setReviews([...response.data].reverse());
        })
        .catch((error) => {
          // console.log(error);
          toast.error("Something went wrong!");
        });
    }

    fetchReviews();
  }, [isOpen]);

  // handle order quantity
  function decreaseQuantity(event) {
    event.preventDefault();

    if (quantity !== 1) setQuantity(quantity - 1);
  }
  function increaseQuantity(event) {
    event.preventDefault();

    if (quantity === artwork.quantity) {
      toast.info(`Max quantity is ${artwork.quantity}`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      setQuantity(quantity + 1);
    }
  }
  function handleQuantityChange(event) {
    if (event.target.value < 1) setQuantity(1);
    else if (event.target.value > artwork.quantity) {
      setQuantity(artwork.quantity);
      toast.info(`Max quantity is ${artwork.quantity}`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      setQuantity(event.target.value);
    }
  }

  // Open reviews page
  function handleReview(event) {
    event.preventDefault();

    navigate("/artwork/reviews", {
      state: { reviews, averageRating, starRatingCount },
    });
  }

  function handleWishlisting(event) {
    event.preventDefault();

    if (!user) {
      navigate("/auth");
    } else {
      dispatch(addToWishlist({ user: user._id, productId: artwork._id }))
        .unwrap()
        .then(() => {
          toast.success("Artwork added to wishlist!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/wishlist");
        });
    }
  }
  function handleAddToCart(event) {
    event.preventDefault();

    if (!user) {
      navigate("/auth");
    } else {
      dispatch(
        addToCart({
          user: user._id,
          productId: artwork._id,
          quantity: quantity,
        })
      )
        .unwrap()
        .then(() => {
          navigate("/cart");
        });
    }
  }
  function handleBuyNow(event) {
    event.preventDefault();

    const generatedCode = generateCode();

    dispatch(
      setOrderItems({
        items: [{ _id: generatedCode, product: artwork, quantity }],
        totalAmount: quantity * artwork.price,
        totalQuantity: quantity,
        discount: {
          applied: false,
          amount: 0,
          coupon: {
            code: "",
            discount: 0,
            expirationDate: 0,
            offerHeading: "",
            offerDescription: "",
            image: "",
            theme: "",
          },
        },
      })
    );

    navigate("/checkout/review");
  }

  return (
    <div className="pt-20 md:pt-12 mx-10 md:mx-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-0">
        <div className="bg-gray-100 flex items-center justify-center p-5">
          {isWebpSupported() ? (
            <img
              src={artwork.imageWebp}
              alt={artwork.title}
              className="max-h-[80vh]"
            />
          ) : (
            <img
              src={artwork.image}
              alt={artwork.title}
              className="max-h-[80vh]"
            />
          )}
        </div>
        <div className="flex items-center px-7">
          <div className="">
            <h1 className="text-3xl mobile-sm:text-4xl font-playfair-display font-semibold">
              {artwork.title}
            </h1>
            <p className="font-poppins text-teal-600 mt-1">
              Medium: <span className="font-semibold">{artwork.medium}</span>
            </p>
            <h4 className="flex mt-3 text-[#333333]">
              <MdOutlineCurrencyRupee />{" "}
              <span className="text-4xl font-poppins font-semibold">
                {Math.floor(artwork.price)}
                <span className="text-2xl align-super text-[#444444]">
                  {artwork.price.toFixed(2).split(".")[1]}
                </span>
              </span>
            </h4>
            <p className="text-sm font-open-sans text-[#555555] mt-2">
              {artwork.description}
            </p>
            <div className="flex gap-1 items-center mt-2 cursor-pointer">
              <div className="flex">
                <IconContext.Provider
                  value={{ color: "#ff8400", size: "1.2rem" }}
                >
                  <Rating rating={averageRating} />
                </IconContext.Provider>
              </div>
              <h5 className="text-sm font-open-sans text-teal-700 mt-1">
                {reviews.length} global ratings
              </h5>
            </div>
            <button
              onClick={handleWishlisting}
              disabled={wLoading}
              className="flex w-[80%] gap-2 items-center justify-center font-poppins text-[#333333] outline outline-1 py-1 mt-10 rounded-sm bg-white hover:bg-gray-100"
            >
              {wLoading ? (
                "Loading.."
              ) : (
                <>
                  <FaRegHeart /> Wishlist
                </>
              )}
            </button>
            <div className="flex items-center h-7 mt-4 bg-white">
              <button
                onClick={decreaseQuantity}
                className="flex justify-center items-center h-full w-10 border border-gray-300 rounded-l-sm focus:outline-none hover:bg-gray-100"
              >
                <FiMinus className="w-4 text-gray-600" />
              </button>
              <input
                type="number"
                className="w-12 flex h-full text-sm justify-center border border-gray-300 text-center focus:outline-none appearance-none"
                value={quantity}
                onChange={handleQuantityChange}
              />
              <button
                onClick={increaseQuantity}
                className="flex justify-center items-center h-full w-10 border border-gray-300 rounded-r-sm focus:outline-none hover:bg-gray-100"
              >
                <FiPlus className="w-4 text-gray-600" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-3">
              <button
                disabled={cLoading}
                onClick={handleAddToCart}
                className="py-1 rounded-sm text-white bg-[#77037b] hover:bg-[#9a208c]"
              >
                {cLoading ? "Loading.." : "Add to Cart"}
              </button>
              <button
                onClick={handleBuyNow}
                className="py-1 rounded-sm text-white bg-primary hover:bg-primary-hover"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5 pt-10 bg-gray-100 mt-10">
        <h1 className="font-poppins text-3xl font-bold text-center">
          Recent Reviews{" "}
          <span className="text-xl font-normal text-[#333333]">
            of the Artist
          </span>
        </h1>

        <div className="flex justify-center mt-10 w-full sm:w-auto">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-white w-full sm:w-auto px-5 py-2 border border-gray-500 text-sm hover:bg-gray-50 font-poppins flex items-center gap-1"
          >
            <IoPencil />
            Write a Review
          </button>
        </div>

        {/* Reviews */}
        {reviews.length === 0 ? (
          <div className="mt-10 font-poppins text-xl text-center text-[#777777]">
            No Reviews
          </div>
        ) : (
          <>
            {reviews.slice(0, 3).map((review) => (
              <div
                key={review.user._id}
                className="bg-white p-7 mt-10 rounded-md shadow-lg"
              >
                <div className="flex flex-col mobile-sm:flex-row items-center gap-1">
                  <div className="flex">
                    <IconContext.Provider
                      value={{ color: "#ff8400", size: "1.2rem" }}
                    >
                      <Rating rating={review.rating} />
                    </IconContext.Provider>
                  </div>
                  <h3 className="font-poppins">{review.rating} out of 5</h3>
                </div>
                <div className="mt-5 flex gap-3 items-center">
                  <img
                    src={review.user.photoURL}
                    alt="Image"
                    className="w-6 h-5 mobile-sm:w-10 mobile-sm:h-10 rounded-full"
                  />
                  <h3 className="text-xs mobile-sm:text-base font-montserrat font-semibold text-[#222222]">
                    {review.user.userName}
                  </h3>
                </div>
                <h6 className="font-open-sans text-[#555555] text-[10px] mobile-sm:text-sm mt-2">
                  {review.comment}
                </h6>
                <p className="flex gap-2 items-center text-xs font-semibold text-teal-600 mt-4">
                  <FaCalendar /> {review.createdAt}
                </p>
              </div>
            ))}
            <div className="flex items-center justify-center py-7">
              <button
                onClick={handleReview}
                className="text-white px-8 py-2 rounded bg-primary hover:bg-primary-hover"
              >
                See All Reviews
              </button>
            </div>
          </>
        )}
      </div>

      {isOpen && (
        <ReviewModal
          onClose={() => setIsOpen(false)}
          user={user}
          artwork={artwork}
        />
      )}
    </div>
  );
}

export default Artwork;
