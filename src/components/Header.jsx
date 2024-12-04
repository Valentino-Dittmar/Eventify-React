import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setIsLoggedIn(!!authToken); // Setting to true if the token is there
  }, []);

  // Define paths where the header should not be displayed
  const noHeaderPaths = ["/login", "/register", "/oauth2/callback", '/'];

  // If the current path is in noHeaderPaths, don't render the header
  if (noHeaderPaths.includes(location.pathname)) {
    return null;
  }

  // If user is not logged in, don't render the header
  if (!isLoggedIn) {
    return null;
  }

  return (
    <header className="bg-indigo-600 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1
          className="text-4xl font-extrabold text-white tracking-wide cursor-pointer"
          onClick={() => navigate("/home")}
        >
          Eventify
        </h1>

        {/* Navigation Bar */}
        <nav className="flex items-center space-x-6">
          {/* Attending Events Button */}
          <button
            onClick={() => navigate("/attending-events")}
            className="px-4 py-2 text-lg font-semibold text-white bg-indigo-500 rounded-lg shadow hover:bg-indigo-400 transition duration-300"
          >
            Attending Events
          </button>

          {/* Events Button */}
          <button
            onClick={() => navigate("/events")}
            className="px-4 py-2 text-lg font-semibold text-white bg-indigo-500 rounded-lg shadow hover:bg-indigo-400 transition duration-300"
          >
            Events
          </button>

          {/* Profile Button */}
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center px-4 py-2 text-lg font-semibold text-white bg-indigo-500 rounded-lg shadow hover:bg-indigo-400 transition duration-300"
          >
            <svg
              className="w-5 h-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              {/* User Icon */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A4 4 0 0112 19a4 4 0 016.879-1.196m-1.743-6.958A4 4 0 1012 9a4 4 0 004.136 3.846M4 21h16a1 1 0 001-1v-2a5 5 0 00-5-5H8a5 5 0 00-5 5v2a1 1 0 001 1z"
              />
            </svg>
            Profile
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;