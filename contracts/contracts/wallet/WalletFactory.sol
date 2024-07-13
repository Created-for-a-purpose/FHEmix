// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.19;

import {Wallet} from "./Wallet.sol";
import {Groth16Verifier} from "./verifier.sol";

interface IVerifier {
    function verifyProof(uint[2] calldata _pA, uint[2][2] calldata _pB, uint[2] calldata _pC, uint[2] calldata _pubSignals) external view returns (bool);
}

interface IWallet {
    function executeExternalTx(
        address contractAddress,
        uint256 value,
        bytes memory data
    ) external returns (bytes memory bytesValues);
}

contract WalletFactory {
    
    struct UserInfo {
        bool registered;
        address walletAddress;
    }

    struct Proof {
        uint256[2] pa;
        uint256[2][2] pb;
        uint256[2] pc;
    }
    
    mapping(string => UserInfo) public usernameInfo;
    
    mapping(string => mapping(uint => bool)) private nonceUsedByUsername;
    
    address public verifierContract;

    mapping(string => uint256) public userPasswordHash;

    constructor(address _verifierContract) {
        verifierContract = _verifierContract;
    }

    function newWallet(
        string memory _username,
        uint256 _passwordHash
    ) public returns (address) {
        require(
            usernameInfo[_username].registered == false,
            "Username already used"
        );
        address _walletAddress = _deployWalletContract(_username);
        usernameInfo[_username] = UserInfo(true, _walletAddress);
        userPasswordHash[_username] = _passwordHash;
        return _walletAddress;
    }

    function _deployWalletContract(
        string memory _username
    ) internal returns (address) {
        // Create a new instance of the MasalaWallet contract
        Wallet newWalletContract = new Wallet(_username);
        return address(newWalletContract);
    }

    function executeWalletTx(
        string memory username,
        uint256 nonce,
        address contractAddress,
        uint256 value,
        bytes memory data,
        Proof memory proof
    ) public returns (bytes memory) {
        require(
            usernameInfo[username].registered == true,
            "Username is not registered"
        );
        require(
            nonceUsedByUsername[username][nonce] == false,
            "Invalid nonce"
        );
        UserInfo memory info = usernameInfo[username];
        uint[2] memory inputs = [
            userPasswordHash[username],
            nonce
        ];
        bool verificationSuccess = IVerifier(verifierContract).verifyProof(
            proof.pa,
            proof.pb,
            proof.pc,
            inputs
        );
        require(verificationSuccess, "zkSNARK verification failed");

        IWallet contractInstance = IWallet(info.walletAddress);
        bytes memory result = contractInstance.executeExternalTx(
            contractAddress,
            value,
            data
        );

        nonceUsedByUsername[username][nonce] = true;

        return result;
    }
}