import { ethers } from 'ethers';
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../Context/userContext';

const HomeCard = ({reexecuteQuery,nft }) => {
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [image,setImage] = useState("");
    const [loading,setLoading] = useState(false);
    const { contract } = useContext(UserContext)
    useEffect(() => {
        const uri = "https://ipfs.io/ipfs/"+ nft.tokenURI.slice(7);
        async function getUsers() {
          try {
            const response = await fetch(uri, {
              method: 'GET',
            });
            const json = await response.json();
            setName(json.name);
            setDescription(json.description);
            const img_url = "https://ipfs.io/ipfs/"+ json.image.slice(7);
            setImage(img_url);
        }
        catch (error) {
            console.error(error);
        }}
        getUsers();
    }, [nft.tokenURI]);

    async function handleCancel() {
      setLoading(true);
      try{
          console.log(contract);
          const transaction = await contract.buyNFT(nft.id, {value: (nft.price)});
          await transaction.wait();
          alert("NFT Bought Successfully")
          window.location.reload();
        }
        catch (error) {alert(error.stack);console.error(error);}
      reexecuteQuery();
      setLoading(false);
    }

  
  return (
    <div className="card">
        <img src={image} alt={name} className="card-img-top" />
        <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">Owner Address : {nft.to}</p>
            <p className="card-text">Price : {ethers.utils.formatEther(nft.price)} Eth.</p>
            <button className="btn-sell" disabled={loading} onClick={()=>{handleCancel()}} >{loading ? "Buying.." : "Buy NFT" }</button>
        </div>
    </div>
  )
}

export default HomeCard;
