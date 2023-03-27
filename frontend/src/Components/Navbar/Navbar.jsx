import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/userContext';
import Button from '../ConnectWallet/Button.jsx';

import "./Navbar.css"

const Navbar = () => {
  const {account } = useContext(UserContext);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          NFT Marketplace
        </Link>
        {account &&
          <div className="navbar-links">
            <Link to="/" className="navbar-link">
              Home
            </Link>
            <Link to="/sale" className="navbar-link">
              For Sale
            </Link>
            <Link to="/owned" className="navbar-link">
              Owned
            </Link>
            <Link to="/create" className="navbar-link">
              Create 
            </Link>
          </div>
        }
        <Button/>
      </div>
    </nav>
  );
};

export default Navbar;