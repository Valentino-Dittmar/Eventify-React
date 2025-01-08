import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useUser } from "../UserContext";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";

const ViewEventPage = () => {
  const { id } = useParams();
  const { user } = useUser();

  const [event, setEvent] = useState(null);
  const [attendants, setAttendants] = useState([]);
  const [showAttendants, setShowAttendants] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  // STOMP client reference
  const stompClientRef = useRef(null);

 
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`http://localhost:8080/events/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvent(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching event details:", err);
        setError(true);
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  // STOMP CLIENT Set Up
  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("STOMP connected");

        // Subscribing to a chat topic
        stompClient.subscribe(`/topic/events/${id}/chat`, (message) => {
          const newMsg = JSON.parse(message.body);
          setMessages((prev) => [...prev, newMsg]);
        });
      },
      onStompError: (frame) => {
        console.error("STOMP error:", frame);
      },
    });

    stompClientRef.current = stompClient;
    stompClient.activate();

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
        console.log("STOMP disconnected");
      }
    };
  }, [id]);

 
  const fetchAttendants = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`http://localhost:8080/events/${id}/attendants`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAttendants(response.data);
      setShowAttendants(true);
    } catch (err) {
      console.error("Error fetching attendants:", err);
      alert("Failed to load attendants. Please try again.");
    }
  };

 //SENDING A MESSAGE
  const sendMessage = () => {
    const stompClient = stompClientRef.current;
    if (!stompClient || !stompClient.connected) {
      alert("Chat not connected");
      return;
    }
  
    if (message.trim()) {
      let userName = user?.name;
      if (!userName && user?.email) {
        userName = user.email.split("@")[0]; // Extract a username from the email for google users 
      }
  
      const chatMessage = {
        user: userName || "Guest", 
        content: message,
      };
  
      stompClient.publish({
        destination: `/app/events/${id}/chat`,
        body: JSON.stringify(chatMessage),
      });
  
      setMessage("");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-2xl font-semibold text-gray-700">Loading event details...</p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-2xl font-semibold text-red-500">
          Error loading event. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        {/* Event Details */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-10">
          <div className="relative group overflow-hidden">
            <img
              src={`https://picsum.photos/seed/${id}/1200/600`}
              alt="Event"
              className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
          </div>
          <div className="p-8">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{event.title}</h1>
            <p className="text-lg text-gray-600 mb-6">{event.description}</p>
            <div className="flex items-center justify-between text-gray-700 mb-4">
              <div>
                <strong className="font-semibold">Date:</strong>{" "}
                {new Date(event.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div>
                <strong className="font-semibold">Location:</strong> {event.location}
              </div>
            </div>
            <button
              onClick={fetchAttendants}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              View Attendants
            </button>
          </div>
        </div>

        {/* Chat Section */}
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Live Chat</h2>
          <div className="border border-gray-300 rounded-lg p-4 h-64 overflow-y-scroll mb-6 bg-gray-50">
            {messages.length === 0 ? (
              <p className="text-center text-gray-500">
                No messages yet. Be the first to say hi!
              </p>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className="mb-3">
                  <strong className="text-indigo-600">{msg.user}</strong>:{" "}
                  <span className="text-gray-700">{msg.content}</span>
                </div>
              ))
            )}
          </div>
          <div className="flex items-center">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
            />
            <button
              onClick={sendMessage}
              className="ml-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Attendants Modal */}
      {showAttendants && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 shadow-lg w-96">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Attendants</h2>
            <ul className="space-y-2">
              {attendants.map((attendant, index) => (
                <li key={index} className="text-gray-700">
                  {attendant.name}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowAttendants(false)}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewEventPage;