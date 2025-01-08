import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const endpoint = "http://localhost:8080/auth/token/me";
      const token = localStorage.getItem("authToken");

      const response = await axios.get(endpoint, {
        withCredentials: true,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        fetchUser,
      }}
    >
      {loading ? <div>Loading...</div> : children}
    </UserContext.Provider>
  );
};