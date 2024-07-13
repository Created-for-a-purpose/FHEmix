require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    linea: {
      chainId: 59141,
      url: `https://rpc.sepolia.linea.build/`,
      accounts: [process.env.PRIVATE_KEY],
    }
  },
};