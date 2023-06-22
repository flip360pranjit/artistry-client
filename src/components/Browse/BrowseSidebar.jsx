import React, { useEffect, useState } from "react";
import MultiRangeSlider from "./MultiRangeSlider";
import Filter from "./Filter";
import "./Browse.scss";

const categoryOptions = [
  "Abstract",
  "Landscape",
  "Portrait",
  "Still Life",
  "Anime",
  "Animals & Wildlife",
  "Nature",
  "Other",
];
const mediumOptions = [
  "Pencil Drawing",
  "Charcoal Drawing",
  "Digital Art",
  "Oil Painting",
  "Watercolour Painting",
  "Acrylic Painting",
  "Sculpture",
  "Other",
];

function BrowseSidebar({
  clearFilters,
  searchQuery,
  priceFilter,
  handleSearchQuery,
  handlePriceQuery,
  handleCategoryChange,
  handleMediumChange,
  isCleared,
}) {
  return (
    <div className="sidebar p-4 sm:sticky h-[85vh] sm:top-24 left-0 overflow-y-scroll">
      <div className="flex justify-end">
        <p
          onClick={clearFilters}
          className="font-poppins text-xs text-primary underline cursor-pointer"
        >
          Clear All
        </p>
      </div>
      {/* Filter options */}
      <div className="mt-4">
        <input
          type="search"
          className="block w-full h-7 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary text-xs font-poppins"
          name="search"
          id="search"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => handleSearchQuery(e.target.value)}
        />
      </div>
      <div className="mt-5">
        <label htmlFor="range" className="font-poppins text-base font-semibold">
          Price Range
        </label>
        <MultiRangeSlider
          priceFilter={priceFilter}
          handlePriceQuery={handlePriceQuery}
        />
        <div className="flex justify-between mt-2">
          <input
            type="number"
            name="min"
            id="min"
            min={0}
            value={priceFilter.min}
            onChange={(e) =>
              handlePriceQuery({ min: e.target.value, max: priceFilter.max })
            }
            className="block w-20 h-7 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary text-xs font-poppins"
          />
          <div className="relative">
            <input
              type="number"
              name="max"
              id="max"
              max={10000}
              value={priceFilter.max}
              onChange={(e) =>
                handlePriceQuery({ min: priceFilter.min, max: e.target.value })
              }
              className="block w-20 h-7 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary text-xs font-poppins"
            />
            {priceFilter.max >= 10000 && (
              <p className="text-gray-900 text-xs font-poppins absolute top-1.5 left-12">
                +
              </p>
            )}
          </div>
        </div>
        <div className="">
          <Filter
            name="Category"
            options={categoryOptions}
            onChange={handleCategoryChange}
            isCleared={isCleared}
          />
          <Filter
            name="Medium"
            options={mediumOptions}
            onChange={handleMediumChange}
            isCleared={isCleared}
          />
        </div>
      </div>
    </div>
  );
}

export default BrowseSidebar;
