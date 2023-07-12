import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { MdLocalShipping } from "react-icons/md";
import PhoneInput from "react-phone-input-2";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setShippingInfo } from "../../store/slices/CheckoutSlice";

function Shipping() {
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.checkout);

  const [isBillingSame, setIsBillingSame] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: shippingInfo.shipping.fullName,
    email: shippingInfo.shipping.email,
    country: shippingInfo.shipping.country,
    streetAddress: shippingInfo.shipping.streetAddress,
    pincode: shippingInfo.shipping.pincode,
    city: shippingInfo.shipping.city,
    state: shippingInfo.shipping.state,
  });
  const [billingAddress, setBillingAddress] = useState({
    fullName: shippingInfo.billing.fullName,
    email: shippingInfo.billing.email,
    country: shippingInfo.billing.country,
    streetAddress: shippingInfo.billing.streetAddress,
    pincode: shippingInfo.billing.pincode,
    city: shippingInfo.billing.city,
    state: shippingInfo.billing.state,
  });
  const [shippingPhone, setShippingPhone] = useState(
    shippingInfo.shipping.phoneNumber
  );
  const [billingPhone, setBillingPhone] = useState(
    shippingInfo.billing.phoneNumber
  );
  const [pLoading, setPLoading] = useState(false);

  useEffect(() => {
    if (isBillingSame) {
      setBillingAddress(shippingAddress);
      setBillingPhone(shippingPhone);
    }
  }, [isBillingSame]);

  function handleShippingInfoChange(event) {
    event.preventDefault();

    setShippingAddress({
      ...shippingAddress,
      [event.target.name]: event.target.value,
    });
  }
  function handleBillingInfoChange(event) {
    event.preventDefault();

    setBillingAddress({
      ...billingAddress,
      [event.target.name]: event.target.value,
    });
  }

  async function findShippingPostalAddress(event) {
    event.preventDefault();
    setPLoading(true);

    await axios
      .get(`https://api.postalpincode.in/pincode/${shippingAddress.pincode}`)
      .then((response) => {
        setPLoading(false);

        if (response.data[0].Status === "404")
          toast.error("Please enter a PinCode first!");
        else if (response.data[0].Status === "Error")
          toast.error("Please enter a valid PinCode!");
        else {
          setShippingAddress({
            ...shippingAddress,
            city: response.data[0].PostOffice[0].District,
            state: response.data[0].PostOffice[0].State,
          });
        }
      });
  }
  async function findBillingPostalAddress(event) {
    event.preventDefault();
    setPLoading(true);

    await axios
      .get(`https://api.postalpincode.in/pincode/${billingAddress.pincode}`)
      .then((response) => {
        setPLoading(false);

        if (response.data[0].Status === "404")
          toast.error("Please enter a PinCode first!");
        else if (response.data[0].Status === "Error")
          toast.error("Please enter a valid PinCode!");
        else {
          setBillingAddress({
            ...billingAddress,
            city: response.data[0].PostOffice[0].District,
            state: response.data[0].PostOffice[0].State,
          });
        }
      });
  }

  //   Form Buttons
  function handleClearForm(event) {
    event.preventDefault();

    setShippingAddress({
      fullName: "",
      email: "",
      country: "",
      streetAddress: "",
      pincode: "",
      city: "",
      state: "",
    });
    setBillingAddress({
      fullName: "",
      email: "",
      country: "",
      streetAddress: "",
      pincode: "",
      city: "",
      state: "",
    });
    setShippingPhone("");
    setBillingPhone("");
  }
  function handleSubmit(event) {
    event.preventDefault();
    setShippingPhone("+" + shippingPhone);

    if (isBillingSame) {
      setBillingAddress(shippingAddress);
      setBillingPhone(shippingPhone);
    }

    const info = {
      shipping: {
        fullName: shippingAddress.fullName,
        phoneNumber: shippingPhone,
        email: shippingAddress.email,
        country: shippingAddress.country,
        streetAddress: shippingAddress.streetAddress,
        pincode: shippingAddress.pincode,
        city: shippingAddress.city,
        state: shippingAddress.state,
      },
      billing: {
        fullName: billingAddress.fullName,
        phoneNumber: billingPhone,
        email: billingAddress.email,
        country: billingAddress.country,
        streetAddress: billingAddress.streetAddress,
        pincode: billingAddress.pincode,
        city: billingAddress.city,
        state: billingAddress.state,
      },
    };
    dispatch(setShippingInfo(info));
    scrollTo(0, 0);
  }

  return (
    <div className="font-poppins sm:mr-16">
      <h1 className="flex items-center gap-4 font-semibold pb-10 text-[#333333]">
        <IconContext.Provider value={{ size: "1.5rem" }}>
          <MdLocalShipping />
        </IconContext.Provider>
        <span className="text-2xl">Shipping & Billing</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="border-t-2 border-gray-900/10 py-10">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Shipping Address
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Use a permanent address where you can receive the products.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="fullName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Full name
              </label>
              <div className="mt-2">
                <input
                  required
                  type="text"
                  name="fullName"
                  id="fullName"
                  autoComplete="full-name"
                  value={shippingAddress.fullName}
                  onChange={handleShippingInfoChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="phone-number"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone number
              </label>
              <PhoneInput
                value={shippingPhone}
                onChange={setShippingPhone}
                country={"in"}
                inputStyle={{ width: "100%" }}
                inputClass="block rounded-md py-1.5 text-gray-900 shadow-sm border-3 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6"
                containerClass="mobile-sm:col-span-3"
              />
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  required
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={shippingAddress.email}
                  onChange={handleShippingInfoChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Country
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  value={shippingAddress.country}
                  onChange={handleShippingInfoChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="">Select</option>
                  <option value="India">India</option>
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Street address
              </label>
              <div className="mt-2">
                <input
                  required
                  type="text"
                  name="streetAddress"
                  id="street-address"
                  autoComplete="street-address"
                  value={shippingAddress.streetAddress}
                  onChange={handleShippingInfoChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="postal-code"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                ZIP / Postal code
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  required
                  type="text"
                  name="pincode"
                  id="postal-code"
                  autoComplete="postal-code"
                  value={shippingAddress.pincode}
                  onChange={handleShippingInfoChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
                <button
                  disabled={pLoading}
                  onClick={findShippingPostalAddress}
                  className="px-10 rounded-md text-white bg-primary hover:bg-primary-hover"
                >
                  {pLoading ? "Loading..." : "Find"}
                </button>
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                District
              </label>
              <div className="mt-2">
                <input
                  required
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  value={shippingAddress.city}
                  onChange={handleShippingInfoChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="region"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                State
              </label>
              <div className="mt-2">
                <input
                  required
                  type="text"
                  name="state"
                  id="region"
                  autoComplete="address-level1"
                  value={shippingAddress.state}
                  onChange={handleShippingInfoChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="border-t-2 border-gray-900/10 ">
          <div className="relative flex gap-x-3 mt-7">
            <div className="flex h-6 items-center">
              <input
                id="billing"
                name="billing"
                type="checkbox"
                checked={isBillingSame}
                onChange={() => setIsBillingSame(!isBillingSame)}
                className="h-4 w-4 rounded cursor-pointer border-gray-300 text-primary focus:ring-primary"
              />
            </div>
            <div className="text-lg font-semibold leading-6">
              <label htmlFor="billing" className="text-gray-900">
                Billing address is the same as shipping address
              </label>
            </div>
          </div>
          {!isBillingSame && (
            <div className="py-10">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Billing Address
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Provide the billing address associated with your payment method.
                This address should match the billing information on your
                payment account.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Full name
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      type="text"
                      name="fullName"
                      id="fullName"
                      autoComplete="full-name"
                      value={billingAddress.fullName}
                      onChange={handleBillingInfoChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="phone-number"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Phone number
                  </label>
                  <PhoneInput
                    value={billingPhone}
                    onChange={setBillingPhone}
                    country={"in"}
                    inputStyle={{ width: "100%" }}
                    inputClass="block rounded-md py-1.5 text-gray-900 shadow-sm border-3 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6"
                    containerClass="mobile-sm:col-span-3"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={billingAddress.email}
                      onChange={handleBillingInfoChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Country
                  </label>
                  <div className="mt-2">
                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      value={billingAddress.country}
                      onChange={handleBillingInfoChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>India</option>
                    </select>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Street address
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      type="text"
                      name="streetAddress"
                      id="street-address"
                      autoComplete="street-address"
                      value={billingAddress.streetAddress}
                      onChange={handleBillingInfoChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ZIP / Postal code
                  </label>
                  <div className="mt-2 flex gap-2">
                    <input
                      required
                      type="text"
                      name="pincode"
                      id="postal-code"
                      autoComplete="postal-code"
                      value={billingAddress.pincode}
                      onChange={handleBillingInfoChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    />
                    <button
                      disabled={pLoading}
                      onClick={findBillingPostalAddress}
                      className="px-10 rounded-md text-white bg-primary hover:bg-primary-hover"
                    >
                      {pLoading ? "Loading..." : "Find"}
                    </button>
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    District
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      type="text"
                      name="city"
                      id="city"
                      autoComplete="address-level2"
                      value={billingAddress.city}
                      onChange={handleBillingInfoChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    State
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      type="text"
                      name="state"
                      id="region"
                      autoComplete="address-level1"
                      value={billingAddress.state}
                      onChange={handleBillingInfoChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              onClick={handleClearForm}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Shipping;
