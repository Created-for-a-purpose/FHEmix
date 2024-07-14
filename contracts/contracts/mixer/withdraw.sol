// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.19;

import { IMailbox } from "@hyperlane-xyz/core/contracts/interfaces/IMailbox.sol";
import "./IFHErc20.sol";

contract Withdraw {
    IFHErc20 token;
    IMailbox outbox;

    uint32 DESTINATION_DOMAIN = 59141;

    constructor(address _token, address _outbox) {
        token = IFHErc20(_token);
        outbox = IMailbox(_outbox);
    }

    function burnAndMint(uint256 amount, address contractAddress) external {
        bytes memory data = abi.encode(amount);
        outbox.dispatch(
            DESTINATION_DOMAIN,
            bytes32(uint256(uint160(contractAddress))),
            data
        );
    }
}