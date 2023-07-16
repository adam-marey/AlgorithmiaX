import React from 'react';
import { Link } from 'react-router-dom';
import Timer from './Timer'; // Import the Timer component
import './Navbar.css'; // Import the CSS file for Navbar styles

const Navbar = () => {
  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#34495e',
        color: 'white',
        boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '20px',
            fontWeight: 'bold'
          }}
        >
          AlgorithmiaX
        </Link>
        <div>
          <Link
            to="/"
            style={{
              color: 'white',
              textDecoration: 'none',
              marginRight: '10px'
            }}
          >
            Home
          </Link>
          <Link to="/editor" style={{ color: 'white', textDecoration: 'none' }}>
            Editor
          </Link>
        </div>
      </div>
      <Timer />
    </nav>
  );
};

export default Navbar;
