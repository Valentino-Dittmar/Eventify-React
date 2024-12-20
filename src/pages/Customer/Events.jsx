import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.get('http://localhost:8080/events', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEvents(response.data.events); 
      setLoading(false);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-700">Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">Error loading events. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Events</h1>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded shadow-md overflow-hidden">
              <img
                src={`https://picsum.photos/seed/${event.id}/600/400`}
                alt="Event"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{event.title}</h2>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;