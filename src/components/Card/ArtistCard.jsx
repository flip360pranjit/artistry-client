import React from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import Button from "../Button/Button";

function ArtistCard({ artist }) {
  const navigate = useNavigate();

  function viewArtist(event) {
    event.preventDefault();

    navigate("/view-artist", { state: { artist } });
  }

  return (
    <div
      key={artist._id}
      className="bg-white rounded-lg p-6 shadow-lg relative cursor-pointer group font-montserrat flex flex-col justify-between"
    >
      <div>
        <img
          src={artist.photoURL}
          alt={artist.displayName}
          className="w-full h-auto rounded-lg mb-4"
        />
        <h3 className="text-lg font-semibold mb-2 text-center">
          {artist.displayName}
        </h3>
        <p className="text-sm text-gray-600 mb-2 flex flex-row items-center justify-center gap-2">
          <MdLocationPin />
          {`${artist.sellerDetails.city}, ${artist.sellerDetails.country}`}
        </p>
      </div>

      {/* View More Button */}
      <div className="flex justify-center">
        <Button type="contained" color="primary" size="small" layered={true}>
          <span onClick={viewArtist}>View More</span>
        </Button>
      </div>

      {/* Social Links */}
      <div className="absolute left-0 bottom-0 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 w-full bg-primary text-white p-4 rounded-t-lg shadow-lg transition-all ease-in-out duration-300 pb-16 lg:pb-20">
        <div className="flex justify-center space-x-4">
          {artist.sellerDetails.facebook && (
            <a
              href={artist.sellerDetails.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-white hover:text-gray-200 transition-colors duration-300" />
            </a>
          )}
          {artist.sellerDetails.instagram && (
            <a
              href={artist.sellerDetails.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-white hover:text-gray-200 transition-colors duration-300" />
            </a>
          )}
          {artist.sellerDetails.youtube && (
            <a
              href={artist.sellerDetails.youtube}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube className="text-white hover:text-gray-200 transition-colors duration-300" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArtistCard;
