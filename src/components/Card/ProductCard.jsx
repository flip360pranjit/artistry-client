import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { FaAngleDown, FaCaretUp, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../Browse/ProgressBar";
import axios from "axios";
import Rating from "../Browse/Rating";
import { toast } from "react-toastify";
import { isWebpSupported } from "react-image-webp/dist/utils";

function ProductCard({ artwork, clickedReview, setClickedReview, sortBy }) {
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      await axios
        .get(`${import.meta.env.VITE_REACT_APP_API_URL}/reviews/${artwork._id}`)
        .then((response) => {
          setReviews([...response.data].reverse());
        })
        .catch((error) => {
          // console.log(error);
          toast.error("Something went wrong!");
        });
    }

    fetchReviews();
  }, []);

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

  function handleReviewClicked(event) {
    event.preventDefault();

    if (sortBy === "Featured") {
      navigate("/view-artwork", { state: { artwork: artwork } });
    } else {
      if (clickedReview === artwork._id) {
        setClickedReview(null);
      } else {
        setClickedReview(artwork._id);
      }
    }
  }

  function viewListing(event) {
    event.preventDefault();

    navigate("/view-artwork", { state: { artwork: artwork } });
  }

  // Open reviews page
  function handleReview(event) {
    event.preventDefault();

    navigate("/artwork/reviews", {
      state: { reviews, averageRating, starRatingCount },
    });
  }

  return (
    <div className="border rounded-t-lg h-max grid grid-cols-5 sm:grid-cols-1">
      <div
        onClick={viewListing}
        className="flex items-center justify-center col-span-2 bg-gray-200 p-1 cursor-pointer"
      >
        {isWebpSupported() ? (
          <img
            src={artwork.imageWebp}
            alt={artwork.title}
            className="rounded-t-md"
          />
        ) : (
          <img
            src={artwork.image}
            alt={artwork.title}
            className="rounded-t-md"
          />
        )}
      </div>
      <div className="p-3 sm:p-1 col-span-3 flex flex-col sm:justify-between">
        <h2 className="font-playfair-display font-semibold text-xl mobile:text-3xl mobile-start:text-4xl sm:text-lg">
          {artwork.title}
        </h2>
        <h6 className="text-xs font-poppins mt-1 text-teal-600">
          Medium: <span className="font-semibold">{artwork.medium}</span>
        </h6>
        <h4 className="font-montserrat font-semibold text-[#555555] flex gap-1 text-base mobile:text-2xl mobile-start:text-3xl sm:text-base mt-2">
          <span className="text-sm mobile-start:text-base sm:text-xs">by</span>{" "}
          {artwork.artist.artistName}
        </h4>
        {reviews.length !== 0 && (
          <div className="flex items-center gap-1 mt-2 relative">
            <div className="flex">
              <IconContext.Provider
                value={{ color: "#ff8400", size: "1.2rem" }}
              >
                <Rating rating={averageRating} />
              </IconContext.Provider>
            </div>
            <div
              onClick={handleReviewClicked}
              className="flex items-center text-primary text-lg mobile:text-xl mobile-start:text-base sm:text-xs font-poppins font-semibold relative top-[2px] cursor-pointer"
            >
              <IconContext.Provider value={{ size: "0.8rem" }}>
                <FaAngleDown />
              </IconContext.Provider>
              {reviews.length}
            </div>
            {clickedReview === artwork._id && (
              <div className="absolute top-full right-0 w-[400px] z-[100] bg-white shadow-xl border rounded-md p-3">
                <div className="flex gap-5 items-center">
                  <div className="flex">
                    <IconContext.Provider
                      value={{ color: "#ff8400", size: "0.9rem" }}
                    >
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStarHalfAlt />
                    </IconContext.Provider>
                  </div>
                  <span className="font-poppins font-semibold">
                    {averageRating} out of 5
                  </span>
                </div>
                <h4 className="text-sm font-open-sans text-gray-600 mt-2">
                  {reviews.length} global ratings
                </h4>
                <div className="mt-5 border-b-2 border-gray-400">
                  {starRatingCount.map((rating) => (
                    <ProgressBar
                      key={rating.rating}
                      rating={rating.rating}
                      count={rating.count}
                      value={(rating.count / reviews.length) * 100}
                    />
                  ))}
                </div>
                <div className="flex justify-center">
                  <p
                    onClick={handleReview}
                    className="cursor-pointer text-xs font-semibold text-teal-600 underline pt-2"
                  >
                    See all review
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
        <div className="mt-2 flex">
          <IconContext.Provider value={{ size: "1.2rem" }}>
            <MdOutlineCurrencyRupee />
          </IconContext.Provider>
          <h4 className="font-poppins font-semibold text-xl mobile:text-4xl sm:text-2xl">
            {Math.floor(artwork.price)}
            <span className="text-base mobile:text-2xl sm:text-lg align-super text-[#333333]">
              {artwork.price.toFixed(2).split(".")[1]}
            </span>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
