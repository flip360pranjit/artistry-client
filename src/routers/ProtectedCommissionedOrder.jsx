import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedCommissionedOrder({ children }) {
  const { commissionedOrder } = useSelector((state) => state.order);

  return commissionedOrder ? (
    children
  ) : (
    <Navigate to="/commissioned-orders/custom-artwork-process" />
  );
}

export default ProtectedCommissionedOrder;
