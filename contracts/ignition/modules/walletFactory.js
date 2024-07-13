const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("deployWalletContracts", (m) => {
  const verifier = "0x083fBe8f5d44d8814fBec494c0851043D7808810"
  const factory = m.contract("WalletFactory", [verifier]);
  return { factory };
});
