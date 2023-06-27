import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { FaCalendar, FaRegHeart } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import Rating from "../Browse/Rating";
import "./Artwork.scss";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToWishlist } from "../../store/thunks/WishlistThunks";
import { addToCart } from "../../store/thunks/CartThunks";

const reviews = [
  {
    user: {
      _id: "user1",
      userName: "John Doe",
    },
    product: "product1",
    rating: 4,
    comment:
      "I am truly amazed by the artistic brilliance displayed in this artwork. The attention to detail and the use of vibrant colors have brought the subject to life. It has instantly become the centerpiece of my living room, and it never fails to captivate anyone who lays their eyes upon it. Thank you for creating such a masterpiece!",
    createdAt: new Date("2022-07-12"),
  },
  {
    user: {
      _id: "user2",
      userName: "Jane Smith",
    },
    product: "product2",
    rating: 3,
    comment:
      "The artwork is decent, but I was expecting a bit more. The composition and technique are good, but it lacks that wow factor. The colors could have been more vibrant, and the overall execution feels a bit rushed. Nonetheless, it still adds a touch of elegance to my space, and I appreciate the effort put into creating it.",
    createdAt: new Date("2022-08-05"),
  },
  {
    user: {
      _id: "user3",
      userName: "David Johnson",
    },
    product: "product3",
    rating: 5,
    comment:
      "This artwork is an absolute masterpiece. The artist's skill and attention to detail are unparalleled. Every stroke of the brush and every shade of color come together harmoniously to create a breathtaking visual experience. It has become the focal point of my art collection, and I couldn't be happier with my purchase.",
    createdAt: new Date("2022-09-20"),
  },
  {
    user: {
      _id: "user4",
      userName: "Sarah Williams",
    },
    product: "product4",
    rating: 4,
    comment:
      "I'm truly impressed by the level of creativity showcased in this artwork. The artist has managed to capture a sense of depth and emotion that resonates with the viewer. The choice of colors and textures adds an extra layer of visual interest. It's a thought-provoking piece that sparks conversations and adds a unique touch to my home.",
    createdAt: new Date("2022-10-15"),
  },
  {
    user: {
      _id: "user5",
      userName: "Michael Brown",
    },
    product: "product5",
    rating: 4,
    comment:
      "This artwork is a true testament to the artist's talent and skill. The intricate details and the use of light and shadow create a mesmerizing effect. It's a captivating piece that never fails to evoke emotions. I find myself discovering something new every time I look at it. It's a valuable addition to my art collection.",
    createdAt: new Date("2022-11-03"),
  },
  {
    user: {
      _id: "user6",
      userName: "Emily Davis",
    },
    product: "product6",
    rating: 3,
    comment:
      "While the artwork has its merits, I can't help but feel slightly underwhelmed. The composition and technique are solid, but it lacks that wow factor that I was hoping for. The colors are a bit muted, and the overall impact is somewhat subdued. Nonetheless, it still adds a touch of sophistication to my space.",
    createdAt: new Date("2022-12-19"),
  },
  {
    user: {
      _id: "user7",
      userName: "Daniel Wilson",
    },
    product: "product7",
    rating: 5,
    comment:
      "I'm absolutely blown away by the beauty of this artwork. The artist has managed to capture the essence of the subject in a way that feels almost magical. The colors, textures, and attention to detail are outstanding. It's a true masterpiece that brings joy to my everyday life.",
    createdAt: new Date("2023-01-08"),
  },
  {
    user: {
      _id: "user8",
      userName: "Olivia Anderson",
    },
    product: "product8",
    rating: 4,
    comment:
      "This artwork speaks to my soul. The artist has beautifully conveyed emotions through their brushstrokes. The use of colors and the overall composition create a sense of serenity and tranquility. It's a piece that I can stare at for hours, getting lost in its beauty and meaning.",
    createdAt: new Date("2023-02-25"),
  },
  {
    user: {
      _id: "user9",
      userName: "William Thompson",
    },
    product: "product9",
    rating: 3,
    comment:
      "While the artwork is visually appealing, it doesn't resonate with me on a deeper level. The composition feels a bit off, and the colors don't evoke any strong emotions. It's a nice piece to have, but I was hoping for something more impactful and thought-provoking.",
    createdAt: new Date("2023-03-14"),
  },
  {
    user: {
      _id: "user10",
      userName: "Sophia Martinez",
    },
    product: "product10",
    rating: 4,
    comment:
      "I'm impressed by the artist's ability to capture the essence of the subject. The use of colors and the overall composition create a visually engaging experience. It's a piece that brings a sense of joy and positivity to my living space. I appreciate the artist's talent and creativity.",
    createdAt: new Date("2023-04-29"),
  },
];

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
  const sortedReviews = reviews.sort((a, b) => b.createdAt - a.createdAt);

  // handle order quantity
  function decreaseQuantity(event) {
    event.preventDefault();

    if (quantity !== 1) setQuantity(quantity - 1);
  }
  function increaseQuantity(event) {
    event.preventDefault();

    setQuantity(quantity + 1);
  }

  // Open reviews page
  function handleReview(event) {
    event.preventDefault();

    navigate("/artwork/reviews", { state: { reviews: sortedReviews } });
  }

  function handleWishlisting(event) {
    event.preventDefault();

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
  function handleAddToCart(event) {
    event.preventDefault();

    dispatch(
      addToCart({ user: user._id, productId: artwork._id, quantity: quantity })
    )
      .unwrap()
      .then(() => {
        navigate("/cart");
      });
  }

  return (
    <div className="pt-20 md:pt-12 mx-10 md:mx-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-0">
        <div className="bg-gray-100 flex items-center justify-center p-5">
          <img
            src={artwork.image}
            alt={artwork.title}
            className="max-h-[80vh]"
          />
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
                  <Rating rating={4.5} />
                </IconContext.Provider>
              </div>
              <h5 className="text-sm font-open-sans text-teal-700 mt-1">
                7 global ratings
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
                onChange={(e) => setQuantity(e.target.value)}
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
              <button className="py-1 rounded-sm text-white bg-primary hover:bg-primary-hover">
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

        {/* Reviews */}
        {sortedReviews.slice(0, 3).map((review) => (
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
                src="https://dummyimage.com/200x300"
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
              <FaCalendar />{" "}
              {review.createdAt.toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
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
      </div>
    </div>
  );
}

export default Artwork;
