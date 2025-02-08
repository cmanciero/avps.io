const { MerkleTree } = require("merkletreejs");
const ethers = require("ethers");
const keccak256 = require("keccak256");
const fs = require("fs").promises;
const path = require("path");

async function getRoot(userWallet) {

  const list = await fs.readFile(path.join(__dirname, "./lambda/allowed/allowed.json"), {
    encoding: "utf-8"
  });

  const allowedMinters = JSON.parse(list);

  const allowed = Object.entries(allowedMinters).find(a => a[0].toLowerCase() === userWallet.toLowerCase());
  if (allowed === undefined)
    return console.log("not found in allow list");


  const leaves = Object.entries(allowedMinters).map(minter => hashMinter(...minter));

  const tree = new MerkleTree(leaves, keccak256, {sortPairs: true});

  const root = tree.getHexRoot();
  console.log(root);


  const leaf = hashMinter(...allowed);

  const proof = tree.getHexProof(leaf);
  console.log(proof);
  console.log(tree.verify(proof, leaf, root));


}

function hashMinter(wallet, allowance) {
  return Buffer.from(ethers.utils.solidityKeccak256(["address", "string"], [wallet, allowance]).slice(2), "hex");
}

getRoot("0xb9F9633d786c984D4656EA5Bc8c204d726eaDB58");
