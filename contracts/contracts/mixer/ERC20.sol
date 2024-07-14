// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract ERC20 {
    mapping (address => uint256) public balanceOf;

    function mint(address recipient, uint256 amount) external returns (bool) {
        balanceOf[recipient] += amount;
        return true;
    }

    function burn(address user, uint256 amount) external returns (bool){
        balanceOf[user] -= amount;
        return true;
    }

    function balance(address account) public view returns (uint256) {
        return balanceOf[account];
    }
}