import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { PublicLockV12 } from "@unlock-protocol/contracts";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("CassetteUnlockFactory", function () {

  async function deployCassetteUnlockFactoryFixture() {
    const unlock = await ethers.getContractFactory("CassetteUnlockFactory");
    const cassetteUnlockFactory = await unlock.deploy('0x1FF7e338d5E582138C46044dc238543Ce555C963');
    console.log(`CassetteUnlockFactory deployed to ${cassetteUnlockFactory.address}`);
    
    return {
      cassetteUnlockFactory,
    }
  }

  describe("Deployment", function () {
    it("Should deploy a new unlock factory", async function () {
      const { cassetteUnlockFactory } = await loadFixture(
        deployCassetteUnlockFactoryFixture
      );
  
      const lockInterface = new ethers.utils.Interface(PublicLockV12.abi);
      const params = lockInterface.encodeFunctionData(
        "initialize(address,uint256,address,uint256,uint256,string)",
        [
          "0x3D02B87ae906F1D6f130832f67E5c10C9f869205",
          31 * 60 * 60 * 24, // 30 days in seconds
          ethers.constants.AddressZero, // We use the base chain currency
          ethers.utils.parseUnits("0.0001", 18), // 0.01 Eth
          1000,
          "New Unlock Membership Testing",
        ]
      );
  
      const transaction = await cassetteUnlockFactory.deployLock('0x3D02B87ae906F1D6f130832f67E5c10C9f869205', params, "lol", "LOL", 'ipfs://bafybeifrnutuq4zdrzg7zyxwxk2qhvmybyvz43tg3h7bequ5ywd6ippgsi/');
      console.log('Hash',transaction.hash);
      const receipt = await transaction.wait();

      const lockAddress = receipt.logs[0].address;
      console.log('Lock Address',lockAddress);
      
  
      expect(lockAddress).to.not.be.null;
    });
  })
})