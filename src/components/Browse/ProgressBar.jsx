import React from "react";
import { FaStar } from "react-icons/fa";

function ProgressBar({ rating, count, value }) {
  return (
    <div className="flex justify-between gap-2 items-center mb-3">
      <h6 className="text-xs text-open-sans text-teal-600 flex items-center">
        {rating} <FaStar className="text-[#ff8400]" />
      </h6>
      <div className="w-full h-3 bg-gray-200 rounded-sm">
        <div className={`h-3 bg-[#ff8400] rounded-sm w-[${value}%]`}></div>
      </div>
      <h6 className="text-xs text-open-sans text-teal-600 flex">
        {count}ratings
      </h6>
    </div>
  );
}

export default ProgressBar;
