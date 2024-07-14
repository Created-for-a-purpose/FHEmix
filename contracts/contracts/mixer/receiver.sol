// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.19;

import "@fhenixprotocol/contracts/FHE.sol";
import "./IFHErc20.sol";

contract ReceiverFhenix {
    IFHErc20 token;

    constructor(address _token) {
        token = IFHErc20(_token);
    }

    function handle(
        uint32 _origin,
        bytes32 _sender,
        bytes calldata _message
    ) external {
        (uint256 amount) = abi.decode(_message, (uint256));
        euint128 _amount = FHE.asEuint128(amount);
        token.mintEncrypted(_amount);
    }
}