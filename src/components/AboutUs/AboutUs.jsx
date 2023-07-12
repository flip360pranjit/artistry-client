import React from "react";
import Button from "../Button/Button";
import { HiArrowNarrowRight } from "react-icons/hi";
import { motion } from "framer-motion";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import { IconContext } from "react-icons";

const heroVariants = {
  hidden: {
    opacity: 0,
    y: "50vh",
  },
  visible: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: "-100vh",
    transition: { ease: "easeInOut" },
  },
};

function AboutUs() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-[#f4e7d3] h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center mx-10 mobile-md2:mx-auto mobile-md2:max-w-xs sm:max-w-lg mt-20">
          <motion.h1
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5, duration: 0.6 }}
            exit="exit"
            className="text-3xl sm:text-5xl font-poppins font-semibold text-center text-[#333333]"
          >
            Hi, we're Artistry.
          </motion.h1>
          <motion.h3
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.9, duration: 0.6 }}
            exit="exit"
            className="text-sm mobile-lg:text-base sm:text-lg font-montserrat font-normal text-center mt-7 text-[#666666]"
          >
            We're redefining the art experience, connecting artists and art
            enthusiasts worldwide with a curated marketplace of exquisite
            artworks.
          </motion.h3>
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.3, duration: 0.6 }}
            exit="exit"
            className="mt-7"
          >
            <Button type="contained" color="primary" size="large">
              Get Started for free
              <HiArrowNarrowRight />
            </Button>
          </motion.div>
        </div>
      </div>
      <svg
        className="relative sm:-top-10"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#f4e7d3"
          fillOpacity="1"
          d="M0,192L60,186.7C120,181,240,171,360,165.3C480,160,600,160,720,186.7C840,213,960,267,1080,277.3C1200,288,1320,256,1380,240L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        ></path>
      </svg>

      {/* Our Misson */}
      <div className="grid grid-cols-1 md:grid-cols-3 justify-center items-center relative -top-16 mt-16">
        <img src="./images/mission.jpg" alt="Our Mission" className="h-auto" />
        <div className="md:col-span-2">
          <h2 className="text-end font-montserrat font-bold text-4xl">
            Our Mission
          </h2>
          <p className="text-end font-open-sans text-sm leading-relaxed mt-6 text-[#777777]">
            At Artistry, our mission is to create a vibrant online platform that
            celebrates the beauty and creativity of art. We aim to provide
            artists with a global stage to showcase their talent and connect
            with art enthusiasts from all walks of life.
          </p>
        </div>
      </div>

      {/* Our Vision */}
      <div className="grid grid-cols-1 md:grid-cols-3 justify-center items-center mt-0">
        <div className="md:col-span-2">
          <h2 className="text-start font-montserrat font-bold text-4xl">
            Our Vision
          </h2>
          <p className="text-start font-open-sans text-sm leading-relaxed mt-6 text-[#777777]">
            At Artistry, our goals are simple yet powerful: to inspire, connect,
            and elevate. We are dedicated to fostering creativity, bridging the
            gap between artists and art lovers, and nurturing a thriving art
            community. Join us on this journey as we celebrate art in all its
            forms and empower artists to share their unique voices with the
            world.
          </p>
        </div>
        <img
          src="./images/vision.jpg"
          alt="Our Vission"
          className="h-auto order-first md:order-last"
        />
      </div>

      {/* Our Goals */}
      <div className="grid grid-cols-1 md:grid-cols-3 justify-center items-center mt-16">
        <img src="./images/goal.jpg" alt="Our Goal" className="h-auto" />
        <div className="md:col-span-2">
          <h2 className="text-end font-montserrat font-bold text-4xl">
            Our Goal
          </h2>
          <p className="text-end font-open-sans text-sm leading-relaxed mt-6 text-[#777777]">
            Our goals are simple yet powerful: to inspire, connect, and elevate.
            We are dedicated to fostering creativity, bridging the gap between
            artists and art lovers, and nurturing a thriving art community. Join
            us on this journey as we celebrate art in all its forms and empower
            artists to share their unique voices with the world.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className="bg-[#f4e7d3] relative pt-32 mt-16 pb-12">
        <svg
          className="absolute -top-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,64L34.3,53.3C68.6,43,137,21,206,32C274.3,43,343,85,411,112C480,139,549,149,617,154.7C685.7,160,754,160,823,154.7C891.4,149,960,139,1029,122.7C1097.1,107,1166,85,1234,96C1302.9,107,1371,149,1406,170.7L1440,192L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
          ></path>
        </svg>
        <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center">
          <div className="ml-7">
            <h2 className="text-start font-montserrat font-bold text-4xl">
              Our Story
            </h2>
            <p className="text-start font-open-sans text-sm leading-relaxed mt-6 text-[#777777]">
              Our story begins with a passionate artist who understands the
              importance of a trusted platform for buying and selling art. As an
              artist myself, I experienced the challenges of finding reliable
              avenues to showcase and sell my work. This inspired me to create
              Artistry, a platform where artists can confidently showcase their
              art and buyers can discover exceptional pieces with trust and
              transparency.
            </p>
          </div>
          <img
            src="./images/story.png"
            alt="Our Story"
            className="h-auto mb-10"
          />
        </div>
      </div>

      {/* Our Founder */}
      <div className="flex flex-col gap-5 md:flex-row items-center justify-around mt-16">
        <img
          src="./images/founder.png"
          alt="Founder"
          className=" rounded-md w-full md:w-1/3"
        />
        <div className="inline-block md:w-1/2">
          <h2 className="text-start font-montserrat font-bold text-4xl">
            Our Founder
          </h2>
          <p className="text-start font-open-sans text-sm leading-relaxed mt-6 text-[#777777]">
            Artistry was founded by Pranjit Kakoti, a passionate artist and
            visionary. With a deep love for art and a desire to create a space
            that empowers artists, Pranjit Kakoti embarked on this journey to
            redefine the art world and bring artists and art lovers together.
          </p>
        </div>
      </div>

      {/* Quote */}
      <div className="relative h-[70vh] flex justify-center items-center mb-16 mt-10">
        <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full">
          <svg
            className="h-96"
            viewBox="0 0 1000 1000"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="b" gradientTransform="rotate(135 .5 .5)">
                <stop offset="0%" stopColor="#F4E7D3" />
                <stop offset="100%" stopColor="#d3eaf4" />
              </linearGradient>
              <clipPath id="a">
                <path
                  fill="currentColor"
                  d="M804 627.5q0 127.5-114.5 213t-266.5 71q-152-14.5-240.5-139T82 495.5Q70 343 193.5 263t248-109.5Q566 124 724 151.5t119 188q-39 160.5-39 288Z"
                />
              </clipPath>
            </defs>
            <g clipPath="url(#a)">
              <path
                fill="url(#b)"
                d="M804 627.5q0 127.5-114.5 213t-266.5 71q-152-14.5-240.5-139T82 495.5Q70 343 193.5 263t248-109.5Q566 124 724 151.5t119 188q-39 160.5-39 288Z"
              />
            </g>
          </svg>
        </div>

        <div className="z-[100] relative">
          <IconContext.Provider value={{ size: "2rem", color: "#d8c2a6" }}>
            <div className="">
              <RiDoubleQuotesL />
            </div>
            <h1 className="text-center text-2xl mobile:text-4xl xl:text-6xl font-great-vibes text-[#444444] mx-5">
              Art whispers the language of emotions, painting the beauty of life
              with colors unseen, and touching souls in ways words cannot.
            </h1>
            <div className="absolute bottom-0 right-0">
              <RiDoubleQuotesR />
            </div>
          </IconContext.Provider>
        </div>
        <h3 className="absolute -bottom-10 mobile-sm:bottom-0 right-0 text-end font-poppins">
          <span className="font-bold">PRANJIT KAKOTI</span>
          <br />
          <span className="text-[#666666]">CTO and Founder of Artistry</span>
        </h3>
      </div>
    </div>
  );
}

export default AboutUs;
