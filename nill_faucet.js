const { DirectSecp256k1HdWallet, Registry, coins } = require("@cosmjs/proto-signing");
const { stringToPath } = require("@cosmjs/crypto");
const { default: axios } = require("axios");
const { sleep } = require("@aptos-labs/ts-sdk");
const { defaultRegistryTypes, SigningStargateClient, GasPrice, QueryClient } = require('@cosmjs/stargate');
const fs = require('fs');
const path = require('path');
const os = require('os')
const {RetailTokenMessage,MsgPayFor,AccusationRegistrationMessage,unpack} = require('./nill_cosm_util')

const { __wbg_init, encrypt } = require("./wasm_load");

const WEBSITE_URL = 'https://faucet.testnet.nillion.com/'
const WEBSITE_KEY = '6Le0TNUpAAAAAF6PF4LfeVBm56WbgdcPVV8Id6LF'
const YES_API_URL = 'https://api.yescaptcha.com'
const MNEMONIC_PATH = './mnemonic.txt'

async function createTask() {
    const resp = await axios.post(`${YES_API_URL}/createTask`, data={
        "clientKey": CLIENT_KEY,
        "task": {
            "websiteURL": WEBSITE_URL,
            "websiteKey": WEBSITE_KEY,
            "type": "NoCaptchaTaskProxyless",
            // "isInvisible": false
        }
    })

    return resp.data['taskId']
}

async function getResult(taskId) {
    for(let i = 0; i < 3; i ++) {
        const resp = await axios.post(`${YES_API_URL}/getTaskResult`, data={
            "clientKey": CLIENT_KEY,
            "taskId": taskId
        })

        if (resp.data['errorId'] == 1) {
            throw new Error(resp.data['errorDescription'])
        }
        
        if (resp.data['status'] === 'processing') {
            console.log('Processing, wait 10 second')
            await sleep(10000)
            continue
        }

        return resp.data['solution']
    }
}

async function generateAddress(mnemonic, prefix, num) {
    const wallets = []
    for (let i = start; i < end; i++) {
        const account = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
            prefix: prefix,
            hdPaths: [stringToPath(`m/44'/118'/${i}'/0/0`)],
        })

        // 获取地址
        // const [wallet] = await account.getAccounts();
        wallets.push(account)
    }

    return wallets
}

async function faucet(address, proxy) {
    const [protocol, host, port, user, pass] = await parseProxy(proxy);
    const proxyConfig = {
        protocol: protocol,
        host: host,
        port: port,
        auth: {
            username: user,
            password: pass
        }
    };
    for (let i = 0; i < 3; i ++) {
        try {
            const taskId = await createTask()
            const solution = await getResult(taskId)
            const resp = await axios.post('https://faucet.testnet.blockchain-cluster.nilogy.xyz/credit', data={
                "address": address,
                "denom": "unil",
                "recaptcha": solution['gRecaptchaResponse']
            }, {proxy: proxyConfig})
            
            console.log(`faucet result: ${resp.data === 'ok'}`)
    
            return resp.data === 'ok'
        } catch (e) {
            console.log(`Faucet error: ${e}, Retring ${i+1}`)
            // return false
        }
    }

    return false
}

async function parseProxy(proxyUrl) {
    const withoutProtocol = proxyUrl.replace(/^(https?:\/\/)/, '');
    const [auth, hostPort] = withoutProtocol.split('@');
    const [user, pass] = auth.split(':');
    const [host, port] = hostPort.split(':');
    const protocol = proxyUrl.startsWith('https') ? 'https' : 'http';
    return [protocol, host, port, user, pass];
}

