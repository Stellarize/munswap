require('babel-register');
require('babel-polyfill');
require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider-privkey');
const privateKeys = process.env.PRIVATE_KEYS || ""

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    rinkeby: {
      provider: 
        new HDWalletProvider(
          privateKeys.split(','), // Array of account private keys
          `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`// Url to an Ethereum Node
        ),
      
      network_id: 4,
        gas: 4500000,
        gasPrice: 10000000000,
    },
    mainnet: {
      provider: 
        new HDWalletProvider(
          privateKeys.split(','), // Array of account private keys
          `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`// Url to an Ethereum Node
        ),
      
      network_id: 1,
        gas: 6721975,
        networkCheckTimeout: 1000000000,
        confirmations: 2,
        timeoutBlocks: 4000,
        gasPrice: 16000000000,
        skipDryRun: true
    },
    ropsten: {
      provider: 
        new HDWalletProvider(
          privateKeys.split(','), // Array of account private keys
          `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`// Url to an Ethereum Node
        ),
      
      network_id: 3,
        gas: 5000000,
        networkCheckTimeout: 1000000000,
        timeoutBlocks: 4000,
        gasPrice: 10000000000,
        skipDryRun: true
    }
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY
  },
  compilers: {
    solc: {
      version: "0.6.12"
    }
  }
};
