import React, { useEffect, useState } from "react";
import Button from "../components/Button/Button";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import FeaturedArtworks from "../components/Featured/FeaturedArtworks";
import axios from "axios";
import { toast } from "react-toastify";

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
    title: "Consultation",
    description:
      "Start by reaching out to us via email or phone to schedule a consultation. During this initial discussion, we'll explore your artistic vision, ideas, and requirements.",
  },
  {
    id: 2,
    title: "Proposal",
    description:
      "Based on our consultation, our team will prepare a personalized proposal for your commissioned artwork. The proposal will include details on pricing, timeline, and a creative approach tailored to your vision.",
  },
  {
    id: 3,
    title: "Collaboration",
    description:
      "Once you approve the proposal, the collaboration begins. Our artist will keep you involved throughout the creative process. We'll share regular updates, including work-in-progress images or videos, and seek your feedback and input.",
  },
  {
    id: 4,
    title: "Finalization",
    description:
      "After incorporating your feedback, we'll finalize the artwork. This stage involves adding the finishing touches, refining details, and ensuring it meets our high standards of quality.",
  },
  {
    id: 5,
    title: "Delivery",
    description:
      "Once you've given your final approval, we'll carefully package the artwork to ensure its safe transportation. You'll receive a tracking number to monitor the shipment's progress.",
  },
  {
    id: 6,
    title: "Receiving Your Artwork",
    description:
      "When the artwork arrives, we recommend inspecting it carefully to ensure it's in perfect condition. If you have any concerns or questions about the artwork, please contact us immediately.",
  },
  {
    id: 7,
    title: "Enjoying Your Artwork",
    description:
      "Once the artwork is in your hands, find the perfect place to display and enjoy it. Your commissioned artwork will be a unique reflection of your personal style and creativity.",
  },
];

function CommissionedProcess() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    // Function to fetch seller artworks
    const fetchArtworks = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/artworks`
        );
        const artworks = response.data;
        setArtworks(artworks);
      } catch (error) {
        // console.log(error);
        toast.error("Something went wrong!");
      }
    };

    // Fetch seller artworks on component mount
    fetchArtworks();
  }, []);

  function submitRequest(event) {
    event.preventDefault();

    if (!user) navigate("/auth");
    else {
      navigate("/commissioned-orders/submit-commission-request");
    }
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
          Welcome to our
          <br /> Commissioned Artwork Service
        </motion.h1>
        <motion.p
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3, duration: 0.6 }}
          exit="exit"
          className="text-center text-[8px] mobile-sm:text-xs sm:text-base font-open-sans text-[#555555] mt-7"
        >
          We're passionate about creating unique and personalized artworks just
          for you. Our commissioned art service offers you the opportunity to
          own a one-of-a-kind piece that reflects your vision and style.
        </motion.p>
        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6, duration: 0.6 }}
          exit="exit"
          className="mt-7 flex justify-center"
          onClick={submitRequest}
        >
          <Button type="contained" color="primary" size="large">
            Submit Request
          </Button>
        </motion.div>
      </div>

      {/* Overview */}
      <div className="my-16">
        <h2 className="text-center text-3xl sm:text-5xl font-semibold font-poppins">
          Overview
        </h2>
        <p className="text-center font-open-sans text-lg leading-relaxed mt-6 text-[#555555]">
          Commissioned artwork is the perfect way to bring your creative ideas
          to life. Whether you're looking for a stunning painting, a custom
          sculpture, or a personalized illustration, our team of talented
          artists is here to collaborate with you. By commissioning art, you get
          to actively participate in the creative process and have a truly
          special artwork that speaks to your individuality.
        </p>
      </div>

      <div className="max-w-[90vw]">
        <FeaturedArtworks
          featuredArtworksData={artworks}
          heading="Past Artworks"
          description="Take a look at our portfolio of commissioned artworks. Each piece is a testament to our dedication to craftsmanship and attention to detail. We have worked with a diverse range of clients, creating artworks that are tailored to their specific preferences and requirements."
        />
      </div>

      <div className="my-12">
        <h3 className="text-center text-3xl sm:text-5xl font-semibold font-poppins my-5">
          Let's get started!
        </h3>
        <div className="flex flex-col items-center mb-16">
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
        <div className="mb-16 bg-gray-200 p-7 rounded-3xl shadow-xl">
          <h2 className="text-center text-3xl sm:text-5xl font-semibold font-poppins">
            Step-by-Step Process
          </h2>
          <div className="mt-5">
            {steps.map((step) => (
              <div key={step.id} className="mb-3">
                <h2 className="font-montserrat font-semibold text-2xl">
                  <span className="font-poppins font-bold">
                    Step {step.id}:
                  </span>{" "}
                  {step.title}
                </h2>
                <p className="font-open-sans text-lg text-[#666666]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-center sm:text-left text-3xl sm:text-5xl font-semibold font-poppins">
          Artist's Approach and Style
        </h2>
        <p className="text-center sm:text-left font-open-sans text-lg leading-relaxed mt-6 text-[#555555]">
          Our artists are passionate about their craft and bring a unique
          artistic style to every commissioned artwork. We believe in
          collaborating with our clients to understand their preferences,
          aesthetics, and desired mood. By combining your ideas with our
          artistic expertise, we create pieces that resonate with your vision
          and evoke emotions.
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-center sm:text-right text-3xl sm:text-5xl font-semibold font-poppins">
          Pricing and Timeframe
        </h2>
        <p className="text-center sm:text-right font-open-sans text-lg leading-relaxed mt-6 text-[#555555]">
          Pricing for commissioned artworks varies based on factors such as
          size, complexity, and the medium used. We provide a personalized
          pricing estimate in our proposal once we understand your specific
          requirements. The timeframe for completion will depend on the
          intricacy of the artwork and our current workload. Rest assured, we
          are committed to delivering your artwork within a reasonable and
          agreed-upon timeframe.
        </p>
      </div>

      <div className="pt-5 pb-12">
        <h2 className="text-center text-3xl sm:text-5xl font-semibold font-poppins">
          Get Started!
        </h2>
        <div onClick={submitRequest} className="mt-7 flex justify-center">
          <Button type="contained" color="primary" size="large">
            Submit Request
          </Button>
        </div>
      </div>

      <div className="pt-20 pb-12 w-full bg-gray-200 rounded-3xl shadow-xl mb-10">
        <h2 className="text-center text-3xl sm:text-5xl font-semibold font-poppins">
          Contact for any queries
        </h2>
        <p className="text-center font-open-sans text-lg leading-relaxed mt-6 text-[#555555]">
          To inquire about commissioning artwork or to ask any questions you may
          have, feel free to reach out to us:
        </p>
        <Link to="/contact">
          <div className="mt-7 flex justify-center">
            <Button type="contained" color="primary" size="large">
              Contact Us
            </Button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default CommissionedProcess;
