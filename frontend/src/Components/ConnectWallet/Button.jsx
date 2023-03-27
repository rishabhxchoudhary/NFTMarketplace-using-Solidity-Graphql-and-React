import { ethers } from 'ethers';
import React, { useContext, useState } from 'react'
import { UserContext } from '../../Context/userContext';
import { contractABI } from '../../utils/constants';
import Web3Modal from "web3modal";
import { ButtonContext } from '../../Context/ButtonContext';

const Button = () => {
    const {account,setAccount,setContract, contract } = useContext(UserContext);
    const { setIsConnecting, isConnecting } = useContext(ButtonContext);
  
    const fetchContract = (signerOrProvider) => new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, contractABI, signerOrProvider);
    const connectingWithContract = async () => {
      try {
          const web3modal = new Web3Modal();
          const connctions = await web3modal.connect();
          const provider = new ethers.providers.Web3Provider(connctions);
          const signer = provider.getSigner();
          const c = fetchContract(signer);
          setContract(c);
      }
      catch (err) {
          console.log(err);
      }
    }
    
    const connectMetamask = async () => {
        if (window.ethereum){
            setIsConnecting(true);
            console.log("Start")
            try {
              const accounts = await window.ethereum.request({ method: 'eth_accounts' });
              setAccount(accounts[0]);
              await connectingWithContract();
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
            console.log("Start")
            setIsConnecting(false);
        }
        else{
            alert("You need a wallet to use this app!")
        }
    };
  return (
    <div className="navbar-account">
    {isConnecting ? (
      <button className="primary-button navbar-button-loading" disabled>
        Loading...
      </button>
    ) : account ? (
      <div className="navbar-account-info">
        <img src={`https://avatars.dicebear.com/api/bottts/${account}.svg`} alt="Avatar" />
        <span className="navbar-account-address">{account.slice(0, 6)}...{account.slice(-4)}</span>
      </div>
    ) : (
      <button className="primary-button navbar-button" onClick={connectMetamask}>
        Connect Wallet
      </button>
    )}
  </div>
  )
}

export default Button