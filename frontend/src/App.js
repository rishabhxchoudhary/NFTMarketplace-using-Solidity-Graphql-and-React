import './App.css';
import { Routes, Route } from "react-router-dom";
import Create from './Components/Create/Create';
import Owned from './Components/Owned/Owned';
import React, { useEffect, useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import { UserContext } from './Context/userContext';
import Sale from './Components/Sale/Sale';
import { ethers } from 'ethers';
import { contractABI } from './utils/constants';
import Web3Modal from 'web3modal';
import Default from './Components/Home/Default/Default';

export default function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  const accountsChanged = (newAccount) => {
    if (newAccount.length) setAccount(newAccount[0]);
    else setAccount(null);
  };

  const chainChanged = () => {
    console.log('chain changed');
    // setAccount(null);
  };
  const alreadyConnected = async () => {
    try {
      const res = await window.ethereum.request({
        method: 'eth_accounts',
      });
      accountsChanged(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', accountsChanged);
      window.ethereum.on('chainChanged', chainChanged);
      alreadyConnected();
      if (window.ethereum.networkVersion !== '80001') {
        window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x13881' }],
        }).then(() => {
        }).catch((error) => {
        });
      }
    }
  })

  useEffect(()=>{
    setInterval(() => {
      // console.log("Contract",contract)
      // console.log("FFFF")
    }, 1000);
  })

  useState(()=>{
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
      connectingWithContract();
    }
  )

  return (
    <UserContext.Provider value={{account,setContract, setAccount, contract}}>
      <Navbar/>
      {!account ? <Default/> : 
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/sale" element={<Sale/>} />
        <Route path="/owned" element={<Owned/>} />
        <Route path="/create" element={<Create/>} />
        <Route path="*" element={<h1>Route Not Found</h1>} />
      </Routes>
      }
    </UserContext.Provider>
  );
}
