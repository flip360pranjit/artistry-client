import React, { useEffect, useState } from "react";
import { FaCalendar } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import Rating from "../Browse/Rating";
import { IconContext } from "react-icons";
import ProgressBar from "../Browse/ProgressBar";

function Reviews() {
  const location = useLocation();
  const reviews = location.state.reviews;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Handle window resize
  useEffect(() => {
    function handleWindowResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
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

  const filteredReviews = reviews;

  // Pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage, setReviewsPerPage] = useState(10);

  const numberOfPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const lastIndex = currentPage * reviewsPerPage;
  const firstIndex = lastIndex - reviewsPerPage;
  const pageNumbers = [...Array(numberOfPages + 1).keys()].slice(1);

  const pageReviews = filteredReviews.slice(firstIndex, lastIndex);

  function handlePreviousPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  function handleNextPage() {
    if (currentPage !== numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  function handlePageClick(n) {
    setCurrentPage(n);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="flex flex-col items-center pt-20 md:pt-16 mx-10 md:mx-20">
      <div className="">
        <h1 className="font-poppins text-4xl font-semibold text-center">
          Customer Reviews
        </h1>

        <div className="flex justify-center gap-1 mt-2">
          <div className="flex">
            <IconContext.Provider value={{ color: "#ff8400", size: "1.2rem" }}>
              <Rating rating={averageRating} />
            </IconContext.Provider>
          </div>
          <h3 className="font-poppins text-[#333333]">
            based on {reviews.length} reviews
          </h3>
        </div>
        <div className="flex flex-col-reverse mt-4">
          {starRatingCount.map((rating) => (
            <ProgressBar
              key={rating.rating}
              rating={rating.rating}
              count={rating.count}
              value={(rating.count / reviews.length) * 100}
            />
          ))}
        </div>
      </div>
      <div className="bg-gray-100 p-5 mt-7">
        {pageReviews.map((review) => (
          <div
            key={review._id}
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
        <ul className="flex items-center justify-center gap-2 text-sm mt-7">
          <li>
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1 ? true : false}
              className={`p-2 text-white rounded-l-lg ${
                currentPage === 1
                  ? "bg-gray-400"
                  : "bg-primary hover:bg-primary-hover"
              }`}
            >
              Previous
            </button>
          </li>
          {windowWidth >= 768 &&
            pageNumbers.map((n, i) => (
              <li key={i}>
                <button
                  onClick={() => {
                    handlePageClick(n);
                  }}
                  className={`py-2 px-4 hover:bg-primary hover:text-white ${
                    currentPage === n && "bg-primary-hover text-white"
                  }`}
                >
                  {n}
                </button>
              </li>
            ))}
          <li>
            <button
              onClick={handleNextPage}
              disabled={currentPage === numberOfPages ? true : false}
              className={`p-2 px-4 text-white rounded-r-lg ${
                currentPage === numberOfPages
                  ? "bg-gray-400"
                  : "bg-primary hover:bg-primary-hover"
              }`}
            >
              Next
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Reviews;
