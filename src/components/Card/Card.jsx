import React from "react";
import Button from "../Button/Button";

function Card({ listing }) {
  function viewListing() {}
  return (
    <div className="flex flex-col h-max rounded-lg group relative cursor-pointer">
      <img src={listing.image} alt={listing._id} className="" />
      <div className="absolute left-0 bottom-0 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all ease-in-out duration-300 py-2 bg-primary text-white rounded-t-lg w-full">
        <h4 className="font-playfair-display text-base text-center">
          {listing.title}
        </h4>
        <div className="flex justify-between items-center p-2">
          <h5 className="">Rs. {listing.price}</h5>
          <div onClick={viewListing}>
            <Button
              type="contained"
              size="small"
              color="primary"
              layered={true}
            >
              View
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
