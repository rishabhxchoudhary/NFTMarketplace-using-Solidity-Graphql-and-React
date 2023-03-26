import React, { useEffect, useState } from 'react'

const OwnedCard = ({setSelectedNFT, nft }) => {
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [image,setImage] = useState("");

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
  return (
    <div className="card">
        <img src={image} alt={name} className="card-img-top" />
        <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{description}</p>
            <button className="btn-sell" onClick={()=>{setSelectedNFT(nft.id)}} >Sell</button>
        </div>
    </div>
  )
}

export default OwnedCard