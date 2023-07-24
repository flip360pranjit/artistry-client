import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { RxCross2 } from "react-icons/rx";
import PhoneInput from "react-phone-input-2";
import Button from "../components/Button/Button";
import { HiPhoto } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import commissionedSellers from "../api/commissionedSellers.json";
import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCommissionedOrder } from "../store/slices/OrderSlice";
import LoadingAnimation from "../components/LoadingAnimation/LoadingAnimation";

function transformUsers(users) {
  return users.map((user) => {
    return {
      value: user.uid,
      label: user.displayName,
    };
  });
}

function SubmitCommissionedRequest() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [artists, setArtists] = useState([]);

  // States
  const [request, setRequest] = useState({
    fullName: "",
    email: "",
    preferredMethod: "",
    description: "",
    size: "",
    desiredDate: "",
  });
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState("");
  const [artistDetails, setArtistDetails] = useState(commissionedSellers[0]);

  const [customSizeWidth, setCustomSizeWidth] = useState("");
  const [customSizeHeight, setCustomSizeHeight] = useState("");
  const [customSizeWidthUnit, setCustomSizeWidthUnit] = useState("");
  const [customSizeHeightUnit, setCustomSizeHeightUnit] = useState("");

  const sellers = transformUsers(artists);

  function fetchUser(selectedOption) {
    const selectedUid = selectedOption.value;
    const user = artists.find((seller) => seller.uid === selectedUid);
    return user;
  }

  useEffect(() => {
    // Function to fetch seller artworks
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/users/sellers`
        );
        const fetchedUsers = response.data;

        setArtists(fetchedUsers);
      } catch (error) {
        toast.error("Error! Try checking your connection.");
      }
    };

    // Fetch seller artworks on component mount
    fetchUsers();
  }, []);

  // Handle Form input
  function handleChange(event) {
    event.preventDefault();
    setRequest({
      ...request,
      [event.target.name]: event.target.value,
    });
  }
  //   Handle File input
  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      setImage(file);
    } else {
      setImage(null);
      toast.error("Please select a file up to 10MB in size.");
    }
  }

  function handleArtistSelect(option) {
    setSelectedArtist(option);
    const user = fetchUser(option);
    setArtistDetails(user);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    scrollTo(0, 0);
    setLoading(true);

    const signatureRes = await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_URL}/get-signature`,
      { uploadPreset: "clients-webp" }
    );

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "clients");

    const formDataWebp = new FormData();
    formDataWebp.append("file", image);
    // formData.append("upload_preset", "artworks");
    formDataWebp.append("timestamp", signatureRes.data.timestamp);
    formDataWebp.append("upload_preset", "clients-webp");
    formDataWebp.append(
      "api_key",
      import.meta.env.VITE_REACT_APP_CLOUDINARY_API_KEY
    );
    formDataWebp.append("format", "webp");
    formDataWebp.append("signature", signatureRes.data.signature);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_REACT_APP_CLOUDINARY_CLOUD_NAME
      }/image/upload`,
      formData
    );
    const data = await response.data;

    const responseWebp = await axios.post(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_REACT_APP_CLOUDINARY_CLOUD_NAME
      }/image/upload`,
      formDataWebp
    );
    const dataWebp = await responseWebp.data;

    const desiredCompletionDate = new Date(
      request.desiredDate
    ).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    // Get the current date and time
    const currentDate = new Date();

    const dateFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const timeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const formattedDate = currentDate.toLocaleDateString(
      "en-US",
      dateFormatOptions
    );
    const formattedTime = currentDate.toLocaleTimeString(
      "en-US",
      timeFormatOptions
    );

    const order = {
      artist: artistDetails._id,
      fullName: request.fullName,
      phoneNumber: phone,
      email: request.email,
      desiredCompletionDate,
      contactMethod: request.preferredMethod,
      whatsappNumber: whatsapp,
      artworkSize:
        request.size === "Other"
          ? customSizeWidth +
            " " +
            customSizeWidthUnit +
            " x " +
            customSizeHeight +
            " " +
            customSizeHeightUnit
          : request.size,
      description: request.description,
      referenceImage: data.secure_url,
      referenceImageWebp: dataWebp.secure_url,
      dateTime: {
        date: formattedDate,
        time: formattedTime,
      },
    };

    try {
      await axios
        .post(`${import.meta.env.VITE_REACT_APP_API_URL}/commissioned`, order)
        .then((response) => {
          toast.success("Request Submitted!");
          dispatch(setCommissionedOrder(response.data));
        });
      setLoading(false);

      // Reset form fields after successful submission
      setRequest({
        fullName: "",
        email: "",
        preferredMethod: "",
        description: "",
        size: "",
        desiredDate: "",
      });
      setPhone("");
      setWhatsapp("");
      setImage(null);
      setSelectedArtist("");
      setArtistDetails("");
      setCustomSizeHeight("");
      setCustomSizeHeightUnit("");
      setCustomSizeWidth("");
      setCustomSizeWidthUnit("");

      navigate("/commissioned-orders/submit-commission-request/success");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.error);
    }
  }

  return (
    <div className="bg-white px-4 sm:px-16 py-10 mx-4 sm:mx-10 pt-24">
      {loading ? (
        <div className="h-[80vh] flex items-center justify-center">
          <div className="flex flex-col items-center font-poppins">
            <LoadingAnimation />
            <h2 className="mt-7 text-xl font-semibold">Please Wait...</h2>
            <p className="mt-2 text-[#555555]">Do not close the window!</p>
            <p className="mt-3 text-[#555555]">
              Your image is being uploaded! It may take a while.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="">
            <h2 className="text-2xl text-center sm:text-left font-poppins font-semibold leading-7 text-gray-900">
              Request Commissioned Artwork
            </h2>
            <p className="mt-1 text-sm text-center sm:text-left font-open-sans leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 items-center">
              <div className="sm:col-span-2">
                <label
                  htmlFor="search"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Choose Artist
                </label>
                <div className="mt-2 cursor-pointer">
                  <Select
                    defaultValue={selectedArtist}
                    onChange={handleArtistSelect}
                    options={sellers}
                  />
                </div>
              </div>
              <div className="sm:col-span-4 flex items-center justify-center">
                {selectedArtist && (
                  <div className="">
                    <img
                      src={artistDetails.photoURL}
                      alt={artistDetails.displayName}
                      className=""
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 border-t-2 pt-10">
              <h2 className="text-2xl text-center sm:text-left font-poppins font-semibold leading-7 text-gray-900 col-span-full">
                Personal and Artwork Details
              </h2>
              <div className="sm:col-span-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    required
                    type="text"
                    name="fullName"
                    id="name"
                    value={request.fullName}
                    onChange={handleChange}
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
                  value={phone}
                  onChange={setPhone}
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
                  Email
                </label>
                <div className="mt-2">
                  <input
                    required
                    type="email"
                    name="email"
                    id="name"
                    value={request.email}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Desired Date of Completion
                </label>
                <div className="mt-2">
                  <input
                    required
                    type="date"
                    name="desiredDate"
                    id="date"
                    value={request.desiredDate}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full sm:col-span-3">
                <label
                  htmlFor="method"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Preferred Method of Contact
                </label>
                <div className="mt-2">
                  <select
                    id="method"
                    name="preferredMethod"
                    value={request.preferredMethod}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="">Select</option>
                    <option value="Whatsapp">Whatsapp</option>
                    <option value="Email">Email</option>
                    <option value="Online Meet">Online Meet</option>
                  </select>
                </div>
              </div>
              {request.preferredMethod === "Whatsapp" && (
                <div className="col-span-full sm:col-span-3">
                  <label
                    htmlFor="whatsapp"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Whatsapp Number
                  </label>
                  <PhoneInput
                    value={whatsapp}
                    onChange={setWhatsapp}
                    country={"in"}
                    inputStyle={{ width: "100%" }}
                    inputClass="block rounded-md py-1.5 text-gray-900 shadow-sm border-3 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6"
                    containerClass="mobile-sm:col-span-3"
                  />
                </div>
              )}

              {/* Artwork Size */}
              <div className="col-span-full sm:col-span-3">
                <label
                  htmlFor="size"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Artwork Size
                </label>
                <div className="mt-2">
                  <select
                    id="size"
                    name="size"
                    value={request.size}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="">Select</option>
                    <option value="59.4 cm x 84.1 cm">A1</option>
                    <option value="42.0 cm x 59.4 cm">A2</option>
                    <option value="29.7 cm x 42.0 cm">A3</option>
                    <option value="21.0 cm x 29.7 cm">A4</option>
                    <option value="14.8 cm x 21.0 cm">A5</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              {request.size === "Other" && (
                <div className="col-span-full sm:col-span-3">
                  <label
                    htmlFor="custom-medium"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Custom Size
                  </label>
                  <div className="mt-2 flex items-center gap-5">
                    <div className="flex gap-1">
                      <input
                        required
                        type="number"
                        name="custom-width"
                        id="custom-width"
                        placeholder="W"
                        value={customSizeWidth}
                        onChange={(e) => setCustomSizeWidth(e.target.value)}
                        className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                      />
                      <select
                        id="custom-width-unit"
                        name="custom-width-unit"
                        value={customSizeWidthUnit}
                        onChange={(e) => setCustomSizeWidthUnit(e.target.value)}
                        className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option value="">Select</option>
                        <option value="cm">cm</option>
                        <option value="inch">inch</option>
                      </select>
                    </div>
                    <IconContext.Provider value={{ size: "2rem" }}>
                      <RxCross2 />
                    </IconContext.Provider>
                    <div className="flex gap-1">
                      <input
                        required
                        type="number"
                        name="custom-height"
                        id="custom-height"
                        placeholder="H"
                        value={customSizeHeight}
                        onChange={(e) => setCustomSizeHeight(e.target.value)}
                        className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                      />
                      <select
                        id="custom-width-unit"
                        name="custom-width-unit"
                        value={customSizeHeightUnit}
                        onChange={(e) =>
                          setCustomSizeHeightUnit(e.target.value)
                        }
                        className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option value="">Select</option>
                        <option value="cm">cm</option>
                        <option value="inch">inch</option>
                      </select>
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
                    value={request.description}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about your vision for the artwork.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="artwork-image"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Reference Image
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  {image ? (
                    <div>
                      <div className="flex flex-col sm:flex-row sm:justify-around items-center mb-5">
                        <p className="text-lg text-center sm:text-left font-semibold mb-2">
                          Selected Image: {image.name}
                        </p>
                        <div onClick={() => setImage(null)}>
                          <Button type="contained" color="primary" size="small">
                            Change
                          </Button>
                        </div>
                      </div>
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Selected"
                        className="max-w-full h-auto mb-4"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <IconContext.Provider
                        value={{ color: "#4b5563", size: "2rem" }}
                      >
                        <HiPhoto />
                      </IconContext.Provider>
                      <div className="mt-4 flex flex-col sm:flex-row items-center text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary-hover"
                        >
                          <span>Upload a file</span>
                          <input
                            required
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={handleFileChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        (PNG, JPG, GIF up to 10MB)
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                onClick={() =>
                  navigate("/commissioned-orders/custom-artwork-process")
                }
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
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default SubmitCommissionedRequest;
