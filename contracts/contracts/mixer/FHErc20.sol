// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@fhenixprotocol/contracts/FHE.sol";
import { FHERC20 } from "@fhenixprotocol/contracts/experimental/token/FHERC20/FHERC20.sol";

contract Token is FHERC20 {
      constructor(string memory name, string memory symbol)
        FHERC20(
            bytes(name).length == 0 ? "FHE Token" : name,
            bytes(symbol).length == 0 ? "FHE" : symbol
        ) {}

        mapping(eaddress => euint128) private encBalances;

        function mintEncrypted(euint128 encryptedAmount) public {
            eaddress sender = FHE.asEaddress(msg.sender);
            if (!FHE.isInitialized(encBalances[sender])) {
                encBalances[sender] = encryptedAmount;
            } else {
                encBalances[sender] = encBalances[sender] + encryptedAmount;
            }

            totalEncryptedSupply = totalEncryptedSupply + encryptedAmount;
        }        

        function transfer(eaddress receiver, euint128 amount) public {
            eaddress sender = FHE.asEaddress(msg.sender);
            euint128 balance = encBalances[sender];
            FHE.req(balance.gte(amount));

            if (!FHE.isInitialized(encBalances[receiver])) {
                encBalances[receiver] = amount;
            } else {
                encBalances[receiver] = encBalances[receiver] + amount;
            }
            encBalances[sender] = encBalances[sender] - amount; 
        }

        function transferFrom(eaddress sender, eaddress receiver, euint128 amount) public {
            euint128 balance = encBalances[sender];
            FHE.req(balance.gte(amount));

            if (!FHE.isInitialized(encBalances[receiver])) {
                encBalances[receiver] = amount;
            } else {
                encBalances[receiver] = encBalances[receiver] + amount;
            }
            encBalances[sender] = encBalances[sender] - amount; 
        }

        function encryptedBalance(eaddress account) public view returns (euint128) {
            return encBalances[account];
        }

        function mockFill(uint256 amount) public {
            eaddress sender = FHE.asEaddress(msg.sender);
            encBalances[sender] = encBalances[sender] + FHE.asEuint128(amount);
            totalEncryptedSupply = totalEncryptedSupply + FHE.asEuint128(amount);
        }
}