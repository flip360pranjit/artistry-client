import React from "react";
import Button from "../components/Button/Button";
import { motion } from "framer-motion";
import Image from "../assets/images/mission.jpg";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleUp } from "react-icons/fa";
import { useSelector } from "react-redux";

const heroVariants = {
  hidden: {
    opacity: 0,
    y: "50vh",
  },
  visible: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: "-100vh",
    transition: { ease: "easeInOut" },
  },
};

const steps = [
  {
    id: 1,
    title: "Step 1: Create Your Seller Portfolio",
    description:
      "To become a seller on our platform, you'll need to create a seller portfolio. Showcase your best artwork, provide a compelling artist bio, and include relevant details about your artistic journey and inspirations. A well-curated portfolio will help you attract potential buyers and establish your credibility as an artist.",
    image: "Step1",
  },
  {
    id: 2,
    title: "Step 2: Prepare Your Artwork",
    description:
      "Ensure that your artwork is in its best condition before listing it for sale. Clean, repair, and frame your pieces if necessary. Take high-quality photographs or create digital scans of your artwork to showcase them accurately to potential buyers. Pay attention to details like lighting, color accuracy, and capturing the texture of your artwork.",
    image: "Step2",
  },
  {
    id: 3,
    title: "Step 3: List Your Artwork",
    description:
      "Once your portfolio is set up, it's time to list your artwork for sale. Provide clear and detailed information about each piece, including its title, medium, dimensions, and a compelling description that conveys the story, emotions, or concept behind the artwork. Set a competitive price that reflects the value of your work while considering market trends and your experience as an artist.",
    image: "Step3",
  },
  {
    id: 4,
    title: "Step 4: Promote Your Artwork",
    description:
      "Utilize the promotional tools and features provided by our platform to reach a wider audience. Share your artwork on social media, participate in online art communities, and engage with potential buyers and fellow artists. Consider creating a personal website or blog to showcase your portfolio and share insights into your creative process. Collaborate with other artists or participate in local art events to gain exposure.",
    image: "Step4",
  },
  {
    id: 5,
    title: "Step 5: Manage Sales and Orders",
    description:
      "When a buyer expresses interest in purchasing your artwork, communicate with them to finalize the sale. Provide prompt and professional responses to inquiries, negotiate the terms if necessary, and agree on payment and delivery methods. Keep track of your sales and orders, including shipping details, to ensure a smooth and efficient process.",
    image: "Step5",
  },
  {
    id: 6,
    title: "Step 6: Fulfilling Orders",
    description:
      "Prepare your artwork for delivery or pickup with great care. Pack your pieces securely to protect them during transit, and include any necessary certificates of authenticity or additional documentation. If offering shipping, choose a reliable and trackable shipping service to ensure the artwork arrives safely. If offering local pickup, coordinate a convenient time and location with the buyer.",
    image: "Step6",
  },
  {
    id: 7,
    title: "Step 7: Provide Exceptional Customer Service",
    description:
      "Ensure that you provide excellent customer service throughout the entire process. Communicate with buyers promptly and professionally, address any concerns or issues that may arise, and provide updates on order status and shipping. Strive to exceed buyer expectations and leave a positive impression that can lead to repeat purchases and recommendations.",
    image: "Step7",
  },
];

function HowToSell() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  function becomeSeller(event) {
    event.preventDefault();
    user.isSeller
      ? navigate("/dashboard")
      : navigate("/sell-art/become-a-seller");
  }

  return (
    <div className="flex flex-col items-center bg-white lg:px-8 mx-10">
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 pt-12 mobile-sm:pt-24 sm:pt-24 px-7 rounded-b-3xl mb-5">
        <motion.h1
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0, duration: 0.6 }}
          exit="exit"
          className="text-center text-3xl mobile-sm:text-3xl sm:text-5xl font-semibold font-poppins"
        >
          Welcome to our <span className="text-primary">How to Sell</span>{" "}
          guide!
        </motion.h1>
        <motion.p
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3, duration: 0.6 }}
          exit="exit"
          className="text-center text-[8px] mobile-sm:text-xs sm:text-base font-open-sans text-[#555555] mt-7"
        >
          Whether you're a seasoned artist looking to expand your reach or just
          starting to explore selling your artwork, this page will provide you
          with valuable insights and practical tips to help you succeed. Selling
          art can be a rewarding endeavor, allowing you to share your creativity
          with a wider audience and potentially generate income from your
          passion. In this guide, we will walk you through the step-by-step
          process of becoming a seller on our platform and selling your art.
        </motion.p>
        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6, duration: 0.6 }}
          exit="exit"
          className="mt-7 flex justify-center"
          onClick={becomeSeller}
        >
          <Button type="contained" color="primary" size="large">
            Become a Seller
          </Button>
        </motion.div>
      </div>
      <div className="">
        <h3 className="text-center text-3xl sm:text-5xl font-semibold font-poppins my-5">
          Let's get started!
        </h3>
        <div className="flex flex-col items-center">
          <iframe
            className="w-[50vw] h-[28.2vw]"
            src="https://www.youtube.com/embed/OcLPtlzj7cU"
            title="OG HORROR IS BACK - NO PROMOTION"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          <p className="mt-3 text-[#555555] flex flex-col items-center">
            <FaAngleUp /> <span>Click to see the tutorial</span>
          </p>
        </div>
        <div className="mt-7">
          {steps.map((step) => (
            <div
              key={step.id}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center mt-6"
            >
              <img src={Image} alt={step.image} className="" />
              <div
                className={`col-span-2 ${
                  step.id % 2 !== 0 && "sm:order-first"
                }`}
              >
                <h3
                  className={`font-poppins font-semibold mb-3 text-2xl text-center ${
                    step.id % 2 === 0 ? "sm:text-right" : "sm:text-left"
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`font-open-sans leading-relaxed text-sm text-[#555555] text-center ${
                    step.id % 2 === 0 ? "sm:text-right" : "sm:text-left"
                  }`}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-100 py-10 rounded-2xl mt-10">
        <h2 className="font-poppins font-semibold text-4xl text-center mb-5">
          Art Selling Tip:
        </h2>
        <p className="font-open-sans text-sm leading-relaxed text-center text-[#333333] bg-white p-5 mx-3 sm:mx-16 rounded-lg shadow-lg">
          Remember, selling art is a journey that requires dedication,
          persistence, and continuous improvement. Regularly update your
          portfolio with new artwork, refine your marketing strategies, and stay
          connected with the art community. By following these steps and
          leveraging the opportunities provided by our platform, you can
          showcase your talent and connect with art enthusiasts from around the
          world.
        </p>
      </div>

      <div className="pt-20 pb-12">
        <h2 className="font-poppins font-semibold text-4xl sm:text-6xl text-center">
          Get Started!
        </h2>
        <Link to="/sell-art/become-a-seller">
          <div className="mt-7 flex justify-center">
            <Button type="contained" color="primary" size="large">
              Become a Seller
            </Button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default HowToSell;
