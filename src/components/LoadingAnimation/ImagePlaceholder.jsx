import React from "react";
import "./ImagePlaceholder.scss";

export default function ImagePlaceholder() {
  return (
    <div className={`image-placeholder-animation image-loading`}>
      <div className="placeholder-animation"></div>
    </div>
  );
}
