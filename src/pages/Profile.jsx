import React from "react";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, loading, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-2xl font-semibold text-gray-700">Loading your profile...</h2>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-2xl font-semibold text-gray-700">
          No user found. Please log in first.
        </h2>
      </div>
    );
  }

  const isGoogleProvider = user.provider === "GOOGLE";
  const defaultProfilePicture =
    "https://via.placeholder.com/96?text=Default+Profile";

  const username = isGoogleProvider ? user.name : user.email?.split("@")[0] || "Unknown User";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <div className="flex flex-col items-center">
          <img
            src={isGoogleProvider ? user.profilePicture : defaultProfilePicture}
            alt={`${username}'s profile`}
            className="w-32 h-32 rounded-full shadow-md mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{username}</h1>
          <p className="text-gray-600 text-sm mb-6">{user.email || "No email available"}</p>
        </div>
        <div className="space-y-4">
          <div>
            <strong>User ID:</strong> <span>{user.userId || "N/A"}</span>
          </div>
          <div>
            <strong>Provider:</strong> <span>{user.provider || "Unknown"}</span>
          </div>
          <div>
            <strong>Roles:</strong>{" "}
            <span>{user.roles && user.roles.length > 0 ? user.roles.join(", ") : "N/A"}</span>
          </div>
        </div>
        {/* Logout Button */}
        <div className="mt-8">
          <button
            onClick={handleLogout}
            className="w-full py-2 bg-red-600 text-white rounded-md text-lg font-semibold
                       hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;