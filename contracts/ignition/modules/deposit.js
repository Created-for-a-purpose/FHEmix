const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("deployMixContracts", (m) => {
    const deposit = m.contract("Deposit", ['0xfd616f18356ec23e9B488Ed9302d02D2ae3d81d7', '0x5388FC02683bD4040F5789F730E85617975784DD']);
    const receiver = m.contract("ReceiverLinea", ['0xfd616f18356ec23e9B488Ed9302d02D2ae3d81d7']);

    return { deposit, receiver };
});
