import './App.css';
import { Routes, Route } from "react-router-dom";
import Create from './Components/Create/Create';
import Owned from './Components/Owned/Owned';
import React, { useEffect, useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import { UserContext } from './Context/userContext';
import Sale from './Components/Sale/Sale';

export default function App() {

  const accountsChanged = (newAccount) => {
    if (newAccount.length) setAccount(newAccount[0]);
    else setAccount(null);
  };

  const chainChanged = () => {
    console.log('chain changed');
    setAccount(null);
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
    }
  }, []);

  useEffect(() => {
    if (window.ethereum.networkVersion !== '80001') {
      window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x13881' }],
      }).then(() => {
      }).catch((error) => {
      });
    }
  })
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", async () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      });
    }
    else{
      alert("Please install Metamask to use this app");
    }
  });

  return (
    <UserContext.Provider value={{account,setContract, setAccount, contract}}>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/sale" element={<Sale/>} />
        <Route path="/owned" element={<Owned/>} />
        <Route path="/create" element={<Create/>} />
        <Route path="*" element={<h1>Route Not Found</h1>} />
      </Routes>
    </UserContext.Provider>
  );
}

