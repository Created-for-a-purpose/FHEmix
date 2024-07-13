const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("deployWalletContracts", (m) => {
  const verifier = m.contract("Groth16Verifier");
  return { verifier };
  
});
