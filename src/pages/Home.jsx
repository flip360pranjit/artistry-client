import React from "react";
import Hero from "../components/Hero/Hero";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import FeaturedArtworks from "../components/Featured/FeaturedArtworks";
import FeaturedArtists from "../components/Featured/FeaturedArtists";
import Testimonials from "../components/Testimonials/Testimonials";

function Home() {
  return (
    <div>
      <div className="h-16 md:h-10"></div>
      <Hero />
      <HowItWorks />
      <FeaturedArtists />
      <FeaturedArtworks />
      <Testimonials />
    </div>
  );
}

export default Home;
