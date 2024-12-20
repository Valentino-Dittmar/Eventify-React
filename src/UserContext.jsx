import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// Create UserContext
const UserContext = createContext();

// Custom hook to access UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// UserProvider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores the user object
  const [loading, setLoading] = useState(true); // Loading state
  const [authType, setAuthType] = useState("context"); // Default to context-based auth

  // Fetch user data dynamically based on auth type
  const fetchUser = async () => {
    setLoading(true); // Start loading
    try {
      const endpoint =
        authType === "google"
          ? "http://localhost:8080/auth/google/me"
          : "http://localhost:8080/auth/me";

      const response = await axios.get(endpoint, {
        withCredentials: true,
      });

      setUser(response.data); // Update user state
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null); // Reset user on error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch user on mount and when authType changes
  useEffect(() => {
    fetchUser();
  }, [authType]);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        setUser, // Allow manual user updates
        setAuthType, // Allow switching between auth types
        authType,
      }}
    >
      {loading ? <div>Loading...</div> : children}
    </UserContext.Provider>
  );
};