// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.19;

interface IERC20 {
    function mint(address recipient, uint256 amount) external returns (bool);
    function burn(address user, uint256 amount) external returns (bool);
}

contract ReceiverLinea {
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
        token.mint(msg.sender, amount);
    }
}