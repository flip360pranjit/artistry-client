import React from "react";
import "./Button.scss";

function Button({ children, type, color, size, layered }) {
  return (
    <button
      className={`btn ${type + "-" + color + " " + size} ${
        layered ? "z-[100]" : ""
      }`}
    >
      <span className="btn-txt flex items-center justify-center">
        {children}
      </span>
    </button>
  );
}

export default Button;
