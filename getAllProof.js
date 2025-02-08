const {
  MerkleTree
} = require("merkletreejs");
const ethers = require("ethers");
const keccak256 = require("keccak256");
const fs = require("fs").promises;
const path = require("path");

async function getAllProof() {

  const list = await fs.readFile(path.join(__dirname, "./allowed.json"), {
    encoding: "utf-8"
  });

  const allowedMinters = JSON.parse(list);

  const leaves = Object.entries(allowedMinters).map(minter => hashMinter(...minter));

  const tree = new MerkleTree(leaves, keccak256, {
    sortPairs: true
  });

  const root = tree.getHexRoot();
  console.log(root);

  let proofs = Object.entries(allowedMinters).map(allowed => {
    const leaf = hashMinter(...allowed);
    const proof = tree.getHexProof(leaf);
    if (!tree.verify(proof, leaf, root))
      return console.log("invalid merkle proof");
    // console.log({proof})
    return {
      userWallet: allowed,
      proof
    };
  });
  await fs.writeFile("./approved_reserved.json", JSON.stringify(proofs));

}


function hashMinter(wallet, allowance) {
  return Buffer.from(ethers.utils.solidityKeccak256(["address", "string"], [wallet, allowance]).slice(2), "hex");
}

getAllProof();