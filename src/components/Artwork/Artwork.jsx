import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Artwork() {
  const location = useLocation();
  const artwork = location.state.artwork;

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <h1 className="">Artwork</h1>
      <h2>Artwork Title: {artwork.title}</h2>
      <p className="">Price: {artwork.price}</p>
    </div>
  );
}

export default Artwork;
