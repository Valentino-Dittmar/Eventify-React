import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    // get the query parameters from the URL
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('authToken', token);
      console.log('Google login successful, token stored:', token);

      // Clean up URL by removing query parameters so its more secure ;)
      window.history.replaceState({}, document.title, window.location.pathname);

      navigate('/home');
    } else {
      console.error('No token found in URL');
      alert('Authentication failed. Please try logging in.');
      navigate('/');
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-xl text-gray-700">Processing authentication, please wait...</p>
    </div>
  );
};

export default OAuthCallback;