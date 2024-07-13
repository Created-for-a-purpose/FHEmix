const circomlib = require('circomlibjs')

const main = async () => {
    const poseidon = await circomlib.buildPoseidon()
    const message = 1234
    console.log('message', message)
    const hash = poseidon([message])
    console.log('hash', poseidon.F.toString(hash))
}

main()