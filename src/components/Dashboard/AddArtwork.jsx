import React, { useState } from "react";
import { HiPhoto } from "react-icons/hi2";
import Button from "../Button/Button";
import { IconContext } from "react-icons";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

function AddArtwork() {
  const [art, setArt] = useState({
    title: "",
    artistId: "",
    artistName: "",
    medium: "",
    category: "",
    size: "",
    price: 0,
    description: "",
  });
  const [customMedium, setCustomMedium] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [customSizeWidth, setCustomSizeWidth] = useState("");
  const [customSizeHeight, setCustomSizeHeight] = useState("");
  const [customSizeWidthUnit, setCustomSizeWidthUnit] = useState("");
  const [customSizeHeightUnit, setCustomSizeHeightUnit] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  // Handle Form input
  function handleChange(event) {
    event.preventDefault();
    setArt({
      ...art,
      [event.target.name]: event.target.value,
    });
  }
  function handleQuantityChange(event) {
    if (event.target.value < 1) setQuantity(1);
    else setQuantity(event.target.value);
  }
  //   Handle File input
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      setImage(file);
    } else {
      setImage(null);
      toast.error("Please select a file up to 10MB in size.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const signatureRes = await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_URL}/get-signature`,
      { uploadPreset: "artworks-webp" }
    );

    const formDataWebp = new FormData();
    formDataWebp.append("file", image);
    // formData.append("upload_preset", "artworks");
    formDataWebp.append("timestamp", signatureRes.data.timestamp);
    formDataWebp.append("upload_preset", "artworks-webp");
    formDataWebp.append(
      "api_key",
      import.meta.env.VITE_REACT_APP_CLOUDINARY_API_KEY
    );
    formDataWebp.append("format", "webp");
    formDataWebp.append("signature", signatureRes.data.signature);

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "artworks-original");
    try {
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

      // console.log({ original: data.secure_url, webp: dataWebp.secure_url });

      const currentDate = new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      const artworkData = {
        title: art.title,
        artist: {
          artistId: user._id,
          artistName: user.displayName,
        },
        medium: art.medium === "Other" ? customMedium : art.medium,
        category: art.category === "Other" ? customCategory : art.category,
        size:
          art.size === "Other"
            ? customSizeWidth +
              " " +
              customSizeWidthUnit +
              " x " +
              customSizeHeight +
              " " +
              customSizeHeightUnit
            : art.size,
        price: art.price,
        description: art.description,
        image: data.secure_url,
        imageWebp: dataWebp.secure_url,
        createdAt: currentDate,
        updatedAt: currentDate,
        quantity,
      };

      try {
        await axios
          .post(
            `${import.meta.env.VITE_REACT_APP_API_URL}/artworks`,
            artworkData
          )
          .then(() => {
            toast.success("Artwork has been created!");
          });
        setLoading(false);

        // Reset form fields after successful submission
        setArt({
          title: "",
          artistId: "",
          artistName: "",
          medium: "",
          category: "",
          price: 0,
          description: "",
        });
        setImage(null);
        setQuantity(1);
        navigate("/dashboard/listings");
      } catch (error) {
        setLoading(false);
        // console.log(error);
        toast.error(error.response.data.error);
      }
    } catch (err) {
      toast.error("Something went wrong!");
      // console.log(err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg px-16 py-10">
      <form onSubmit={handleSubmit}>
        <div className="">
          <h2 className="text-2xl text-center sm:text-left font-poppins font-semibold leading-7 text-gray-900">
            Add Artwork
          </h2>
          <p className="mt-1 text-sm text-center sm:text-left font-open-sans leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Artwork Title
              </label>
              <div className="mt-2">
                <input
                  required
                  type="text"
                  name="title"
                  id="title"
                  value={art.title}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Artwork Medium */}
            <div className="col-span-full sm:col-span-3">
              <label
                htmlFor="medium"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Artwork Medium
              </label>
              <div className="mt-2">
                <select
                  id="medium"
                  name="medium"
                  value={art.medium}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="">Select</option>
                  <option value="Pencil Drawing">Pencil Drawing</option>
                  <option value="Charcoal Drawing">Charcoal Drawing</option>
                  <option value="Digital Art">Digital Art</option>
                  <option value="Oil Painting">Oil Painting</option>
                  <option value="Watercolour Painting">
                    Watercolour Painting
                  </option>
                  <option value="Acrylic Painting">Acrylic Painting</option>
                  <option value="Sculpture">Sculpture</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            {art.medium === "Other" && (
              <div className="col-span-full sm:col-span-3">
                <label
                  htmlFor="custom-medium"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Medium of the Artwork
                </label>
                <div className="mt-2">
                  <input
                    required
                    type="text"
                    name="custom-medium"
                    id="custom-medium"
                    value={customMedium}
                    onChange={(e) => setCustomMedium(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            )}

            {/* Artwork Category */}
            <div className="col-span-full sm:col-span-3">
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Artwork Category
              </label>
              <div className="mt-2">
                <select
                  id="category"
                  name="category"
                  value={art.category}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="">Select</option>
                  <option value="Abstract">Abstract</option>
                  <option value="Landscape">Landscape</option>
                  <option value="Portrait">Portrait</option>
                  <option value="Still Life">Still Life</option>
                  <option value="Anime">Anime</option>
                  <option value="Animals & Wildlife">Animals & Wildlife</option>
                  <option value="Nature">Nature</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            {art.category === "Other" && (
              <div className="col-span-full sm:col-span-3">
                <label
                  htmlFor="custom-category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category of the Artwork
                </label>
                <div className="mt-2">
                  <input
                    required
                    type="text"
                    name="custom-category"
                    id="custom-category"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  />
                </div>
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
                  value={art.size}
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
            {art.size === "Other" && (
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
                      onChange={(e) => setCustomSizeHeightUnit(e.target.value)}
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
                  value={art.description}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about the artwork.
              </p>
            </div>

            {/* Artwork Price */}
            <div className="sm:col-span-2">
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Artwork Price
              </label>
              <div className="mt-2">
                <input
                  required
                  type="number"
                  name="price"
                  id="price"
                  value={art.price}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full sm:col-span-3">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Quantity ( You can update this later too)
              </label>
              <div className="mt-2">
                <input
                  required
                  type="number"
                  name="quantity"
                  id="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="block w-28 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="artwork-image"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Artwork Image
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
                          accept="image/*,.jpg,.jpeg,.png,.gif,.bmp,.tiff"
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

export default AddArtwork;
