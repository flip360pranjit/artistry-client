import React from "react";
import { FaTimes } from "react-icons/fa";

function PopupModal({ onClose, orderId, title, content, type, onClick }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 pr-10 max-w-lg z-50 relative">
        <div
          onClick={onClose}
          className="absolute top-3 right-3 text-xl cursor-pointer"
        >
          <FaTimes />
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="mb-4">{content}</p>
        <div className="flex justify-center">
          <button
            className={`px-4 py-2 ${
              type === "Accept"
                ? "bg-green-500 hover:bg-green-600"
                : "bg-red-500 hover:bg-red-600"
            } text-white rounded mr-2`}
            onClick={(e) => onClick(e, orderId)}
          >
            {type}
          </button>
        </div>
      </div>
      <div className="fixed inset-0 bg-black opacity-50"></div>
    </div>
  );
}
import { MdClose } from "react-icons/md";

export default PopupModal;
