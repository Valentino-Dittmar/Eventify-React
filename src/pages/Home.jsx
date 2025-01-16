import React, { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:8080/auth/me", {
          withCredentials: true, 
        });

   
        if (response.data && response.data.name) {
          setUserName(response.data.name);
        } else {
          setUserName(""); 
        }
      } catch (error) {
        console.error("Error fetching user:", error);
       
        setUserName("");
      } finally {
        setLoading(false); 
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-screen"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521185496955-15097b20c5fe?auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center">
            {/* If userName is set, show a personalized welcome */}
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {userName ? `Welcome back, ${userName}!` : "Welcome to Eventify"}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Your one-stop solution for managing and discovering amazing events.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => (window.location.href = "/events")}
                className="px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-md shadow hover:bg-indigo-700 transition duration-300"
              >
                Discover Events
              </button>
              <button
                onClick={() => (window.location.href = "/create-event")}
                className="px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-md shadow hover:bg-green-700 transition duration-300"
              >
                Create Event
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
          Why Choose Eventify?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="text-center">
            <svg
              className="w-16 h-16 mx-auto text-indigo-600 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              {/* Calendar Icon */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-6 8h4m-9 7h14a2 2 0 002-2V7a2 2 0 00-2-2h-3.5a2 2 0 01-2-2h-3a2 2 0 01-2 2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Seamless Event Management
            </h3>
            <p className="text-gray-600">
              Easily create, edit, and manage your events with our intuitive interface.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="text-center">
            <svg
              className="w-16 h-16 mx-auto text-indigo-600 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              {/* Users Icon */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 20h5v-1a4 4 0 00-3-3.87M9 20H4v-1a4 4 0 013-3.87m9 3.87v1m-6 0v1M12 14a4 4 0 00-4-4H6a4 4 0 000 8h6a4 4 0 004-4z"
              />
            </svg>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Connect with Others
            </h3>
            <p className="text-gray-600">
              Join events and meet like-minded individuals who share your interests.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="text-center">
            <svg
              className="w-16 h-16 mx-auto text-indigo-600 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              {/* Globe Icon */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 2a10 10 0 00-7.07 17.07A10 10 0 1012 2zm0 18a8 8 0 110-16 8 8 0 010 16z"
              />
            </svg>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Discover New Experiences
            </h3>
            <p className="text-gray-600">
              Explore a wide range of events happening around you and globally.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;