pragma circom 2.0.0;

include "./node_modules/circomlib/circuits/poseidon.circom";
include "./node_modules/circomlib/circuits/comparators.circom";

template PasswordMatcher() {
    signal input password;
    signal input passwordHash;
    signal input nonce;
    signal input onchainNonce;

    component hasher = Poseidon(1);
    hasher.inputs[0] <== password;

    component isEqual = IsEqual();
    isEqual.in[0] <== hasher.out;
    isEqual.in[1] <== passwordHash;
    isEqual.out === 1;

    component isNonceEqual = IsEqual();
    isNonceEqual.in[0] <== nonce;
    isNonceEqual.in[1] <== onchainNonce;
    isNonceEqual.out === 1;
}

component main { public [passwordHash, onchainNonce]} = PasswordMatcher();