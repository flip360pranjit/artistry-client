import React from "react";
import sellerListings from "../../api/sellerListings.json";
import Card from "../Card/Card";

function Listings() {
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
      </div>
      <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 items-center p-2 pt-5">
        {sellerListings.map((listing) => (
          <Card key={listing._id} listing={listing} />
        ))}
      </div>
    </div>
  );
}

export default Listings;
