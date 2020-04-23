const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;

    this.hash = this.computeHash();
    this.nonce = 0;
  }

  computeHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data) +
        this.nonce
    ).toString();
  }

  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.computeHash();
    }

    console.log("Blocked mined" + this.hash);
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4;
  }

  createGenesisBlock() {
    return new Block(0, "01/01/2020", "Genesis block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;

    newBlock.mineBlock(this.difficulty);

    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      // Checks if the hash of the block is still valid
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      // Checks if our block point to the correct previous block
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

// ========= Part 1 test -- No mining =============
// Tests
//Create a blockchain with the Genesis block
//let afriCoin = new Blockchain();

// Add our first block (or transaction 1)
//afriCoin.addBlock(new Block(1, "02/02/2020", { amount: 500 }));

// Let's add a second transaction
//afriCoin.addBlock(new Block(2, "03/03/2020", { amount: 200 }));

//Printing results
//console.log(JSON.stringify(afriCoin, null, 4));

// Checking if Blockchain is valid
//console.log("Is blockchain valid?" + afriCoin.isChainValid());

// Let's try to tamper our blockchain - by modify the 2nd transaction (change the original amount from 500 to 3000 -- woooaaahh)
//afriCoin.chain[1].data = { amount: 3000 };
// Then let's check if our Blockchain is still valid
//console.log("Is blockchain valid?" + afriCoin.isChainValid());

// ========= Part 2 test -- with Mining =============
let afriCoin = new Blockchain();

console.log("Minin block 1....");
afriCoin.addBlock(new Block(1, "02/02/2020", { amount: 500 }));

console.log("Minin block 2....");
afriCoin.addBlock(new Block(2, "03/03/2020", { amount: 200 }));
