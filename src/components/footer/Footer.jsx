import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <p>&copy; 2024 My Application. All rights reserved.</p>
      <p>Follow us on: 
        <a href="https://twitter.com">Twitter</a> | 
        <a href="https://facebook.com">Facebook</a> | 
        <a href="https://instagram.com">Instagram</a>
      </p>
    </footer>
  );
};

export default Footer;