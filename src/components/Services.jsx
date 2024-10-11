import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import getCalls from './getCalls';

const Services = () => {
  const [services, setServices] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getCalls.getService();
        setServices(response); 
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
      <pre>{JSON.stringify(services, null, 2)}</pre> 
    </div>
  );
};

export default Services;