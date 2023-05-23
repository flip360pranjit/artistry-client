import React from "react";
import { BsBoxArrowRight } from "react-icons/bs";
import "./Hero.scss";
import Button from "../Button/Button";
import { FaEye } from "react-icons/fa";

function Hero() {
  return (
    <section
      id="home"
      className="flex flex-col-reverse items-center gap-3 bg-center bg-cover px-5 mt-1 pb-2 rounded-3xl bg-[url('./images/mobile-background.jpg')] md:flex-row md:items-start md:gap-12 md:bg-[url('./images/desktop-background.jpg')]"
    >
      <div className="left-wrapper flex flex-col md:items-start items-center lg:mt-20 mb-7 xl:mb-0">
        <h1 className="text-[#333333] text-left font-montserrat font-black md:font-bold text-3xl md:text-4xl lg:text-5xl xl:text-[4rem] md:mt-10 leading-normal">
          Explore a World of Inspiring Artistry
        </h1>
        <h2 className="font-open-sans font-medium text-[#555555] text-base md:text-lg lg:text-xl mt-5 mb-10 leading-normal">
          Explore a curated collection of stunning artworks from talented
          artists worldwide.
        </h2>
        <Button type="contained" color="primary" size="large">
          Browse Artworks
          <FaEye />
        </Button>
      </div>
      <div className="right-wrapper">
        <img
          className="img flex-1 top-0"
          src="./images/paintings.png"
          alt="Paintings"
        />
      </div>
    </section>
  );
}

export default Hero;
