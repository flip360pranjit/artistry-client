import React from "react";

function QuantityInput({
  quantity,
  productId,
  customQuantity,
  focusedInput,
  setCustomQuantity,
  setFocusedInput,
  handleSetQuantity,
}) {
  return (
    <>
      <input
        type="number"
        name="custom-quantity"
        id="custom-quantity"
        value={focusedInput ? customQuantity : quantity}
        onChange={(e) => setCustomQuantity(e.target.value)}
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
