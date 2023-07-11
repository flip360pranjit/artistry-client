import React from "react";

function QuantityMenu({ quantity, productId, handleSetQuantity, maxQuantity }) {
  return (
    <>
      <select
        id="quantity"
        name="quantity"
        value={quantity}
        onChange={(e) => handleSetQuantity(e, productId, e.target.value)}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:max-w-xs sm:text-sm sm:leading-6"
      >
        {QuantitySelect(maxQuantity > 9 ? 9 : maxQuantity)}
        {maxQuantity > 9 && <option value="10+">10+</option>}
      </select>
    </>
  );
}

export default QuantityMenu;

const QuantitySelect = (quantity) => {
  const options = [];

  for (let i = 1; i <= quantity; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return <>{options}</>;
};
