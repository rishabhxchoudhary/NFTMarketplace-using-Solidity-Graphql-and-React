import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/userContext';

import "./Navbar.css"

const Navbar = () => {
  const {account,setAccount} = useContext(UserContext);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectMetamask = async () => {
    setIsConnecting(true);
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
    setIsConnecting(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          NFT Marketplace
        </Link>

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

        <div className="navbar-account">
          {isConnecting ? (
            <button className="navbar-button-loading" disabled>
              Loading...
            </button>
          ) : account ? (
            <div className="navbar-account-info">
              <img src={`https://avatars.dicebear.com/api/bottts/${account}.svg`} alt="Avatar" />
              <span className="navbar-account-address">{account.slice(0, 6)}...{account.slice(-4)}</span>
            </div>
          ) : (
            <button className="navbar-button" onClick={connectMetamask}>
              Connect Metamask
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
