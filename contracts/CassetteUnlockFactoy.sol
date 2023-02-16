// SPDX-License-Identifier: UNLICENSED
import "@unlock-protocol/contracts/dist/Unlock/IUnlockV11.sol";
import "@unlock-protocol/contracts/dist/PublicLock/IPublicLockV12.sol";

pragma solidity ^0.8.0;

contract CassetteUnlockFactory {
    address unlockAddress;

    event LockDeployed(address indexed lock, address indexed deployer);

    constructor(address _unlockAddress) {
        unlockAddress = _unlockAddress;
    }

    function deployLock(
        address user,
        bytes calldata data,
        string memory _name,
        string memory _symbol,
        string memory _baseTokenURI
    ) external returns (address) {
        IUnlockV11 unlock = IUnlockV11(unlockAddress);

        IPublicLockV12 lock = IPublicLockV12(
            unlock.createUpgradeableLockAtVersion(data, 12)
        );
        lock.addLockManager(user);
        lock.setOwner(user);
        lock.setLockMetadata(_name, _symbol, _baseTokenURI);

        emit LockDeployed(address(lock), msg.sender);

        return address(lock);
    }
}
