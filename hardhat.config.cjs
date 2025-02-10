/** @type import('hardhat/config').HardhatUserConfig */

require("@nomiclabs/hardhat-ethers")
require('dotenv').config({path:__dirname+'/.env'})

module.exports = {
  solidity: "0.8.28",
  defaultNetwork: "blabla",
  networks: {
    hardhat: {},
    blabla: {
      url: process.env.BASE_URL, // url from ganache
      accounts: [process.env.PRIVATE_KEY], // private key
    },
  },
};
