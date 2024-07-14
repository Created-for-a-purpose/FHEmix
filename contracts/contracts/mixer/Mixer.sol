// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@fhenixprotocol/contracts/FHE.sol";
import "./IFHErc20.sol";

contract Mixer {

    IFHErc20 public encryptedToken;

    constructor(address _encryptedToken) {
        encryptedToken = IFHErc20(_encryptedToken);
    }

    mapping(eaddress => euint128) public deposits;

    function deposit(inEuint128 calldata _amount, inEaddress calldata _assignee) public {
        eaddress noisyAssignee = FHE.asEaddress(_assignee);
        address decryptedAddress = FHE.decrypt(noisyAssignee);
        eaddress assignee = FHE.asEaddress(decryptedAddress);
        euint128 amount = FHE.asEuint128(_amount);
        deposits[assignee] = deposits[assignee] + amount;
        _processDeposit(amount);
    }

    function _processDeposit(euint128 amount) internal {
        eaddress sender = FHE.asEaddress(msg.sender);
        eaddress receiver = FHE.asEaddress(address(this));
        encryptedToken.transferFrom(sender, receiver, amount);
    }

    function withdraw(inEuint128 calldata _amount) public {
        eaddress sender = FHE.asEaddress(msg.sender);
        euint128 _balance = deposits[sender];
        euint128 amount = FHE.asEuint128(_amount);
        FHE.req(_balance.gte(amount));
        deposits[sender] = _balance - amount;
        _processWithdraw(amount);
    }

    function _processWithdraw(euint128 amount) internal {
        eaddress receiver = FHE.asEaddress(msg.sender);
        encryptedToken.transfer(receiver, amount);
    }

    function reassign(inEuint128 calldata _amount, inEaddress calldata _address) public {
        eaddress sender = FHE.asEaddress(msg.sender);
        euint128 balance = encryptedToken.balance(sender);
        euint128 amount = FHE.asEuint128(_amount);
        FHE.req(balance.gte(amount));
        deposits[sender] = balance - amount;
        _processDeposit(amount);

        eaddress noisyReceiver = FHE.asEaddress(_address);
        address decryptedAddress = FHE.decrypt(noisyReceiver);
        eaddress receiver = FHE.asEaddress(decryptedAddress);
        euint128 balance2 = deposits[receiver];
        deposits[receiver] = balance2 + amount;
    }

    function peekAddress() public view returns (eaddress) {
        eaddress sender = FHE.asEaddress(msg.sender);
        return sender;
    }
}