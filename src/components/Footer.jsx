import React from 'react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  // paths where the footer should not be displayed
  const noFooterPaths = ['/login', '/register', '/oauth2/callback', '/'];

  if (noFooterPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <footer className="bg-purple-600 text-white py-4">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; 2024 Eventify. All rights reserved.</p>
        <p>
          Follow us on:&nbsp;
          <a href="https://twitter.com" className="hover:underline">
            Twitter
          </a>
          &nbsp;|&nbsp;
          <a href="https://facebook.com" className="hover:underline">
            Facebook
          </a>
          &nbsp;|&nbsp;
          <a href="https://instagram.com" className="hover:underline">
            Instagram
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;