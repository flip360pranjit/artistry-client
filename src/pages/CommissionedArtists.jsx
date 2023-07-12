import React, { useEffect, useState } from "react";
import ArtistCard from "../components/Card/ArtistCard";
import axios from "axios";

function CommissionedArtists() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    // Function to fetch seller artworks
    const fetchArtists = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/users/sellers`
        );
        const fetchedArtists = response.data;
        const latestArtists = [...fetchedArtists].reverse();

        setArtists(latestArtists);
      } catch (error) {
        // toast.error("Error! Try checking your connection.");
        console.log(error);
      }
    };

    // Fetch seller artworks on component mount
    fetchArtists();
  }, []);

  return (
    <div className="bg-[#f4e7d3] pt-24 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8 mx-4 md:mx-20 rounded-b-3xl shadow-xl">
      <h1 className="text-2xl text-center font-poppins font-bold tracking-tight text-gray-900 sm:text-4xl mb-12">
        Artists available for Commissioned Work
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {artists.map((artist) => (
          <ArtistCard key={artist._id} artist={artist} />
        ))}
      </div>
    </div>
  );
}

export default CommissionedArtists;
