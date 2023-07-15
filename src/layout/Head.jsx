import React from "react";
import { Helmet } from "react-helmet-async";

function Head({ title, description, url }) {
  const image =
    "https://res.cloudinary.com/dgjsucqux/image/upload/v1689413112/artistry/assets/Screenshot_33_k1siw3.png";
  return (
    <Helmet>
      <title>{title} - Artistry</title>
      <meta name="description" content={description} />

      {/* Open Graph meta tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />

      {/* Twitter meta tags */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}

export default Head;
