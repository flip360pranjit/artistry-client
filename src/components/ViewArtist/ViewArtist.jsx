import axios from "axios";
import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { FaFacebook, FaInstagram, FaUserAlt, FaYoutube } from "react-icons/fa";
import { IoLocationSharp, IoMail } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import Card from "../Card/Card";

function ViewArtist() {
  const location = useLocation();
  const artist = location.state.artist;
  const [sellerListings, setSellerListings] = useState([]);

  useEffect(() => {
    // Function to fetch seller artworks
    const fetchsellerListings = async () => {
      try {
        const sellerId = artist._id; // Replace with the actual seller ID
        const response = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_API_URL
          }/artworks/seller-artworks/${sellerId}`
        );
        const artworks = response.data;
        setSellerListings(artworks);
      } catch (error) {
        console.log(error);
      }
    };

    // Fetch seller artworks on component mount
    fetchsellerListings();
  }, []);

  return (
    <div className="bg-[#f4e7d3] font-poppins pt-24 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8 mx-4 md:mx-20 rounded-b-3xl shadow-xl">
      <h1 className="text-2xl text-center font-poppins font-bold tracking-tight text-gray-900 sm:text-4xl mb-5">
        Artist Profile
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 items-center bg-white p-5">
        <div className="flex items-center justify-center p-5 pr-10">
          <img src={artist.photoURL} alt="Profile Photo" className="" />
        </div>
        <div className="text-lg text-[#444444]">
          <div className="grid grid-cols-3 py-5 border-b">
            <h3 className="font-semibold flex items-center gap-2">
              <FaUserAlt />
              Full Name
            </h3>
            <h3 className="col-span-2 text-right">{artist.displayName}</h3>
          </div>
          <div className="grid grid-cols-3 py-5 border-b">
            <h3 className="font-semibold flex items-center gap-2">
              <IoMail />
              Email
            </h3>
            <h3 className="col-span-2 text-right">{artist.email}</h3>
          </div>
          {artist.isSeller && (
            <div className="grid grid-cols-3 py-5 border-b">
              <h3 className="font-semibold flex items-center gap-2">
                <IoLocationSharp />
                Location
              </h3>
              <h3 className="col-span-2 text-right">{`${artist.sellerDetails.city}, ${artist.sellerDetails.country}`}</h3>
            </div>
          )}
          <IconContext.Provider value={{ size: "1.5rem" }}>
            <div className="flex items-center justify-center gap-5 mt-10">
              {artist.sellerDetails.instagram !== 0 && (
                <a
                  href={artist.sellerDetails.instagram}
                  target="_blank"
                  className="cursor-pointer hover:text-[#222222]"
                >
                  <FaInstagram />
                </a>
              )}
              {artist.sellerDetails.youtube !== 0 && (
                <a
                  href={artist.sellerDetails.youtube}
                  target="_blank"
                  className="cursor-pointer hover:text-[#222222]"
                >
                  <FaYoutube />
                </a>
              )}
              {artist.sellerDetails.facebook !== 0 && (
                <a
                  href={artist.sellerDetails.facebook}
                  target="_blank"
                  className="cursor-pointer hover:text-[#222222]"
                >
                  {" "}
                  <FaFacebook />
                </a>
              )}
            </div>
          </IconContext.Provider>
        </div>
      </div>

      {sellerListings.length !== 0 && (
        <h1 className="col-span-full text-2xl text-center font-poppins font-bold tracking-tight text-gray-900 sm:text-4xl mt-12 mb-5">
          Current Listings
        </h1>
      )}

      {sellerListings.length !== 0 && (
        <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 items-center p-5 mt-5 shadow-xl rounded-lg bg-gray-200">
          {sellerListings.map((listing) => (
            <Card key={listing._id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewArtist;
