const ethers = require('ethers')
const {mainnetConfig} = require('./abi')
const fs = require('fs');
const path = require('path');
const os = require('os');
const { sleep } = require('@aptos-labs/ts-sdk');

const provider = new ethers.JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/sMC0WdlgH5JT6uGwGrxykUP5TI61C6Uv`)

function getRandomAmount() {
    const random = Math.random()
    const amount = 0.05 + (random * 0.005)
    return ethers.parseEther(amount.toFixed(6))
}

async function readCredentials(i) {
    const credentialsPath = path.join(os.homedir(), 'nillions', `nillion${i}`, 'verifier', 'credentials.json');
    try {
        const data = await fs.readFileSync(credentialsPath, 'utf8');
        const credentials = JSON.parse(data);
        return {
            address: credentials.address,
            pub_key: credentials.pub_key,
            priv_key: credentials.priv_key
        };
    } catch (error) {
        console.error(`Error reading credentials for verifier ${i}:`, error);
        return null;
    }
}

async function waitForLowGas() {
    while (true) {
        const feeData = await provider.getFeeData()
        if (feeData.gasPrice <= limitGasWei) {
            return;
        }
        console.log(`Current gas ${ethers.formatUnits(feeData.gasPrice, "gwei")} gwei, greater than ${limitGas} gwei, sleeping 5 seconds`)
        await sleep(5000)
    }
}

async function deposit(verifyAddress, privkey, index) {
    const wallet = new ethers.Wallet(privkey, provider)
    const address = await wallet.getAddress()

    const contract = new ethers.Contract(mainnetConfig.verifier.address, mainnetConfig.verifier.abi, wallet)
    
    const balance = await contract.balanceOf(address)
    console.log(`${index} ${address} Staked ETH before: ${ethers.formatEther(balance)}`)

    const tx = await contract.deposit(verifyAddress, {value: ethers.parseEther('0.05')})
    await tx.wait()
    const balanceAfter = await contract.balanceOf(address)
    console.log(`${index} ${address} Staked ETH after: ${ethers.formatEther(balanceAfter)}`)
}

async function withdraw(privkey, index) {
    const wallet = new ethers.Wallet(privkey, provider)
    const address = await wallet.getAddress()

    const contract = new ethers.Contract(mainnetConfig.verifier.address, mainnetConfig.verifier.abi, wallet)

    const balance = await contract.balanceOf(address)
    console.log(`${index} ${address} Staked ETH before: ${ethers.formatEther(balance)}`)

    const tx = await contract.withdraw(ethers.parseEther(0.05.toFixed(6)))
    await tx.wait()
    const balanceAfter = await contract.balanceOf(address)
    console.log(`${index} ${address} Staked ETH after: ${ethers.formatEther(balanceAfter)}`)
}

async function processBatch(startIndex, batchSize) {
    const endIndex = Math.min(startIndex + batchSize, numWallet);
    const batch = [];

    for (let i = startIndex; i < endIndex; i++) {
        batch.push(async () => {
            try {
                const credential = await readCredentials(i);
                let hdNodeNew = hdNode.deriveChild(i);
                console.log(`${i} ${hdNodeNew.address} staking..`);
                await deposit(credential.address, hdNodeNew.privateKey, i);
                console.log(`${i} ${hdNodeNew.address} staking finished`);
                // await withdraw(hdNodeNew.privateKey, i);
            } catch (error) {
                console.error(`Error processing wallet ${i}:`, error);
            }
        });
    }

    await Promise.all(batch.map(fn => fn()));
}

async function main() {
    try {
        await waitForLowGas();
        for (let i = 0; i < numWallet; i += BATCH_SIZE) {
            console.log(`Processing batch starting at index ${i}`);
            await processBatch(i, BATCH_SIZE);
        }
        console.log('All operations completed');
    } catch (error) {
        console.error('Main process error:', error);
    }
}

const mnemonic = ''
const numWallet = 50
const hdNode = ethers.HDNodeWallet.fromPhrase(mnemonic, '', `m/44'/60'/0'/0`)
const limitGas = "10"
const limitGasWei = ethers.parseUnits(limitGas, "gwei")
const BATCH_SIZE = 10;

main().catch(console.error)