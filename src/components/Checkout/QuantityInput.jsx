import React from "react";
import { toast } from "react-toastify";

function QuantityInput({
  quantity,
  productId,
  customQuantity,
  focusedInput,
  maxQuantity,
  setCustomQuantity,
  setFocusedInput,
  handleSetQuantity,
}) {
  function handleQuantityChange(event) {
    if (event.target.value < 1) setCustomQuantity(1);
    else if (event.target.value > maxQuantity) {
      setCustomQuantity(maxQuantity);
      toast.info(`Max quantity is ${maxQuantity}`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      setCustomQuantity(event.target.value);
    }
  }
  return (
    <>
      <input
        type="number"
        name="custom-quantity"
        id="custom-quantity"
        value={focusedInput ? customQuantity : quantity}
        onChange={handleQuantityChange}
        onFocus={() => setFocusedInput(true)}
        className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:max-w-xs sm:text-sm sm:leading-6"
      />
      {focusedInput && (
        <button
          onClick={(e) => handleSetQuantity(e, productId, customQuantity)}
          className="p-1.5 mt-1 rounded-full bg-primary text-white text-xs hover:bg-primary-hover"
        >
          Update
        </button>
      )}
    </>
  );
}

export default QuantityInput;
