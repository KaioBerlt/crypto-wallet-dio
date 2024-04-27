const bip39 = require("bip39");
const bip32 = require("bip32");
const bitcoin = require("bitcoinjs-lib");

//rede
const network = bitcoin.networks.testnet; // localhost
//const network = bitcoin.networks.bitcoin; // mainnet

//derivação de carteiras HD(Hierarchical Deterministic)
const path = `m/49'/1'/0'/0`; //testnet
//const path = `m/49'/0'/0'/0`; //mainnet

//gerar mnemonic para seed (palavra de senha)
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

//raiz HD wallet
let root = bip32.fromSeed(seed, network);

//criando conta - par pvt-pub key
let account = root.derivePath(path);
let node = account.derive(0).derive(0);

//endereço
let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Carteira gerada");
console.log("Endereço:", btcAddress);
console.log("Chave Privada:", node.toWIF());
console.log("Seed:", mnemonic);

