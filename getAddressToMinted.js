// https://docs.google.com/document/d/157WJdrHELe6Fb8c5lyviiCMhe_3aVjZbzRMXxCw4oVE/edit
const Web3 = require('web3')


// const testList = ["0xd4850927a6e3f30E2e3C3b14D98131Cf8e2D9634", "0xBA480E86c4229eC751FBF46bB333dCA6f88Fff1f"]
const thirdList = ['0xab7DDe540d93219906CC431cCA83723611312823', '0x9dACF3Af44B80bF20455c51f99FcF374c3Ae763d', '0x59097c8027C887825A739C93dc9f4D8a2525FC62', '0xd0e5B99C827d571EA4277b3Cda6b89A619aBad75', '0x82a392a253379e80f269f98cff9c2a0958319e65', '0x2A5FC88261e6C1ccaa2347f50F3fe93Fada3B966', '0x27e7D857eD14388b8FA4D747369EBE3b6d2CBa0E', '0x20C467db9B9Fe0fA39D879b3f23c475582Da2Fba', '0x9A849Fb349F42100119f3Bd2873460DA50a7c92d', '0x85D3c6be944F7fF76968C79Fa7CE409F0a3734B6', '0xbda99088F3B327492C8b1A9A479DC0Bc1cfe111D', '0xB5619CA0Bdd458EBfbc2b8B4b823E23D5717ea67', '0x5FCd863b665E91e0cDabCc636905FB4D516eFb0e', '0x1835372Ee4FcABeCc2d873F6E689320236c779AD', '0xfF66dEe530740d6569fdCEE99765E1193040e95a', '0x75CFbc49986b7137d6a6df6C584f49510a2C756e', '0x450F68560cE4330CfA705d8B8F0Ca75958bF5970', '0xc86863837334E5cA6d4E84963938f6AA47f10A9c', '0x01C5293Fb0e1Fc21c4290eDe345169BCD4e6a2f0', '0x00256c554bceE3345A35F6e6f5A6ecf9C9768830', '0x98e7dEd15754b8554ca689997122FEEc2274Ffa5', '0xbF91aC0b6A943A0D4b310f94D27E6e774F4777fB', '0x4E2C8406451438FcAF6064BAFFeb80E58fA07920', '0x83b6d8e99539bf54b55Eb62E0064E3b8d1ccFdA9', '0x470F19D7C14ECaEFD7fEAA3a9891Be8AbED3e786', '0xA873C6acF63aF94E7aAb2837Df86eebc31E7F009', '0xd0Da971D5f541c1c3654E4cEEF4cb4aA2BF0Bc64', '0x46b0A3A45959a0d4d828cfE384B8D006E94beD37', '0xd83682D4818D6D044Ce613a19f605c2af7ab6729']
// const firstList = ["0x0CE36202Bf4d54A95E692Cf98cB70e72fC620C2f", "0x0242352565711BFe370Fc6e76ec78C1c2CED34A4", "0x2b1eb5D1FB443d872e7ca3A82E295BC8080cD403", "0x379FBCbF0663AbDe64Ad6DdaF1a923Bf73D1D0Fc", "0xe2744c349436449f58663D764018cc7F4Ee3f47e", "0xa1dd6B42ca67DcB6c0E0013ba3cF1C8651E06c4e", "0x833d041E85504e453B757181C0eb99e9A242Caf8", "0x9dACF3Af44B80bF20455c51f99FcF374c3Ae763d", "0xE9bCcf975C1D18839CC0522647Df6004d01DD4f9", "0x83FF360A923Dbfe2d074a115f89C9d4f7a0ACbe6", "0x0e3c63C8313c850534f76bF387E402246c3c4AaD", "0xe4684f9ab82C160287b4Ce2070ae7aA680341cD7", "0xE7da73d1F2e44fD16717C021E81Dc96341aF141B", "0x44E290a081117FD8A8B3018b8A87c6b501C805f2", "0x415bd9A5e2fDcB8310ceE3F785F25B5E4D4564E3", "0x00256c554bceE3345A35F6e6f5A6ecf9C9768830", "0xcB8AE0224c4892E0e4a02DafB82aE622994bb7EB", "0xa2A8c6618FcB7121180A11486cec2cf2082d03A6", "0x29A6f14e51Ee16e860A7464eF6Af47DE51065B36", "0x20045c7Bf8C570Fb5731Ee43FD0e4Dd705107A63", "0xd47144b4BD1764E880969B881D5b949DE98A0EF7", "0xbce41c9C58E0AD33F0f975Ea1a89Ec070bf94DF3", "0x1675287b3fe93c8bd92aa246e0667cced1469e22", "0x8aa5A10F1D2F6a9002aD0D65D6261056E81311e5", "0xe24D8c6C273cB1aD70a6a265F8Adf8c4c95fD9fC"]
// const reserveList = ["0x65B21e1F53556b550E6c400FC96fde6b47899e9E", "0x5024b970B3108a1C6E82bd0dE57D4c1DEE60C144", "0xBBD3FdD1DAc81A1b95cFE0568a0de0E7129cb472", "0xefDD8A2D102b5645537E86E1624DfB06AC2c690b", "0x6667E332F5783D5D17a81A9F1A90222F621A2434", "0x170FF879349558Bb4b1123525e7921Ac053a6E78", "0x817ADc7457a4C53A1dF68158662AEF57a8881770", "0x20C467db9B9Fe0fA39D879b3f23c475582Da2Fba", "0xB75953354a9C1E57beB34af8b73c45D40E2d38aa", "0xe5165A0D7B8bfbd25D2E702b40B5B4C81d284Df4", "0xd075D6339a075BdB4C5c9387abB2309e995851A6", "0xda90966Db6c33D3a4DCd2FCB40241dA5A1763B81", "0x4c91F81CBe03F77923a922Ba0f3A6A548E403fC9", "0x014E2304a1167E48a014Fe13e372786103BaB4B7", "0xb5e7594eC5c93498123571DBAc1e7c1699AfB768", "0x2160baaA1859F18d6726602475D4634D5152E6e3", "0x3A435F5DF1100855979084C6c5eB55C2ADaD155F", "0xA90e35c6BE67920AdaB21F1a207eB3A736E06649", "0x82a392a253379e80f269f98cff9c2a0958319e65", "0x59097c8027C887825A739C93dc9f4D8a2525FC62"]
// console.log(firstList.length)

