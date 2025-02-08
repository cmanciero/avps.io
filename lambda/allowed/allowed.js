const { MerkleTree } = require('merkletreejs')
const ethers = require('ethers')
const keccak256 = require('keccak256')
const fs = require('fs').promises
const path = require('path')

const handler = async (event) => {

  const user = JSON.parse(event.body);
  const userWallet = user.address;

  if (event.httpMethod !== "POST" || !userWallet) {
    return {
      statusCode: 200,
      body: JSON.stringify({ success: false, message: "What are you trying to do..?" }),
    };
  }

  try {

		const list = await fs.readFile(path.join(__dirname, "allowed.json"), {
      encoding: "utf-8"
    });

		const allowedMinters = JSON.parse(list)

		// console.log(allowedMinters)
		// console.log(userWallet.toLowerCase())

		const allowed = Object.entries(allowedMinters).find(a => a[0].toLowerCase() === userWallet.toLowerCase())

		if (allowed === undefined)
		return {
      statusCode: 200,
      body: JSON.stringify({ success: false, message: "You are not on the list" }),
    };

		const leaves = Object.entries(allowedMinters).map(minter => hashMinter(...minter))

		const tree = new MerkleTree(leaves, keccak256, {sortPairs: true})

		const root = tree.getHexRoot()
		console.log(root)
		const leaf = hashMinter(...allowed)

		const proof = tree.getHexProof(leaf)
		console.log(proof)
		console.log(tree.verify(proof, leaf, root))

		if (!tree.verify(proof, leaf, root))
			return {
				statusCode: 200,
				body: JSON.stringify({ success: false, message: "You are not on the list" }),
			};

		const data = {
			allowance: allowed[1],
			proof
		};

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };

  } catch(e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: "Oops.. server error, we'll fix it" })
    };
  }
};

module.exports = { handler };

function hashMinter(wallet, allowance) {
	return Buffer.from(ethers.utils.solidityKeccak256(['address', 'string'], [wallet, allowance]).slice(2), 'hex')
}
