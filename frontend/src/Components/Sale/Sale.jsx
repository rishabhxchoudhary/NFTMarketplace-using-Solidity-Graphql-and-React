import React, { useContext } from 'react'
import { useQuery } from 'urql'
import './Sale.css'
import { UserContext } from '../../Context/userContext'
import SaleCard from './SaleCard/SaleCard'


const SaleQuery = (owner_address) => {
  return `
  query {
    nfts(where : {from: "${owner_address}" to: "${process.env.REACT_APP_CONTRACT_ADDRESS}" }) {
      id
      from
      to
      tokenURI
      price
    }
  }
`
}

const Sale = () => {
  const { account } = useContext(UserContext)
  const [result, reexecuteQuery] = useQuery({
    query: SaleQuery(account),
  })
  return (
    <div className="owned-nfts-container">
      <h2>Your NFTs For Sale</h2>
      <div className="card-deck">
        {result.fetching && <div>Loading...</div>}
        {result.error && <div>Connect to your Wallet</div>}
        {!result.fetching && !result.error && result.data.nfts.map((nft, index) => (
          <SaleCard
            key={index}
            nft={nft}
            reexecuteQuery={reexecuteQuery}
          />
        ))}
      </div>
    </div>
  )
}

export default Sale;