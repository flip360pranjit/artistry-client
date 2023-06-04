import React from "react";
import featuredArtistsData from "../../api/featuredArtistsData";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

function FeaturedArtists() {
  return (
    <section
      id="featured"
      className="bg-[#f4e7d3] rounded-3xl px-6 py-14 mt-10"
    >
      <h2 className="text-[#333333] text-2xl md:text-3xl lg:text-4xl text-center font-bold mb-6 font-montserrat">
        Featured Artists
      </h2>
      <h4 className="text-[#555555] text-sm md:text-base lg:text-lg text-center font-normal mb-6 font-poppins">
        Discover talented artists from around the world showcasing their
        incredible artwork. Explore their unique styles and find inspiration for
        your own artistic journey.
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featuredArtistsData.map((artist) => (
          <div
            key={artist.id}
            className="bg-white rounded-lg p-6 shadow-lg relative cursor-pointer group font-montserrat flex flex-col justify-between"
          >
            <div>
              <img
                src={`./images/${artist.profilePhoto}`}
                alt={artist.name}
                className="w-full h-auto rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold mb-2 text-center">
                {artist.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2 flex flex-row items-center justify-center gap-2">
                <MdLocationPin />
                {artist.location}
              </p>
            </div>

            {/* View More Button */}
            <div className="flex justify-center">
              <Button
                type="contained"
                color="primary"
                size="small"
                layered={true}
              >
                <Link to={artist.profileUrl}>View More</Link>
              </Button>
            </div>

            {/* Social Links */}
            <div className="absolute left-0 bottom-0 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 w-full bg-primary text-white p-4 rounded-t-lg shadow-lg transition-all ease-in-out duration-300 pb-16 lg:pb-20">
              <div className="flex justify-center space-x-4">
                {artist.socials.facebook && (
                  <a
                    href={artist.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebook className="text-white hover:text-gray-200 transition-colors duration-300" />
                  </a>
                )}
                {artist.socials.instagram && (
                  <a
                    href={artist.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram className="text-white hover:text-gray-200 transition-colors duration-300" />
                  </a>
                )}
                {artist.socials.youtube && (
                  <a
                    href={artist.socials.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaYoutube className="text-white hover:text-gray-200 transition-colors duration-300" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedArtists;
