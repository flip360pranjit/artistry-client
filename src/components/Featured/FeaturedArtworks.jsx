import React, { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
// import Swiper core and required modules
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { isWebpSupported } from "react-image-webp/dist/utils";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ImagePlaceholder from "../LoadingAnimation/ImagePlaceholder";

const breakpoints = {
  640: {
    slidesPerView: 2,
    centeredSlides: true,
  },
  952: {
    slidesPerView: 3,
    centeredSlides: false,
  },
  1280: {
    slidesPerView: 4,
    centeredSlides: false,
  },
};

const placeholderArtworks = [
  { id: 1, name: "Artist 1" },
  { id: 2, name: "Artist 2" },
  { id: 3, name: "Artist 3" },
  { id: 4, name: "Artist 4" },
];

function getRandomArtworks(artworks, count) {
  for (let i = artworks.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [artworks[i], artworks[j]] = [artworks[j], artworks[i]];
  }
  return artworks.slice(0, count);
}

function FeaturedArtworks({ heading, description }) {
  const navigate = useNavigate();
  const swiperRef = useRef();

  const [loading, setLoading] = useState(false);
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    // Function to fetch seller artworks
    const fetchArtworks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/artworks`
        );
        setLoading(false);
        const fetchedArtworks = getRandomArtworks(response.data, 7);
        setArtworks(fetchedArtworks);
      } catch (error) {
        setLoading(false);
      }
    };

    // Fetch seller artworks on component mount
    fetchArtworks();
  }, []);

  function viewArtist(event, artwork) {
    event.preventDefault();

    navigate("/view-artwork", { state: { artwork } });
  }

  return (
    artworks.length !== 0 && (
      <section className="rounded-3xl px-6 pt-5 py-14 mt-10 shadow-lg bg-gray-100 max-w-[100vw]">
        <h2 className="text-[#333333] text-2xl md:text-3xl lg:text-4xl text-center font-bold mb-6 font-montserrat">
          {heading}
        </h2>
        <h4 className="text-[#555555] text-sm md:text-base lg:text-lg text-center font-normal mb-6 font-poppins">
          {description}
        </h4>
        <div className="relative">
          {/* Previous Button */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="hidden mobile-start:inline-block absolute left-0 top-[40%] rounded-full border border-primary p-3 text-primary hover:bg-primary hover:text-white"
          >
            <span className="sr-only">Previous Slide</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5 rtl:rotate-180"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          {/* Next button */}
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="hidden mobile-start:inline-block absolute right-0 top-[40%] rounded-full border border-primary p-3 text-primary hover:bg-primary hover:text-white"
          >
            <span className="sr-only">Next Slide</span>
            <svg
              className="h-5 w-5 rtl:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </button>

          <div className="mobile-start:mx-16 flex">
            <Swiper
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              centeredSlides={true}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              keyboard={{
                enabled: true,
              }}
              breakpoints={breakpoints}
              // install Swiper modules
              modules={[Autoplay, Navigation, Pagination]}
            >
              {loading
                ? placeholderArtworks.map((artwork) => (
                    <SwiperSlide key={artwork.id} className="relative">
                      <div className="w-full h-[40vh] sm:w-44 sm:h-64 md:w-48 md:h-72 lg:w-52 lg:h-[300px] mb-10 flex flex-col justify-center items-center rounded-md shadow-xl bg-white relative group cursor-pointer">
                        <ImagePlaceholder />
                      </div>
                    </SwiperSlide>
                  ))
                : artworks.map((artwork) => (
                    <SwiperSlide key={artwork._id} className="relative">
                      <div className="w-full h-full sm:w-44 sm:h-64 md:w-48 md:h-72 lg:w-52 lg:h-[300px] mb-10 flex flex-col justify-center items-center rounded-md shadow-xl bg-white relative group cursor-pointer">
                        {isWebpSupported() ? (
                          <img
                            src={artwork.imageWebp}
                            alt={artwork.title}
                            className="rounded-sm"
                          />
                        ) : (
                          <img
                            src={artwork.image}
                            alt={artwork.title}
                            className="rounded-sm"
                          />
                        )}
                        <h3 className="text-base md:text-[16px] lg:text-xl font-semibold font-playfair-display absolute bottom-0 bg-white w-full text-center pb-7 sm:pb-0">
                          {artwork.title}
                        </h3>
                        <div className="hidden absolute top-0 left-0 w-full h-full p-5 group-hover:flex flex-col justify-center bg-opacity-90 bg-primary text-white transition-all duration-300 ease-in-out">
                          <p className="font-poppins text-base mobile-md1:text-lg sm:text-sm md:text-base text-center mobile:text-start">
                            <span className="font-semibold">Artist:</span>{" "}
                            {artwork.artist.artistName}
                          </p>
                          <p className="font-poppins text-base mobile-md1:text-lg sm:text-sm md:text-base text-center mobile:text-start">
                            <span className="font-semibold">Medium:</span>{" "}
                            {artwork.medium}
                          </p>
                          <p className="font-open-sans text-base mobile-md1:text-lg sm:text-sm md:text-base mt-5 text-center mobile:text-start">
                            {artwork.description}
                          </p>
                          <div className="hidden md:flex justify-center mt-5">
                            <Button
                              type="contained"
                              color="primary"
                              size="small"
                              layered={true}
                            >
                              <span onClick={(e) => viewArtist(e, artwork)}>
                                View More
                              </span>
                            </Button>
                          </div>
                          <div className="md:hidden flex justify-center mt-5">
                            <Button
                              type="contained"
                              color="primary"
                              size="large"
                              layered={true}
                            >
                              <span onClick={(e) => viewArtist(e, artwork)}>
                                View More
                              </span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
            </Swiper>
          </div>

          {/* Mobile Navigations */}
          <div className="mt-8 flex justify-center gap-4 mobile-start:hidden">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous slide"
              className="rounded-full border border-primary p-4 text-primary hover:bg-primary hover:text-white"
            >
              <svg
                className="h-5 w-5 -rotate-180 transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>

            <button
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next slide"
              className="rounded-full border border-primary p-4 text-primary hover:bg-primary hover:text-white"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    )
  );
}

export default FeaturedArtworks;
