import React, { useEffect, useState } from "react";
import DesktopAuth from "../components/Authenticate/DesktopAuth";
import MobileAuth from "../components/Authenticate/MobileAuth";
import "react-toastify/dist/ReactToastify.css";
import { getRedirectResult } from "firebase/auth";
import { auth } from "../config/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/slices/AuthSlice";
import { toast } from "react-toastify";
import LoadingAnimation from "../components/LoadingAnimation/LoadingAnimation";
import axios from "axios";
import { resetSocial } from "../store/slices/SocialSlice";
import { useNavigate } from "react-router-dom";

function Authenticate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { type, loading } = useSelector((state) => state.social);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleWindowResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  async function socialRegister(user) {
    await axios
      .post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/users/social-register`,
        user
      )
      .then((res) => {
        dispatch(resetSocial());
        toast.success("Your account has been created! Login to proceed.");
        dispatch(addUser(res.data.user));
        navigate("/profile");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        dispatch(resetSocial());
      });
  }

  async function socialLogin(user) {
    await axios
      .post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/users/social-login`,
        user
      )
      .then((res) => {
        // console.log(res);
        toast.success("You have successfully logged in!");

        dispatch(resetSocial());
        dispatch(addUser(res.data.user));
        navigate("/profile");
      })
      .catch((err) => {
        toast.error(err.response.data.message);

        dispatch(resetSocial());
        // console.log(err);
      });
  }

  useEffect(() => {
    async function getSocialAuthResult() {
      await getRedirectResult(auth).then((response) => {
        if (response) {
          // console.log(response);
          const user = {
            uid: response.user.uid,
            displayName: response.user.displayName,
            email: response.user.email,
            photoURL: response.user.photoURL,
          };

          // if (type === "register") {
          //   socialRegister(user);
          // } else if (type === "login") {
          //   socialLogin(user);
          // }
          socialRegister(user);
        }
      });
    }

    getSocialAuthResult();
  }, []);

  return loading ? (
    <div className="min-h-screen flex flex-col gap-10 justify-center items-center">
      <LoadingAnimation />
      <h2 className="text-center font-poppins">
        Please wait...it may take a while.
      </h2>
    </div>
  ) : windowWidth < 640 ? (
    <MobileAuth />
  ) : (
    <DesktopAuth />
  );
}

export default Authenticate;
