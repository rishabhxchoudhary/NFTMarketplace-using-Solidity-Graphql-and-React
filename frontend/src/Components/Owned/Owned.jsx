import React, { useContext, useState } from 'react'
import { useQuery } from 'urql'
import './Owned.css'
import OwnedCard from './OwnedNFTCard/OwnedCard'
import { UserContext } from '../../Context/userContext'
import { ethers } from 'ethers'

const OwnedQuery = (owner_address) => {
  return `
  query {
    nfts(where : {to: "${owner_address}" }) {
      id
      from
      to
      tokenURI
    }
  }
`
}

const Owned = () => {
  const [selectedNFT, setSelectedNFT] = useState(null)
  const [nftPrice, setNFTPrice] = useState(0)
  const [loading, setLoading] = useState(false)
  const { account, contract } = useContext(UserContext)
  const [result, reexecuteQuery] = useQuery({
    query: OwnedQuery(account),
  })

  const handleCancelClick = () => {
    setSelectedNFT(null)
    setNFTPrice(0);
  }

  const handlePriceChange = (event) => {
    setNFTPrice(event.target.value)
  }

  const handleSellSubmit = async () => {
    // Code to submit NFT for sale with selected price
    setLoading(true)
    if (!account) {alert("Please connect your wallet."); return;}
    if (!contract) {alert("Contract not fetched"); return;}
    try{
      const wei = ethers.utils.parseEther(nftPrice);
      const transaction = await contract.listNFT(Number(selectedNFT), wei);
      await transaction.wait();
      alert('Your NFT has been put for sale!');
      window.location.reload();
    }
    catch(error){
      alert(error.stack);
      console.log(error);
    }
    setLoading(false)
    setSelectedNFT(null)
    setNFTPrice(0)
    reexecuteQuery();
  }
  return (
    <div className="owned-nfts-container">
      <h2>Owned NFTs</h2>
      <div className="card-deck">
        {result.fetching && <div>Loading...</div>}
        {result.error && <div>Connect to your Wallet</div>}
        {!result.fetching && !result.error && result.data.nfts.map((nft, index) => (
          <OwnedCard
            key={index}
            nft={nft}
            setSelectedNFT={setSelectedNFT}
          />
        ))}
      </div>
      {selectedNFT && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Sell NFT</h2>
              <button className="btn-close" onClick={handleCancelClick}>
                X
              </button>
            </div>
            <div className="modal-body">
              <p>Enter price in ETH:</p>
              <input
                type="number"
                value={nftPrice}
                onChange={handlePriceChange}
              />
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" disabled={loading} onClick={handleCancelClick}>
                {loading ? 'Busy..' : 'Cancel'}
              </button>
              {!loading && (
                <button className="btn-submit" onClick={handleSellSubmit}>
                  Sell
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Owned
