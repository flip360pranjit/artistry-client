import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedOrder({ children }) {
  const { order } = useSelector((state) => state.order);

  return order ? children : <Navigate to="/browse" />;
}

export default ProtectedOrder;
