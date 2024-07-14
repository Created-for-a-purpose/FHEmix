require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    linea: {
      chainId: 59141,
      url: `https://linea-sepolia.blockpi.network/v1/rpc/public`,
      accounts: [process.env.PRIVATE_KEY],
    },
    fhenix: {
      chainId: 8008135,
      url: 'https://api.helium.fhenix.zone',
      accounts: [process.env.PRIVATE_KEY],
    }
  },
};