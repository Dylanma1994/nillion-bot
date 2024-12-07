const ethers = require('ethers')

function getRandomAmount() {
    const random = Math.random()
    const amount = 0.05 + (random * 0.002)
    return ethers.parseEther(amount.toFixed(6))
}

async function sendEth(address, eth) {
    const tx = {
        to: address,
        value: ethers.parseEther(eth)
    }

    const txRes = await wallet.sendTransaction(tx)
    const receipt = await txRes.wait()
    console.log(receipt)
}

async function main() {
    for (let i = 0; i < numWallet; i ++) {
        const hdNodeNew = hdNode.deriveChild(i)
        console.log(`${i} ${hdNodeNew.address} 开始分发`)
        await sendEth(hdNodeNew.address, singleEth)
        console.log(`${i} ${hdNodeNew.address} 结束分发`)
    }
}

const mnemonic = '' // 需要地址的助记词信息
const privKey = '' // 分发地址的私钥
const numWallet = 50 // 分发数量
const singleEth = '0.055' // 分发金额
const provider = new ethers.JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/sMC0WdlgH5JT6uGwGrxykUP5TI61C6Uv`)
const wallet = new ethers.Wallet(privKey, provider)
const hdNode = ethers.HDNodeWallet.fromPhrase(mnemonic, '', `m/44'/60'/0'/0`)

main().then(console.error)