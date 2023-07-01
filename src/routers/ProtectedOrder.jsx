import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedOrder({ children }) {
  const { commissionedOrder } = useSelector((state) => state.order);

  return commissionedOrder ? (
    children
  ) : (
    <Navigate to="/commissioned-orders/custom-artwork-process" />
  );
}

export default ProtectedOrder;
