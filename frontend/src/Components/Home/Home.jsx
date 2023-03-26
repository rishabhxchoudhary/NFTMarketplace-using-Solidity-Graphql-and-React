import React, { useContext } from 'react'
import { useQuery } from 'urql'
import './Home.css'
import { UserContext } from '../../Context/userContext'
import HomeCard from './HomeCard/HomeCard'

const SaleQuery = (owner_address) => {
  return `
  query {
    nfts(where : {to: "${process.env.REACT_APP_CONTRACT_ADDRESS}"  from_not: "${owner_address}" }) {
      id
      from
      to
      tokenURI
      price
    }
  }
`
}

const Home = () => {
  const { account } = useContext(UserContext)
  const [result, reexecuteQuery] = useQuery({
    query: SaleQuery(account),
  })
  return (
    <div className="owned-nfts-container">
      <h2>NFT Market </h2>
      <div className="card-deck">
        {result.fetching && <div>Loading...</div>}
        {result.error && <div>Connect to your Wallet</div>}
        {!result.fetching && !result.error && result.data.nfts.map((nft, index) => (
          <HomeCard
            key={index}
            nft={nft}
            reexecuteQuery={reexecuteQuery}
          />
        ))}
      </div>
    </div>
  )
}

export default Home;