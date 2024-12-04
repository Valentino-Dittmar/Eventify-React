import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    // Delay processing slightly to ensure URL parameters are available
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');

      if (token) {
        localStorage.setItem('authToken', token);
        console.log('Google login successful, token stored:', token);

        // Clean up URL by removing query parameters
        window.history.replaceState({}, document.title, window.location.pathname);

        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        console.error('No token found in URL');
        alert('Authentication failed. Please try logging in.');
        navigate('/');
      }

      setIsProcessing(false);
    }, 100); // 100ms delay to ensure parameters are available

    return () => clearTimeout(timeoutId); // Cleanup timeout
  }, [navigate]);

  if (isProcessing) {
    return <div>Processing authentication, please wait...</div>;
  }

  return null;
};

export default OAuthCallback;