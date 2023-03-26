import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import { UserContext } from './Context/userContext';
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { contractABI } from './utils/constants';
import Sale from './Components/Sale/Sale';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Owned from './Components/Owned/Owned';
import Create from './Components/Create/Create';

export default function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

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
    useEffect(()=>{
   connectingWithContract();
   console.log(process.env)
  },[])
  
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
    <UserContext.Provider value={{account, setAccount, contract}}>
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
