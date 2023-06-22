import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../config/firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { addUser } from "../store/slices/AuthSlice";

function BecomeASeller() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [seller, setSeller] = useState({
    contact: "",
    description: "",
    instagram: "",
    youtube: "",
    facebook: "",
  });
  const [phone, setPhone] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [verified, setVerified] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [vloading, setVLoading] = useState(false);

  // Handle Form input
  function handleChange(event) {
    event.preventDefault();
    setSeller({
      ...seller,
      [event.target.name]: event.target.value,
    });
  }

  // Handle OTP input
  function handleOTPChange(event, currentIndex) {
    if (isNaN(event.target.value)) {
      return false;
    }

    setOtp([
      ...otp.map((data, index) =>
        index === currentIndex ? event.target.value : data
      ),
    ]);
    // Focus on next
    if (event.target.nextSibling) {
      event.target.nextSibling.focus();
    }
  }

  function onCaptchaVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            handlePhoneSubmit();
          },
          "expired-callback": () => {
            toast.error("reCAPTCHA verification expired. Please try again.");
          },
        },
        auth
      );
    }
  }

  function handlePhoneSubmit(event) {
    event.preventDefault();

    setVLoading(true);
    onCaptchaVerify();

    const appVerifier = window.recaptchaVerifier;

    const phoneNumber = "+" + phone;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setVLoading(false);
        setShowOtp(true);
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        setVLoading(false);
        window.recaptchaVerifier.render().then(function (widgetId) {
          grecaptcha.reset(widgetId);
        });
        if (error.message === "Firebase: Error (auth/too-many-requests).") {
          toast.error("Too many requests!");
        } else {
          toast.error("Something went wrong!");
        }
      });
  }

  function handleOTPVerify() {
    setVLoading(true);
    const userOTP = otp[0] + otp[1] + otp[2] + otp[3] + otp[4] + otp[5];

    window.confirmationResult
      .confirm(userOTP)
      .then((res) => {
        toast.success("OTP verified!");
        setSeller((prevSeller) => ({
          ...prevSeller,
          contact: res.user.phoneNumber,
        }));

        const currentUser = auth.currentUser;
        currentUser
          .delete()
          .then(() => {
            setVLoading(false);
            setShowOtp(false);
            setVerified(true);
          })
          .catch((error) => toast.error("Something went wrong!"));
      })
      .catch((error) => {
        if (
          error.message === "Firebase: Error (auth/invalid-verification-code)."
        ) {
          toast.error("Invalid verification code!");
        } else if (error.message === "Firebase: Error (auth/code-expired).") {
          toast.error("OTP expired! try again.");
        } else {
          toast.error("Something went wrong!");
        }
        setVLoading(false);
      });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await axios
        .put(
          `${import.meta.env.VITE_REACT_APP_API_URL}/users/switch-to-seller/${
            user._id
          }`,
          {
            seller,
          }
        )
        .then((response) => {
          dispatch(addUser(response.data));
          toast.success("Congrats! You have been switched to seller.");
          setLoading(false);
          navigate("/dashboard");
        });
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.error);
    }
  };
  return (
    <div className="flex flex-col items-center bg-white lg:px-8 mx-4 md:mx-20 pt-24 pb-10">
      <div id="recaptcha-container"></div>
      <form onSubmit={handleSubmit}>
        <div className="">
          <h2 className="text-4xl text-center font-poppins font-semibold leading-7 text-gray-900">
            Become A Seller
          </h2>
          <p className="mt-1 text-base text-center font-open-sans leading-6 text-gray-600">
            Start selling your artwork and reach a wider audience!
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 min-w-[70vw]">
            {/* Contact Number */}
            <div className="sm:col-span-5">
              <label
                htmlFor="phone-number"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone number
              </label>
              <div className="grid grid-cols-1 mobile-lg:grid-cols-4 gap-3 mobile-lg:gap-5 items-center mt-3">
                <PhoneInput
                  country={"in"}
                  value={phone}
                  onChange={setPhone}
                  inputStyle={{ width: "100%" }}
                  inputClass="block rounded-md py-1.5 text-gray-900 shadow-sm border-3 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6"
                  containerClass="mobile-sm:col-span-3"
                />

                {!showOtp && !verified && (
                  <button
                    type="submit"
                    disabled={vloading ? true : false}
                    onClick={handlePhoneSubmit}
                    className={`rounded-md h-full w-full px-3 py-2 text-sm font-semibold text-white shadow-sm ${
                      vloading
                        ? "bg-gray-500 hover:bg-gray-600"
                        : "bg-primary hover:bg-primary-hover"
                    }`}
                  >
                    {vloading ? "Loading..." : "Send OTP"}
                  </button>
                )}
              </div>
            </div>

            {/* OTP */}
            {showOtp && (
              <div className="col-span-full">
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Enter your OTP
                </label>
                <div className="mt-2.5 flex flex-col mobile:flex-row gap-3">
                  <div className="flex gap-1">
                    {otp.map((data, index) => (
                      <input
                        key={index}
                        type="text"
                        name=""
                        id=""
                        maxLength={1}
                        value={data}
                        onChange={(e) => handleOTPChange(e, index)}
                        onFocus={(e) => e.target.select()}
                        className="block w-8 mobile-sm:w-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary text-sm mobile-sm:text-lg sm:leading-6"
                      />
                    ))}
                  </div>

                  <div className="flex items-center mobile:justify-end gap-x-6">
                    <button
                      type="button"
                      className="text-sm font-semibold leading-6 text-gray-900"
                      onClick={(e) => setOtp([...otp.map((v) => "")])}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={vloading ? true : false}
                      onClick={handleOTPVerify}
                      className={`rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ${
                        vloading
                          ? "bg-gray-500 hover:bg-gray-600"
                          : "bg-primary hover:bg-primary-hover"
                      }`}
                    >
                      {vloading ? "Loading..." : "Verify"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={seller.description}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about yourself.
              </p>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="instagram"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Instagram Profile Link
              </label>
              <div className="mt-2">
                <input
                  required
                  type="url"
                  name="instagram"
                  id="instagram"
                  value={user.instagram}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="youtube"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Youtube Channel Link
              </label>
              <div className="mt-2">
                <input
                  required
                  type="url"
                  name="youtube"
                  id="youtube"
                  value={seller.youtube}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="facebook"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Facebook Profile Link
              </label>
              <div className="mt-2">
                <input
                  required
                  type="url"
                  name="facebook"
                  id="facebook"
                  value={seller.facebook}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading ? true : false}
              className={`rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ${
                loading
                  ? "bg-gray-500 hover:bg-gray-600"
                  : "bg-primary hover:bg-primary-hover"
              }`}
            >
              {loading ? "Loading..." : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default BecomeASeller;
