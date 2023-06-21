import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function MultirangeSlider({ priceFilter, handlePriceQuery }) {
  const handleSliderChange = (newPriceRange) => {
    handlePriceQuery({
      min: newPriceRange[0],
      max: newPriceRange[1],
    });
  };

  return (
    <div className="mt-1 mx-2">
      <Slider
        range
        min={0}
        max={10000}
        value={[priceFilter.min, priceFilter.max]}
        onChange={handleSliderChange}
        railStyle={{ backgroundColor: "white" }}
        trackStyle={[{ backgroundColor: "#cca300" }]}
        handleStyle={[
          {
            borderColor: "#3c166d",
            backgroundColor: "#3c166d",
            opacity: "1",
          },
          {
            borderColor: "#3c166d",
            backgroundColor: "#3c166d",
            opacity: "1",
          },
        ]}
      />
    </div>
  );
}

export default MultirangeSlider;
