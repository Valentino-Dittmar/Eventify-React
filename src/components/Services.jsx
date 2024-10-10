import React, { useEffect, useState } from 'react';
import axios from 'axios'; 

const Services = () => {
  const [services, setServices] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:8080/services'); // Fixed axios call
        setServices(response.data); // Set data properly
      } catch (err) {
        setServices('Failed to load services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <div>Loading services...</div>;
  }

  return (
    <div>
      <h3>All Services</h3>
      <pre>{JSON.stringify(services, null, 2)}</pre> {/* Use preformatted text for readability */}
    </div>
  );
};

export default Services;