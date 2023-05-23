import React from "react";
import "./Button.scss";

function Button({ children, type, color, size }) {
  return (
    <button className={`btn ${type + "-" + color + " " + size}`}>
      <span className="btn-txt">{children}</span>
    </button>
  );
}

export default Button;
