import React, { useEffect, useRef, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { removeUser } from "../../store/slices/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ProfileIcon() {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Collapse Profile Menu on background click
  const imgRef = useRef();
  const menuRef = useRef();

  const { user } = useSelector((state) => state.auth);

  window.addEventListener("click", (event) => {
    if (event.target !== menuRef.current && event.target !== imgRef.current) {
      setIsOpen(false);
    }
  });

  // Handle Profile Icon Click
  function handleClick(event) {
    event.preventDefault();

    setIsOpen(!isOpen);
  }

  // Logout User
  function handleLogout(event) {
    event.preventDefault();

    const auth = getAuth();
    signOut(auth)
      .then(() => {
        toast.success("Logged out successfully!");
        navigate("/");
        dispatch(removeUser());
      })
      .catch((err) => {
        toast.error("Oops, something went wrong!");
      });
  }

  return (
    <div className="relative">
      <img
        ref={imgRef}
        onClick={handleClick}
        src={user?.photoURL}
        alt="ProfileImg"
        className="w-10 h-10 object-cover rounded-full border-2 border-primary cursor-pointer active:scale-110"
      />
      {isOpen && (
        <ul
          ref={menuRef}
          className="bg-white p-3 w-40 shadow-lg rounded-md absolute right-0"
        >
          <li
            key="displayName"
            className="p-2 text-sm font-bold border-b-2 mb-4"
          >
            Hi! {user.displayName}
          </li>
          {user?.isSeller && (
            <Link key="Seller" to="/dashboard">
              <li
                key="Seller"
                className="p-2 text-sm rounded cursor-pointer hover:bg-violet-100"
              >
                Seller Dashboard
              </li>{" "}
            </Link>
          )}
          <Link key="Buyer" to="/profile">
            <li
              key="Buyer"
              className="p-2 text-sm rounded cursor-pointer hover:bg-violet-100"
            >
              View Profile
            </li>
          </Link>

          <Link key="Wishlist" to="/wishlist">
            {" "}
            <li
              key="Wishlist"
              className="p-2 text-sm rounded cursor-pointer hover:bg-violet-100"
            >
              My Wishlist
            </li>
          </Link>
          <Link key="cart" to="/cart">
            <li
              key="cart"
              className="p-2 text-sm rounded cursor-pointer hover:bg-violet-100"
            >
              View Cart
            </li>
          </Link>
          <li
            key="Logout"
            onClick={handleLogout}
            className="flex flex-row items-center gap-2 p-2 text-sm rounded bg-primary text-white cursor-pointer mt-4 hover:bg-primary-hover"
          >
            Logout <FiLogOut />
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileIcon;