const abi = [{
    "inputs": [{
        "internalType": "address",
        "name": "openSeaProxyRegistry",
        "type": "address"
    }, {
        "internalType": "address[]",
        "name": "_payees",
        "type": "address[]"
    }, {
        "internalType": "uint256[]",
        "name": "_shares",
        "type": "uint256[]"
    }],
    "stateMutability": "nonpayable",
    "type": "constructor"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
    }],
    "name": "Approval",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
    }, {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
    }],
    "name": "ApprovalForAll",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
    }],
    "name": "OwnershipTransferred",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "shares",
        "type": "uint256"
    }],
    "name": "PayeeAdded",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "address",
        "name": "from",
        "type": "address"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }],
    "name": "PaymentReceived",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "address",
        "name": "to",
        "type": "address"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }],
    "name": "PaymentReleased",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
    }],
    "name": "Transfer",
    "type": "event"
}, {
    "inputs": [],
    "name": "MAX_SUPPLY",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "name": "addressToMinted",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256[]",
        "name": "quantity",
        "type": "uint256[]"
    }, {
        "internalType": "address[]",
        "name": "recipient",
        "type": "address[]"
    }],
    "name": "airdrop",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "allowlistMerkleRoot",
    "outputs": [{
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "count",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "allowance",
        "type": "uint256"
    }, {
        "internalType": "bytes32[]",
        "name": "proof",
        "type": "bytes32[]"
    }],
    "name": "allowlistMint",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "to",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
    }],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "owner",
        "type": "address"
    }],
    "name": "balanceOf",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
    }],
    "name": "getApproved",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "owner",
        "type": "address"
    }, {
        "internalType": "address",
        "name": "operator",
        "type": "address"
    }],
    "name": "isApprovedForAll",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "owner",
        "type": "address"
    }, {
        "internalType": "address",
        "name": "operator",
        "type": "address"
    }],
    "name": "isOwnersOpenSeaProxy",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "maxPerTx",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "count",
        "type": "uint256"
    }],
    "name": "mint",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
}, {
    "inputs": [],
    "name": "name",
    "outputs": [{
        "internalType": "string",
        "name": "",
        "type": "string"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "owner",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
    }],
    "name": "ownerOf",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
    }],
    "name": "payee",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "price",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "proxyRegistry",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address payable",
        "name": "account",
        "type": "address"
    }],
    "name": "release",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "account",
        "type": "address"
    }],
    "name": "released",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "from",
        "type": "address"
    }, {
        "internalType": "address",
        "name": "to",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
    }],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "from",
        "type": "address"
    }, {
        "internalType": "address",
        "name": "to",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
    }, {
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
    }],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "bytes32",
        "name": "_allowlistMerkleRoot",
        "type": "bytes32"
    }],
    "name": "setAllowlistMerkleRoot",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "operator",
        "type": "address"
    }, {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
    }],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "string",
        "name": "_newBaseURI",
        "type": "string"
    }, {
        "internalType": "string",
        "name": "_newSuffix",
        "type": "string"
    }],
    "name": "setBaseURI",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "count",
        "type": "uint256"
    }],
    "name": "setMaxPerTx",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_price",
        "type": "uint256"
    }],
    "name": "setPrice",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "account",
        "type": "address"
    }],
    "name": "shares",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
    }],
    "name": "supportsInterface",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "symbol",
    "outputs": [{
        "internalType": "string",
        "name": "",
        "type": "string"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
    }],
    "name": "tokenByIndex",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "owner",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
    }],
    "name": "tokenOfOwnerByIndex",
    "outputs": [{
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
    }],
    "name": "tokenURI",
    "outputs": [{
        "internalType": "string",
        "name": "",
        "type": "string"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "totalReleased",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "totalShares",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "from",
        "type": "address"
    }, {
        "internalType": "address",
        "name": "to",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
    }],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
    }],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "stateMutability": "payable",
    "type": "receive"
}]

const web3 = new Web3("https://mainnet.infura.io/v3/d20a6707063443e2923d57fe03ac6863")

const contract = new web3.eth.Contract(abi, "0xb0b1b5cFe1Bc0ecE15dEb880fA457E89616D061B")

async function getAddresseToMinted() {
    try {
        let a = [...thirdList];
        let newMerkle = {};
        for (let i = 0; i < a.length; i++) {
            const mintedCount = await contract.methods.addressToMinted(a[i]).call()
            newMerkle[a[i]] = String(+mintedCount + 1);
        }
        console.log(JSON.stringify(newMerkle, null, 2))
        // run getAllProof script
    } catch (error) {
        console.log(error)
    }
}

getAddresseToMinted()

// First list root: 0x411efdce13a8f430703615533d762c293113f78b52bc2f4be40d144b03c8173a
// Reserved : 0x74a760d7ef9ac5e130e54e0cc445444cc45f9ff45d253547962056d27de7970c