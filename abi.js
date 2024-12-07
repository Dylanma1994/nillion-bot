const ethers = require('ethers')

const verifierVaultContractABI = [{
    type: "receive",
    stateMutability: "payable"
}, {
    type: "function",
    name: "balanceOf",
    inputs: [{
        name: "",
        type: "address",
        internalType: "address"
    }],
    outputs: [{
        name: "",
        type: "uint256",
        internalType: "uint256"
    }],
    stateMutability: "view"
}, {
    type: "function",
    name: "decimals",
    inputs: [],
    outputs: [{
        name: "",
        type: "uint8",
        internalType: "uint8"
    }],
    stateMutability: "view"
}, {
    type: "function",
    name: "deposit",
    inputs: [{
        name: "_verifierAddress",
        type: "string",
        internalType: "string"
    }],
    outputs: [],
    stateMutability: "payable"
}, {
    type: "function",
    name: "getBalanceOf",
    inputs: [{
        name: "_address",
        type: "address",
        internalType: "address"
    }],
    outputs: [{
        name: "",
        type: "uint256",
        internalType: "uint256"
    }],
    stateMutability: "view"
}, {
    type: "function",
    name: "getVerifierAddress",
    inputs: [{
        name: "_address",
        type: "address",
        internalType: "address"
    }],
    outputs: [{
        name: "",
        type: "string",
        internalType: "string"
    }],
    stateMutability: "view"
}, {
    type: "function",
    name: "name",
    inputs: [],
    outputs: [{
        name: "",
        type: "string",
        internalType: "string"
    }],
    stateMutability: "view"
}, {
    type: "function",
    name: "symbol",
    inputs: [],
    outputs: [{
        name: "",
        type: "string",
        internalType: "string"
    }],
    stateMutability: "view"
}, {
    type: "function",
    name: "totalSupply",
    inputs: [],
    outputs: [{
        name: "",
        type: "uint256",
        internalType: "uint256"
    }],
    stateMutability: "view"
}, {
    type: "function",
    name: "verifierAddress",
    inputs: [{
        name: "",
        type: "address",
        internalType: "address"
    }],
    outputs: [{
        name: "",
        type: "string",
        internalType: "string"
    }],
    stateMutability: "view"
}, {
    type: "function",
    name: "withdraw",
    inputs: [{
        name: "wad",
        type: "uint256",
        internalType: "uint256"
    }],
    outputs: [],
    stateMutability: "nonpayable"
}, {
    type: "event",
    name: "Deposit",
    inputs: [{
        name: "dst",
        type: "address",
        indexed: !0,
        internalType: "address"
    }, {
        name: "wad",
        type: "uint256",
        indexed: !1,
        internalType: "uint256"
    }, {
        name: "verifierAddress",
        type: "string",
        indexed: !1,
        internalType: "string"
    }],
    anonymous: !1
}, {
    type: "event",
    name: "Withdrawal",
    inputs: [{
        name: "src",
        type: "address",
        indexed: !0,
        internalType: "address"
    }, {
        name: "wad",
        type: "uint256",
        indexed: !1,
        internalType: "uint256"
    }, {
        name: "verifierAddress",
        type: "string",
        indexed: !1,
        internalType: "string"
    }],
    anonymous: !1
}];

