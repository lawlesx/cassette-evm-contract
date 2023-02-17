import { ethers } from "hardhat";

const main = async () => {
  const CassetteUnlockFactory = await ethers.getContractFactory("CassetteUnlockFactory");

  const cassetteUnlockFactory = await CassetteUnlockFactory.deploy('0x1FF7e338d5E582138C46044dc238543Ce555C963');
  console.log(`CassetteUnlockFactory deployed to ${cassetteUnlockFactory.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
