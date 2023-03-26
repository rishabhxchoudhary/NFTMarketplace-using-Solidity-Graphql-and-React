import React, { useContext, useRef, useState } from 'react';
import { File, NFTStorage } from "nft.storage";

import "./Create.css"
import { UserContext } from '../../Context/userContext';

const Create = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [busy, setBusy] = useState(false);
  const { contract, account } = useContext(UserContext);
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !image) {
      alert('All fields are required.');
      return;
    }
    if (!account) {
      alert("Please connect your wallet."); return;
    }
    if (!contract){alert("Contract not fetched"); return;}

    setBusy(true);

    try {
      const client = new NFTStorage({ token: process.env.REACT_APP_NFT_STORAGE_API });
      const metadata = await client.store({
        name,
        description,
        image: new File([image], `${name}.jpg`, { type: 'image/jpg' }),
      });
      const transaction = await contract.createNFT(metadata.url);
      await transaction.wait();
      alert('Your NFT has been created!');
    } catch (error) {
      console.log(error);
      alert('An error occurred while creating the NFT.');
    }
    setBusy(false);
    setName("");
    setDescription("");
    setImage(null);
    formRef.current.reset();
  };

  return (
    <div className="create-nft">
      <h1>Create NFT</h1>

      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={name} autoComplete="off" onChange={(e) => {setName(e.target.value);}} />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={description} autoComplete="off" onChange={(e)=>{setDescription(e.target.value)}} />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input type="file" id="image" name="image" accept="image/*" onChange={(e)=>setImage(e.target.files[0])} />
          {image && (
            <img src={URL.createObjectURL(image)} alt="Preview" style={{ maxWidth: '100%', marginTop: '1rem' }} />
          )}
        </div>

        <button type="submit" disabled={busy}>
          {busy ? 'Busy...' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default Create;
