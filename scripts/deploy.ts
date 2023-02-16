import { ethers } from "hardhat";

const main = async () => {
  const CassetteUnlockFactory = await ethers.getContractFactory("CassetteUnlockFactory");

  const cassetteUnlockFactory = await CassetteUnlockFactory.deploy('0x1FF7e338d5E582138C46044dc238543Ce555C963');
  console.log(`CassetteUnlockFactory deployed to ${cassetteUnlockFactory.address}`);
}

// async function main() {
//   const currentTimestampInSeconds = Math.round(Date.now() / 1000);
//   const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
//   const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

//   const lockedAmount = ethers.utils.parseEther("1");

//   const Lock = await ethers.getContractFactory("Lock");
//   const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

//   await lock.deployed();

//   console.log(`Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`);
// }

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
