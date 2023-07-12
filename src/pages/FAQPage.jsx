import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function FAQPage() {
  const [currentFaq, setCurrentFaq] = useState(0);

  function handleClick(event, index) {
    event.preventDefault();

    if (currentFaq === index) {
      setCurrentFaq(-1);
    } else {
      setCurrentFaq(index);
    }
  }

  return (
    <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 rounded-b-3xl mx-4 md:mx-20 flex flex-col items-center font-poppins">
      <div>
        <h1 className="text-center text-4xl font-black">
          Frequently asked questions
        </h1>
        <p className="text-center text-[#555555] text-sm mt-1">
          Last Updated on July 12, 2023
        </p>
      </div>

      <div className="mt-16 sm:w-[50vw]">
        {faqData.map((faq, index) => (
          <div key={index} className="text-[#555555]">
            <div
              onClick={(e) => handleClick(e, index)}
              className="flex justify-between items-center gap-2 border-b cursor-pointer"
            >
              <h2
                className={`text-xl py-7 ${
                  currentFaq === index && "text-[#333333]"
                }`}
              >
                {faq.question}
              </h2>
              {currentFaq === index ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {currentFaq === index && (
              <p className="py-5 leading-relaxed border-b text-sm">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQPage;

const faqData = [
  {
    question: "What is Artistry?",
    answer:
      "Artistry is a one-stop web app for artists and art enthusiasts. It provides a platform for artists to showcase their artworks, list commissioned orders, manage orders, and connect with potential clients.",
  },
  {
    question: "How can I create an account on Artistry?",
    answer:
      "To create an account on Artistry, click on the 'Sign Up' button located on the homepage. Fill in the required information, such as your name, email address, and password, and click 'Sign Up.' You will receive a verification email to activate your account.",
  },
  {
    question: "How can I browse artworks on Artistry?",
    answer:
      "You can browse artworks on Artistry by clicking on the 'Gallery' section. Here, you will find a wide range of artworks from various artists. You can filter the artworks by category, style, or artist name to find exactly what you're looking for.",
  },
  {
    question: "Can I commission custom artwork on Artistry?",
    answer:
      "Absolutely! Artistry offers a commission feature where you can request custom artwork from your favorite artists. Simply browse the artist's profile, select the 'Commission' option, and provide details about your desired artwork. The artist will review your request and communicate with you directly to discuss further.",
  },
  {
    question: "How can I manage my orders on Artistry?",
    answer:
      "Once you have placed an order for artwork or commissioned artwork, you can manage your orders through the 'My Orders' section. Here, you can track the progress of your orders, communicate with the artist, and make necessary changes if needed.",
  },
  {
    question: "How can I contact an artist on Artistry?",
    answer:
      "If you have any questions or would like to reach out to an artist, you can use the messaging feature on Artistry. Simply navigate to the artist's profile and click on the 'Message' button to start a conversation.",
  },
  {
    question: "How does the payment process work on Artistry?",
    answer:
      "Artistry utilizes a secure payment system for all transactions. When purchasing artwork or commissioning a custom piece, you can securely make payments through the platform. Payments are processed using trusted payment gateways to ensure the safety of your financial information.",
  },
  {
    question: "Is my personal information secure on Artistry?",
    answer:
      "At Artistry, we prioritize the security and privacy of our users. We implement industry-standard security measures to protect your personal information. For more details, please refer to our Privacy Policy.",
  },
  {
    question: "Can I leave reviews for artists and artworks?",
    answer:
      "Yes, we encourage users to leave reviews for artists and their artworks. Your feedback helps other users make informed decisions and supports artists in their creative journey. You can leave reviews through the artist's profile or the artwork's page.",
  },
  {
    question: "How can I get in touch with Artistry's support team?",
    answer:
      "If you have any further questions or need assistance, you can contact our support team by sending an email to [support email]. We are here to help and will respond to your inquiries as soon as possible.",
  },
  // Add more questions and answers here...
];
