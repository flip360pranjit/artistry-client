import React from "react";
import { FaStar } from "react-icons/fa";

function TestimonialCard({ testimonial }) {
  function numbers(rating) {
    let array = [];
    for (let i = 1; i <= rating; i++) {
      array.push(<FaStar key={i} />);
    }
    return array;
  }

  return (
    <div className="bg-white shadow-lg p-12 rounded-lg my-5 h-full">
      <div className="text-[#ffd700] flex flex-row gap-2">
        {numbers(testimonial.rating)}
      </div>
      <h3 className="text-2xl sm:text-3xl font-bold mt-5 text-[#333333]">
        {testimonial.heading}
      </h3>
      <p className="leading-relaxed mt-4 text-[#555555]">
        {testimonial.description}
      </p>
      <p className="text-sm font-semibold text-primary mt-8">
        @{testimonial.name}
      </p>
    </div>
  );
}

export default TestimonialCard;
