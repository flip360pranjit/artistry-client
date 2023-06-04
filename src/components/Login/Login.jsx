import React from "react";
import Button from "../Button/Button";
import LoginSvg from "../../assets/svgs/login.svg";
import Logo from "../../assets/images/logo.png";

function Login() {
  return (
    <>
      <div className="relative flex flex-col justify-around items-center h-[50vh] lg:h-screen">
        <div className="z-[-10] absolute bg-primary w-full h-full rounded-br-full overflow-hidden"></div>
        <div className="mb-10 md:mb-0">
          <h2 className="text-2xl text-white text-center mt-5 lg:mt-0">
            New here?
          </h2>
          <p className="text-sm text-gray-300 text-center mt-2">
            Join us and unlock your creative journey!
          </p>
          <a href="/register" className="flex justify-center mt-2">
            <Button type="outlined" color="white" size="small">
              SIGN UP
            </Button>
          </a>
        </div>
        <img src={LoginSvg} alt="Login" className="w-2/3" />
      </div>
      <div className="lg:h-screen flex flex-col justify-center px-10">
        <div className="flex justify-center">
          <img src={Logo} alt="Logo" className="w-20" />
        </div>
        <form className="space-y-6" action="#" method="POST">
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
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
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
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
