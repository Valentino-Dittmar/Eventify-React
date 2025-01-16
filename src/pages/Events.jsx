import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get("http://localhost:8080/events", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEvents(response.data.events);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError(true);
      setLoading(false);
    }
  };

  const handleAttendEvent = async (eventId) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No authentication token found");
      }

      await axios.post(
        `http://localhost:8080/events/${eventId}/attend`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Successfully registered for the event!");
    } catch (err) {
      console.error("Error attending event:", err);
      alert("Could not register for the event. Please try again.");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-700">Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-red-500">Error loading events. Please try again later.</p>
      </div>
    );
  }

  const isCustomer = user?.roles?.includes("CUSTOMER");
  const isEventManager = user?.roles?.includes("EVENT_MANAGER");

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-5xl font-bold text-gray-800">Upcoming Events</h1>
          {isEventManager && (
            <button
              onClick={() => navigate("/create-event")}
              className="px-6 py-2 bg-green-600 text-white rounded-lg text-lg font-semibold hover:bg-green-700 transition duration-300"
            >
              Make an Event
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.eventId}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
            >
              {/* Image Container with Cool Effect */}
              <div className="relative group overflow-hidden">
                <img
                  src={`https://picsum.photos/seed/${event.eventId}/600/400`}
                  alt="Event"
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
              </div>
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
                {isCustomer && (
                  <button
                    onClick={() => handleAttendEvent(event.eventId)}
                    className="w-full py-2 bg-indigo-600 text-white rounded-lg text-lg font-semibold hover:bg-indigo-700 transition duration-300 mb-2"
                  >
                    Attend
                  </button>
                )}
                <button
                  onClick={() => navigate(`/events/${event.eventId}`)}
                  className="w-full py-2 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;