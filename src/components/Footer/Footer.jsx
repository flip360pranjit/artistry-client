import React from "react";
import { IconContext } from "react-icons";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import footerLinks from "./footerLinks";

function Footer() {
  return (
    <footer className="mt-10 bg-gray-50 px-5 pt-16 pb-8">
      <div className="max-w-md mx-auto">
        <h2 className="text-xl sm:text-3xl font-bold text-center">
          Join Our Newsletter for Exclusive Updates, Latest News and Offers
        </h2>
        <form action="/subscribe" method="POST" className="mt-6">
          <div className="relative max-w-lg">
            <label className="sr-only" htmlFor="email">
              {" "}
              Email{" "}
            </label>

            <input
              className="w-full rounded-full border-primary bg-white p-4 pe-32 text-sm font-medium"
              id="email"
              type="email"
              placeholder="example@gmail.com"
            />

            <button className="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-white transition hover:bg-primary-hover">
              Subscribe
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-32 mt-16 mx-5">
        <div className="mx-auto max-w-sm lg:max-w-lg">
          <div className="flex justify-center md:justify-start">
            <img src="./images/logo.png" alt="Logo" className="w-20" />
          </div>
          <p className="mt-4 text-center text-[#666666] lg:text-left lg:text-lg">
            Making the world more vibrant, one brushstroke at a time.
            Celebrating artistry and creativity to inspire a colorful and
            connected community.
          </p>
        </div>

        <div className="flex flex-col gap-10 mobile:flex-row mt-7 mobile:justify-around">
          {footerLinks.map((category) => (
            <div key={category.category}>
              <h3 className="font-medium text-gray-900 mb-4">
                {category.category}
              </h3>
              <ul className="flex flex-col mb-6 gap-3">
                {category.links.map((link) => (
                  <Link
                    key={link.title}
                    to={link.url}
                    className="text-gray-700 transition hover:text-gray-700/75"
                  >
                    {link.title}
                  </Link>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-7 sm:flex-row justify-between items-center mt-10 border-t-2 pt-8">
        <p className="text-base/relaxed text-gray-500">
          © Artistry 2023. All rights reserved.
        </p>
        <div className="flex flex-row items-center justify-center gap-10">
          <IconContext.Provider
            value={{
              size: "1.5rem",
              className: "fill-gray-700 hover:fill-gray-700/75",
            }}
          >
            <Link to="https://www.linkedin.com/in/pranjit-kakoti-493028229">
              <FaLinkedin />
            </Link>
            <Link to="https://github.com/flip360pranjit">
              <FaGithub />
            </Link>
            <Link to="https://instagram.com/_flip_360_pranjit_?igshid=OTk0YzhjMDVIZA==">
              <FaInstagram />
            </Link>
            <Link to="https://www.facebook.com/profile.php?id=100076014226513">
              <FaFacebook />
            </Link>
            <Link to="https://twitter.com/PranjitKakoti2">
              <FaTwitter />
            </Link>
          </IconContext.Provider>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
