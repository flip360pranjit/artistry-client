import React, { useEffect, useState } from "react";
import Hero from "../components/Hero/Hero";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import FeaturedArtworks from "../components/Featured/FeaturedArtworks";
import FeaturedArtists from "../components/Featured/FeaturedArtists";
import Testimonials from "../components/Testimonials/Testimonials";
import axios from "axios";

function Home() {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    // Function to fetch seller artworks
    const fetchArtworks = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/artworks`
        );
        const artworks = response.data;
        setArtworks(artworks);
      } catch (error) {
        console.log(error);
      }
    };

    // Fetch seller artworks on component mount
    fetchArtworks();
  }, []);

  return (
    <div className="mx-4 md:mx-20">
      <div className="h-16 md:h-10"></div>
      <Hero />
      <HowItWorks />
      <FeaturedArtists />
      <FeaturedArtworks
        featuredArtworksData={artworks}
        heading="Featured Artworks"
        description="Explore a Curated Collection of Captivating Artworks, Showcasing the
        Beauty and Diversity of Artistic Expression."
      />
      <Testimonials />
    </div>
  );
}

export default Home;
