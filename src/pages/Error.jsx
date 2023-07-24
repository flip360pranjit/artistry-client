import React from "react";
import ErrorImg from "../assets/images/error.png";
import ErrorImgWebp from "../assets/images/error.webp";
import { isWebpSupported } from "react-image-webp/dist/utils";

function Error() {
  return (
    <div className="flex flex-col justify-center items min-h-full bg-white px-6 py-24 sm:py-20 lg:px-8 mx-4 md:mx-20">
      <div className="flex justify-center">
        <img
          src={isWebpSupported() ? ErrorImgWebp : ErrorImg}
          alt="Error"
          className="h-[40vh]"
        />
      </div>
      <div className="text-center">
        <p className="text-lg font-semibold text-primary">404</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-base leading-7 text-gray-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex flex-col gap-5 sm:flex-row items-center justify-center gap-x-6">
          <a
            href="/"
            className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Go back home
          </a>
          <a href="/contact" className="text-sm font-semibold text-gray-900">
            Contact support <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Error;
