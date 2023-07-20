import React, { useEffect, useState, Fragment } from "react";
import BrowseSidebar from "./BrowseSidebar";
import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import ProductCard from "../Card/ProductCard";
import { FaChevronDown, FaTimes } from "react-icons/fa";
import { ImEqualizer2 } from "react-icons/im";
import { motion, AnimatePresence } from "framer-motion";
import FilterError from "../../assets/images/filtererror.png";
import { useDispatch } from "react-redux";
import { resetCheckout } from "../../store/slices/CheckoutSlice";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import { toast } from "react-toastify";

function Browse() {
  const dispatch = useDispatch();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [artworks, setArtworks] = useState([]);
  const [sortBy, setSortBy] = useState("Featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState({
    min: 0,
    max: 10000,
  });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedMediums, setSelectedMediums] = useState([]);
  const [isCleared, setIsCleared] = useState(false);
  const [clickedReview, setClickedReview] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Handle window resize
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
    const fetchArtworks = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/artworks`
        );
        const artworks = response.data;
        setArtworks(artworks);
      } catch (error) {
        // console.log(error);
        toast.error("Something went wrong!");
      }
    };

    // Fetch seller artworks on component mount
    fetchArtworks();
    dispatch(resetCheckout());
  }, [dispatch]);

  const featured = [artworks[6], artworks[0], artworks[2]];

  // Filter handlers
  function clearFilters(event) {
    event.preventDefault();

    setSearchQuery("");
    setPriceFilter({
      min: 0,
      max: 10000,
    });
    setSelectedCategories([]);
    setSelectedMediums([]);
    setIsCleared(true);
  }
  function handleSearchQuery(value) {
    setIsCleared(false);
    setSearchQuery(value);
  }
  function handlePriceQuery(range) {
    setIsCleared(false);
    setPriceFilter({
      min: range.min < 0 ? 0 : range.min,
      max: range.max > 10000 ? 10000 : range.max,
    });
  }
  function handleCategoryChange(selectedOptions) {
    setIsCleared(false);
    setSelectedCategories(selectedOptions);
  }
  function handleMediumChange(selectedOptions) {
    setIsCleared(false);
    setSelectedMediums(selectedOptions);
  }

  // Filtered Artworks
  const filteredArtworks = artworks
    .filter((artwork) =>
      artwork.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((artwork) => {
      return (
        artwork.price >= priceFilter.min && artwork.price <= priceFilter.max
      );
    });
  // Function to filter the artworks based on selected options
  function selectedArtworks() {
    if (selectedCategories.length === 0 && selectedMediums.length === 0) {
      // No categories or mediums selected, return all artworks
      return filteredArtworks;
    } else if (selectedCategories.length > 0 && selectedMediums.length === 0) {
      // Only categories selected, filter based on categories
      return filteredArtworks.filter((artwork) =>
        selectedCategories.includes(artwork.category)
      );
    } else if (selectedCategories.length === 0 && selectedMediums.length > 0) {
      // Only mediums selected, filter based on mediums
      return filteredArtworks.filter((artwork) =>
        selectedMediums.includes(artwork.medium)
      );
    } else {
      // Both categories and mediums selected, filter based on both
      return filteredArtworks.filter(
        (artwork) =>
          selectedCategories.includes(artwork.category) &&
          selectedMediums.includes(artwork.medium)
      );
    }
  }
  // Sorted Artworks
  const sortedArtworks = selectedArtworks().sort((a, b) => {
    if (sortBy === "Featured") {
      if (!featured.includes(a) && featured.includes(b)) {
        return 1;
      } else if (featured.includes(a) && !featured.includes(b)) {
        return -1;
      } else return 0;
    } else if (sortBy === "Price: Low to High") {
      return a.price > b.price ? 1 : -1;
    } else if (sortBy === "Price: High to Low") {
      return a.price < b.price ? 1 : -1;
    } else if (sortBy === "Avg Customer Reviews") {
      return a.review?.length > b.review?.length ? 1 : -1;
    } else return 0;
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [artworksPerPage, setArtworksPerPage] = useState(20);

  const numberOfPages = Math.ceil(sortedArtworks.length / artworksPerPage);
  const lastIndex = currentPage * artworksPerPage;
  const firstIndex = lastIndex - artworksPerPage;
  const pageNumbers = [...Array(numberOfPages + 1).keys()].slice(1);

  const pageArtworks = sortedArtworks.slice(firstIndex, lastIndex);

  function handlePreviousPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  function handleNextPage() {
    if (currentPage !== numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  function handlePageClick(n) {
    setCurrentPage(n);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="pt-20 md:pt-[55px] min-h-screen">
      {windowWidth < 640 && isSidebarOpen && (
        <div className="bg-black h-screen w-screen fixed z-[55] opacity-70"></div>
      )}
      <div className="flex bg-primary px-5 py-2 justify-between items-center fixed top-[74px] sm:sticky sm:top-[52px] w-full z-50">
        <div
          onClick={() => setIsSidebarOpen(true)}
          className="flex items-center font-poppins gap-2 text-sm text-white sm:hidden cursor-pointer"
        >
          <ImEqualizer2 /> Filter
        </div>
        <p className="text-white text-xs sm:text-sm font-poppins hidden mobile-sm:block">
          {firstIndex + 1}-{pageArtworks.length + firstIndex} for over{" "}
          {artworks.length} results
        </p>
        <div className="block">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-xs text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                Sort by:{" "}
                <span className="font-semibold hidden sm:block">{sortBy}</span>
                <FaChevronDown />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <p
                        className={`hover:bg-blue-100 cursor-pointer ${
                          (active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm")
                        }`}
                        onClick={() => setSortBy("Featured")}
                      >
                        Featured
                      </p>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <p
                        className={`hover:bg-blue-100 cursor-pointer ${
                          (active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm")
                        }`}
                        onClick={() => setSortBy("Price: Low to High")}
                      >
                        Price: Low to High
                      </p>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <p
                        className={`hover:bg-blue-100 cursor-pointer ${
                          (active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm")
                        }`}
                        onClick={() => setSortBy("Price: High to Low")}
                      >
                        Price: High to Low
                      </p>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <p
                        className={`hover:bg-blue-100 cursor-pointer ${
                          (active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm")
                        }`}
                        onClick={() => setSortBy("Avg Customer Reviews")}
                      >
                        Avg Customer Reviews
                      </p>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      <div className="flex relative">
        {windowWidth < 640 ? (
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div
                initial={{ x: "-100vw", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100vw", opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-200 block h-screen fixed z-[60]"
              >
                <div
                  onClick={() => setIsSidebarOpen(false)}
                  className="absolute -right-6 cursor-pointer"
                >
                  <FaTimes className="h-7 text-gray-100" />
                </div>
                <BrowseSidebar
                  clearFilters={clearFilters}
                  searchQuery={searchQuery}
                  priceFilter={priceFilter}
                  handleSearchQuery={handleSearchQuery}
                  handlePriceQuery={handlePriceQuery}
                  handleCategoryChange={handleCategoryChange}
                  handleMediumChange={handleMediumChange}
                  isCleared={isCleared}
                />
              </motion.div>
            )}
          </AnimatePresence>
        ) : (
          <div className="bg-gray-200 block w-1/5 min-h-screen relative">
            <BrowseSidebar
              clearFilters={clearFilters}
              searchQuery={searchQuery}
              priceFilter={priceFilter}
              handleSearchQuery={handleSearchQuery}
              handlePriceQuery={handlePriceQuery}
              handleCategoryChange={handleCategoryChange}
              handleMediumChange={handleMediumChange}
              isCleared={isCleared}
            />
          </div>
        )}
        <div className="w-full sm:w-4/5 px-2 sm:px-7 pt-3 pb-20 md:pb-[55px] mt-8 sm:mt-0 min-h-screen">
          {artworks.length === 0 ? (
            <div className="h-[90%] flex items-center justify-center">
              <LoadingAnimation />
            </div>
          ) : pageArtworks.length === 0 ? (
            <div className="h-[90%] flex items-center justify-center">
              <div className="flex flex-col items-center font-poppins max-w-xl">
                <img
                  src={FilterError}
                  alt="Filter Error"
                  className="h-[40vh] w-auto"
                />
                <h2 className="font-bold text-5xl text-center mt-2">Oops!</h2>
                <p className="text-lg text-[#555555] text-center mt-2">
                  No artworks found with the selected filters. Please try
                  different filter options to explore more artworks.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {pageArtworks.map((artwork) => (
                <ProductCard
                  key={artwork._id}
                  artwork={artwork}
                  clickedReview={clickedReview}
                  setClickedReview={setClickedReview}
                  sortBy={sortBy}
                />
              ))}
            </div>
          )}

          <ul className="flex items-center justify-center gap-2 text-sm mt-7">
            <li>
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1 ? true : false}
                className={`p-2 text-white rounded-l-lg ${
                  currentPage === 1
                    ? "bg-gray-400"
                    : "bg-primary hover:bg-primary-hover"
                }`}
              >
                Previous
              </button>
            </li>
            {windowWidth >= 768 &&
              pageNumbers.map((n, i) => (
                <li key={i}>
                  <button
                    onClick={() => {
                      handlePageClick(n);
                    }}
                    className={`py-2 px-4 hover:bg-primary hover:text-white ${
                      currentPage === n && "bg-primary-hover text-white"
                    }`}
                  >
                    {n}
                  </button>
                </li>
              ))}
            <li>
              <button
                onClick={handleNextPage}
                disabled={currentPage === numberOfPages ? true : false}
                className={`p-2 px-4 text-white rounded-r-lg ${
                  currentPage === numberOfPages
                    ? "bg-gray-400"
                    : "bg-primary hover:bg-primary-hover"
                }`}
              >
                Next
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Browse;
