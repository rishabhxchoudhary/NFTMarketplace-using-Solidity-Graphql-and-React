import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/userContext';
import Web3Modal from "web3modal";
import { ethers } from "ethers";

import "./Navbar.css"
import { contractABI } from '../../utils/constants';

const Navbar = () => {
  const {account,setAccount,setContract } = useContext(UserContext);
  const [isConnecting, setIsConnecting] = useState(false);

  const fetchContract = (signerOrProvider) => new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, contractABI, signerOrProvider);
  const connectingWithContract = async () => {
    try {
        const web3modal = new Web3Modal();
        const connctions = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connctions);
        const signer = provider.getSigner();
        setContract(fetchContract(signer));
    }
    catch (err) {
        console.log(err);
    }
  }
  const connectMetamask = async () => {
    setIsConnecting(true);
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      setAccount(accounts[0]);
      connectingWithContract()
      window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x13881' }],
      }).then(() => {
      }).catch((error) => {
        console.log(error);
      });
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
