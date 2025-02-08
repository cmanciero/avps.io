const { MerkleTree } = require("merkletreejs");
const ethers = require("ethers");
const keccak256 = require("keccak256");
const fs = require("fs").promises;
const path = require("path");

async function getRoot() {

  const list = await fs.readFile(path.join(__dirname, "./lambda/allowed/allowed.json"), {
    encoding: "utf-8"
  });

  const allowedMinters = JSON.parse(list);

  const leaves = Object.entries(allowedMinters).map(minter => hashMinter(...minter));

  const tree = new MerkleTree(leaves, keccak256, {sortPairs: true});

  const root = tree.getHexRoot();
  console.log(root);
}

function hashMinter(wallet, allowance) {
  return Buffer.from(ethers.utils.solidityKeccak256(["address", "string"], [wallet, allowance]).slice(2), "hex");
}

getRoot();
