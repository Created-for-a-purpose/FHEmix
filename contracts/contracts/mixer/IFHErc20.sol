// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@fhenixprotocol/contracts/FHE.sol";

contract IFHErc20  {
    function mint(uint256 amount) public {}

    function mintEncrypted(euint128 encryptedAmount) public {}

    function transfer(eaddress receiver, euint128 amount) public {}

    function transferFrom(eaddress sender, eaddress receiver, euint128 amount) public {}

    function balance(eaddress account) public view returns (euint128) {}
}