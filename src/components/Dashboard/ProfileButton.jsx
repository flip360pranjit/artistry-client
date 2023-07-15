import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ProfileButton({ size }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <Link to="/profile">
        <img
          referrerPolicy="no-referrer"
          src={user?.photoURL}
          alt="ProfileImg"
          className={`object-cover rounded-full border-2 cursor-pointer active:scale-110 ${
            size === "small"
              ? "w-10 h-10 border-primary"
              : "w-20 h-20 border-white hover:scale-110"
          }`}
        />
      </Link>
    </div>
  );
}

export default ProfileButton;
