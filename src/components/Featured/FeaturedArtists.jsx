import React, { useEffect, useState } from "react";
import ArtistCard from "../Card/ArtistCard";
import axios from "axios";
import ImagePlaceholder from "../LoadingAnimation/ImagePlaceholder";

const placeholderArtists = [
  { id: 1, name: "Artist 1" },
  { id: 2, name: "Artist 2" },
  { id: 3, name: "Artist 3" },
  { id: 4, name: "Artist 4" },
];

function FeaturedArtists() {
  const [loading, setLoading] = useState(false);
  const [artists, setArtists] = useState([]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleWindowResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

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
        setLoading(false);
      }
    };

    // Fetch seller artworks on component mount
    fetchArtists();
  }, []);
  return (
    artists.length !== 0 && (
      <section
        id="featured"
        className="bg-[#f4e7d3] rounded-3xl px-6 py-14 mt-10"
      >
        <h2 className="text-[#333333] text-2xl md:text-3xl lg:text-4xl text-center font-bold mb-6 font-montserrat">
          Featured Artists
        </h2>
        <h4 className="text-[#555555] text-sm md:text-base lg:text-lg text-center font-normal mb-6 font-poppins">
          Discover talented artists from around the world showcasing their
          incredible artwork. Explore their unique styles and find inspiration
          for your own artistic journey.
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? placeholderArtists
                .slice(
                  0,
                  windowWidth < 640
                    ? 1
                    : windowWidth < 768
                    ? 2
                    : windowWidth < 1024
                    ? 3
                    : 4
                )
                .map((artist) => (
                  <div key={artist.id} className="h-[40vh] max-h-[300px]">
                    <ImagePlaceholder />
                  </div>
                ))
            : artists.map((artist) => (
                <ArtistCard key={artist._id} artist={artist} />
              ))}
        </div>
      </section>
    )
  );
}

export default FeaturedArtists;
