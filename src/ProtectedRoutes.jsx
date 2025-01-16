// src/ProtectedRoutes.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "./UserContext";

const ProtectedRoute = ({ element, roles: allowedRoles }) => {
  const { user, loading } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  // If not logged in, redirect to '/'
  if (!user) {
    return <Navigate to="/" />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const userRoles = user.roles || [];
    const hasRole = userRoles.some((role) => allowedRoles.includes(role));
    if (!hasRole) {
      return <Navigate to="/unauthorized" />;
    }
  }

  // Otherwise, load the protected component
  return element;
};

export default ProtectedRoute;