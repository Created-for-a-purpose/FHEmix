const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("deployMixerContracts", (m) => {
    const fherc20 = m.contract("Token", ['usd', 'usd']);

    return { fherc20 };
});
