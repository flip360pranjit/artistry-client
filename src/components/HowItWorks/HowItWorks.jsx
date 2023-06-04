import React, { useState } from "react";
import steps from "./Steps";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {
    opacity: 0,
    x: "100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1 },
  },
  exit: {
    opacity: 0,
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};
const imageVariants = {
  hidden: {
    opacity: 0,
    x: "-100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1 },
  },
  exit: {
    opacity: 0,
    x: "100vw",
    transition: { ease: "easeInOut" },
  },
};

function HowItWorks() {
  const [currentStep, setCurrentStep] = useState(1);

  function handleClick(event) {
    event.preventDefault();
    setCurrentStep(currentStep + 1);
  }

  return (
    <section
      id="how-it-works"
      className="rounded-3xl px-6 pt-5 pb-14 mt-10 shadow-lg bg-gray-100"
    >
      <h2 className="text-[#333333] text-2xl md:text-3xl lg:text-4xl text-center font-bold mb-2 md:mb-4 font-montserrat">
        How It Works
      </h2>
      <h3 className="text-[#555555] text-sm md:text-base lg:text-lg text-center font-normal md:mb-6 font-poppins">
        A Simple Guide to Buying and Selling Art on Artistry
      </h3>
      <div
        className={`md:grid md:grid-cols-2 md:mt-8 ${
          currentStep < 5 ? "grid grid-cols-2" : ""
        }`}
      >
        <div
          className={`md:flex md:items-center md:justify-center ${
            currentStep < 5
              ? "flex items-center justify-center gap-10 relative py-9 z-100 md:z-0 -left-5 top-5 mobile:left-0"
              : ""
          }`}
        >
          {currentStep < 5 &&
            steps.map(
              (step) =>
                step.number === currentStep && (
                  <motion.div
                    key={step.number}
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <img
                      src={`./images/${step.picture}`}
                      alt={step.title}
                      className="h-32 mobile-md1:h-40 mobile:h-44 md:h-80 lg:h-96 rounded-full"
                    />
                  </motion.div>
                )
            )}
          {currentStep >= 5 && (
            <motion.div
              className="hidden md:inline-block"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <img
                src={`./images/${steps[0].picture}`}
                alt={steps[0].title}
                className="h-32 mobile-md1:h-40 mobile:h-44 md:h-80 lg:h-96 rounded-full"
              />
            </motion.div>
          )}
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex pr-10 flex-1 flex-col items-start justify-around relative pt-9 pb-2 pl-4 w-full">
          <div className="absolute top-0 left-0 w-1 h-full bg-gray-300 flex flex-col justify-around items-center pb-24">
            {steps.map((step) => {
              if (currentStep === step.number)
                return (
                  <div
                    key={step.number}
                    className="flex items-center justify-center rounded-full w-5 h-5 bg-primary cursor-pointer"
                  >
                    <div className="rounded-full w-2 h-2 bg-[white]" />
                  </div>
                );
              else
                return (
                  <div
                    key={step.number}
                    className="rounded-full w-2 h-2 bg-primary cursor-pointer"
                    onClick={() => setCurrentStep(step.number)}
                  ></div>
                );
            })}
          </div>
          {steps.map((step) => {
            if (currentStep === step.number)
              return (
                <div key={step.number} className="mb-7 scale-110 origin-left">
                  <h5 className="text-[#999999] text-sm md:text-base lg:text-xs font-bold">
                    STEP {step.number}
                  </h5>
                  <h4 className="font-montserrat text-base md:text-lg lg:text-sm font-semibold">
                    {step.title}
                  </h4>
                  <h5 className="font-open-sans text-[#777777] text-xs md:text-sm lg:text-xs whitespace-pre-line">
                    {step.description}
                  </h5>
                </div>
              );
            else
              return (
                <div key={step.number} className="mb-7 opacity-30">
                  <h5 className="text-[#999999] text-sm md:text-base lg:text-xs font-bold">
                    STEP {step.number}
                  </h5>
                  <h4 className="font-montserrat text-base md:text-lg lg:text-sm font-semibold">
                    {step.title}
                  </h4>
                  <h5 className="font-open-sans text-[#777777] text-xs md:text-sm lg:text-xs">
                    {step.description}
                  </h5>
                </div>
              );
          })}
          {currentStep < 5 && (
            <div onClick={handleClick}>
              <Button type="contained" color="primary" size="medium">
                NEXT
              </Button>
            </div>
          )}
          {currentStep >= 5 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Link to="/browse/artworks">
                <Button type="contained" color="primary" size="medium">
                  Get Started
                </Button>
              </Link>
            </motion.div>
          )}
        </div>

        {/* Mobile View */}
        <div
          className={`${
            currentStep < 5
              ? "md:hidden flex flex-col items-start justify-center overflow-hidden"
              : ""
          }`}
        >
          <div
            className={`${
              currentStep < 5
                ? "flex flex-row relative top-5 overflow-hidden h-40 w-[35vw] mobile-sm:mb-2 mobile-md2:mb-5 mobile:mb-0"
                : ""
            }`}
          >
            {steps.map(
              (step) =>
                currentStep === step.number &&
                currentStep < 5 && (
                  <motion.div
                    key={step.number}
                    className="flex flex-col items-start justify-center w-[30vw] mobile-md2:min-w-[34vw]"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <h5 className="text-[#999999] text-[9px] mobile-md2:text-xs mobile-lg:text-sm font-bold">
                      STEP {step.number}
                    </h5>
                    <h4 className="font-montserrat text-[11px] mobile-md1:text-xs mobile-md2:text-sm mobile-lg:text-base font-semibold">
                      {step.title}
                    </h4>
                    <h5 className="font-open-sans text-[#777777] text-[10px] mobile-md2:text-[11px] mobile-lg:text-xs">
                      {step.description}
                    </h5>
                  </motion.div>
                )
            )}
          </div>
          {currentStep < 5 && (
            <motion.div
              onClick={handleClick}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Button type="contained" color="primary" size="medium">
                NEXT
              </Button>
            </motion.div>
          )}
        </div>

        {currentStep >= 5 && (
          <motion.div
            className="flex flex-col items-center min-h-[200px] md1:min-h-[232px] mobile:min-h-[248px] justify-center md:hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h5 className="my-5 text-[#333333] text-center text-lg">
              Explore a world of captivating artworks. Immerse yourself in
              creativity, discover unique masterpieces, and find the perfect
              piece to enrich your space. Begin your artistic journey now and
              browse our curated collection.
            </h5>
            <Link to="/browse/artworks">
              <Button type="contained" color="primary" size="large">
                Get Started
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default HowItWorks;
