import { ethers } from 'ethers';
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../Context/userContext';

const SaleCard = ({reexecuteQuery,nft }) => {
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
        const transaction = await contract.cancelListing(nft.id);
        await transaction.wait();
        reexecuteQuery();
        alert("NFT Cancelled Successfully")
      }
      catch(err){ console.log(err);}
      setLoading(false);
    }

  
  return (
    <div className="card">
        <img src={image} alt={name} className="card-img-top" />
        <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">Price : {ethers.utils.formatEther(nft.price)} Eth.</p>
            <button className="btn-sell" onClick={()=>{handleCancel()}} >{loading ? "Cancelling.." : "Cancel" }</button>
        </div>
    </div>
  )
}

export default SaleCard;