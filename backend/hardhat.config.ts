// import { HardhatUserConfig } from "hardhat/config";
// import 'dotenv/config'
// import "@nomicfoundation/hardhat-toolbox";
// import "@nomiclabs/hardhat-etherscan";

// const SAPOLIA_URL = process.env.SAPOLIA_URL as string;
// const PRIVATE_KEY = process.env.PRIVATE_KEY as string;

// const config: HardhatUserConfig = {
//   solidity: "0.8.19",
//   networks: {
//     goerli : {
//       url: SAPOLIA_URL,
//       accounts: [PRIVATE_KEY],
//     },
//   },
//   etherscan: {
//     apiKey: {
//       goerli : 'https://api-goerli.etherscan.io/api?module=contract&action=getabi&address=0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413&apikey=SWD26Z17RF2Z3SD2BFU7V146M658Q26G2W'
//     }
//   }
// };

// export default config;

/**
* @type import(‘hardhat/config’).HardhatUserConfig
*/
import { HardhatUserConfig } from "hardhat/config";
import 'dotenv/config'
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
const { POLYGON_MUMBAI_RPC_PROVIDER, PRIVATE_KEY, POLYGONSCAN_API_KEY } = process.env;
module.exports = {
        solidity: "0.8.19",
        defaultNetwork: "mumbai",
        networks: {
            hardhat: {},
            mumbai: {
               url: POLYGON_MUMBAI_RPC_PROVIDER,
               accounts: [`0x${PRIVATE_KEY}`],
           }
        },
        etherscan: {
           apiKey: POLYGONSCAN_API_KEY,
        }
};