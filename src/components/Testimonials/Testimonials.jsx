import React, { useRef } from "react";
// import Swiper core and required modules
import { A11y, Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import TestimonialCard from "./TestimonialCard";
import testimonials from "../../api/testimonials";

function Testimonials() {
  const swiperRef = useRef();

  return (
    <section
      id="testimonials"
      className="bg-[#f4e7d3] rounded-3xl px-6 py-14 mt-10"
    >
      <h2 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold mb-6 font-montserrat">
        Testimonials
      </h2>
      <div>
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-3 lg:items-center lg:gap-x-16">
          <div className="lg:max-w-xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#555555] text-center lg:text-start">
              Don't just take our word for it...{" "}
              <br className="hidden sm:block lg:hidden" />
              Read reviews from our customers
            </h2>

            <p className="mt-4 text-[#888888] text-center lg:text-start">
              Discover What Our Clients Have to Say: Testimonials That Showcase
              Their Joyful Experiences and Artistic Inspiration.
            </p>

            {/* Navigation Buttons */}
            <div className="hidden lg:mt-8 lg:flex lg:gap-4">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="rounded-full border border-primary p-3 text-primary hover:bg-primary hover:text-white"
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

              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="rounded-full border border-primary p-3 text-primary hover:bg-primary hover:text-white"
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
            </div>
          </div>

          <div className="-mx-6 lg:col-span-2 lg:mx-0">
            <Swiper
              modules={[Autoplay, Navigation, Pagination, A11y]}
              loop={true}
              slidesPerView={1}
              spaceBetween={32}
              autoplay={{
                delay: 6000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  centeredSlides: true,
                  slidesPerView: 1.25,
                },
                1024: {
                  centeredSlides: false,
                  slidesPerView: 1.5,
                },
              }}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.name}>
                  <TestimonialCard testimonial={testimonial} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-4 lg:hidden">
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
  );
}

export default Testimonials;
