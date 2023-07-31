import React, { useEffect, useState } from "react";
import ArtistCard from "../components/Card/ArtistCard";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingAnimation from "../components/LoadingAnimation/LoadingAnimation";
import Empty from "../assets/images/success.png";
import EmptyWebp from "../assets/images/success.webp";
import { isWebpSupported } from "react-image-webp/dist/utils";

function CommissionedArtists() {
  const [loading, setLoading] = useState(false);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    // Function to fetch seller artworks
    const fetchArtists = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/users/sellers`
        );
        setLoading(false);
        const fetchedArtists = response.data;
        const latestArtists = [...fetchedArtists].reverse();

        setArtists(latestArtists);
      } catch (error) {
        // toast.error("Error! Try checking your connection.");
        // console.log(error);
        setLoading(false);
        toast.error("Something went wrong!");
      }
    };

    // Fetch seller artworks on component mount
    fetchArtists();
  }, []);

  return (
    <div
      className={`bg-[#f4e7d3] pt-24 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8 mx-4 md:mx-20 rounded-b-3xl shadow-xl ${
        loading && "min-h-[calc(100vh-15px)]"
      }`}
    >
      <h1 className="sm:mt-10 text-2xl text-center font-poppins font-bold tracking-tight text-gray-900 sm:text-4xl mb-12">
        Artists available for Commissioned Work
      </h1>
      {loading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <LoadingAnimation />
        </div>
      ) : artists.length === 0 ? (
        <div className="flex justify-center items-center h-[50vh]">
          <div className="flex flex-col items-center gap-5">
            <img
              src={isWebpSupported() ? EmptyWebp : Empty}
              alt="No artworks"
              className="h-[40vh] w-auto"
            />
            <h3 className="font-poppins text-2xl text-[#555555]">
              No artist available currently. Stay tuned!
            </h3>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {artists.map((artist) => (
            <ArtistCard key={artist._id} artist={artist} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CommissionedArtists;
