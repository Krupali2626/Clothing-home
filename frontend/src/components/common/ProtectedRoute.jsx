import React from "react";
import { Navigate } from "react-router-dom";
import { useShop } from "../../context/ShopContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user, authLoading } = useShop();

  if (authLoading) {
    return (
      <div className="container py-5 text-center">
        <p>Loading…</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user?.role !== "admin") {
    return <Navigate to="/my-account" replace />;
  }

  return children;
};

export default ProtectedRoute;
