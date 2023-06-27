import React from "react";

function QuantityMenu({ quantity, productId, handleSetQuantity }) {
  return (
    <>
      <select
        id="quantity"
        name="quantity"
        value={quantity}
        onChange={(e) => handleSetQuantity(e, productId, e.target.value)}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:max-w-xs sm:text-sm sm:leading-6"
      >
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
        <option value={7}>7</option>
        <option value={8}>8</option>
        <option value={9}>9</option>
        <option value="10+">10+</option>
      </select>
    </>
  );
}

export default QuantityMenu;
