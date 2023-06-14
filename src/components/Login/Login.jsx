import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../Button/Button";
import LoginSvg from "../../assets/svgs/login.svg";
import Logo from "../../assets/images/logo.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase.config";
import { addUser } from "../../store/slices/AuthSlice";
import axios from "axios";

function Login({ handleClick }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle Form input changes
  function handleChange(event) {
    event.preventDefault();
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  }

  // Login User
  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    try {
      // Find user in Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

      // Find user in MongoDB database
      await axios
        .post(`${import.meta.env.VITE_REACT_APP_API_URL}/users/login`, {
          uid: userCredential.user.uid,
        })
        .then((res) => {
          dispatch(addUser(res.data.user));

          setUser({
            email: "",
            password: "",
          });
          toast.success("You have successfully logged in!");
          navigate("/profile");
        })
        .catch((err) => {
          if (err.response.status === 404) {
            toast.error(err.response.data.message);
          } else {
            toast.error("Oops, something went wrong!");
          }
        });

      setLoading(false);
    } catch (err) {
      // User Invalid in Firebase Authentication

      setLoading(false);
      toast.error(
        err.message === "Firebase: Error (auth/user-not-found)."
          ? "Invalid Email! Please check the email or sign up for a new account."
          : err.message === "Firebase: Error (auth/wrong-password)."
          ? "Access Denied! Invalid Password."
          : "Oops, something went wrong!"
      );
    }
  }

  return (
    <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 sm:gap-0 min-h-screen">
      <div className="flex flex-col justify-around items-center sm:h-screen">
        <div className="mb-10 md:mb-0 flex flex-col justify-center items-center">
          <h2 className="text-2xl text-white text-center mt-5 sm:mt-0">
            New here?
          </h2>
          <p className="text-sm text-gray-300 text-center mt-2">
            Join us and unlock your creative journey!
          </p>
          <div
            onClick={handleClick}
            className="inline-block mt-2 cursor-pointer"
          >
            <Button type="outlined" color="white" size="small">
              SIGN UP
            </Button>
          </div>
        </div>
        <img src={LoginSvg} alt="Login" className="w-1/2 sm:w-2/3" />
      </div>

      <div className="lg:h-screen flex flex-col justify-center px-10">
        <div className="flex justify-center">
          <a href="/" className="inline-block">
            <img src={Logo} alt="Logo" className="w-20" />
          </a>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
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
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="/forgot-password"
                  className="font-semibold text-primary hover:text-primary-hover"
                >
                  Forgot password?
                </a>
              </div>
            </div>
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
      </div>
    </div>
  );
}

export default Login;
