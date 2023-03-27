import React from "react";
import "./Default.css"; // Import the CSS file for this component
import vector from '../../Assets/vector.jpg';
import Button from "../ConnectWallet/Button";

const Default = () => {
  return (
    <div className="container">
      <div className="left">
        <h1>Welcome to my NFT Marketplace</h1>
        <p>Buy, sell, and create unique digital assets on the Polygon (Mumbai) blockchain.</p>
        {/* <button className="primary-button">Get Started</button> */}
        <Button/>
      </div>
      <div className="right">
        <img className="vector" src={vector} alt="vector_img"/>
      </div>
    </div>
  );
};

export default Default;
