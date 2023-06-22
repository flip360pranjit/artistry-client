import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function Filter({ name, options, onChange, isCleared }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (option) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((selectedOption) => selectedOption !== option)
      : [...selectedOptions, option];

    setSelectedOptions(updatedOptions);
    onChange(updatedOptions);
  };
  function clear() {
    const checkboxes = document.querySelectorAll(`input[type="checkbox"]`);
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }

  useEffect(() => {
    if (isCleared) {
      clear();
      setSelectedOptions([]);
      setIsOpen(false);
    }
  }, [isCleared]);

  return (
    <div className="font-poppins mt-5">
      <h3
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between text-base font-semibold mr-2 cursor-pointer"
      >
        {name} <span>{isOpen ? "-" : "+"}</span>
      </h3>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col">
              {options.map((option) => (
                <label
                  key={option}
                  className="flex gap-2 items-center text-sm mt-1 cursor-pointer bg-gray-100 p-2"
                >
                  <input
                    type="checkbox"
                    value={option}
                    checked={selectedOptions.includes(option)}
                    onChange={() => handleOptionChange(option)}
                    onClick={(e) => e.stopPropagation()}
                    className="option-checkbox form-checkbox text-primary border-primary focus:outline-none focus:ring-1 focus:ring-primary rounded cursor-pointer"
                  />
                  {option}
                </label>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Filter;
