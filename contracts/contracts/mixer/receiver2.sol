// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.19;

import "@fhenixprotocol/contracts/FHE.sol";
interface IERC20 {
    function mint(address recipient, uint256 amount) external returns (bool);
    function burn(address user, uint256 amount) external returns (bool);
}

contract Withdraw {
    IERC20 token;

    constructor(address _token) {
        token = IERC20(_token);
    }

    function handle(
        uint32 _origin,
        bytes32 _sender,
        bytes calldata _message
    ) external {
        (uint256 amount) = abi.decode(_message, (uint256));
        euint128 _amount = FHE.asEuint128(amount);
        token.mint(msg.sender, amount);
    }
}