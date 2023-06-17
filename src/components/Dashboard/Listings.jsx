import React, { useEffect, useState } from "react";
import sellerListings from "../../api/sellerListings.json";
import Card from "../Card/Card";
import Button from "../Button/Button";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function Listings() {
  const navigate = useNavigate();
  const [sellerListings, setSellerListings] = useState([]);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Function to fetch seller artworks
    const fetchsellerListings = async () => {
      try {
        const sellerId = user._id; // Replace with the actual seller ID
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
    <div>
      <div className="px-7 mt-3">
        <h1 className="text-2xl font-poppins text-center md:text-left">
          My Listings
        </h1>
        <p className="text-base font-open-sans text-center md:text-left text-[#666666]">
          Explore your listed arts and paintings below. Edit or delete listings
          as needed to manage your collection.
        </p>
        <div className="flex justify-center md:justify-start mt-3">
          <div onClick={() => navigate("/dashboard/add-artwork")}>
            <Button type="outlined" size="medium" color="primary">
              <FaPlus />
              New Artwork
            </Button>
          </div>
        </div>
      </div>
      <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 items-center p-5 mt-5 shadow-xl rounded-lg bg-gray-200">
        {sellerListings.map((listing) => (
          <Card key={listing._id} listing={listing} />
        ))}
      </div>
    </div>
  );
}

export default Listings;
