import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AttendingEventsPage = () => {
  const [attendingEvents, setAttendingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAttendingEvents = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await axios.get("http://localhost:8080/events/attending", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAttendingEvents(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching attending events:", err);
        setError(true);
        setLoading(false);
      }
    };

    fetchAttendingEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-700">Loading your attending events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-red-500">
          Error loading your attending events. Please try again later.
        </p>
      </div>
    );
  }

  if (attendingEvents.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-700">
          You are not attending any events yet. Browse events and join one!
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-gray-800 mb-10">My Attending Events</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {attendingEvents.map((event) => (
            <div
              key={event.eventId}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
            >
              <img
                src={`https://picsum.photos/seed/${event.eventId}/600/400`}
                alt="Event"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{event.title}</h2>
                <p className="text-gray-600 mb-4 text-sm">{event.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                  <span>
                    <strong>Date:</strong>{" "}
                    {new Date(event.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                  <span>
                    <strong>Location:</strong> {event.location}
                  </span>
                </div>
                <button
                  onClick={() => navigate(`/events/${event.eventId}`)}
                  className="w-full py-2 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
                >
                  View Event
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttendingEventsPage;