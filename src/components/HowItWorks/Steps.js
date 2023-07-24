import { isWebpSupported } from "react-image-webp/dist/utils";

const steps = [
  {
    number: 1,
    title: "Browse Artwork",
    description:
      "Explore our extensive collection of exquisite artworks created by talented artists from around the world.",
    picture: `browse.${isWebpSupported() ? "webp" : "jpg"}`,
  },
  {
    number: 2,
    title: "Place an Order",
    description:
      "Select your favorite artwork and easily place an order with our secure and user-friendly ordering system.",
    picture: `order.${isWebpSupported() ? "webp" : "jpg"}`,
  },
  {
    number: 3,
    title: " Track Your Order",
    description:
      "Stay updated on the progress of your order through our intuitive tracking system.",
    picture: `track.${isWebpSupported() ? "webp" : "jpg"}`,
  },
  {
    number: 4,
    title: "Global Shipping",
    description:
      "Get your artwork delivered safely to your doorstep, no matter where you are in the world.",
    picture: `shipping.${isWebpSupported() ? "webp" : "jpg"}`,
  },
];

export default steps;
