import React, { useEffect, useRef, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { removeUser } from "../../store/slices/AuthSlice";
import { useNavigate } from "react-router-dom";
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
    <div className={`relative $`}>
      <img
        ref={imgRef}
        onClick={handleClick}
        src={user?.photoURL}
        alt="ProfileImg"
        className="w-10 h-10 xl:w-12 xl:h-12 object-cover rounded-full border-2 border-primary cursor-pointer active:scale-110"
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
          <li
            key="Profile"
            className="p-2 text-sm rounded cursor-pointer hover:bg-violet-100"
          >
            <a href="/profile"> View Profile</a>
          </li>
          {user?.isSeller && (
            <li
              key="Listings"
              className="p-2 text-sm rounded cursor-pointer hover:bg-violet-100"
            >
              <a href="/listings"> My Listings </a>
            </li>
          )}
          <li
            key="Wishlist"
            className="p-2 text-sm rounded cursor-pointer hover:bg-violet-100"
          >
            <a href="/wishlist"> My Wishlist</a>
          </li>
          <li
            key="cart"
            className="p-2 text-sm rounded cursor-pointer hover:bg-violet-100"
          >
            <a href="/cart"> View Cart</a>
          </li>
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
