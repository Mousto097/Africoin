const { Blockchain, Transaction } = require("./blockchain");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const myKey = ec.keyFromPrivate(
  "407b1fe1f51d8d6bd8feacfb1992b3fa6e5d61640a72848f18a5baee396176a0"
);
const myWalletAddress = myKey.getPublic("hex");

let afriCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, "public key goes here", 10);
tx1.signTransaction(myKey);
afriCoin.addTransaction(tx1);

console.log("\n Starting the miner...");
afriCoin.minePendingTransactions(myWalletAddress);

console.log(
  "\n Balance of Xavier is",
  afriCoin.getBalanceOfAddress(myWalletAddress)
);
