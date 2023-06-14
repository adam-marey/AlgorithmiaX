import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file for Navbar styles

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="logo-link">
          AlgorithmiaX
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/editor" className="nav-link">
          Editor
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
