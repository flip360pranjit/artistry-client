import React, { useState } from "react";
import { IconContext } from "react-icons";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import footerLinks from "./footerLinks";
import axios from "axios";
import { toast } from "react-toastify";

function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/newsletter`,
        { email }
      );

      toast.success("Message sent!");
      setLoading(false);
      setEmail("");
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong!");
    }
  }
  return (
    <footer className="mt-10 bg-gray-50 px-5 pt-16 pb-8">
      <div className="max-w-md mx-auto">
        <h2 className="text-xl sm:text-3xl font-bold text-center">
          Join Our Newsletter for Exclusive Updates, Latest News and Offers
        </h2>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="relative max-w-lg">
            <label className="sr-only" htmlFor="email">
              {" "}
              Email{" "}
            </label>

            <input
              required
              className="w-full rounded-full border-primary bg-white p-4 pe-32 text-sm font-medium"
              id="email"
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              type="submit"
              disabled={loading}
              className={`absolute end-1 top-1/2 -translate-y-1/2 rounded-full px-5 py-3 text-sm font-medium text-white transition ${
                loading ? "bg-gray-400" : "bg-primary hover:bg-primary-hover"
              }`}
            >
              {loading ? "Loading..." : "Subscribe"}
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

      <div className="flex flex-col gap-7 sm:flex-row justify-between items-center mt-10 pt-8">
        <p className="text-base/relaxed text-gray-500">
          © Pranjit Kakoti/TheArtistry 2023.
        </p>
        <div className="flex flex-row items-center justify-center gap-10">
          <IconContext.Provider
            value={{
              size: "1.5rem",
              className: "fill-gray-700 hover:fill-gray-700/75",
            }}
          >
            <a
              target="_blank"
              href="https://instagram.com/theartistry.online?igshid=ZGUzMzM3NWJiOQ=="
            >
              <FaInstagram />
            </a>
            <a
              target="_blank"
              href="https://www.facebook.com/The-Artistry-115015941645828"
            >
              <FaFacebook />
            </a>
            <a target="_blank" href="https://youtube.com/@theartistry.online">
              <FaYoutube />
            </a>
          </IconContext.Provider>
        </div>
      </div>

      <div className="flex flex-col gap-7 justify-between items-center mt-10 border-t-2 pt-8">
        <p className="text-base/relaxed text-gray-500">
          Developed by Pranjit Kakoti
        </p>
        <div className="flex flex-row items-center justify-center gap-10">
          <IconContext.Provider
            value={{
              size: "1.5rem",
              className: "fill-gray-700 hover:fill-gray-700/75",
            }}
          >
            <a
              target="_blank"
              href="https://www.linkedin.com/in/pranjit-kakoti-493028229"
            >
              <FaLinkedin />
            </a>
            <a target="_blank" href="https://github.com/flip360pranjit">
              <FaGithub />
            </a>
            <a
              target="_blank"
              href="https://instagram.com/_flip_360_pranjit_?igshid=OTk0YzhjMDVIZA=="
            >
              <FaInstagram />
            </a>
            <a
              target="_blank"
              href="https://www.facebook.com/profile.php?id=100076014226513"
            >
              <FaFacebook />
            </a>
            {/* <a target="_blank" href="https://twitter.com/PranjitKakoti2">
              <FaTwitter />
            </a> */}
          </IconContext.Provider>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
