import axios from "axios";
import React, { useState } from "react";
import { IconContext } from "react-icons";
import { FaRegStar, FaStar, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import { toast } from "react-toastify";

const stars = [1, 2, 3, 4, 5];

function ReviewModal({ onClose, user, artwork }) {
  const navigate = useNavigate();

  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStarHover = (starRating) => {
    setHoveredRating(starRating);
  };

  const handleStarClick = (starRating) => {
    setSelectedRating(starRating);
  };

  //   console.log(selectedRating);

  const handleClear = (event) => {
    event.preventDefault();

    setHoveredRating(0);
    setSelectedRating(0);
    setComment("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const currentDate = new Date();

    const dateFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const formattedDate = currentDate.toLocaleDateString(
      "en-US",
      dateFormatOptions
    );

    const review = {
      user: {
        _id: user._id,
        userName: user.displayName,
        photoURL: user.photoURL,
      },
      product: artwork._id,
      rating: selectedRating,
      comment,
      createdAt: formattedDate,
    };

    axios
      .post(`${import.meta.env.VITE_REACT_APP_API_URL}/reviews`, review)
      .then((response) => {
        setLoading(false);
        if (response.status === 201) {
          onClose();
          toast.info(response.data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          onClose();
          toast.success("Review Submitted!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Something went wrong!", {
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
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center font-poppins z-50">
      <div className="bg-white rounded-lg p-6 pr-10 min-w-[50vw] max-w-lg z-[600] relative">
        {loading ? (
          <>
            <LoadingAnimation />
            <h1 className="text-center mt-7">Please Wait...</h1>
          </>
        ) : (
          <>
            <div
              onClick={onClose}
              className="absolute top-3 right-3 text-xl cursor-pointer"
            >
              <FaTimes />
            </div>
            <h1 className="text-3xl font-semibold">Write a Review</h1>
            <div className="flex items-center justify-between mt-8">
              <h1 className="text-xl font-semibold text-[#555555]">
                Rate the Artist
              </h1>
              <IconContext.Provider
                value={{ size: "1.5rem", color: "#ff8400" }}
              >
                <div className="flex gap-1">
                  {stars.map((star) => (
                    <span
                      key={star}
                      onMouseEnter={() => handleStarHover(star)}
                      onMouseLeave={() => handleStarHover(selectedRating)}
                      onClick={() => handleStarClick(star)}
                    >
                      {star <= (hoveredRating || selectedRating) ? (
                        <FaStar />
                      ) : (
                        <FaRegStar />
                      )}
                    </span>
                  ))}
                </div>
              </IconContext.Provider>
            </div>
            <div className="col-span-full mt-5">
              <textarea
                id="comment"
                name="comment"
                placeholder="Your Review"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              />
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

export default ReviewModal;
