const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("deployMixContracts", (m) => {
    const erc20 = m.contract("mERC20", []);

    return { erc20 };
});