const secretVaultContractABI = [{
    type: "receive",
    stateMutability: "payable"
}, {
    type: "function",
    name: "balanceOf",
    inputs: [{
        name: "",
        type: "address",
        internalType: "address"
    }],
    outputs: [{
        name: "",
        type: "uint256",
        internalType: "uint256"
    }],
    stateMutability: "view"
}, {
    type: "function",
    name: "decimals",
    inputs: [],
    outputs: [{
        name: "",
        type: "uint8",
        internalType: "uint8"
    }],
    stateMutability: "view"
}, {
    type: "function",
    name: "deposit",
    inputs: [{
        name: "_nilAddress",
        type: "string",
        internalType: "string"
    }],
    outputs: [],
    stateMutability: "payable"
}, {
    type: "function",
    name: "getBalanceOf",
    inputs: [{
        name: "_address",
        type: "address",
        internalType: "address"
    }],
    outputs: [{
        name: "",
        type: "uint256",
        internalType: "uint256"
    }],
    stateMutability: "view"
}, {
    type: "function",
    name: "getNilAddress",
    inputs: [{
        name: "_address",
        type: "address",
        internalType: "address"
    }],
    outputs: [{
        name: "",
        type: "string",
        internalType: "string"
    }],
    stateMutability: "view"
}, {
    type: "function",
    name: "name",
    inputs: [],
    outputs: [{
        name: "",
        type: "string",
        internalType: "string"
    }],
    stateMutability: "view"
}, {
    type: "function",
    name: "nilAddress",
    inputs: [{
        name: "",
        type: "address",
        internalType: "address"
    }],
    outputs: [{
        name: "",
        type: "string",
        internalType: "string"
    }],
    stateMutability: "view"
}, {
    type: "function",
    name: "symbol",
    inputs: [],
    outputs: [{
        name: "",
        type: "string",
        internalType: "string"
    }],
    stateMutability: "view"
}, {
    type: "function",
    name: "totalSupply",
    inputs: [],
    outputs: [{
        name: "",
        type: "uint256",
        internalType: "uint256"
    }],
    stateMutability: "view"
}, {
    type: "function",
    name: "withdraw",
    inputs: [{
        name: "wad",
        type: "uint256",
        internalType: "uint256"
    }],
    outputs: [],
    stateMutability: "nonpayable"
}, {
    type: "event",
    name: "Deposit",
    inputs: [{
        name: "dst",
        type: "address",
        indexed: !0,
        internalType: "address"
    }, {
        name: "wad",
        type: "uint256",
        indexed: !1,
        internalType: "uint256"
    }, {
        name: "nilAddress",
        type: "string",
        indexed: !1,
        internalType: "string"
    }],
    anonymous: !1
}, {
    type: "event",
    name: "Withdrawal",
    inputs: [{
        name: "src",
        type: "address",
        indexed: !0,
        internalType: "address"
    }, {
        name: "wad",
        type: "uint256",
        indexed: !1,
        internalType: "uint256"
    }, {
        name: "nilAddress",
        type: "string",
        indexed: !1,
        internalType: "string"
    }],
    anonymous: !1
}];

function defineChain(y) {
    return {
        formatters: void 0,
        fees: void 0,
        serializers: void 0,
        ...y
    }
}
const mainnet = defineChain({
    id: 1,
    name: "Ethereum",
    nativeCurrency: {
        name: "Ether",
        symbol: "ETH",
        decimals: 18
    },
    rpcUrls: {
        default: {
            http: ["https://cloudflare-eth.com"]
        }
    },
    blockExplorers: {
        default: {
            name: "Etherscan",
            url: "https://etherscan.io",
            apiUrl: "https://api.etherscan.io/api"
        }
    },
    contracts: {
        ensRegistry: {
            address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"
        },
        ensUniversalResolver: {
            address: "0xce01f8eee7E479C928F8919abD53E553a36CeF67",
            blockCreated: 19258213
        },
        multicall3: {
            address: "0xca11bde05977b3631167028862be2a173976ca11",
            blockCreated: 14353601
        }
    }
})

const mainnetConfig = {
    verifier: {
        chainId: mainnet.id,
        abi: verifierVaultContractABI,
        address: "0x2e258dbb253b7e1c0846f212b9b36a2f783ba436"
    },
//     secret: {
//         chainId: mainnet.id,
//         abi: secretVaultContractABI,
//         address: "0x799f7d1fb0fc67fcb760a3991fcb51498f60ce3c"
//     }
}

module.exports = {
    verifierVaultContractABI,
    secretVaultContractABI,
    mainnetConfig
}