async function register_node(wallet, verifyAddress, verifyPubkey, proxy) {
    const gasPrice = GasPrice.fromString('0.0unil');
    const registry = new Registry(defaultRegistryTypes)
    registry.register('/nillion.meta.v1.MsgPayFor', MsgPayFor)

    const account = await wallet.getAccounts()
    const address = account[0].address
    const pubkey = account[0].pubkey
    
    const textEncoder = new TextEncoder()
    const payload = {
        accuserId: {
            id: textEncoder.encode(verifyAddress)
        },
        userId: {
            id: textEncoder.encode(address)
        },
        signature: {
            signature: encrypt(pubkey, unpack(verifyAddress))
        }
    }
    const ctPayload = {
        kind: 1,
        payload: AccusationRegistrationMessage.encode(payload).finish()
    }
    const etPayload = {
        fromAddress: address,
        resource: RetailTokenMessage.encode(ctPayload).finish(),
        amount: coins(2, "unil")
    }

    for (let i = 0; i < 100; i ++) {
        try {
            const client = await SigningStargateClient.connectWithSigner(
                "https://testnet-nillion-rpc.lavenderfive.com",
                // "https://verifier.nillion.com/nilchain-proxy",
                wallet,
                {gasPrice: gasPrice, registry: registry},
            );
            const result = await client.signAndBroadcast(address, [{
                typeUrl: '/nillion.meta.v1.MsgPayFor',
                value: etPayload
            }], 'auto', 'AccusationRegistrationMessage')
            
            const transactionHash = result.transactionHash
            const height = result.height
            
            // register api
            const [protocol, host, port, user, pass] = await parseProxy(proxy);
            const proxyConfig = {
                protocol: protocol,
                host: host,
                port: port,
                auth: {
                    username: user,
                    password: pass
                }
            };
            const registerResp = await axios.post(`https://retailtoken-web.testnet.blockchain-cluster.nilogy.xyz/api/v1/verifiers`, data={
                verifier_address: verifyAddress,
                user_address: address,
                transaction_hash: transactionHash,
                block: height
            }, {proxy: proxyConfig})
            if (registerResp.status != 201) {
                console.log(`${verifyAddress} register ${i + 1} error, ${registerResp.data}`)
                continue
            }
            console.log(`${verifyAddress} register ${i + 1} success`)
            return
        } catch(e) {
            if (i == 99) {
                throw new Error(`${verifyAddress} register ${i + 1} error ${e}`);
            }
            console.log(`${verifyAddress} register ${i + 1} error ${e}`)
        }

        await sleep(1000)
    }
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

async function readProxies(filename = '/proxies.txt') {
    try {
        const content = fs.readFileSync(filename, 'utf-8');
        return content.split('\n').filter(line => line.trim());
    } catch (error) {
        console.error('Error reading proxies file:', error);
        return [];
    }
}

async function createVerifier(i, wallet, proxy) {
    const dirPath = path.join(os.homedir(), 'nillions', `nillion${i}`, 'verifier');
    try {
        if (!fs.existsSync(dirPath)) {
            throw new Error(`Verifier ${i} directory not existed`);
        }

        // 读取生成的credentials
        const credentials = await readCredentials(i);
        if (credentials) {
            console.log(`Verifier ${i} credentials:`);
            console.log(`Address: ${credentials.address}`);
            console.log(`Public Key: ${credentials.pub_key}`);
        }

        // 验证地址 和 用户地址领水
        const verifyAddress = credentials.address;
        const verifyPubkey = credentials.pub_key;

        const accounts = await wallet.getAccounts();

        if (!(await faucet(verifyAddress, proxy)) || !(await faucet(accounts[0].address, proxy))) {
            throw new Error(`${verifyAddress} faucet error`);
        }
    } catch (error) {
        console.error(`Error with verifier ${i}:`, error);
    }
}

async function main() {
    await __wbg_init()
    const prefix = 'nillion';
    let mnemonic = ''
    mnemonic = fs.readFileSync(MNEMONIC_PATH, 'utf8').trim();
    console.log(`Mnemonic existed: ${mnemonic}`)
    const wallets = await generateAddress(mnemonic, prefix);
    const proxies = await readProxies();
    if (wallets.length > proxies.length) {
        console.error(`Proxy count less then wallet`)
        return
    }
    for (let i = 0; i < end-start; i ++) {
        await createVerifier(i+start, wallets[i], proxies[i+start])
    }
}


const [,, startArg, endArg, CLIENT_KEY] = process.argv;
const start = parseInt(startArg);
const end = parseInt(endArg);
main().catch(console.error);