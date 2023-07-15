import React, { useState } from "react";
import Button from "../Button/Button";
import RegisterSvg from "../../assets/svgs/register.svg";
import Logo from "../../assets/images/logo.png";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { addUser } from "../../store/slices/AuthSlice";
import SocialAuth from "../SocialAuth/SocialAuth";

function Register({ handleClick }) {
  const [user, setUser] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
  });
  const [icon, setIcon] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  // Handle Form input changes
  function handleChange(event) {
    event.preventDefault();
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  }

  // Register User
  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("file", icon);
    formData.append("upload_preset", "profile-image");
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_REACT_APP_CLOUDINARY_CLOUD_NAME
      }/image/upload`,
      formData
    );

    await axios
      .post(`${import.meta.env.VITE_REACT_APP_API_URL}/users/register`, {
        user,
        downloadURL: response.data.secure_url,
      })
      .then((res) => {
        setLoading(false);
        setUser({
          fName: "",
          lName: "",
          email: "",
          password: "",
        });
        setIcon(null);
        toast.success("Your account has been created! Login to proceed.");
        dispatch(addUser(res.data.user));
        navigate("/profile");
      })
      .catch((err) => {
        const message = err.response.data.error.code;
        toast.error(
          message === "auth/email-already-in-use"
            ? "Email already exists!"
            : "Oops, something went wrong!"
        );
        setLoading(false);
      });

    // } catch (err) {
    //   // Firebase Authentication error

    //   setLoading(false);

    //   toast.error(
    //     err.message === "Firebase: Error (auth/email-already-in-use)."
    //       ? "Email already exists!"
    //       : "Oops, something went wrong!"
    //   );
    // }
  }

  return (
    <div className="relative flex flex-col justify-between gap-16 min-h-screen sm:grid sm:grid-cols-2 sm:gap-0">
      <div className="flex flex-col justify-center px-10">
        <div className="flex justify-center">
          <a href="/" className="inline-block">
            <img src={Logo} alt="Logo" className="w-20" />
          </a>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-5">
            <div className="">
              <label
                htmlFor="fName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First name
              </label>
              <div className="mt-2">
                <input
                  id="fName"
                  name="fName"
                  type="text"
                  autoComplete="given-name"
                  required
                  value={user.fName}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="lName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last name
              </label>
              <div className="mt-2">
                <input
                  id="lName"
                  name="lName"
                  type="text"
                  autoComplete="family-name"
                  required
                  value={user.lName}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={user.email}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={user.password}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="icon"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Profile Picture
            </label>
            <div className="mt-2">
              <input
                id="icon"
                name="icon"
                type="file"
                required
                onChange={(event) => setIcon(event.target.files[0])}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading ? true : false}
              className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                loading
                  ? "bg-gray-500 hover:bg-gray-600"
                  : "bg-primary hover:bg-primary-hover"
              }`}
            >
              {loading ? "Loading...." : "Sign in"}
            </button>
          </div>
        </form>
        <SocialAuth type="register" />
      </div>

      <div className="flex flex-col justify-center sm:justify-around items-center sm:h-screen gap-4 mx-12 mobile-lg:mx-5 sm:mx-0">
        <img src={RegisterSvg} alt="Login" className="w-full sm:w-2/3" />
        <div className="mb-10 sm:mb-0 flex flex-col justify-center items-center">
          <h2 className="text-lg mobile:text-2xl text-white text-center mt-5 sm:mt-0">
            Already have an account?
          </h2>
          <p className="text-xs mobile:text-sm text-gray-300 text-center mt-2">
            Dive back into your creative world!
          </p>
          <div
            onClick={handleClick}
            className="inline-block mt-2 cursor-pointer"
          >
            <Button type="outlined" color="white" size="small">
              LOGIN
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
