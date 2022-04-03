/**
 * @type import('hardhat/config').HardhatUserConfig
 */

 require('dotenv').config();
 require("@nomiclabs/hardhat-ethers");
 require("@nomiclabs/hardhat-etherscan");
 
 const { PRIVATE_KEY, POLYGONSCAN_API_KEY } = process.env;

module.exports = {
  defaultNetwork: "mumbai",
   networks: {
     localhost: {
       url: "http://127.0.0.1:8545"
     },
     hardhat: {
     },
     mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      chainId: 80001,
      accounts: [`0x${PRIVATE_KEY}`]
    },
     testnet: {
       url: "https://data-seed-prebsc-1-s1.binance.org:8545",
       chainId: 97,
       gasPrice: 20000000000,
       accounts: [`0x${PRIVATE_KEY}`]
     },
     mainnet: {
       url: "https://bsc-dataseed.binance.org/",
       chainId: 56,
       gasPrice: 20000000000,
       accounts: [`0x${PRIVATE_KEY}`]
     }
  },
  etherscan: {
    apiKey: POLYGONSCAN_API_KEY,
  },
   solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true
      }
     }
    },
    paths: {
      sources: "./contracts",
      tests: "./test",
      cache: "./cache",
      artifacts: "./artifacts"
    },
    mocha: {
      timeout: 20000
    }
  };