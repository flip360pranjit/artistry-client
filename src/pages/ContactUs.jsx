import React, { useState } from "react";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { BsTelephone, BsEnvelope } from "react-icons/bs";
import { Switch } from "@headlessui/react";
import { IconContext } from "react-icons";

function ContactUs() {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mx-10 md:mx-20">
      <div className="bg-[#f4e7d3] pt-24 px-10 md:rounded-bl-3xl">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Get in touch
        </h1>
        <p className="mt-5 text-base leading-8 text-gray-600">
          We would love to hear from you. Whether you have a question, feedback,
          or a collaboration idea, feel free to reach out to us. Our team is
          ready to assist you and provide the support you need. Let's connect
          and make something great together.
        </p>
        <IconContext.Provider value={{ size: "1.5rem" }}>
          <a
            href="https://goo.gl/maps/ay9pFY6pLEFundnT8"
            target="_blank"
            className="mt-7 text-base leading-5 text-gray-600 flex gap-5 hover:text-[#333333] cursor-pointer"
          >
            <HiOutlineBuildingOffice2 /> Silchar, Assam, India <br />
            PinCode: 788010
          </a>
          <a
            href="tel:+916000029772"
            target="_blank"
            className="mt-4 text-base leading-5 text-gray-600 flex gap-5 hover:text-[#333333] cursor-pointer"
          >
            <BsTelephone />
            +1 (555) 234-5678
          </a>
          <a
            href="mailto:pranjitkakotiofficial@gmail.com"
            target="_blank"
            className="mt-4 text-base leading-5 text-gray-600 flex gap-5 hover:text-[#333333] cursor-pointer"
          >
            <BsEnvelope /> pranjitkakotiofficial@gmail.com
          </a>
        </IconContext.Provider>
      </div>

      <div className="">
        <form
          action="/contact"
          method="POST"
          className="mx-auto mt-16 max-w-sm sm:mt-20"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <div className="">
                <input
                  required
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  placeholder="First Name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="">
                <input
                  required
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  placeholder="Last Name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <div className="">
                <input
                  required
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  placeholder="Email"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <label htmlFor="country" className="sr-only">
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-2 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm"
                  >
                    <option>IN(+91)</option>
                  </select>
                </div>
                <input
                  required
                  type="tel"
                  name="phone-number"
                  id="phone-number"
                  autoComplete="tel"
                  placeholder="Phone Number"
                  className="block w-full rounded-md border-0 pr-3.5 py-2 pl-28 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <div className="">
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  placeholder="Your Message"
                  required={true}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
            </div>
            <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
              <div className="flex h-6 items-center">
                <Switch
                  checked={agreed}
                  onChange={setAgreed}
                  className={`${
                    agreed ? "bg-primary" : "bg-gray-200"
                  } flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`}
                >
                  <span className="sr-only">Agree to policies</span>
                  <span
                    aria-hidden="true"
                    className={`${
                      agreed ? "translate-x-3.5" : "translate-x-0"
                    } h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out`}
                  />
                </Switch>
              </div>
              <Switch.Label className="text-sm leading-6 text-gray-600">
                By selecting this, you agree to our{" "}
                <a
                  href="/privacy-policy"
                  className="font-semibold text-primary"
                >
                  privacy&nbsp;policy
                </a>
                .
              </Switch.Label>
            </Switch.Group>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-primary px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Let's talk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
