import React, { useEffect, useState } from "react";
import Error from "../../assets/images/error.png";
import Card from "../Card/Card";
import Button from "../Button/Button";
import { FaPlus, FaCheckCircle } from "react-icons/fa";
import { RiEditCircleFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { IconContext } from "react-icons";
import UpdateArtworkModal from "../PopupModal/UpdateArtworkModal";

function Listings() {
  const navigate = useNavigate();
  const [sellerListings, setSellerListings] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [artworkToEdit, setArtworkToEdit] = useState("");

  const { user } = useSelector((state) => state.auth);

  // Function to fetch seller artworks
  const fetchSellerListings = async () => {
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

  useEffect(() => {
    // Fetch seller artworks on component mount
    fetchSellerListings();
  }, []);

  function handleClick(event, listing) {
    event.preventDefault();

    setIsOpen(true);
    setArtworkToEdit(listing);
  }

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
      {sellerListings.length === 0 ? (
        <div className="h-[70vh] flex items-center justify-center">
          <div className="flex flex-col items-center">
            <img src={Error} alt="Empty" className="h-[40vh]" />
            <h2 className="text-center text-3xl font-montserrat font-semibold mt-3">
              No listings to view!
            </h2>
          </div>
        </div>
      ) : (
        <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 items-center p-5 mt-5 shadow-xl rounded-lg bg-gray-200">
          {sellerListings.map((listing) => (
            <div key={listing._id} className="relative">
              {listing.status !== "pending" && (
                <div
                  onClick={(e) => handleClick(e, listing)}
                  className="absolute top-1 right-1 z-20 cursor-pointer bg-white rounded-full hover:scale-110"
                >
                  <IconContext.Provider
                    value={{
                      size: "2rem",
                      color: "red",
                    }}
                  >
                    <RiEditCircleFill />
                  </IconContext.Provider>
                </div>
              )}
              {listing.status === "sold" && (
                <div className="font-poppins absolute h-full w-full z-[1] bg-black bg-opacity-70 flex justify-center items-center">
                  <div className="text-4xl text-green-500 flex flex-col items-center gap-2">
                    <FaCheckCircle />
                    <h2 className="text-2xl">Sold</h2>
                  </div>
                </div>
              )}
              {listing.status === "pending" && (
                <div className="font-poppins absolute h-full w-full z-[1] bg-black bg-opacity-70 flex justify-center items-center">
                  <div className="text-4xl text-yellow-500 flex flex-col items-center gap-2">
                    <h2 className="text-2xl">Pending</h2>
                  </div>
                </div>
              )}
              {listing.status === "out of stock" && (
                <div className="font-poppins absolute h-full w-full z-[1] bg-black bg-opacity-70 flex justify-center items-center">
                  <div className="text-4xl text-red-600 flex flex-col items-center gap-2">
                    <h2 className="text-2xl">Out of Stock</h2>
                  </div>
                </div>
              )}
              <Card listing={listing} />
            </div>
          ))}
        </div>
      )}
      {isOpen && (
        <UpdateArtworkModal
          onClose={() => setIsOpen(false)}
          artworkToEdit={artworkToEdit}
          fetchSellerListings={fetchSellerListings}
        />
      )}
    </div>
  );
}

export default Listings;
