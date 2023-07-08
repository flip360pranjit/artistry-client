import React from "react";
import { useSelector } from "react-redux";

function Account() {
  const { user } = useSelector((state) => state.auth);

  // console.log(user);

  return (
    <div>
      <div className="px-5 mb-5">
        <h1 className="text-3xl font-poppins font-semibold text-center md:text-left">
          My Account
        </h1>
        <p className="text-base font-open-sans text-center md:text-left text-[#555555]">
          Access and update your personal information
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 item-center bg-white font-poppins p-5 text-[#2c2525] rounded-lg shadow-xl mt-10">
        <div className="py-5 sm:pr-10 sm:pl-5">
          <h2 className="font-semibold text-xl text-[#333333]">
            Profile Photo
          </h2>
          <img
            src={user.photoURL}
            alt="Profile Photo"
            className="mt-3 rounded-xl"
          />
        </div>

        <div className="sm:col-span-2">
          {/* Full Name */}
          <div className="grid grid-cols-2 sm:grid-cols-3 border-b py-8">
            <h3 className="font-semibold">Full Name</h3>
            <h3 className="sm:col-span-2 text-right">{user.displayName}</h3>
          </div>

          {/* Email */}
          <div className="grid grid-cols-2 sm:grid-cols-3 border-b py-8">
            <h3 className="font-semibold">Email</h3>
            <h3 className="sm:col-span-2 text-right">{user.email}</h3>
          </div>

          {/* Seller? */}
          <div className="grid grid-cols-2 sm:grid-cols-3 border-b py-8">
            <h3 className="font-semibold">Registered as Seller</h3>
            <h3 className="sm:col-span-2 text-right">
              {user.isSeller ? "Yes" : "No"}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
