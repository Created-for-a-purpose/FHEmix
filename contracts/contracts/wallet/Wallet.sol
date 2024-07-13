
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Wallet {
    address public factoryAddress;
    string public username;

    modifier onlyFactory() {
        require(msg.sender == factoryAddress, "only factory can call");
        _;
    }

    constructor(string memory _username) {
        factoryAddress = msg.sender;
        username = _username;
    }

    function executeExternalTx(
        address contractAddress,
        uint256 value,
        bytes memory data
    ) external onlyFactory returns (bytes memory) {
        (bool success, bytes memory result) = contractAddress.call{value: value}(data);
        require(success, "external call reverted");
        return result;
    }

    receive() external payable {}
    fallback() external payable {}
}