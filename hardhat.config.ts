import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import * as dot from "dotenv";

dot.config();

const { API_URL, PRIVATE_KEY, POLYGONSCAN_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: {
      version: "0.8.17",
      settings: {
         optimizer: {
            enabled: true,
            runs: 200
         }
      }
   },
   defaultNetwork: "hardhat",
   networks: {
      hardhat: {},
      polygonMumbai: {
          url: API_URL,
          accounts: [`0x${PRIVATE_KEY}`]
      }
   },
   etherscan: {
      apiKey: {
         polygonMumbai: POLYGONSCAN_KEY as string
      }
   }
};

export default config;