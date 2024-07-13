const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("deployWalletContracts", (m) => {
  const verifier = m.contract("Verifier");
  const factory = m.contract("WalletFactory", [verifier.address]);
  
});
