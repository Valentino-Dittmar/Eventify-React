import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import getService from '../getCalls';

const Services = () => {
  const [services, setServices] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getService();
        setServices(response); 
      } catch (err) {
        setError('Failed to load services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <div>Loading services...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h3>All Services</h3>
      {services ? (
        <pre>{JSON.stringify(services, null, 2)}</pre> 
      ) : (
        <div>No services available</div>
      )}
    </div>
  );
};

export default Services;