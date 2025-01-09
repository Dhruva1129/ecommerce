import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaBars } from 'react-icons/fa';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const hasLoggedIn = useRef(false); // Prevent multiple login alerts

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Check login status on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token && !hasLoggedIn.current) {
      setIsLoggedIn(true);
      alert('Login successful'); // Alert only once
      hasLoggedIn.current = true;
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    alert('Account logged out');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="logo">ElectronicHub</div>
      <ul className={`nav-links ${menuOpen ? 'show' : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/product">Products</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
      <div className="nav-icons">
        <Link to="/cart">
          <FaShoppingCart />
        </Link>
        {isLoggedIn ? (
          <FaSignOutAlt
            className="logout-icon"
            title="Logout"
            onClick={handleLogout}
            style={{ cursor: 'pointer' }}
          />
        ) : (
          <div className="account-icon-container">
            <FaUser
              className="account-icon"
              title="Account"
              onClick={toggleDropdown}
              style={{ cursor: 'pointer' }}
            />
            {dropdownOpen && (
              <div className="account-dropdown">
                <Link to="/login" onClick={() => setDropdownOpen(false)}>Login</Link>
                <Link to="/signup" onClick={() => setDropdownOpen(false)}>Register</Link>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        <FaBars />
      </div>
    </nav>
  );
};

export default Navbar;
