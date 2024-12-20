import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "./UserContext";

const ProtectedRoute = ({ element, roles }) => {
  const { user, loading } = useUser();

  if (loading) {
    return <div>Loading...</div>; // Wait for user to be fetched
  }

  if (!user) {
    return <Navigate to="/" />; // Redirect to login page if not authenticated
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" />; // Redirect if role mismatch
  }

  return element; // Render the protected component
};

export default ProtectedRoute;